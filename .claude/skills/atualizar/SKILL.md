---
name: atualizar
description: Reconcilia a memória com a realidade da pasta. Varre o que existe de fato, compara com o que está escrito em marca.json, negocio.md e foco.md, e propõe as correções linha a linha. Use quando a pessoa disser "atualizar", "a memória tá desatualizada", "varre o projeto", "reconcilia", "mudou muita coisa aqui", ou /atualizar.
---

# Atualizar

Memória desatualizada é pior que memória vazia: vazia a pessoa percebe, desatualizada
ela confia.

## Passo 1 — o que existe de fato

Varra a pasta e junte evidência, sem tirar conclusão ainda:

- Pastas de trabalho e o que há dentro delas
- `git log --format="%ad %s" --date=short -30` — o que foi feito, e quando
- Arquivos tocados nos últimos 30 dias
- Nomes de cliente, projeto ou oferta que aparecem repetidos nos arquivos

## Passo 2 — comparar, campo a campo

Leia `marca.json`, `negocio.md` e `foco.md` e compare com a varredura. Procure três
coisas, nesta ordem de importância:

**Contradição** — a memória afirma algo que a pasta desmente. É o que mais estraga
resultado, porque as outras skills vão escrever em cima disso.

**Ausência** — existe na pasta e não está escrito. Cliente novo, oferta nova, projeto
que virou rotina.

**Resíduo** — está escrito e não existe mais. Prazo que passou, prioridade de um
trimestre encerrado, cliente que saiu.

## Passo 3 — propor, nunca reescrever

Mostre as mudanças **uma a uma**, com a evidência do lado:

> **`foco.md`, prioridade 2** — está escrito "lançar o site até 30/06".
> O site foi ao ar em 12/06 (commit `7cd6f0f`). Proponho remover.
>
> **`negocio.md`, ofertas** — não menciona "diagnóstico de 2 horas", que aparece em
> três propostas de julho. Proponho acrescentar.

**Toda proposta carrega a evidência.** Sem o arquivo, o commit ou a data que provam,
é palpite — e palpite não entra na memória.

Pergunte o que aplicar. **Aceite recusa sem argumentar de novo:** a pessoa sabe de
coisa que não está na pasta.

## Passo 4 — aplicar cirurgicamente

Só o que foi aprovado. **Edite a linha, não o arquivo.**

Reformatar o documento inteiro apaga o jeito de escrever da pessoa e transforma uma
correção de duas linhas num diff de duzentas, onde ninguém mais consegue ver o que
mudou de verdade.

No fim, mostre o diff do que você tocou.

## Quando não há o que mudar

Diga isso e pare. Uma linha:

> "Varri a pasta e a memória está batendo. Nada a corrigir."

**Não invente correção cosmética** para a varredura parecer produtiva. Reescrever
uma frase que já estava certa gasta o tempo da pessoa e a ensina a não confiar nas
tuas propostas.

## Nunca

- **Não reescreva arquivo inteiro**
- **Não proponha sem evidência.** Arquivo, commit ou data — sempre
- **Não apague o que você não entendeu.** Anotação que parece solta costuma ser
  decisão que você não viu ser tomada. Pergunte antes
- **Não mexa em `marca.json` para "melhorar" cor, tom ou descritor.** Aquilo é
  escolha, não erro. Só toque se a pasta provar que mudou
