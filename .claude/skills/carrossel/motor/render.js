// Motor de carrossel do Cortex Skills.
//
//   node render.js [pasta-da-peca]
//
// Lê marca.json (identidade do comprador) e conteudo.json (a peça), injeta os
// dois no molde e exporta os PNGs em instagram/, 2160x2700 (2x de 1080x1350).
//
// O molde NÃO é reescrito. A marca entra por cima, via cascata do CSS e três
// substituições pontuais. É o que preserva a geometria original do molde.

const path = require('path');
const fs = require('fs');

const semNavegador = (e) => {
  const m = String(e && e.message || e);
  if (!/Could not find Chrome|Browser was not found|ENOENT.*chrome/i.test(m)) return false;
  console.error('\n✗ O puppeteer esta instalado, mas o navegador dele nao foi baixado.');
  console.error('');
  console.error('  Acontece porque o npm bloqueia scripts de pos-instalacao por padrao.');
  console.error('  Rode isto uma vez, nesta mesma pasta:');
  console.error('');
  console.error('    npx puppeteer browsers install chrome');
  console.error('');
  console.error('  Sao uns 150 MB, uma vez so na maquina. Depois rode o comando de novo.\n');
  return true;
};

let puppeteer;
try {
  puppeteer = require('puppeteer');
} catch {
  console.error('\nFalta o puppeteer. Rode uma vez, dentro da pasta do motor:\n');
  console.error('  npm install puppeteer\n');
  process.exit(1);
}

const MOTOR = __dirname;
const PECA = path.resolve(process.argv[2] || process.cwd());
const SAIDA = path.join(PECA, 'instagram');

const ler = (p, oq) => {
  if (!fs.existsSync(p)) {
    console.error(`nao achei ${oq} em ${p}`);
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(p, 'utf8'));
};

// Troca um ponto de injeção. Se o alvo nao existe, o molde e o motor sairam de
// sincronia — e seguir em silencio publicaria a peca com a marca de outra
// empresa. Melhor parar aqui do que descobrir no feed.
const trocar = (html, alvo, novo, oque) => {
  if (!html.includes(alvo)) {
    console.error(`✗ ponto de injecao de ${oque} nao existe no molde`);
    console.error(`  procurei por: ${alvo}`);
    console.error('  o molde e o render.js precisam ser da mesma versao.');
    process.exit(1);
  }
  return html.split(alvo).join(novo);
};

const marca = ler(path.join(PECA, 'marca.json'), 'marca.json');
const conteudo = ler(path.join(PECA, 'conteudo.json'), 'conteudo.json');

// ——— injeção ———
let html = fs.readFileSync(path.join(MOTOR, 'base.html'), 'utf8');
const p = marca.paleta;

// 1. Paleta: um :root extra no fim da cascata vence o do molde, sem editá-lo.
const override = `
<style id="marca-do-comprador">
  :root{
    --fundo-base:${p.fundo}; --fundo-2:${p.fundo}; --fundo-bronze:${p.fundo_medio};
    --fundo-cobre:${p.fundo_medio}; --fundo-cobre-luz:${p.fundo_claro}; --fundo-luz:${p.fundo_luz};
    --ink:${p.tinta}; --ink2:${p.tinta_2}; --ink3:${p.tinta_3}; --ink4:${p.tinta_4};
    --cobre:${p.acento}; --cobre-claro:${p.acento_claro}; --cobre-fundo:${p.acento_fundo};
    --apagado:${p.apagado};
  }
  body{background-color:${p.fundo}}
</style>
`;
html = html.replace('<script type="application/json" id="conteudo">', override + '<script type="application/json" id="conteudo">');

// 2. Fontes: os três nomes do molde viram os três da marca.
html = html.split("'Inter Tight'").join(`'${marca.fontes.titulo}'`);
html = html.split("'Jost'").join(`'${marca.fontes.texto}'`);
html = html.split("'IBM Plex Mono'").join(`'${marca.fontes.rotulo}'`);

// 3. Logo: troca o path do símbolo. Sem logo, o símbolo some — deixar o da
//    Córtex apareceria no post de outra empresa, que é defeito, não padrão.
if (marca.logo && marca.logo.d) {
  html = html.replace(/(<path id="marca-c"[^>]*d=")[^"]*(")/, `$1${marca.logo.d}$2`);
} else {
  html = html.replace(
    '<script type="application/json" id="conteudo">',
    '<style id="sem-logo">svg.c{display:none}</style>\n<script type="application/json" id="conteudo">'
  );
}

// 4. Wordmark: o molde escreve o nome direto no JS, em dois lugares.
const nomeSeguro = String(marca.nome).replace(/'/g, "\\'");
html = trocar(html, "el('div', 'wordmark', 'Marca')",
              `el('div', 'wordmark', '${nomeSeguro}')`, 'wordmark');

// 4b. Descritor: o molde assina com o descritor no slide final.
const descritor = String(marca.descritor || '').replace(/'/g, "\\'");
html = trocar(html, "el('div', 'assinatura', 'Descritor da empresa')",
              `el('div', 'assinatura', '${descritor}')`, 'descritor');

// 5. Conteúdo: substitui o bloco JSON inteiro, já com o handle da marca.
const dados = { handle: marca.handle, ...conteudo };
html = html.replace(
  /(<script type="application\/json" id="conteudo">)[\s\S]*?(<\/script>)/,
  `$1\n${JSON.stringify(dados, null, 2)}\n$2`
);

fs.mkdirSync(SAIDA, { recursive: true });
const montado = path.join(PECA, 'carrossel.html');
fs.writeFileSync(montado, html);

// ——— render ———
(async () => {
  let navegador;
  try {
    navegador = await puppeteer.launch();
  } catch (e) {
    if (semNavegador(e)) process.exit(1);
    throw e;
  }
  const pagina = await navegador.newPage();
  pagina.on('pageerror', e => { console.error('ERRO NA PAGINA:', e.message); process.exitCode = 1; });
  await pagina.setViewport({ width: 1080, height: 1350, deviceScaleFactor: 2 });
  await pagina.goto('file://' + montado, { waitUntil: 'networkidle0' });
  await pagina.evaluate(() => document.fonts.ready);

  const slides = await pagina.$$('.slide');
  if (!slides.length) throw new Error('nenhum slide gerado — conferir conteudo.json');
  console.log(`${slides.length} slides`);

  // Aviso de texto perto de estourar a arte — herdado do molde original.
  const estouros = await pagina.evaluate(() => {
    const fora = [];
    document.querySelectorAll('.slide').forEach((s, i) => {
      const cx = s.getBoundingClientRect();
      s.querySelectorAll('h1, h2, .frase, .pergunta, .trilha span, .opcao .nome').forEach(e => {
        const r = e.getBoundingClientRect();
        if (r.bottom > cx.bottom - 60 || r.right > cx.right - 40)
          fora.push(`slide ${i + 1}: "${(e.textContent || '').slice(0, 40)}…"`);
      });
    });
    return fora;
  });
  if (estouros.length) {
    console.warn('\nATENCAO — texto perto de estourar. Encurtar:');
    estouros.forEach(t => console.warn('  ' + t));
  }

  for (let i = 0; i < slides.length; i++) {
    const nome = `slide-${String(i + 1).padStart(2, '0')}.png`;
    await slides[i].screenshot({ path: path.join(SAIDA, nome) });
    console.log('  ->', nome);
  }
  await navegador.close();
  console.log('pronto:', SAIDA);
})();
