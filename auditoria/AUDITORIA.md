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

## Resultado atual — 21/08/2026

53 arquivos do produto, 30 fontes. **Maior trecho literal em todo o produto: 36
caracteres**, o mesmo de sempre — investigado abaixo, é texto do próprio autor.

Este número substitui o registro anterior de 14 arquivos, que era de quando só
`carrossel` e `instalar` existiam. **Isto não é auditoria jurídica nem parecer
de licença.** É uma trava técnica que compara texto contra as fontes conhecidas
e para a publicação se achar cópia acima do limite — nada além disso, e nada
menos.

Detalhe completo de arquivo por arquivo, na saída de `python3 auditoria/auditar.py`.

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

## Revisão de 21/08/2026 — descoberta deixa de ser por profundidade fixa

O auditor usava `glob.glob('.claude/skills/*/*.md')` e variações — um padrão
para cada combinação de extensão e profundidade de pasta. Cinco arquivos ficaram
fora do alcance sem nenhum aviso: os três `carrossel/estilos/*.json` (paleta de
cor, conteúdo autoral de verdade) e os dois `package-lock.json` (que também
saíram, mas de propósito — lockfile de terceiro não é texto autoral).

**A causa era estrutural, não um esquecimento pontual.** Toda vez que uma skill
ganhasse uma subpasta nova, o padrão fixo deixaria de enxergar o que estivesse
nela — e nada no resultado avisaria que a cobertura tinha caído. `descobrir()`
agora varre `.claude/skills/` recursivamente com `os.walk`, filtrando por
extensão e ignorando `node_modules`, `__pycache__` e lockfile de terceiro por
nome. 53 arquivos encontrados contra 50 antes.

O script também ganhou `--source <pasta>`, repetível, para comparar contra
qualquer conjunto de fontes — não só as duas do autor. Sem `--source` e sem as
pastas padrão na máquina, ele recusa aprovar: mostra os caminhos que procurou e
sai com código 1. **Isto é intencional.** Quem compra o produto não tem essas
pastas na máquina e não precisa rodar esta auditoria — ela é ferramenta de quem
publica, não de quem instala. Um clone público sem fonte configurada tem que
falhar ruidosamente, nunca aprovar em silêncio por não ter achado nada para
comparar.

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
python3 auditoria/auditar.py --source ~/outra/pasta/.claude/skills   # fonte extra
```

Roda em segundos e sai com código 1 se reprovar. **Rode antes de publicar
qualquer versão nova e sempre que entrar skill nova.** Auditoria antiga não
cobre arquivo novo.

Se as pastas de origem sumirem da máquina, o script avisa que não verificou nada
em vez de aprovar em silêncio.
