# Cortex Skills

**Dezenove skills, escritas do zero.**

| Skill | Estado | Precisa de |
|---|---|---|
| `.claude/skills/instalar` | **Funcionando.** Entrevista, grava a memória, confere dependências e prova com uma peça de teste | — |
| `.claude/skills/carrossel` | **Funcionando.** Motor autoral, marca do comprador por parâmetro, 3 estilos | Node + puppeteer |
| `.claude/skills/resposta-cliente` | **Funcionando.** Nomeia o que a mensagem é antes de escrever; usa a voz da empresa | — |
| `.claude/skills/proposta` | **Funcionando.** Proposta de serviço em HTML com a marca do comprador, pronta pra virar PDF | — |
| `.claude/skills/abrir` | **Funcionando.** Abre a sessão: onde parou, o que vence, e **uma** proposta de próximo passo | — |
| `.claude/skills/salvar` | **Funcionando.** Commits por assunto, barra segredo antes de subir, push só com sim explícito | Git |
| `.claude/skills/atualizar` | **Funcionando.** Reconcilia a memória com a pasta, propondo linha a linha com evidência | Git |
| `.claude/skills/publicar-tema` | **Funcionando.** Um tema vira texto, carrossel e três legendas — todas com a mesma tese | Node + puppeteer |
| `.claude/skills/avaliacoes` | **Funcionando.** Réplica pública a review, escrita para quem lê e não para quem avaliou | — |
| `.claude/skills/escrever-email` | **Funcionando.** Email que você inicia, com assunto que faz abrir e pedido na segunda linha | — |
| `.claude/skills/video` | **Funcionando.** Corta, vira vertical pro Reels, junta, tira capa e legenda | FFmpeg |
| `.claude/skills/analisar-dados` | **Funcionando.** Perfila o CSV por medição e lê os números sem inventar nenhum | Node |
| `.claude/skills/mapear-rotinas` | **Funcionando.** Vira o que você repete em skills suas, com as duas camadas | — |
| `.claude/skills/novo-projeto` | **Funcionando.** Pasta de cliente com marca isolada, para nenhuma vazar na outra | — |
| `.claude/skills/ajuda` | **Funcionando.** Lê o que está instalado e diz qual skill resolve o que você quer | — |
| `.claude/skills/seo` | **Funcionando.** Plano de busca em ordem de execução, com os três primeiros marcados | — |
| `.claude/skills/relatorio-ads` | **Funcionando.** Lê export de campanha e diz o que mudar na segunda-feira | — |
| `.claude/skills/anuncio-google` | **Funcionando.** Campanha de busca com grupos por intenção e caracteres contados | — |
| `.claude/skills/revisar-post` | **Funcionando.** O último olhar antes de publicar. Não publica nada | — |

Duas camadas em toda skill — `SKILL.md` para a máquina, `GUIA.md` para a pessoa.
A convenção completa está em [`CONVENCAO.md`](CONVENCAO.md).

**Comprou agora?** Comece por [`COMECE-AQUI.md`](COMECE-AQUI.md) — cinco minutos.
Skills de outros autores, em [`EXTENSOES.md`](EXTENSOES.md).

## Como instalar

### Clonar e usar — o caminho curto

As skills moram em `.claude/skills/`, que é onde o Claude Code procura. **Clonar
já é instalar**, sem copiar nada:

```bash
git clone https://github.com/cortexconsulting-vitor/cortex-skills.git
```

Ou, se você **já está com uma pasta vazia aberta** e quer as skills nela, o ponto
no fim clona sem criar subpasta:

```bash
git clone https://github.com/cortexconsulting-vitor/cortex-skills.git .
```

**Abra a pasta `cortex-skills` como projeto** — `File → Open Folder` no VS Code,
ou `cd cortex-skills` antes de rodar o `claude`. O Claude Code só lê
`.claude/skills/` da raiz do workspace aberto; clonada dentro de outro projeto,
ela fica uma pasta abaixo e nenhuma skill aparece.

Com a pasta aberta, rode:

```
/instalar
```

A instalação entrevista, grava a memória, confere o que falta na máquina e fecha
com uma peça de teste. Feito isso, as skills valem **dentro desta pasta**.

### Em todas as pastas

Para as skills valerem em qualquer pasta que você abrir — terminal, app ou
extensão do VS Code, que leem o mesmo lugar:

```bash
rsync -a --exclude node_modules cortex-skills/.claude/skills/ ~/.claude/skills/
```

**O mesmo comando atualiza.** Depois de um `git pull`, rode de novo — a cópia
global não se atualiza sozinha, e uma cópia velha é pior que nenhuma: ela continua
funcionando, com o comportamento antigo, e você não tem como perceber.

É `rsync` e não `cp` por um motivo: o motor do carrossel acumula 29 MB de
`node_modules` compilado para uma máquina só. Ele não pode viajar junto — cada
instalação roda o seu `npm install`, e a instalação avisa quando falta.

### Sobre o Codex e outras ferramentas

`.claude/skills/` é o formato do Claude Code. **O Codex não lê essa pasta** e não
vai encontrar estas skills copiando-as para lá. Fazer o mesmo conjunto valer no
Codex é uma ponte separada, ainda não construída — e não está prometida aqui.

## Uma marca, ou uma por cliente

A memória segue quem você é:

- **Marca sua**, em qualquer pasta → `~/.claude/cortex-.claude/skills/marca.json`
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

## Licença

**Use à vontade, no seu negócio e nos dos seus clientes. Troque o nome se quiser.
Só não redistribua os arquivos nem venda acesso a eles.** Termos completos em
[`LICENSE`](LICENSE).

Quer vender um produto parecido? Pode — escrevendo do zero, que foi o que a gente
fez aqui. Ideia não pertence a ninguém; o texto destes arquivos pertence.

## Origem — auditado

As quatro skills deste repositório foram escritas do zero e **passaram na
auditoria de origem em 20/08/2026**: maior trecho literal em comum com as 30
skills derivadas do MazyOS é de **36 caracteres**, e esse trecho foi rastreado no
Git como texto do próprio autor. Registro completo e método em
[`auditoria/AUDITORIA.md`](auditoria/AUDITORIA.md).

```bash
python3 auditoria/auditar.py
```

**Rode antes de publicar qualquer versão nova.** Auditoria antiga não cobre skill
nova.

### O que continua proibido

Embalar arquivo de terceiro — Remotion, skills da remotion-dev, MazyOS, qualquer
coisa sem licença de redistribuição. **Vender acesso a uma pasta é distribuir o
que está dentro dela**, e repositório privado não ameniza: o pagamento fica
documentado.

Skill que depende de ferramenta externa **manda instalar** e declara o limite de
licença no `GUIA.md`. O produto é conhecimento organizado, não acervo de arquivos.

## Skills globais não são produto

As skills em `~/.claude/skills` (12 do `remotion-dev` e `composio-cli`) são **dependências de
terceiros** instaladas na máquina. Não são autoria própria e não integram este produto.
