# Guia — Vídeo

## Pra que serve

Corta, vira vertical pro Reels, junta clipes, tira capa e aplica legenda — pela
conversa, sem abrir editor e sem assinar nada.

## Quando usar e quando não usar

**Use** para as operações mecânicas que tomam tempo: transformar uma gravação
horizontal em vertical, tirar três cortes de uma live, juntar takes, gerar a capa.

**Não use** para:

- **Edição criativa.** Transição, trilha, correção de cor, motion graphics. Isso é
  editor de vídeo, e um editor de verdade faz melhor
- **Transcrever áudio.** Ela aplica um `.srt` que já existe; não gera legenda a
  partir da fala. Para isso existe a `claude-video`, no `EXTENSOES.md`
- **Escolher o trecho.** Ela não assistiu ao vídeo. Você diz o minuto
- **Arquivo enorme sem cortar antes.** Vertical num vídeo de 40 minutos leva o
  tempo de 40 minutos de vídeo

## O que esperar

Primeiro ela roda `info`: resolução, duração, fps, se tem áudio. É de onde saem as
decisões.

Depois a operação que você pediu, num arquivo **novo** — o original nunca é
sobrescrito.

Em `vertical`, dois modos: **desfoque** (o vídeo inteiro no meio, fundo borrado) e
**corte** (amplia e corta as laterais). Na dúvida ela gera os dois.

## Dependência

**FFmpeg.** Livre e gratuito. `brew install ffmpeg` no macOS,
`sudo apt install ffmpeg` no Ubuntu, `winget install Gyan.FFmpeg` no Windows.

Sem licença comercial, sem assinatura, sem conta.

**Para legendar**, além do ffmpeg é preciso rodar `npm install` uma vez dentro da
pasta da skill. É o Chromium que desenha o texto — o mesmo que gera os carrosséis.

Foi escolha: o jeito comum de queimar legenda usa uma biblioteca (libass) que muita
instalação de ffmpeg não traz, e a do Homebrew testada em 20/08/2026 não trazia.
Desenhando pelo navegador funciona em qualquer máquina, e a legenda ainda sai com a
**tua fonte e a tua cor** em vez de um branco genérico.

## O erro comum

**Fazer o vertical antes de cortar.**

Parece indiferente e não é, por dois motivos. O primeiro é tempo: você espera a
conversão do vídeo inteiro para usar trinta segundos dele. O segundo é qualidade —
cada operação recodifica, e recodificar duas vezes perde definição que não volta.

Ordem certa: **cortar → vertical → legenda → capa.**

O segundo erro é **escolher `corte` num vídeo de tela compartilhada**. O modo corte
amplia até preencher e devora as laterais — o que é ótimo com uma pessoa no meio do
quadro, e destrói um slide. Quando o conteúdo está espalhado pela tela, é
`desfoque`, sempre.

## Como ajustar

**1. O modo do vertical.** É a escolha que mais muda o resultado. Pessoa
centralizada → `corte`. Slide, tela, gráfico, texto → `desfoque`.

**2. O segundo da capa.** O padrão é 1s, que quase sempre pega a pessoa de olho
fechado ou o vídeo ainda escuro. Peça um segundo específico.

**3. Corte com folga.** Peça meio segundo a mais nas duas pontas. Corte no limite
exato da fala corta a última sílaba, e você só nota assistindo.
