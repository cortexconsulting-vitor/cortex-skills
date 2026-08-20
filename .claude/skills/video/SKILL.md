---
name: video
description: Edita vídeo pela linha de comando com ffmpeg — corta trechos, transforma horizontal em vertical para Reels e TikTok, junta clipes, tira capa e aplica legenda. Não precisa de editor nem de assinatura. Use quando a pessoa disser "corta esse vídeo", "transforma em vertical", "faz um Reels disso", "junta esses clipes", "tira uma capa", "coloca legenda", ou /video.
---

# Vídeo

Um script em cima do ffmpeg. Ele existe para você **não montar filtro de ffmpeg
de cabeça**: filtro escrito no improviso erra calado — sai vídeo esticado, áudio
fora de sincronia, legenda invisível — e ninguém percebe até publicar.

## Passo 0 — o ffmpeg existe?

```bash
ffmpeg -version
```

Se não existir, **mostre o comando e deixe a pessoa instalar**:

| Sistema | Comando |
|---|---|
| macOS | `brew install ffmpeg` |
| Ubuntu/Debian | `sudo apt install ffmpeg` |
| Windows | `winget install Gyan.FFmpeg` |

Não instale por conta própria: é download grande na máquina dela.

## Passo 1 — sempre `info` primeiro

```bash
node video.js info <arquivo>
```

Devolve resolução, duração, fps, se tem áudio e se é horizontal ou vertical.

**Nunca corte às cegas.** Pedir "corta o começo" sem saber que o vídeo tem 4
minutos e não 40 produz o corte errado, e a pessoa só descobre assistindo.

## Passo 2 — as operações

```bash
node video.js cortar   <entrada> <saida> <inicio> <fim>
node video.js vertical <entrada> <saida> [desfoque|corte]
node video.js juntar   <saida> <clipe1> <clipe2> ...
node video.js capa     <entrada> <saida.jpg> [segundo]
node video.js legenda  <entrada> <saida> <arquivo.srt>
node video.js legenda-embutida <entrada> <saida> <arquivo.srt>
```

Tempo aceita `90`, `1:30` ou `00:01:30`.

**`vertical` tem dois modos, e a escolha é de conteúdo:**

- **`desfoque`** (padrão) — o vídeo inteiro cabe no meio, com fundo borrado em
  cima e embaixo. Use quando **nada pode ser cortado**: slide, tela compartilhada,
  gráfico, texto na imagem
- **`corte`** — amplia até preencher a tela e corta as laterais. Use quando há
  **uma pessoa centralizada**. Fica muito melhor que o desfoque, e destrói
  qualquer coisa que esteja nas bordas

Na dúvida, gere os dois e mostre. São segundos.

## Passo 3 — a ordem importa

Cada operação recodifica o vídeo, e recodificar duas vezes perde qualidade que
não volta. **Corte antes de tudo**, para as operações seguintes rodarem em um
arquivo curto.

Ordem que funciona: `cortar` → `vertical` → `legenda` → `capa`.

Nunca faça `vertical` num vídeo de 40 minutos para depois cortar 30 segundos dele.

## Passo 4 — legenda

```bash
node video.js legenda <entrada> <saida> <legenda.srt> [marca.json]
```

**A legenda é desenhada pelo navegador, não pelo ffmpeg.** O filtro `subtitles` do
ffmpeg exige a biblioteca libass compilada dentro da build, e muita instalação não
tem — a do Homebrew testada em 20/08/2026 não tinha. Aqui o Chromium desenha o
texto, do mesmo jeito que o carrossel desenha os slides, e o ffmpeg só sobrepõe
imagem. Funciona em qualquer build.

**Passe o `marca.json`** e a legenda sai com a fonte e a cor da empresa. Sem ele,
branco com contorno preto, que é legível sobre qualquer fundo.

Exige `npm install` uma vez dentro da pasta da skill — é o Chromium que desenha.
Acima de 200 falas o script para: a cadeia de filtros fica lenta demais.

**`legenda-embutida` é outra coisa** e quase nunca é o que se quer: grava como
faixa do arquivo, e **Instagram, TikTok e Reels não mostram**. Serve para YouTube,
player de site e arquivo de entrega.

Este script **não transcreve áudio**. Ele aplica um `.srt` que já existe. Se não
houver, peça — ou veja a `claude-video` no `EXTENSOES.md`, que transcreve.

## Nunca

- **Não invente marca de tempo.** Se a pessoa disse "corta a parte boa", pergunte
  onde ela começa. Você não assistiu ao vídeo
- **Não recodifique em cadeia** sem necessidade. Cada volta perde qualidade
- **Não instale o ffmpeg** por conta própria
- **Não sobrescreva o original.** Saída sempre em arquivo novo — vídeo bruto
  costuma ser a única cópia que existe
- **Não entregue `legenda-embutida`** quando o pedido era vídeo para Reels
