# Guia — Instalar

## Pra que serve

Você responde cinco perguntas sobre a sua empresa **uma vez**, e todas as skills
do pacote passam a sair com a sua cara — sua cor, seu @, seu jeito — sem você
configurar nada de novo.

## Quando usar e quando não usar

**Use** logo depois de copiar as skills para o seu workspace, antes de qualquer
outra coisa. E use de novo quando a marca mudar de verdade: cor nova, nome novo,
@ novo.

**Não use** para:

- **Copiar as skills pro lugar certo.** Ela não faz isso. O comando de cópia está
  no `README.md` do repositório, e é ele que vem primeiro — esta skill só roda
  depois que ela mesma já está instalada
- **Trocar de cliente no meio do caminho.** Se você atende várias empresas, não
  reinstale por cima. **Uma pasta por cliente**, cada uma com a sua `marca/`.
  Sobrescrever a marca é como você acaba postando com a cor errada
- **Ajustar uma coisinha.** Se é só a cor do acento, edite `marca/marca.json`
  direto. É mais rápido que a entrevista inteira

## O que esperar

Uma conversa de dois minutos, e no fim um arquivo: `marca/marca.json`.

Você vai ver o conteúdo dele campo a campo antes de qualquer outra coisa
acontecer — nome, descritor, público, handle, estilo, paleta, fontes, logo.

Depois ela confere se as ferramentas que as skills precisam estão na máquina
(hoje é Node e `puppeteer`, para o carrossel) e **te mostra o comando** do que
faltar, em vez de instalar por conta própria.

Se você aceitar, ela fecha com um carrossel de teste. Aí você vê a sua marca
saindo em PNG antes de valer pra um post de verdade.

## O erro comum

**Achar que instalou porque a conversa terminou bem.**

A entrevista pode ir lisa, o arquivo pode ser gravado certo, e o carrossel ainda
assim não rodar — porque o `puppeteer` não está instalado. São coisas separadas:
uma é a memória, a outra é a ferramenta.

Por isso o Passo 4 existe. **Rode o teste.** Se você pulou o teste, você tem uma
marca configurada e nenhuma prova de que o resto funciona.

O segundo erro, mais caro: **responder a pergunta 3 no chute.** "Ah, bota
qualquer cor." A cor decide o estilo inteiro da peça, e trocar de estilo depois
de publicar cinco posts significa um feed com duas caras. Se você não tem cor
definida, responda a sensação — séria, leve ou enérgica. Essa resposta é melhor
que um código hexadecimal chutado.

## Como ajustar

**1. Editar direto em vez de reinstalar.** `marca/marca.json` é texto simples.
Mudou o @? Abra e troque. Não precisa de skill pra isso.

**2. Trocar o estilo sem perder as cores.** O campo `estilo` e o bloco `paleta`
são independentes. Você pode manter a sua paleta e mudar só o `estilo`, ou o
contrário. Rode um carrossel de teste depois — é barato e mostra na hora.

**3. Uma marca por pasta.** Esse é o ajuste que mais importa e o menos óbvio. A
memória é lida da pasta em que você está trabalhando. Se você tem três clientes,
tenha três pastas, cada uma com a sua `marca/marca.json`. Nenhuma vaza pra outra.
