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

## Passo 4 — legenda, e o limite honesto

**Legenda queimada exige um ffmpeg compilado com libass.** Nem toda instalação tem
— a do Homebrew em 20/08/2026 não tinha. O script **detecta e para**, com o
comando da build correta.

`legenda-embutida` funciona em qualquer build, mas grava a legenda como **faixa do
arquivo**, não desenhada na imagem. **Instagram, TikTok e Reels não mostram
legenda assim.** Serve para YouTube, player de site e arquivo de entrega.

Se a pessoa quer Reels legendado e a build não queima, **diga isso** em vez de
entregar o embutido como se resolvesse.

Este script **não transcreve áudio**. Ele aplica um `.srt` que já existe. Se não
houver, peça — ou a pessoa gera em outro lugar e volta.

## Nunca

- **Não invente marca de tempo.** Se a pessoa disse "corta a parte boa", pergunte
  onde ela começa. Você não assistiu ao vídeo
- **Não recodifique em cadeia** sem necessidade. Cada volta perde qualidade
- **Não instale o ffmpeg** por conta própria
- **Não sobrescreva o original.** Saída sempre em arquivo novo — vídeo bruto
  costuma ser a única cópia que existe
- **Não entregue `legenda-embutida`** quando o pedido era vídeo para Reels
