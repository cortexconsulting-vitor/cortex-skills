# Convenção do Cortex Skills

Toda skill deste repositório tem **duas camadas**. É isso que separa o Cortex Skills
de um `git clone` qualquer: o comprador não recebe só instrução de máquina, recebe
o entendimento junto.

```
skills/<nome-da-skill>/
├── SKILL.md      # o que o Claude lê e executa
├── GUIA.md       # o que a PESSOA lê antes de usar
└── (arquivos de apoio: templates, scripts, exemplos)
```

**Peça de teste não mora dentro de `skills/`.** Vai para `testes/<skill>/`, na
raiz. A instalação do comprador é uma cópia de `skills/*` — tudo que estiver ali
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

1. **Procura `marca/marca.json`** na raiz do workspace. Achou? Usa e **não
   pergunta nada.**
2. **Não achou? Procura `marca.json` na pasta em que está trabalhando.** Achou?
   Usa.
3. **Não achou nenhum dos dois? Faz a própria entrevista curta** — e no fim
   oferece gravar em `marca/marca.json`, para que a próxima skill não pergunte
   de novo.

O passo 3 é o que mantém cada skill vendável sozinha. O passo 1 é o que faz o
conjunto virar sistema. Uma skill que só implementa o passo 3 é um catálogo;
uma que só implementa o passo 1 fica inerte na mão de quem não instalou.

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

## Regra de marca

Nenhuma skill sai com a identidade da Córtex embutida. Cor, fonte, logo e rodapé
são **parâmetros do comprador**, resolvidos pelo contrato de memória acima.
Peça gerada com a marca da Córtex no feed de outra pessoa é defeito, não recurso.
