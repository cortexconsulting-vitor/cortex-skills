---
name: ajuda
description: Mostra o que está instalado e diz qual skill resolve o que a pessoa quer fazer agora. Serve para quem acabou de instalar e não sabe por onde começar, e para quem esqueceu o nome da que precisa. Use quando alguém disser "o que eu posso fazer aqui", "que skills eu tenho", "como funciona isso", "por onde começo", "qual skill usa pra", "me ajuda", ou /ajuda.
---

# Ajuda

Quem acabou de instalar não quer a lista completa. Quer saber **o que fazer agora**.

## Passo 1 — leia o que está instalado, não a lista de cabeça

Liste as pastas em `.claude/skills/` (ou `~/.claude/skills/`) e leia o `name` e a
`description` de cada `SKILL.md`.

**Nunca cite uma skill de memória.** Este produto muda de versão, e prometer uma
skill que a pessoa não tem é o jeito mais rápido de perder a confiança dela na
primeira tentativa. Só existe o que está na pasta.

Se houver skills de terceiro instaladas junto (Remotion, por exemplo), **separe-as
das nossas** e diga que são de outro autor.

## Passo 2 — agrupe por trabalho, nunca em ordem alfabética

Lista alfabética é índice, não ajuda. Agrupe pelo que a pessoa está tentando fazer:

| Ela quer | Vá para |
|---|---|
| Postar conteúdo | `publicar-tema`, `carrossel`, `video` |
| Falar com cliente | `resposta-cliente`, `escrever-email`, `avaliacoes` |
| Vender | `proposta` |
| Cuidar do sistema | `abrir`, `salvar`, `atualizar`, `instalar` |

Use os grupos que fizerem sentido para o que **está instalado de fato**. Duas ou
três linhas por grupo, no máximo.

## Passo 3 — a pergunta que resolve

Se a pessoa disse o que quer ("preciso responder um cliente puto"), **pule a lista
inteira** e vá direto:

> "Isso é a `resposta-cliente`. Cola a mensagem aqui que eu escrevo."

A lista é para quem não sabe o que quer. Quem sabe merece a resposta, não o índice.

## Passo 4 — o modelo mental, em três linhas

Só quando for a primeira vez da pessoa, e só se ela não estiver com pressa:

1. **A memória** — você respondeu uma vez no `/instalar`; toda skill lê de lá e não
   pergunta de novo
2. **Cada skill tem um `GUIA.md` do lado** — escrito para você, não para a máquina.
   A parte mais útil dele é o "quando **não** usar"
3. **Nenhuma skill publica, envia ou compra nada.** Elas produzem; quem aperta o
   botão é você

## Passo 5 — uma sugestão, não um convite vago

Termine com algo executável agora:

> "Se quiser ver funcionando em dois minutos: me dá um tema que você explica sempre
> pro cliente, que eu faço o carrossel."

Não termine com "é só pedir!". Isso devolve para a pessoa o trabalho de descobrir o
que pedir — que é exatamente por que ela chamou a ajuda.

## Nunca

- **Não invente skill que não está instalada**
- **Não despeje as onze de uma vez.** Três ou quatro que sirvam ao que ela disse
- **Não explique o funcionamento interno.** Ninguém pediu arquitetura
- **Não venda o produto para quem já comprou**
