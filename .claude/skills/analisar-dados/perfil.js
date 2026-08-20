#!/usr/bin/env node
// Perfila um CSV/TSV sem jogar o arquivo inteiro na conversa.
//
// Existe porque despejar 40 mil linhas no contexto faz duas coisas ruins:
// estoura o limite, e leva o modelo a "lembrar" numeros que nao leu. Aqui o
// arquivo e lido por inteiro em disco, e o que sai e a estatistica — contagem,
// nulos, faixa, valores mais frequentes. Numero que aparecer no resumo foi
// calculado, nao estimado.
//
//   node perfil.js <arquivo.csv> [--col NOME] [--linhas N]
//
//   --col NOME    detalha uma coluna so
//   --linhas N    mostra as N primeiras linhas cruas (padrao 3)

const fs = require('fs');

const morre = (m) => { console.error(`✗ ${m}`); process.exit(1); };

const args = process.argv.slice(2);
const arquivo = args.find((a) => !a.startsWith('--'));
const pega = (flag, padrao) => {
  const i = args.indexOf(flag);
  return i >= 0 && args[i + 1] ? args[i + 1] : padrao;
};
if (!arquivo) morre('uso: node perfil.js <arquivo.csv> [--col NOME] [--linhas N]');
if (!fs.existsSync(arquivo)) morre(`nao achei ${arquivo}`);

const bytes = fs.statSync(arquivo).size;
if (bytes > 200 * 1024 * 1024) {
  morre(`${(bytes / 1048576).toFixed(0)} MB e grande demais para ler de uma vez.\n` +
        '  Corte o arquivo antes, ou peca uma amostra do sistema que o exportou.');
}

const bruto = fs.readFileSync(arquivo, 'utf8').replace(/^﻿/, '');
if (!bruto.trim()) morre('o arquivo esta vazio');

// Delimitador: o que mais aparece na primeira linha fora de aspas.
const primeira = bruto.split('\n')[0];
const contaFora = (ch) => {
  let n = 0, aspas = false;
  for (const c of primeira) {
    if (c === '"') aspas = !aspas;
    else if (c === ch && !aspas) n++;
  }
  return n;
};
const delim = [[',', contaFora(',')], [';', contaFora(';')], ['\t', contaFora('\t')]]
  .sort((a, b) => b[1] - a[1])[0][0];

// Parser com maquina de estado: campo entre aspas pode conter delimitador e
// quebra de linha, e "" dentro de aspas e uma aspa literal.
const linhas = [];
let campo = '', linha = [], aspas = false;
for (let i = 0; i < bruto.length; i++) {
  const c = bruto[i];
  if (aspas) {
    if (c === '"') {
      if (bruto[i + 1] === '"') { campo += '"'; i++; } else aspas = false;
    } else campo += c;
  } else if (c === '"') aspas = true;
  else if (c === delim) { linha.push(campo); campo = ''; }
  else if (c === '\n') { linha.push(campo); linhas.push(linha); linha = []; campo = ''; }
  else if (c !== '\r') campo += c;
}
if (campo !== '' || linha.length) { linha.push(campo); linhas.push(linha); }

if (linhas.length < 2) morre('o arquivo tem cabecalho mas nenhuma linha de dados');

const cabecalho = linhas[0].map((h, i) => h.trim() || `coluna_${i + 1}`);
const dados = linhas.slice(1).filter((l) => l.some((c) => c.trim() !== ''));

const nomeDelim = { ',': 'virgula', ';': 'ponto-e-virgula', '\t': 'tab' }[delim];
const irregulares = dados.filter((l) => l.length !== cabecalho.length).length;

// Formato de numero se decide por COLUNA, nunca por valor solto. "12400.50" e
// "1.250" sao os dois validos e querem dizer coisas opostas: no primeiro o ponto
// e decimal, no segundo e milhar. Tratar todo ponto como milhar inflava a coluna
// em 100x — e um resumo com numero errado e pior que resumo nenhum.
const PAD = /^[+-]?[\d.,]*\d$/;
const ehNumBruto = (v) => v !== '' && PAD.test(v) && /\d/.test(v);

const detectarFormato = (vals) => {
  // Com os dois separadores presentes, o ultimo a aparecer e o decimal.
  for (const v of vals) {
    const p = v.lastIndexOf('.'), c = v.lastIndexOf(',');
    if (p >= 0 && c >= 0) return c > p ? 'br' : 'us';
  }
  // So um separador: se algum grupo depois dele nao tem exatamente 3 digitos,
  // ele e decimal. "1.250" fica ambiguo e resolve como milhar, que e o uso
  // mais comum em export brasileiro.
  for (const sep of ['.', ',']) {
    const comSep = vals.filter((v) => v.includes(sep));
    if (!comSep.length) continue;
    const grupoTorto = comSep.some((v) => {
      const partes = v.split(sep);
      return partes.length > 2 ? false : partes[1].length !== 3;
    });
    if (grupoTorto) return sep === '.' ? 'us' : 'br';
    return sep === '.' ? 'br' : 'us';   // grupos de 3: separador de milhar
  }
  return 'br';
};

