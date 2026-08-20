---
name: instalar
description: Deixa o Cortex Skills pronto para uso no workspace. Conversa cinco perguntas com a pessoa, grava a identidade dela onde todas as skills leem, confere o que falta na máquina e fecha com uma peça de teste. Use quando a pessoa acabou de copiar as skills, ou disser "instalar", "configurar", "primeiro uso", "acabei de baixar", "/instalar" — e também quando outra skill não encontrar a marca.
---

# Instalar

Esta skill não copia arquivo. Ela faz o que só ela pode fazer: **preencher a
memória que todas as outras skills leem**, e provar que o conjunto funciona.

## Passo 0 — leia antes de perguntar

Nunca pergunte o que você consegue descobrir sozinho.

1. **Liste a pasta de skills instaladas** — `.claude/skills/` no workspace, ou
   `~/.claude/skills/` se a instalação foi global. É isso que a pessoa tem em mãos.
   Se não achar nenhuma das duas, ela ainda não copiou as skills: mostre o comando
   do `README.md` do repositório e pare aqui.
2. **Procure a marca**, na ordem do contrato: `marca/marca.json` no workspace,
   `marca.json` na pasta, `~/.claude/cortex-.claude/skills/marca.json` no global.

**Se já existir marca em qualquer um dos três, não refaça a entrevista.** Diga
**de onde** ela veio, mostre o que está gravado e pergunte uma coisa só:

> "Já tem marca configurada aqui: **\<nome\>**, \<handle\>, estilo \<estilo\>.
> Quer manter, ajustar algum campo, ou refazer do zero?"

Ajustar é o caminho comum. Refazer do zero só se ela pedir com essas palavras.

## Passo 1 — a entrevista

Cinco perguntas. **Uma por vez, esperando a resposta.** Não despeje as cinco de
uma vez e não invente resposta que a pessoa não deu.

1. **"Qual é a empresa e o que ela faz?"** — vira `nome` e `descritor`. O
   descritor tem que caber em quatro ou cinco palavras: é rodapé, não slogan.
2. **"Quem lê o que você publica?"** — vira `publico`. Decide vocabulário, não
   cor. "Dono de PME que não é técnico" e "diretor de arte" pedem textos
   diferentes da mesma empresa.
3. **"Tem cor de marca?"** — se souber os códigos, peça. Se não souber, pergunte
   qual sensação a marca tem que passar: **séria e sóbria**, **leve e clara**,
   ou **direta e enérgica** — e use a resposta pra escolher o estilo.
4. **"Tem logo?"** — se tiver SVG, peça o caminho e extraia o `d` do path
   principal. Se não tiver, siga sem: o rodapé funciona só com o handle. **Não
   desenhe um logo.**
5. **"Qual o @ e onde você publica?"** — vira `handle`.

### Escolhendo o estilo

Leia `estilos/` dentro da pasta da skill de carrossel. Cada arquivo tem um campo
`quando` dizendo pra que serve. Case com a resposta 3:

| Sensação | Estilo |
|---|---|
| Séria e sóbria | `escuro-editorial` |
| Leve e clara | `claro-minimo` |
| Direta e enérgica | `alto-contraste` |

**Proponha e confirme antes de gravar.** Se a pessoa deu cores próprias, use as
dela e mantenha o resto da predefinição — trocar a paleta inteira por três cores
soltas quebra o contraste que o molde depende.

## Passo 2 — gravar e mostrar

Antes de gravar, **pergunte onde** — é a decisão que define o resto do uso:

> "Essa marca é tua, ou é de um cliente que você atende?
>
> Se for tua, eu guardo em `~/.claude/cortex-.claude/skills/marca.json` e ela vale em
> **qualquer pasta** que você abrir. Se for de cliente, guardo em `marca/marca.json`
> aqui nesta pasta — e cada cliente fica na pasta dele, sem misturar."

Grave seguindo o esquema de `marca/marca.exemplo.json`, criando a pasta se preciso.

