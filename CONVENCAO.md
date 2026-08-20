# Convenção do Cortex Skills

Toda skill deste repositório tem **duas camadas**. É isso que separa o Cortex Skills
de um `git clone` qualquer: o comprador não recebe só instrução de máquina, recebe
o entendimento junto.

```
.claude/skills/<nome-da-skill>/
├── SKILL.md      # o que o Claude lê e executa
├── GUIA.md       # o que a PESSOA lê antes de usar
└── (arquivos de apoio: templates, scripts, exemplos)
```

**Nada que seja da sua máquina viaja dentro de `.claude/skills/`.** Já escaparam por ali
peças de teste com PNG na cor da Córtex e 29 MB de `node_modules` compilado. O
`.gitignore` não protege: quem instala copia a pasta, não clona o repositório.
Instalação se testa instalando numa pasta vazia e listando o que chegou.

**Peça de teste não mora dentro de `.claude/skills/`.** Vai para `testes/<skill>/`, na
raiz. A instalação do comprador é uma cópia de `.claude/skills/*` — tudo que estiver ali
dentro chega na máquina dele, inclusive PNG renderizado com a marca da Córtex.
Isso foi encontrado testando a instalação numa pasta vazia, não lendo o código.

## SKILL.md — camada da máquina

Frontmatter com `name` e `description`. A `description` decide se a skill dispara
na hora certa: precisa dizer **quando usar**, com as palavras que a pessoa usaria.
Corpo em passos executáveis, sem enrolação.

## GUIA.md — camada humana

Cinco seções, sempre nesta ordem:

1. **Pra que serve** — em uma frase, sem jargão
2. **Quando usar e quando não usar** — o "quando não" vale mais que o "quando"
3. **O que esperar** — o resultado concreto, com exemplo real
4. **O erro comum** — o que trava na primeira vez e como sair
5. **Como ajustar** — os dois ou três parâmetros que valem a pena mexer

## Contrato de memória

Toda skill que precisa saber algo sobre o negócio do comprador — nome, cor,
handle, público, tom — segue **esta ordem, sem exceção**:

1. **`marca/marca.json` na raiz do workspace.** É a marca daquele projeto ou
   daquele cliente. Achou? Usa e **não pergunta nada.**
2. **`marca.json` na pasta em que está trabalhando.** Peça solta, sem workspace
   montado. Achou? Usa.
3. **`~/.claude/cortex-skills/marca.json`** — a marca da própria pessoa, que vale
   em qualquer pasta da máquina. Achou? Usa.
4. **Nada disso? Faz a própria entrevista curta** — e no fim oferece gravar.

**O local sempre vence o global.** Quem atende clientes abre a pasta do cliente e
trabalha com a marca dele; quem publica em nome próprio abre qualquer pasta e a
marca dele já está lá. Inverter essa ordem é como se posta na cor errada.

O passo 4 é o que mantém cada skill vendável sozinha. O passo 3 é o que permite
instalar as skills uma vez e usá-las em toda pasta. O passo 1 é o que faz um
estúdio atender dez marcas sem misturar nenhuma.

### O que a memória guarda

| Arquivo | O que é | Quem lê |
|---|---|---|
| `marca.json` | Identidade e voz: nome, handle, cor, fonte, logo, tom, o que evitar | Todas |
| `negocio.md` | O que a empresa faz, vende, para quem, e o que **não** faz | As que escrevem texto |
| `foco.md` | Prioridades e prazos do momento | As que sugerem o que fazer a seguir |

`marca.json` é obrigatório — sem ele nenhuma skill tem cara. Os dois `.md` são
opcionais: sem eles as skills funcionam e saem mais genéricas. **Skill nenhuma
para por falta de `negocio.md`** — ela pergunta o que precisa e segue.

Os três seguem a mesma ordem de resolução, e sempre juntos: memória local
completa vence memória global completa. Misturar o `marca.json` de um cliente
com o `negocio.md` de outro é o pior defeito possível deste sistema.

**Skill que pergunta duas vezes a mesma coisa está com defeito.** Se a memória
existe e a skill entrevistou mesmo assim, é bug — não é zelo.

### Esquema duplicado é proposital

`marca/marca.exemplo.json` é o esquema canônico. Skills podem carregar a própria
cópia do exemplo, e o carrossel carrega — é o que permite copiar a pasta dela
sozinha e funcionar. Ao mudar o esquema, **mudar as duas**. A duplicação é o
preço da autossuficiência, e é um preço que aceitamos de olhos abertos.

## Como se prova uma mudança no motor

**Não compare PNG por hash.** O render não é determinístico: duas rodadas
idênticas do mesmo motor, no mesmo Chromium, produzem bytes diferentes nos slides
`trilha` e `declaracao`. Medido em 20/08/2026, sem nenhuma animação no molde.

Compare o **`carrossel.html` montado**, que o `render.js` grava antes de
fotografar. Ele é determinístico e é onde a injeção acontece. HTML idêntico
significa intenção idêntica; o que sobra é ruído do renderizador.

Quando a comparação acusar diferença, **isole a causa antes de aceitar ou negar**:
renderize com o motor anterior no mesmo Chromium. Foi assim que se descobriu que
a versão do navegador, sozinha, já muda o PNG.

## Regras de origem

- **Nada de terceiro entra aqui.** Nenhum arquivo derivado do MazyOS, do Remotion
  ou de qualquer repositório sem licença de redistribuição
- Skill que depende de ferramenta externa **instrui a instalar**, não embala
- Toda dependência com licença comercial é declarada no `GUIA.md`, com o limite
  (ex.: Remotion é livre até 3 funcionários; acima disso o comprador precisa de
  licença própria)

### Cobrar pelo acesso é distribuir

**"Eu não vendo as skills de terceiro, vendo o acesso à pasta" não separa nada.**
O direito autoral olha a cópia e a distribuição, não o rótulo da transação. Se o
arquivo de outro autor está dentro da pasta que o comprador acessa mediante
pagamento, houve redistribuição comercial da obra dele. Repositório privado não
ameniza: o pagamento fica documentado.

O que separa de verdade é **onde o arquivo mora**:

| Isto pode ser vendido | Isto não pode |
|---|---|
| Skill nossa que **manda instalar** o Remotion e ensina a usá-lo | O Remotion, ou as skills da remotion-dev, dentro da pasta |
| Skill nossa que resolve o mesmo problema que uma do MazyOS | Qualquer arquivo derivado do MazyOS |
| Documento nosso listando o que instalar e onde conseguir | O instalador ou o pacote de terceiro embalado junto |

**O produto é conhecimento organizado, não um acervo de arquivos.** A reunião tem
valor porque as skills se conhecem — contrato de memória, duas camadas, marca por
parâmetro. Nada disso exige embalar obra alheia.

## Regra de marca

Nenhuma skill sai com a identidade da Córtex embutida. Cor, fonte, logo e rodapé
são **parâmetros do comprador**, resolvidos pelo contrato de memória acima.
Peça gerada com a marca da Córtex no feed de outra pessoa é defeito, não recurso.
