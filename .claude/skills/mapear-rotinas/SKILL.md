---
name: mapear-rotinas
description: Descobre o que a pessoa repete toda semana e transforma as tarefas certas em skills novas, escritas sob medida para o negócio dela. Faz a entrevista, separa o que vale automatizar do que não vale, e cria as aprovadas com as duas camadas. Use quando alguém disser "o que dá pra automatizar", "criar uma skill", "eu faço isso toda semana", "quero uma skill pra", ou /mapear-rotinas.
---

# Mapear rotinas

O pacote vem com um conjunto fixo. Esta skill existe para o conjunto **deixar de ser
fixo** — é ela que transforma o produto no sistema da pessoa, não no nosso.

## Passo 0 — a memória

`marca.json` e `negocio.md`. Uma skill criada sem saber o que a empresa faz sai
genérica, e skill genérica a pessoa já tem: chama-se conversar com o Claude.

## Passo 1 — a entrevista, três perguntas

Uma por vez. **Não peça para a pessoa "listar suas tarefas repetitivas"** — ninguém
consegue responder isso no vácuo. Pergunte pelo concreto:

1. **"O que você fez essa semana que já tinha feito na semana passada, do mesmo
   jeito?"**
2. **"Qual tarefa você empurra com a barriga toda vez?"** — o que a pessoa adia é
   quase sempre o que mais dói, e o que mais paga automatizar
3. **"Tem alguma coisa que só você sabe fazer aí dentro?"** — vira skill e vira
   treinamento de quem entra depois

Se ela citar algo vago ("responder gente"), peça **um exemplo da semana passada**.
Skill se escreve a partir de um caso real, nunca de uma categoria.

## Passo 2 — separar o que vale

Nem toda repetição vira skill. Antes de propor, passe cada tarefa por quatro perguntas:

| Pergunta | Se a resposta for "não" |
|---|---|
| Acontece pelo menos toda quinzena? | Não vira skill. Vira anotação |
| O resultado é **texto, arquivo ou análise**? | Se é apertar botão em site, skill não resolve |
| Existe um jeito certo, que dá para escrever? | Se muda todo caso, é julgamento, não rotina |
| Errar é barato de corrigir? | Se errado custa caro, a skill assiste — não decide |

**Diga em voz alta o que você descartou e por quê.** É informação útil: a pessoa
para de tentar automatizar aquilo, e ganha confiança nas que você aprovou.

## Passo 3 — propor antes de escrever

Para cada tarefa aprovada, mostre **três linhas**:

> **`cobranca-mensal`** — no dia 5, lista quem não pagou e escreve a mensagem de
> cada um no teu tom. Você confere e envia.
> Entrada: a planilha de recebimentos. Saída: uma mensagem por cliente.

Pergunte quais criar. **Não crie cinco de uma vez** — duas boas, usadas de verdade,
valem mais que cinco que ninguém abre.

## Passo 4 — escrever, com as duas camadas

Toda skill criada aqui segue a convenção do pacote, sem exceção:

```
.claude/skills/<nome>/
├── SKILL.md      # o que a máquina executa
└── GUIA.md       # o que a PESSOA lê antes de usar
```

**No `SKILL.md`:** `name` e `description` no frontmatter, e a `description`
precisa dizer **quando disparar, com as palavras que a pessoa usaria** — não as
palavras técnicas. Corpo em passos executáveis. Comece pelo contrato de memória.

**No `GUIA.md`:** as cinco seções, nesta ordem — pra que serve, quando usar e
**quando não usar**, o que esperar, o erro comum, como ajustar.

O "quando não usar" é o mais difícil e o mais valioso. Escreva-o a partir da
entrevista: os casos que a própria pessoa disse que são diferentes.

**Onde criar:** `.claude/skills/` do projeto se for de um cliente só;
`~/.claude/skills/` se ela vai usar em qualquer pasta. Pergunte.

## Passo 5 — testar antes de declarar pronta

Peça um caso real — de preferência o exemplo que ela deu na entrevista — e **rode a
skill**. Mostre a saída.

Skill criada e nunca executada é rascunho. Se o resultado veio torto, ajuste o
`SKILL.md` na frente da pessoa: é assim que ela aprende a mexer sozinha depois.

## Nunca

- **Não crie skill para tarefa que acontece uma vez por ano**
- **Não crie skill que peça senha, token ou chave.** Nenhuma skill deste pacote
  toca em credencial, e as criadas aqui herdam a regra
- **Não crie skill que envie, publique ou compre.** Produzir e parar
- **Não escreva `SKILL.md` sem `GUIA.md`.** Metade da entrega é a camada humana
- **Não declare pronta sem rodar** em um caso real