**Mostre o que gravou**, campo a campo, e diga onde ficou:

> "Gravei em `<caminho>`. Nenhuma outra skill vai te perguntar isso de novo."

Se a pessoa versiona o workspace, avise que esse arquivo é o contexto de negócio
dela, não o produto — e que ela provavelmente quer ignorá-lo no Git.

## Passo 2b — o negócio, se ela quiser

A identidade já basta para o carrossel e para a proposta. Para as skills que
**escrevem texto**, falta saber o que a empresa faz.

Ofereça, uma vez, sem insistir:

> "Já dá pra usar tudo assim. Se você me contar em cinco linhas o que a empresa
> vende e pra quem, as skills que escrevem texto param de sair genéricas. Quer
> fazer agora ou depois?"

**Se aceitar**, escute e escreva `negocio.md` você mesmo, no molde de
`negocio.exemplo.md` — não mande a pessoa preencher formulário. Ela fala, você
organiza. Duas perguntas bastam:

1. **"O que você vende, e pra quem?"**
2. **"O que você não faz, que os clientes vivem pedindo?"** — a segunda vale mais
   que a primeira, porque é o que impede as skills de prometerem o que você não
   entrega

`foco.md` é para depois, não para a instalação. Prioridade se escreve quando existe.

**Se recusar, siga sem.** Nenhuma skill para por falta desses arquivos, e
insistir na instalação é o jeito mais rápido de a pessoa abandonar no meio.

## Passo 3 — conferir as dependências

Não embale ferramenta de terceiro. **Confira e instrua.**

Para cada skill instalada, leia o `GUIA.md` dela e veja se declara dependência.
Hoje:

| Skill | Precisa | Como conferir |
|---|---|---|
| `carrossel` | Node + `puppeteer` | `node --version` e procurar `node_modules/puppeteer` |
| `proposta` | Node, só isso | `node --version` |
| `publicar-tema` | o mesmo do `carrossel` | idem |
| `video` | FFmpeg (e `npm install` na pasta, só para legendar) | `ffmpeg -version` |
| as demais | nada | — |

**A legenda do `video` não depende da build do ffmpeg** — quem desenha o texto é o
Chromium, não o ffmpeg. O que ela precisa é do `npm install` dentro da pasta da
skill, e só na primeira vez que alguém for legendar.

O que faltar, **mostre o comando e deixe a pessoa rodar**. Não instale pacote por
conta própria: é download grande na máquina dela, e a decisão é dela.

Se algum `GUIA.md` declarar dependência com licença comercial, **diga o limite em
voz alta** — não deixe a pessoa descobrir isso depois de construir em cima.

## Passo 4 — provar que funciona

Instalação que termina em "pronto!" sem nada rodando não provou nada.

Ofereça fechar o ciclo:

> "Quer que eu faça um carrossel de teste agora, com a tua marca? É o jeito de
> ver se ficou do jeito que você quer antes de valer pra um post de verdade."

Se ela aceitar, chame a skill de carrossel com um tema que ela mesma dê. **Ela já
vai encontrar `marca/marca.json` e não vai perguntar nada** — e é exatamente isso
que a pessoa precisa ver acontecendo.

Se ela recusar, tudo bem. Termine dizendo o que existe e como se chama:

> "Tudo configurado. Você tem: \<lista das skills\>. Cada uma tem um `GUIA.md`
> do lado explicando quando usar e, mais importante, quando não usar."

## Nunca

- **Não refaça a entrevista se a marca já existe.** Perguntar duas vezes a mesma
  coisa é o defeito que o contrato de memória existe pra evitar
- **Não invente cor, público ou descritor** que a pessoa não deu. Campo vazio é
  honesto; campo inventado vira post errado com a cara dela
- **Não instale dependência sem autorização.** Mostre o comando
- **Não declare instalado o que você não viu funcionar.** Se o teste do Passo 4
  não rodou, diga que não rodou