const fazNum = (fmt) => (v) => {
  const t = String(v).trim();
  return Number(fmt === 'br' ? t.replace(/\./g, '').replace(',', '.')
                             : t.replace(/,/g, ''));
};

const ehData = (v) => /^\d{4}-\d{2}-\d{2}/.test(v) || /^\d{2}[/-]\d{2}[/-]\d{4}/.test(v);

const perfilar = (idx) => {
  const vals = dados.map((l) => (l[idx] ?? '').trim());
  const cheios = vals.filter((v) => v !== '');
  const vazios = vals.length - cheios.length;
  const unicos = new Set(cheios);
  const p = { nome: cabecalho[idx], vazios, unicos: unicos.size, total: vals.length };

  if (cheios.length && cheios.every(ehNumBruto)) {
    const fmt = detectarFormato(cheios);
    const conv = fazNum(fmt);
    const ns = cheios.map(conv).filter((n) => !isNaN(n)).sort((a, b) => a - b);
    if (!ns.length) { p.tipo = 'texto'; p.topo = []; return p; }
    p.formato = fmt;
    const soma = ns.reduce((a, b) => a + b, 0);
    p.tipo = 'numero';
    p.min = ns[0]; p.max = ns[ns.length - 1];
    p.media = soma / ns.length;
    p.mediana = ns[Math.floor(ns.length / 2)];
    p.soma = soma;
  } else if (cheios.length && cheios.every(ehData)) {
    const ds = [...cheios].sort();
    p.tipo = 'data'; p.min = ds[0]; p.max = ds[ds.length - 1];
  } else {
    p.tipo = unicos.size <= Math.max(20, cheios.length * 0.05) ? 'categoria' : 'texto';
    const freq = {};
    cheios.forEach((v) => { freq[v] = (freq[v] || 0) + 1; });
    p.topo = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 5);
  }
  return p;
};

const fmt = (n) => (Number.isInteger(n) ? n.toLocaleString('pt-BR')
                                        : n.toLocaleString('pt-BR', { maximumFractionDigits: 2 }));

console.log(`${arquivo}`);
console.log(`  ${fmt(dados.length)} linhas · ${cabecalho.length} colunas · separador: ${nomeDelim}`);
if (irregulares) console.log(`  ⚠ ${fmt(irregulares)} linha(s) com numero de colunas diferente do cabecalho`);
console.log();

const alvo = pega('--col', null);
const indices = alvo
  ? [cabecalho.findIndex((h) => h.toLowerCase() === alvo.toLowerCase())]
  : cabecalho.map((_, i) => i);
if (alvo && indices[0] < 0) morre(`nao achei a coluna "${alvo}". Existem: ${cabecalho.join(', ')}`);

for (const i of indices) {
  const p = perfilar(i);
  const falta = p.vazios ? `  ${fmt(p.vazios)} vazios (${(p.vazios / p.total * 100).toFixed(0)}%)` : '';
  console.log(`${p.nome}  [${p.tipo}]${falta}`);
  if (p.tipo === 'numero') {
    console.log(`  min ${fmt(p.min)} · mediana ${fmt(p.mediana)} · media ${fmt(p.media)} · max ${fmt(p.max)}`);
    console.log(`  soma ${fmt(p.soma)}`);
    console.log(`  lido como ${p.formato === 'br' ? 'formato brasileiro (1.234,56)' : 'formato americano (1,234.56)'}`);
  } else if (p.tipo === 'data') {
    console.log(`  de ${p.min} ate ${p.max}`);
  } else {
    console.log(`  ${fmt(p.unicos)} valores distintos`);
    p.topo.forEach(([v, n]) => console.log(`    ${String(n).padStart(6)}x  ${v.slice(0, 60)}`));
  }
  console.log();
}

const nLinhas = Number(pega('--linhas', 3));
if (nLinhas > 0 && !alvo) {
  console.log(`primeiras ${nLinhas} linhas:`);
  dados.slice(0, nLinhas).forEach((l) => {
    console.log('  ' + cabecalho.map((h, i) => `${h}=${(l[i] ?? '').slice(0, 24)}`).join(' | '));
  });
}
