#!/usr/bin/env node
// Operacoes de video em cima do ffmpeg. Sem dependencia de npm: o unico
// requisito e o ffmpeg instalado na maquina.
//
// Existe para o modelo nao ter que montar filtro de ffmpeg de cabeca a cada
// pedido. Filtro escrito no improviso erra silenciosamente — sai video com
// proporcao errada, audio fora de sincronia ou legenda invisivel, e ninguem
// percebe ate publicar.
//
//   node video.js info      <entrada>
//   node video.js cortar    <entrada> <saida> <inicio> <fim>
//   node video.js vertical  <entrada> <saida> [desfoque|corte]
//   node video.js juntar    <saida> <clipe1> <clipe2> ...
//   node video.js legenda   <entrada> <saida> <arquivo.srt>   (desenhada na imagem)
//   node video.js legenda-embutida <entrada> <saida> <arquivo.srt>  (faixa do arquivo)
//   node video.js capa      <entrada> <saida.jpg> [segundo]

const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const morre = (msg) => { console.error(`✗ ${msg}`); process.exit(1); };

const existe = (bin) =>
  spawnSync(bin, ['-version'], { stdio: 'ignore' }).error === undefined;

if (!existe('ffmpeg') || !existe('ffprobe')) {
  morre('ffmpeg nao esta instalado.\n' +
        '  macOS:  brew install ffmpeg\n' +
        '  Ubuntu: sudo apt install ffmpeg\n' +
        '  Windows: winget install Gyan.FFmpeg');
}

const rodar = (args, oque) => {
  const r = spawnSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args],
                      { stdio: ['ignore', 'inherit', 'pipe'] });
  if (r.status !== 0) {
    console.error(`✗ ffmpeg falhou em: ${oque}`);
    console.error(String(r.stderr || '').trim().split('\n').slice(-6).join('\n'));
    process.exit(1);
  }
};

let _filtros = null;
const temFiltro = (nome) => {
  if (_filtros === null) {
    const r = spawnSync('ffmpeg', ['-hide_banner', '-filters'], { encoding: 'utf8' });
    _filtros = String(r.stdout || '');
  }
  return new RegExp(`^ [A-Z.]+ +${nome} `, 'm').test(_filtros);
};

const sonda = (arquivo) => {
  if (!fs.existsSync(arquivo)) morre(`nao achei ${arquivo}`);
  const r = spawnSync('ffprobe', ['-v', 'error', '-print_format', 'json',
    '-show_format', '-show_streams', arquivo], { encoding: 'utf8' });
  if (r.status !== 0) morre(`ffprobe nao leu ${arquivo} — o arquivo e video mesmo?`);
  const d = JSON.parse(r.stdout);
  const v = d.streams.find((s) => s.codec_type === 'video');
  const a = d.streams.find((s) => s.codec_type === 'audio');
  if (!v) morre(`${arquivo} nao tem faixa de video`);
  return {
    largura: v.width, altura: v.height,
    duracao: Number(d.format.duration || 0),
    fps: (() => { const [n, d] = String(v.r_frame_rate || '0/1').split('/');
                  return Number(d) ? Number(n) / Number(d) : 0; })(),
    temAudio: Boolean(a),
    codec: v.codec_name,
  };
};

const seg = (t) => {
  // aceita 90, 1:30 ou 00:01:30.5
  if (/^\d+(\.\d+)?$/.test(t)) return Number(t);
  const p = t.split(':').map(Number);
  if (p.some(isNaN)) morre(`tempo invalido: ${t} (use 90, 1:30 ou 00:01:30)`);
  return p.reverse().reduce((acc, n, i) => acc + n * 60 ** i, 0);
};

const cmd = process.argv[2];
const arg = process.argv.slice(3);

