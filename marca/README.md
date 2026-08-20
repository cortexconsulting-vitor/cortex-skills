# marca/ — a memória do comprador

Esta pasta é o que faz o Cortex Skills ser um sistema operacional e não um
catálogo. Ela guarda **a identidade de quem comprou**, uma vez só, para todas
as skills lerem.

## O que mora aqui

| Arquivo | O que é | Obrigatório |
|---|---|---|
| `marca.json` | Identidade e voz. Esquema em [`marca.exemplo.json`](marca.exemplo.json) | **Sim** |
| `negocio.md` | O que a empresa faz e vende. Molde em [`negocio.exemplo.md`](negocio.exemplo.md) | Não |
| `foco.md` | Prioridades do momento. Molde em [`foco.exemplo.md`](foco.exemplo.md) | Não |

Sem os dois `.md` as skills continuam funcionando — só saem mais genéricas.
Nenhuma para por falta deles.

**Esta pasta é a marca deste workspace.** Se a marca é sua e vale em qualquer
pasta que você abrir, o lugar dela é `~/.claude/cortex-.claude/skills/marca.json`, e o
esquema é o mesmo. O local vence o global: uma pasta com `marca/marca.json`
própria ignora a global — é assim que se atende vários clientes sem misturar.

**Este arquivo não vem preenchido.** Ele nasce de uma de duas formas:

1. Você roda a skill de instalação, responde a entrevista e ela grava aqui
2. Você copia o `marca.exemplo.json` para `marca.json` e edita à mão

## Por que isso importa

Sem esta pasta, cada skill pergunta as mesmas cinco coisas de novo — e as
respostas se contradizem entre elas. Com ela, você responde uma vez e toda skill
nova que você instalar já sai com a sua cara.

## Se você só quer uma skill

Não precisa desta pasta nem da global. Toda skill do repositório funciona copiada sozinha:
quando não encontra `marca/marca.json`, ela faz a própria entrevista curta. A
memória compartilhada melhora o pacote, não é pré-requisito dele.

A regra completa está em [`../CONVENCAO.md`](../CONVENCAO.md), na seção
"Contrato de memória".

## Isto não vai para o Git

Se você versionar seu workspace, considere ignorar `marca/marca.json`. É o seu
contexto de negócio, não o produto.
