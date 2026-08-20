# Auditoria de origem — 20/08/2026

O Cortex Skills nasceu ao lado de dois forks do MazyOS, que não publica licença.
Sem licença explícita vale copyright padrão. Esta auditoria existe para responder
uma pergunta só: **algum arquivo do produto deriva de lá?**

## Método

`auditoria/auditar.py` mede o **maior trecho literal em comum** entre cada arquivo
do produto e o conjunto das 30 skills derivadas do MazyOS
(`operacao/.claude/skills` e `legado-cortex-os/.claude/skills`).

**Não se mede "similaridade".** Dois markdowns em português sobre o mesmo assunto
batem ~90% em qualquer medida de frequência de caractere — foi o primeiro
instrumento tentado, e ele não mede cópia nenhuma. O que mede é o tamanho do maior
pedaço idêntico.

Limite: **120 caracteres**. Parágrafo copiado passa de 200; abaixo de ~80 é
vocabulário do idioma e do domínio.

## Resultado — aprovado

14 arquivos do produto, 30 fontes. **Maior trecho literal em todo o produto: 36
caracteres.**

| Arquivo | Maior trecho |
|---|---|
| `carrossel/motor/base.html` | 36 car. |
| `carrossel/SKILL.md`, `instalar/SKILL.md` | 33 car. (frontmatter `--- name: ... description:`) |
| todos os demais | 27 car. ou menos |

## O trecho de 36 caracteres, investigado

`"a vem de escala, peso, cor e espaço "` aparece no nosso `base.html` e em
`operacao/.claude/skills/carrossel/SKILL.md`.

Rastreado no Git do `operacao`: **a linha não existe no commit de importação**
(`44ceda8`, 03/08/2026). Foi escrita por Vitor em `97743d3` (06/08/2026), no
commit do molde de carrossel da Córtex. **É texto do próprio autor**, não do
MazyOS.

## Proveniência do molde de carrossel

Verificado no mesmo histórico:

- `templates/carrossel/` **não existe** no commit de importação do MazyOS
- `templates/carrossel/base.html` nasce em `97743d3`, por Vitor, em 06/08/2026
- A base importada do MazyOS trazia **um** arquivo de carrossel:
  `.claude/skills/carrossel/SKILL.md` — instrução, nenhum molde

O motor do carrossel deriva de trabalho do próprio autor, não da base importada.

## Revisão de 20/08/2026 — o eco nas descrições

Ao escrever `salvar` e `instalar`, duas `description` saíram com trechos do
MazyOS: 32 e 33 caracteres literais.

**Não foi cópia deliberada, e é justamente por isso que importa.** As descrições
das 15 skills do MazyOS ficam carregadas no contexto de quem escreve — elas estão
instaladas na máquina e aparecem na lista de skills disponíveis. É o lugar mais
fácil de ecoar sem perceber, e o menos provável de alguém reler com desconfiança.

As duas foram reescritas. A auditoria ganhou uma verificação própria para
`description`, com limite de 30 caracteres.

### Por que o limite da description não é ainda menor

A primeira tentativa usou 25 caracteres e reprovou três skills por **andaime
obrigatório**:

- `"use quando o usuário disser"` — convenção do próprio Claude Code
- `"salvar"`, `"como eu respondo isso"` — gatilhos entre aspas. A skill chamada
  `salvar` **precisa** reagir à palavra "salvar"

Nada disso é expressão protegível, e nenhum pode ser reescrito sem quebrar a
skill. O instrumento passou a **remover o andaime antes de medir**: corta tudo a
partir de "use quando", tira os gatilhos entre aspas e as barras, e mede só o que
sobra.

Alarme falso é pior que alarme nenhum — ensina a ignorar o alarme.

## O que isto libera, e o que não

**Libera:** as skills deste repositório podem ser vendidas. São obra original.

**Não libera:**

- **Embalar arquivo de terceiro.** Remotion, skills da remotion-dev, MazyOS,
  qualquer coisa sem licença de redistribuição. Ver "Cobrar pelo acesso é
  distribuir" no `CONVENCAO.md` — vender acesso a uma pasta é distribuir o que
  está dentro dela
- **Usar as duas linhas do MazyOS como fonte de arquivo.** Elas servem como
  inventário de ideias. Toda skill continua sendo reescrita do zero

## Refazer

```bash
python3 auditoria/auditar.py
```

Roda em segundos e sai com código 1 se reprovar. **Rode antes de publicar
qualquer versão nova e sempre que entrar skill nova.** Auditoria antiga não
cobre arquivo novo.

Se as pastas de origem sumirem da máquina, o script avisa que não verificou nada
em vez de aprovar em silêncio.
