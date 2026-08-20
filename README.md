# Cortex Skills

**Produto em formação.** Duas skills prontas, escritas do zero.

| Skill | Estado |
|---|---|
| `skills/instalar` | **Funcionando.** Entrevista de 5 perguntas, grava a memória, confere dependências e prova com uma peça de teste |
| `skills/carrossel` | **Funcionando.** Motor autoral, marca do comprador por parâmetro, 3 estilos |

Duas camadas em toda skill — `SKILL.md` para a máquina, `GUIA.md` para a pessoa.
A convenção completa está em [`CONVENCAO.md`](CONVENCAO.md).

## Como instalar

Na pasta onde você vai trabalhar:

```bash
mkdir -p .claude/skills marca
cp -R /caminho/para/cortex-skills/skills/* .claude/skills/
cp /caminho/para/cortex-skills/marca/marca.exemplo.json marca/
```

Depois, no Claude Code, rode:

```
/instalar
```

A cópia é um comando porque tem que ser: a skill de instalação não consegue se
instalar sozinha. Feita a cópia, ela cuida do resto.

**Uma pasta por marca.** A memória é lida do workspace em que você está. Quem
atende vários clientes faz uma pasta por cliente — nenhuma marca vaza pra outra.

## O contrato de memória

O que separa isto de um `git clone` qualquer: toda skill procura
`marca/marca.json` antes de abrir a boca. Achou, usa e não pergunta nada. Não
achou, entrevista e oferece gravar.

Por isso cada skill funciona copiada sozinha, **e** o conjunto se comporta como
sistema. A regra completa está em [`CONVENCAO.md`](CONVENCAO.md).

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
