#!/usr/bin/env node
// Queima legenda no video desenhando cada linha no navegador e sobrepondo com
// o ffmpeg.
//
// Por que nao usar o filtro `subtitles` do ffmpeg: ele exige libass compilada
// dentro da build, e muita instalacao nao tem — a do Homebrew testada em
// 20/08/2026 nao tinha. Aqui o texto e desenhado pelo Chromium, do mesmo jeito
// que o carrossel desenha os slides, e o ffmpeg so sobrepoe imagem. Funciona em
// qualquer build, e a legenda sai com a fonte e a cor da marca em vez do estilo
// generico do libass.
//
//   node legendar.js <video> <saida> <legenda.srt> [marca.json]

const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const morre = (m) => { console.error(`✗ ${m}`); process.exit(1); };

const [ent, sai, srt, marcaArq] = process.argv.slice(2);
if (!srt) morre('uso: node legendar.js <video> <saida> <legenda.srt> [marca.json]');
for (const f of [ent, srt]) if (!fs.existsSync(f)) morre(`nao achei ${f}`);

let puppeteer;
try { puppeteer = require('puppeteer'); }
catch { morre('falta o puppeteer.\n  Rode, dentro da pasta desta skill:  npm install'); }

if (spawnSync('ffmpeg', ['-version'], { stdio: 'ignore' }).error)
  morre('ffmpeg nao esta instalado.  macOS: brew install ffmpeg');

// ——— marca ———
let marca = {};
if (marcaArq && fs.existsSync(marcaArq)) marca = JSON.parse(fs.readFileSync(marcaArq, 'utf8'));
const fonte = (marca.fontes && marca.fontes.texto) || 'Inter';
const acento = (marca.paleta && marca.paleta.acento) || '#FFFFFF';

// ——— dimensoes do video ———
const pr = spawnSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0',
  '-show_entries', 'stream=width,height', '-of', 'csv=p=0', ent], { encoding: 'utf8' });
if (pr.status !== 0) morre(`ffprobe nao leu ${ent}`);
const [L, A] = pr.stdout.trim().split(',').map(Number);

// ——— SRT ———
const tempo = (t) => {
  const m = t.trim().match(/(\d+):(\d+):(\d+)[,.](\d+)/);
  if (!m) morre(`marca de tempo invalida: ${t}`);
  return +m[1] * 3600 + +m[2] * 60 + +m[3] + +m[4] / 1000;
};
const falas = fs.readFileSync(srt, 'utf8').replace(/\r/g, '').trim().split(/\n\s*\n/)
  .map((bloco) => {
    const linhas = bloco.split('\n').filter((l) => l.trim() !== '');
    const iTempo = linhas.findIndex((l) => l.includes('-->'));
    if (iTempo < 0) return null;
    const [a, b] = linhas[iTempo].split('-->');
    const texto = linhas.slice(iTempo + 1).join(' ').trim();
    return texto ? { ini: tempo(a), fim: tempo(b), texto } : null;
  }).filter(Boolean);

if (!falas.length) morre('nao achei nenhuma fala no arquivo de legenda');
if (falas.length > 200)
  morre(`${falas.length} falas e demais para uma passada so.\n` +
        '  Corte o video em partes menores — a cadeia de filtros fica lenta demais.');

// ——— desenhar cada fala ———
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'legenda-'));
const largura = Math.round(L * 0.86);

(async () => {
  const nav = await puppeteer.launch({ headless: 'new' });
  const pag = await nav.newPage();
  await pag.setViewport({ width: largura, height: 400, deviceScaleFactor: 1 });

  const escapar = (t) => t.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
  const arquivos = [];

  for (let i = 0; i < falas.length; i++) {
    await pag.setContent(`<!doctype html>
      <meta charset="utf-8">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(fonte).replace(/%20/g, '+')}:wght@600;800&display=swap" rel="stylesheet">
      <style>
        html,body{margin:0;background:transparent}
        #c{display:inline-block;font-family:'${fonte}',system-ui,-apple-system,sans-serif;
           font-weight:800;font-size:${Math.round(L * 0.048)}px;line-height:1.25;
           color:${acento};text-align:center;width:${largura}px;
           text-shadow:0 0 ${Math.round(L * 0.006)}px rgba(0,0,0,.95),
                       0 ${Math.round(L * 0.003)}px ${Math.round(L * 0.008)}px rgba(0,0,0,.85);
           paint-order:stroke fill;
           -webkit-text-stroke:${Math.round(L * 0.0045)}px rgba(0,0,0,.9);}
      </style>
      <div id="c">${escapar(falas[i].texto)}</div>`);
    try { await pag.evaluateHandle('document.fonts.ready'); } catch { /* sem rede: cai na fonte do sistema */ }
    const el = await pag.$('#c');
    const arq = path.join(tmp, `l${String(i).padStart(3, '0')}.png`);
    await el.screenshot({ path: arq, omitBackground: true });
    arquivos.push(arq);
  }
  await nav.close();

  // ——— sobrepor ———
  const entradas = ['-i', ent, ...arquivos.flatMap((a) => ['-i', a])];
  const margem = Math.round(A * 0.09);
  let cadeia = '', atual = '0:v';
  falas.forEach((f, i) => {
    const prox = i === falas.length - 1 ? 'vout' : `v${i}`;
    cadeia += `[${atual}][${i + 1}:v]overlay=x=(W-w)/2:y=H-h-${margem}:`
            + `enable='between(t,${f.ini.toFixed(3)},${f.fim.toFixed(3)})'[${prox}];`;
    atual = prox;
  });
  cadeia = cadeia.replace(/;$/, '');

  const temAudio = spawnSync('ffprobe', ['-v', 'error', '-select_streams', 'a',
    '-show_entries', 'stream=index', '-of', 'csv=p=0', ent], { encoding: 'utf8' }).stdout.trim() !== '';

  const r = spawnSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...entradas,
    '-filter_complex', cadeia, '-map', '[vout]',
    ...(temAudio ? ['-map', '0:a', '-c:a', 'copy'] : []),
    '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20',
    '-movflags', '+faststart', sai], { stdio: ['ignore', 'inherit', 'pipe'] });

  fs.rmSync(tmp, { recursive: true, force: true });

  if (r.status !== 0) {
    console.error('✗ ffmpeg falhou ao sobrepor a legenda');
    console.error(String(r.stderr || '').trim().split('\n').slice(-6).join('\n'));
    process.exit(1);
  }
  console.log(`pronto: ${sai}  (${falas.length} falas desenhadas na imagem)`);
})().catch((e) => { fs.rmSync(tmp, { recursive: true, force: true }); morre(e.message); });
