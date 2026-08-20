# Cortex Skills

**Produto em formação.** Duas skills prontas, escritas do zero.

| Skill | Estado |
|---|---|
| `skills/instalar` | **Funcionando.** Entrevista de 5 perguntas, grava a memória, confere dependências e prova com uma peça de teste |
| `skills/carrossel` | **Funcionando.** Motor autoral, marca do comprador por parâmetro, 3 estilos |

Duas camadas em toda skill — `SKILL.md` para a máquina, `GUIA.md` para a pessoa.
A convenção completa está em [`CONVENCAO.md`](CONVENCAO.md).

## Como instalar

### Em todas as pastas (recomendado)

As skills ficam disponíveis em **qualquer pasta** que você abrir no Claude Code —
terminal, app ou extensão do VS Code, que leem o mesmo lugar:

```bash
mkdir -p ~/.claude/skills
rsync -a --exclude node_modules /caminho/para/cortex-skills/skills/ ~/.claude/skills/
```

### Só num projeto

Quando as skills têm que valer só ali — um cliente, um repositório específico:

```bash
mkdir -p .claude/skills
rsync -a --exclude node_modules /caminho/para/cortex-skills/skills/ .claude/skills/
```

### Depois, em qualquer um dos dois

No Claude Code, rode:

```
/instalar
```

A cópia é um comando porque tem que ser: a skill de instalação não consegue se
instalar sozinha. Feita a cópia, ela cuida do resto — entrevista, memória e teste.

É `rsync` e não `cp` por um motivo: o motor do carrossel acumula 29 MB de
`node_modules` compilado pra uma máquina só. Ele não pode viajar junto — cada
instalação roda o seu `npm install`, e a skill de instalação avisa quando falta.

### Sobre o Codex e outras ferramentas

`.claude/skills/` é o formato do Claude Code. **O Codex não lê essa pasta** e não
vai encontrar estas skills copiando-as para lá. Fazer o mesmo conjunto valer no
Codex é uma ponte separada, ainda não construída — e não está prometida aqui.

## Uma marca, ou uma por cliente

A memória segue quem você é:

- **Marca sua**, em qualquer pasta → `~/.claude/cortex-skills/marca.json`
- **Marca de um cliente**, só naquela pasta → `marca/marca.json`

O local vence o global. Quem atende dez clientes faz dez pastas, e nenhuma marca
vaza pra outra.

## O contrato de memória

O que separa isto de um `git clone` qualquer: **toda skill procura a marca antes
de abrir a boca** — na pasta, depois no global. Achou, usa e não pergunta nada.
Não achou, entrevista e oferece gravar.

Por isso cada skill funciona copiada sozinha, o conjunto se comporta como sistema,
e você responde a entrevista **uma vez na vida** em vez de uma vez por pasta. A
ordem completa está em [`CONVENCAO.md`](CONVENCAO.md).

## Fontes autorais candidatas

Duas linhas de trabalho divergentes estão preservadas, separadas e intactas:

- `../../operacao/.claude/skills` — 15 skills, 13 modificadas em relação ao original
- `../../laboratorio/legado-cortex-os/.claude/skills` — 15 skills, 14 modificadas, divergentes das anteriores

**Nenhuma linha canônica foi escolhida.** As duas não devem ser mescladas antes dessa decisão.

Elas servem como **inventário de ideias**, não como fonte de arquivo. Toda skill
daqui é reescrita do zero — é o que mantém o produto distribuível.

## Redistribuição bloqueada

Ambas as linhas derivam do MazyOS (`github.com/mazzeoia/MazyOS`), que não publica arquivo de
licença. Sem licença explícita vale copyright padrão: não há concessão de uso, modificação ou
redistribuição a terceiros. **Nada daqui pode ser vendido ou redistribuído antes da auditoria de
licença.** O registro de origem está em `../../laboratorio/legado-cortex-os/ATRIBUICAO.md`.

As skills deste repositório foram escritas do zero e não derivam de lá — mas isso
precisa ser **auditado arquivo a arquivo antes da primeira venda**, não presumido.

## Skills globais não são produto

As skills em `~/.claude/skills` (12 do `remotion-dev` e `composio-cli`) são **dependências de
terceiros** instaladas na máquina. Não são autoria própria e não integram este produto.
