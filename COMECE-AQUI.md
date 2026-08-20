# Comece aqui

Leia isto uma vez. São cinco minutos, e economizam a semana em que você ia
descobrir sozinho.

## O que é

Um conjunto de skills para o Claude Code. Cada uma faz **um** trabalho de empresa
pequena — carrossel, proposta, resposta a cliente, email, avaliação, vídeo — usando
a sua marca e o seu jeito de falar.

Não é um aplicativo. Você conversa, e as coisas saem em arquivo.

## Os três minutos

**1.** No Claude Code, peça:

> Clona o https://github.com/cortexconsulting-vitor/cortex-skills.git na pasta atual, entra nela e roda o `/instalar`.

Ou pelo terminal:

```bash
git clone https://github.com/cortexconsulting-vitor/cortex-skills.git
cd cortex-skills
```

**2.** Digite:

```
/instalar
```

Responda cinco perguntas sobre a sua empresa. Elas ficam gravadas.

**3.** Faça uma coisa de verdade. Não leia a lista — **use uma skill**:

```
/carrossel
```

Dê um tema que você explica sempre pro cliente. Em poucos minutos você tem os
slides em PNG com a sua cor.

Pronto. Você já entendeu o sistema. O resto é repetir com outras skills.

## O modelo mental, inteiro

Três coisas, e nenhuma outra:

**A memória.** Você respondeu uma vez no `/instalar`. Toda skill lê de lá e não
pergunta de novo. Se ela perguntar duas vezes a mesma coisa, é defeito — reclame.

**Duas camadas por skill.** O `SKILL.md` é o que a máquina executa. O `GUIA.md` é
escrito para **você** — e a parte mais valiosa dele é a seção **"quando não usar"**.
É lá que está o que a skill não faz, que é o que frustra na primeira tentativa.

**Nada sai sem você.** Nenhuma skill publica, envia email, posta, compra ou aperta
botão. Elas produzem o arquivo e param. Quem decide é você, sempre.

## O que existe, por tipo de trabalho

| Você quer | Chame |
|---|---|
| Transformar uma ideia em conteúdo completo | `/publicar-tema` |
| Só um carrossel | `/carrossel` |
| Cortar vídeo, virar vertical pro Reels | `/video` |
| Responder mensagem de cliente | `/resposta-cliente` |
| Escrever um email que você inicia | `/escrever-email` |
| Responder avaliação do Google | `/avaliacoes` |
| Montar proposta comercial | `/proposta` |
| Começar a sessão sabendo onde parou | `/abrir` |
| Guardar o trabalho no Git | `/salvar` |
| Corrigir a memória depois que muito mudou | `/atualizar` |
| Analisar uma planilha ou export | `/analisar-dados` |
| Montar a pasta de um cliente novo | `/novo-projeto` |
| Criar uma skill sua, do que você repete | `/mapear-rotinas` |
| Conferir uma peça antes de publicar | `/revisar-post` |
| Aparecer no Google e nas IAs | `/seo` |
| Montar campanha no Google Ads | `/anuncio-google` |
| Saber como foram os anúncios da semana | `/relatorio-ads` |
| Descobrir qual skill usar | `/ajuda` |

Esqueceu? `/ajuda` lê o que está instalado e te diz.

## Uma marca, ou uma por cliente

A memória mora onde você está trabalhando:

- **A sua marca**, valendo em qualquer pasta → `~/.claude/cortex-skills/marca.json`
- **A marca de um cliente**, só naquela pasta → `marca/marca.json` dentro dela

O local vence o global. **Quem atende dez clientes faz dez pastas** — e nenhuma
marca vaza para a outra. É o jeito certo, e o único que não te faz postar na cor
errada às onze da noite.

## Os três erros que todo mundo comete

**1. Ler tudo antes de usar qualquer coisa.** Você lê onze descrições, não fixa
nenhuma e conclui que é complicado. Use **uma**, do começo ao fim. Depois as outras
dez fazem sentido sozinhas.

**2. Pular os `GUIA.md`.** Cada skill tem um do lado, e é curto. A seção "quando não
usar" economiza mais tempo que todo o resto junto.

**3. Escrever texto comprido demais** nos carrosséis e nas propostas. O molde é
generoso com espaço e não com texto. Quando o motor avisar que estourou, **corte o
texto** — não mexa na arte, ou aquela peça sai diferente de todas as outras.

## Quando algo não funcionar

| Sintoma | Quase sempre é |
|---|---|
| A skill não aparece quando você digita `/` | Reinicie o Claude Code |
| O carrossel não gera PNG | Falta o navegador. Na pasta `motor/`: `npm install` **e** `npx puppeteer browsers install chrome` |
| O vídeo não aceita legenda desenhada | Seu ffmpeg veio sem libass. Veja o `GUIA.md` da `video` |
| O texto sai genérico | Falta `marca/negocio.md`. Cinco linhas resolvem |
| Ela pergunta o que você já respondeu | Defeito. A memória não está sendo encontrada — rode `/ajuda` |

## Instalar coisas de fora

Skills de outros autores — Remotion e afins — não vêm aqui dentro, porque são obra
deles. [`EXTENSOES.md`](EXTENSOES.md) diz quais valem a pena, de onde vêm, quanto
custam e como instalar.

## Onde está escrito o resto

- [`README.md`](README.md) — instalação e o estado de cada skill
- [`CONVENCAO.md`](CONVENCAO.md) — as regras internas, se você for modificar algo
- `marca/README.md` — o que a memória guarda e por quê
