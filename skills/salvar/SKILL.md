---
name: salvar
description: Guarda o trabalho no Git sem que a pessoa precise saber Git. Confere o que mudou, separa em commits por assunto, barra segredo e envia só depois de um sim explícito. Monta o endereço remoto quando ainda não existe. Use quando a pessoa disser "salvar", "salva isso", "commit", "sobe pro github", "faz backup", "guarda o trabalho", ou /salvar.
---

# Salvar

Salvar não é `git add .`. É separar o que mudou, verificar o que não pode subir, e
mandar só isso.

## Passo 1 — olhar antes de tocar

```bash
git status --porcelain
git diff --stat
git branch --show-current
```

Se não for repositório, pergunte se quer criar um. **Não crie por conta própria** —
`git init` numa pasta errada bagunça o que estava organizado.

Se estiver na branch principal e a mudança for grande, ofereça criar branch. Não
imponha.

## Passo 2 — o que NÃO pode subir

Antes de encenar qualquer coisa, procure nos arquivos modificados:

- `.env`, `.env.*`, `credentials`, `*.pem`, `*.key`, `id_rsa`
- Qualquer arquivo com `senha`, `token`, `secret`, `api_key`, `password` no conteúdo
- `node_modules/`, `dist/`, `build/`, `__pycache__/`
- **`marca.json` com dados reais**, se o repositório for público
- Export, planilha ou backup com dado de cliente

Se achar, **pare e mostre**. Não encene, não commite, não pergunte "posso incluir?".
Diga o que é, onde está, e proponha o `.gitignore`.

**Segredo que entra no Git não sai.** Reescrever histórico é caro e falha; a hora de
pegar é agora.

## Passo 3 — commits por assunto, não por sessão

Agrupe as mudanças pelo que elas são. Um commit por assunto, mesmo que dê quatro.

**Encene por caminho, nunca `git add .`.** `git add .` varre trabalho de outra etapa
que estava pendente na pasta e mistura tudo num commit que ninguém consegue reverter
depois.

Antes de commitar, mostre o que está encenado e o que ficou de fora:

```bash
git diff --cached --stat
git status --porcelain
```

**Mensagem:** uma linha dizendo o que mudou na prática, em português, no presente.
"corrige o valor que vinha zerado na proposta" vale mais que "fix bug". Se o motivo
não for óbvio pelo diff, acrescente um parágrafo com o porquê — não com o quê.

## Passo 4 — enviar, com aprovação

**Push exige um sim explícito.** Mostre o que vai subir, para onde, e espere:

> "3 commits prontos pra subir em `origin/main`. Envio?"

Se não houver remoto, pergunte o endereço. **Não crie repositório remoto por conta
própria** — isso é conta de terceiro e decisão de quem publica.

Depois do push, confirme com o que aconteceu de fato, não com "pronto!":

```bash
git log --oneline -3
git status -sb
```

## Nunca

- **Nunca `git add .`**
- **Nunca faça push sem sim explícito** — nem "só dessa vez", nem quando o usuário
  já autorizou um push antes. Autorização é por vez
- **Nunca commite segredo**, mesmo se a pessoa pedir. Mostre o risco e ofereça o
  `.gitignore`
- **Nunca reescreva histórico** (`push --force`, `rebase` em branch compartilhada)
  sem a pessoa pedir com essas palavras
- **Nunca diga que subiu** sem ter visto o comando terminar
