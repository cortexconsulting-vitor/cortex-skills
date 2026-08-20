# Guia — Atualizar

## Pra que serve

Varre a pasta, compara com o que está escrito na memória e te mostra o que ficou
desencontrado — com a prova do lado. Você aprova o que quiser e só isso muda.

## Quando usar e quando não usar

**Use** depois de uma fase que mexeu em muita coisa: fechou um cliente, mudou de
oferta, virou o trimestre, terminou um projeto grande.

**Não use** para:

- **Rotina semanal.** Memória não muda toda semana. Rodar à toa te acostuma a
  aprovar sem ler, e aí ela para de servir
- **Escrever a memória da primeira vez.** Isso é `/instalar`. Esta compara o que
  já existe com a realidade
- **Arrumar texto.** Ela corrige fato desencontrado, não estilo
- **Descobrir o que fazer agora.** Isso é `/abrir`

## O que esperar

Uma lista de propostas, cada uma com a evidência: o arquivo, o commit ou a data
que provam. Três tipos:

- **Contradição** — a memória diz uma coisa e a pasta diz outra. A mais grave, porque
  as outras skills escrevem em cima disso
- **Ausência** — existe e não está escrito
- **Resíduo** — está escrito e não existe mais

Você aprova o que quiser. O que ela aplicar, aplica na linha — não reescreve o
arquivo. No fim ela mostra o diff.

Se estiver tudo batendo, ela diz isso em uma linha e para.

## O erro comum

**Aceitar tudo de uma vez.**

Ela varre a pasta. Você sabe coisa que não está na pasta: o cliente que pausou mas
volta em janeiro, a prioridade que continua valendo mesmo sem arquivo nenhum, o
projeto que está na tua cabeça e em nenhum commit.

Quando ela propõe remover algo assim, ela está errada e você está certo — **recuse**.
Ela não vai insistir. Aprovar em bloco é como você perde exatamente a informação
que só existia ali.

O segundo erro é **rodar antes de salvar o trabalho**. Ela olha o que está na pasta
e no histórico; se você tem duas semanas de coisa não commitada, a leitura dela sai
torta. Rode `/salvar` antes.

## Como ajustar

**1. Rode `/salvar` antes.** Não é ajuste dela, é o que faz a varredura enxergar
certo. É o de maior efeito nesta lista.

**2. Diga o recorte.** "Olha só o `foco.md`" ou "só os clientes" faz uma varredura
mais curta e mais fácil de revisar linha a linha.

**3. Escreva o motivo quando recusar.** "Não remove, esse cliente volta em janeiro"
pode virar uma linha no próprio `foco.md` — e aí ela não propõe de novo no mês que
vem.