if (cmd === 'info') {
  const i = sonda(arg[0]);
  const m = Math.floor(i.duracao / 60), s = Math.round(i.duracao % 60);
  console.log(`${path.basename(arg[0])}`);
  console.log(`  ${i.largura}x${i.altura}  ${i.fps.toFixed(2)} fps  ${i.codec}`);
  console.log(`  ${m}m${String(s).padStart(2, '0')}s  audio: ${i.temAudio ? 'sim' : 'NAO'}`);
  const prop = i.largura / i.altura;
  console.log(`  proporcao: ${prop > 1.2 ? 'horizontal' : prop < 0.9 ? 'vertical' : 'quadrado'}`);

} else if (cmd === 'cortar') {
  const [ent, sai, ini, fim] = arg;
  if (!fim) morre('uso: cortar <entrada> <saida> <inicio> <fim>');
  const i = sonda(ent);
  const [a, b] = [seg(ini), seg(fim)];
  if (b <= a) morre(`o fim (${fim}) tem que ser depois do inicio (${ini})`);
  if (a >= i.duracao) morre(`o inicio (${ini}) passa da duracao do video (${i.duracao.toFixed(1)}s)`);
  if (b > i.duracao) console.error(`aviso: o fim passa do video; cortando em ${i.duracao.toFixed(1)}s`);
  // -ss depois de -i re-codifica, mas corta no frame exato. Copiar o stream
  // seria mais rapido e cortaria no keyframe anterior, ate 2s fora do pedido.
  rodar(['-i', ent, '-ss', String(a), '-to', String(Math.min(b, i.duracao)),
         '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20',
         ...(i.temAudio ? ['-c:a', 'aac', '-b:a', '128k'] : ['-an']),
         '-movflags', '+faststart', sai], 'cortar');
  console.log(`pronto: ${sai}  (${(Math.min(b, i.duracao) - a).toFixed(1)}s)`);

} else if (cmd === 'vertical') {
  const [ent, sai, modo = 'desfoque'] = arg;
  if (!sai) morre('uso: vertical <entrada> <saida> [desfoque|corte]');
  const i = sonda(ent);
  const filtro = modo === 'corte'
    ? 'scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,setsar=1'
    : 'split[a][b];[a]scale=1080:1920:force_original_aspect_ratio=increase,'
      + 'crop=1080:1920,gblur=sigma=28[bg];[b]scale=1080:-2[fg];'
      + '[bg][fg]overlay=(W-w)/2:(H-h)/2,setsar=1';
  if (!['desfoque', 'corte'].includes(modo)) morre(`modo desconhecido: ${modo}`);
  rodar(['-i', ent, '-filter_complex', filtro,
         '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20',
         ...(i.temAudio ? ['-c:a', 'aac', '-b:a', '128k'] : ['-an']),
         '-movflags', '+faststart', sai], 'vertical');
  console.log(`pronto: ${sai}  1080x1920 (${modo})`);

} else if (cmd === 'juntar') {
  const [sai, ...clipes] = arg;
  if (clipes.length < 2) morre('uso: juntar <saida> <clipe1> <clipe2> ...');
  clipes.forEach(sonda);
  // Normaliza tudo para 1080x1920 antes de concatenar. Sem isso, clipe de
  // proporcao diferente entra esticado e ninguem ve ate assistir inteiro.
  const partes = clipes.map((_, n) =>
    `[${n}:v]scale=1080:1920:force_original_aspect_ratio=decrease,`
    + `pad=1080:1920:(ow-iw)/2:(oh-ih)/2,setsar=1[v${n}];`).join('');
  const cadeia = clipes.map((_, n) => `[v${n}][${n}:a]`).join('');
  const entradas = clipes.flatMap((c) => ['-i', c]);
  rodar([...entradas, '-filter_complex',
         `${partes}${cadeia}concat=n=${clipes.length}:v=1:a=1[v][a]`,
         '-map', '[v]', '-map', '[a]',
         '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20',
         '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', sai], 'juntar');
  console.log(`pronto: ${sai}  (${clipes.length} clipes)`);

} else if (cmd === 'legenda') {
  const [ent, sai, srt] = arg;
  if (!srt) morre('uso: legenda <entrada> <saida> <arquivo.srt>');
  if (!fs.existsSync(srt)) morre(`nao achei o arquivo de legenda ${srt}`);
  const i = sonda(ent);

  // Queimar legenda exige o filtro `subtitles`, que so existe em build de
  // ffmpeg compilada com libass. Nem toda instalacao tem — a do Homebrew em
  // 20/08/2026 nao tinha. Sem o filtro, o caminho honesto e parar: cair
  // calado para legenda embutida entregaria um arquivo que parece certo e
  // nao mostra legenda nenhuma no Instagram.
  if (!temFiltro('subtitles')) {
    console.error('✗ este ffmpeg nao queima legenda: falta o filtro `subtitles` (libass).');
    console.error('');
    console.error('  Duas saidas:');
    console.error('  1. Instalar um ffmpeg com libass:');
    console.error('       brew tap homebrew-ffmpeg/ffmpeg');
    console.error('       brew install homebrew-ffmpeg/ffmpeg/ffmpeg --with-libass');
    console.error('  2. Usar `legenda-embutida`, que funciona em qualquer build —');
    console.error('     mas a legenda fica como faixa do arquivo, nao desenhada na');
    console.error('     imagem. Instagram, TikTok e Reels NAO mostram legenda assim.');
    process.exit(1);
  }

  // As virgulas de force_style precisam de barra: dentro do filtro elas
  // separariam um filtro do proximo.
  const estilo = ['FontName=Helvetica', 'FontSize=16', 'PrimaryColour=&H00FFFFFF',
    'OutlineColour=&H00000000', 'BorderStyle=1', 'Outline=2', 'Shadow=0',
    'Alignment=2', 'MarginV=90'].join('\\,');
  const caminho = srt.replace(/\\/g, '/').replace(/:/g, '\\:').replace(/'/g, "\\'");
  rodar(['-i', ent, '-vf', `subtitles=filename='${caminho}':force_style='${estilo}'`,
         '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20',
         ...(i.temAudio ? ['-c:a', 'copy'] : ['-an']),
         '-movflags', '+faststart', sai], 'legenda');
  console.log(`pronto: ${sai}  (legenda desenhada na imagem)`);

} else if (cmd === 'legenda-embutida') {
  const [ent, sai, srt] = arg;
  if (!srt) morre('uso: legenda-embutida <entrada> <saida> <arquivo.srt>');
  if (!fs.existsSync(srt)) morre(`nao achei o arquivo de legenda ${srt}`);
  sonda(ent);
  rodar(['-i', ent, '-i', srt, '-c:v', 'copy', '-c:a', 'copy',
         '-c:s', 'mov_text', '-movflags', '+faststart', sai], 'legenda-embutida');
  console.log(`pronto: ${sai}  (legenda como FAIXA do arquivo, nao na imagem)`);
  console.log('atencao: Instagram, TikTok e Reels nao mostram legenda assim.');
  console.log('         serve para YouTube, player de site e arquivo de entrega.');

} else if (cmd === 'capa') {
  const [ent, sai, quando = '1'] = arg;
  if (!sai) morre('uso: capa <entrada> <saida.jpg> [segundo]');
  const i = sonda(ent);
  const t = seg(quando);
  if (t >= i.duracao) morre(`o segundo ${quando} passa da duracao (${i.duracao.toFixed(1)}s)`);
  rodar(['-ss', String(t), '-i', ent, '-frames:v', '1', '-q:v', '2', sai], 'capa');
  console.log(`pronto: ${sai}  (frame de ${t}s)`);

} else {
  console.log(fs.readFileSync(__filename, 'utf8')
    .split('\n').filter((l) => l.startsWith('//')).map((l) => l.slice(3)).join('\n'));
  process.exit(cmd ? 1 : 0);
}
