#!/usr/bin/env node
// Monta a proposta: lê marca.json (identidade do comprador) e proposta.json
// (o conteúdo), injeta os dois no modelo e grava proposta.html pronta.
//
// Sem dependência nenhuma. O arquivo abre no navegador e vira PDF pelo
// Cmd+P — não há motor de captura para instalar, quebrar ou versionar.
//
// O modelo NÃO é reescrito. A marca entra por cima.

const fs = require('fs');
const path = require('path');

const AQUI = __dirname;
const PASTA = path.resolve(process.argv[2] || process.cwd());

const ler = (p, oq) => {
  if (!fs.existsSync(p)) {
    console.error(`nao achei ${oq} em ${p}`);
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(p, 'utf8'));
};

// Troca um ponto de injeção. Se o alvo nao existe, o modelo e o montar.js
// sairam de sincronia — e seguir em silencio entregaria a proposta com a
// marca de outra empresa no cabecalho. Melhor parar aqui.
const trocar = (html, alvo, novo, oque) => {
  if (!html.includes(alvo)) {
    console.error(`✗ ponto de injecao de ${oque} nao existe no modelo`);
    console.error(`  procurei por: ${alvo}`);
    console.error('  o modelo e o montar.js precisam ser da mesma versao.');
    process.exit(1);
  }
  return html.split(alvo).join(novo);
};

const marca = ler(path.join(PASTA, 'marca.json'), 'marca.json');
const proposta = ler(path.join(PASTA, 'proposta.json'), 'proposta.json');

let html = fs.readFileSync(path.join(AQUI, 'modelo', 'proposta.html'), 'utf8');

// 1. Acento: a única cor da marca que entra. O papel continua claro, porque
//    proposta se imprime e fundo escuro gasta tinta e fica feio no papel.
const acento = (marca.paleta && marca.paleta.acento) || '#B07A52';
html = trocar(html, '--acento:#B07A52;', `--acento:${acento};`, 'acento');

// 2. Fontes: os três nomes do modelo viram os três da marca, no CSS e na URL
//    do Google Fonts.
const f = marca.fontes || {};
const titulo = f.titulo || 'Inter Tight';
const texto  = f.texto  || 'Jost';
const rotulo = f.rotulo || 'IBM Plex Mono';
const url = 'https://fonts.googleapis.com/css2'
  + `?family=${encodeURIComponent(titulo).replace(/%20/g, '+')}:wght@400;600;700`
  + `&family=${encodeURIComponent(texto).replace(/%20/g, '+')}:wght@300;400;500`
  + `&family=${encodeURIComponent(rotulo).replace(/%20/g, '+')}:wght@400;500`
  + '&display=swap';
html = html.replace(/href="https:\/\/fonts\.googleapis\.com\/css2[^"]*"/, `href="${url}"`);
html = html.split("'Inter Tight'").join(`'${titulo}'`);
html = html.split("'Jost'").join(`'${texto}'`);
html = html.split("'IBM Plex Mono'").join(`'${rotulo}'`);

// 3. Nome e handle: o modelo escreve os dois direto no JS, em três lugares.
const esc = (v) => String(v || '').replace(/'/g, "\\'");
const nome = esc(marca.nome);
html = trocar(html, "el('div', 'wordmark', 'Marca')",
              `el('div', 'wordmark', '${nome}')`, 'wordmark');
html = trocar(html, "el('div', null, 'Marca')",
              `el('div', null, '${nome}')`, 'nome na assinatura');
html = trocar(html, "el('div', null, '@suaempresa')",
              `el('div', null, '${esc(marca.handle)}')`, 'handle');

// 4. Título da aba: vira o nome do arquivo quando se imprime em PDF.
html = trocar(html, '<title>Proposta</title>',
              `<title>Proposta — ${String(proposta.cliente || '')}</title>`, 'titulo');

// 5. Conteúdo: substitui o bloco JSON inteiro.
html = html.replace(
  /(<script type="application\/json" id="proposta">)[\s\S]*?(<\/script>)/,
  `$1\n${JSON.stringify(proposta, null, 2)}\n$2`
);

const saida = path.join(PASTA, 'proposta.html');
fs.writeFileSync(saida, html);
console.log(`pronto: ${saida}`);
console.log('abra no navegador e imprima em PDF (Cmd+P > Salvar como PDF)');
