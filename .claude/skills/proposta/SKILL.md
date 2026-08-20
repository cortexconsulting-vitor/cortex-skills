---
name: proposta
description: Monta uma proposta comercial de serviço em HTML, com a marca da própria empresa, pronta pra virar PDF. Cobre escopo, o que não está incluído, fases com prazo, investimento e próximo passo. Use quando a pessoa disser "fazer uma proposta", "orçamento pro cliente", "proposta comercial", "monta a proposta do fulano", "preciso mandar uma proposta", ou /proposta.
---

# Proposta

Monta a proposta que ganha porque o cliente se reconhece nela — não porque tem
o menor preço.

## Passo 0 — a marca existe?

Contrato de memória: `marca/marca.json` no workspace, `marca.json` na pasta,
`~/.claude/cortex-.claude/skills/marca.json` no global. Achou, **use e não pergunte nada**.

Daqui saem `nome`, `handle`, `paleta.acento` e `fontes`. Sem marca nenhuma,
pergunte só **nome, @ e cor** — os outros campos não entram na proposta.

## Passo 1 — o briefing, antes de qualquer texto

Você precisa de cinco coisas. **Pergunte o que faltar, tudo de uma vez** — aqui
uma rodada só é melhor que seis, porque a pessoa está com o contexto na cabeça:

1. **Quem é o cliente** e o que ele faz
2. **O que ele disse que precisa** — de preferência nas palavras dele
3. **O que você vai entregar**
4. **Em quanto tempo**
5. **Quanto vai cobrar**, e como recebe

**Se a pessoa não souber o valor, pare aqui.** Não estime, não sugira faixa, não
invente. Proposta com preço chutado é pior que proposta atrasada — o número vira
âncora e não tem volta.

## Passo 2 — o entendimento vem primeiro

**Esta é a seção que decide a proposta.** Escreva "O que eu entendi" antes de
qualquer outra, e mostre só ela ao usuário para aprovar.

Três regras:

- **Nas palavras do cliente, não nas suas.** Se ele disse "tá tudo no WhatsApp e
  ninguém acha nada", escreva isso. Não traduza para "gestão de comunicação
  ineficiente" — ele deixa de se reconhecer
- **O problema, não a solução.** A solução vem no escopo
- **De duas a quatro linhas.** Cada uma um fato que ele reconheça

Se o usuário corrigir o entendimento, é sinal de que o briefing estava raso.
Pergunte o que faltou antes de seguir.

## Passo 3 — escopo, limite e fases

**Escopo:** o que será entregue, em substantivo concreto. "Mapa das três rotas
com o tempo de cada trecho" — não "consultoria em logística".

**O que não está incluído:** a seção que a maioria não escreve e que evita o
desgaste inteiro. Liste o que o cliente pode razoavelmente supor que vem junto e
não vem — e diga quando for decisão, não limitação: *"sistema sob medida não
entra; a primeira volta é em planilha, de propósito"*.

**Fases:** de 3 a 5. Cada uma com nome, o que acontece nela e quando. Menos de 3
não mostra método; mais de 5 vira cronograma e ninguém lê.

**O que eu preciso de você:** o que o cliente tem que fornecer. É onde se protege
o prazo — atraso que nasce aqui deixa de ser culpa sua no dia da conversa difícil.

## Passo 4 — montar

Crie `proposta-<cliente>-<AAAA-MM-DD>/`, copie a marca resolvida no Passo 0 pra
dentro como `marca.json`, e escreva `proposta.json` seguindo
`proposta.exemplo.json`.

```bash
node montar.js proposta-<cliente>-<data>
```

**Não precisa instalar nada.** Sai um `proposta.html` que abre no navegador e vira
PDF pelo Cmd+P → Salvar como PDF.

O montador aborta se o modelo e ele saírem de sincronia. Se acusar ponto de
injeção faltando, os dois arquivos são de versões diferentes — **não contorne
editando o modelo**.

## Passo 5 — entregar

Mostre a proposta e escreva junto **a mensagem de envio**: três linhas, sem
repetir o que está no documento, com uma pergunta no fim.

Diga a validade em voz alta. Proposta sem prazo fica em aberto pra sempre.

## Nunca

- **Não invente valor, prazo ou entregável.** Nada aqui pode ser estimativa sua:
  o que estiver escrito, a pessoa vai ter que cumprir
- **Não escreva o entendimento na sua linguagem.** Jargão bonito é onde o cliente
  para de se reconhecer
- **Não omita o "não está incluído"** para a proposta parecer mais generosa. É
  exatamente ali que nasce o trabalho de graça
- **Não edite `modelo/proposta.html`.** A marca entra por injeção, no `montar.js`
- **Não mande você mesmo.** Você monta; quem envia é a pessoa
