# marca/ — a memória do comprador

Esta pasta é o que faz o Cortex Skills ser um sistema operacional e não um
catálogo. Ela guarda **a identidade de quem comprou**, uma vez só, para todas
as skills lerem.

## O que mora aqui

`marca.json` — nome, handle, descritor, estilo, paleta, fontes, logo, público.
O esquema canônico está em [`marca.exemplo.json`](marca.exemplo.json).

**Este arquivo não vem preenchido.** Ele nasce de uma de duas formas:

1. Você roda a skill de instalação, responde a entrevista e ela grava aqui
2. Você copia o `marca.exemplo.json` para `marca.json` e edita à mão

## Por que isso importa

Sem esta pasta, cada skill pergunta as mesmas cinco coisas de novo — e as
respostas se contradizem entre elas. Com ela, você responde uma vez e toda skill
nova que você instalar já sai com a sua cara.

## Se você só quer uma skill

Não precisa desta pasta. Toda skill do repositório funciona copiada sozinha:
quando não encontra `marca/marca.json`, ela faz a própria entrevista curta. A
memória compartilhada melhora o pacote, não é pré-requisito dele.

A regra completa está em [`../CONVENCAO.md`](../CONVENCAO.md), na seção
"Contrato de memória".

## Isto não vai para o Git

Se você versionar seu workspace, considere ignorar `marca/marca.json`. É o seu
contexto de negócio, não o produto.
