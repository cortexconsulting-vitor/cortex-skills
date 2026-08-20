---
name: publicar-tema
description: Pega um tema e produz a peça de conteúdo inteira, amarrada — o texto longo, o carrossel que resume, e as legendas de cada rede. Tudo com a mesma tese, nenhuma peça repetindo a outra. Use quando a pessoa pedir "conteúdo sobre X", "transforma esse tema em post", "quero publicar sobre", "faz o conteúdo completo do tema", ou /publicar-tema.
---

# Publicar tema

Um tema vira quatro peças. O erro que essa skill existe para evitar é as quatro
dizerem a mesma coisa em tamanhos diferentes.

## Passo 0 — a memória

Contrato de memória: identidade e voz em `marca.json`, o negócio em `negocio.md`.
Sem `negocio.md` funciona, e sai mais genérico — diga isso uma vez, não a cada peça.

## Passo 1 — achar a tese

Antes de escrever qualquer peça, escreva **uma frase** que seja a tese do tema, e
mostre ao usuário para aprovar.

Tese é uma afirmação que alguém razoável poderia discordar. Se ninguém discorda, é
observação, não tese — e observação não sustenta quatro peças.

| Isso não é tese | Isso é |
|---|---|
| "Atendimento é importante" | "Responder rápido vale mais que responder bem" |
| "Automatize seus processos" | "Automatizar processo bagunçado multiplica a bagunça" |

**Se a tese não passar, pare.** Escrever quatro peças sobre uma observação morna é
como se produz conteúdo que ninguém lê e ninguém sabe dizer por quê.

## Passo 2 — o texto longo

De 600 a 900 palavras. Estrutura que funciona:

1. **A cena** — a situação concreta em que o problema aparece. Nome, número, hora
   do dia. Não "muitas empresas enfrentam"
2. **Por que a saída óbvia falha** — é aqui que o texto ganha o direito de continuar
3. **A tese, defendida** — com o mecanismo, não com adjetivo
4. **O que fazer segunda de manhã** — concreto o bastante para a pessoa fazer

Regras: uma ideia por parágrafo, sem subtítulo decorativo, e **nenhum número que
você não tenha**. Estatística inventada é a forma mais rápida de perder um leitor
que entende do assunto.

## Passo 3 — o carrossel

Chame a skill `carrossel` com a mesma tese. **Ele não resume o texto** — ele pega
**um** movimento do argumento e o desenvolve visualmente.

Resumo de artigo em carrossel sai raso, porque cabe menos e tenta caber tudo.
Escolha a parte mais forte, geralmente o "por que a saída óbvia falha", e deixe o
resto no texto.

## Passo 4 — as legendas

Uma por rede, e **diferentes de verdade** — não a mesma com hashtag trocada:

- **Instagram:** primeira linha para o corte, resto sem link. Uma pergunta no fim
- **LinkedIn:** a cena do texto longo, contada em primeira pessoa. Sem emoji
- **Facebook:** a mais direta e a mais curta. É onde o link funciona

Nunca "link na bio" sem dizer o que a pessoa ganha clicando.

## Passo 5 — entregar

Crie `conteudo-<tema>-<AAAA-MM-DD>/` com o texto, a pasta do carrossel e as
legendas em arquivos separados. Mostre a tese no topo — é o que amarra tudo, e é
por ela que se confere se as peças ficaram coerentes.

## Nunca

- **Não escreva sem tese aprovada.** É o passo que a pressa mata primeiro
- **Não repita a mesma frase de efeito** nas quatro peças. Quem te segue nas quatro
  vê a repetição, e ela lê como preguiça
- **Não invente número, estudo ou caso.** Se não tem dado, defenda pelo mecanismo
- **Não publique nada.** Você produz; publicar é outra skill, e é decisão da pessoa
