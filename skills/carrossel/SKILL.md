---
name: carrossel
description: Cria carrossel para Instagram, LinkedIn ou TikTok com a identidade visual da própria empresa do usuário. Na primeira vez faz cinco perguntas para montar a marca; depois é só pedir o tema. Use quando o usuário disser "carrossel", "post pro instagram", "cria um conteúdo", "faz um carrossel sobre X", ou /carrossel.
---

# Carrossel

Gera carrossel 1080x1350 em PNG, pronto pra postar, com a marca **do usuário**.

## Passo 1 — a marca existe?

Siga o contrato de memória, **nesta ordem**:

1. **`marca/marca.json` na raiz do workspace.** Achou? Use e **pule a entrevista
   inteira** — a pessoa já respondeu isso na instalação. Perguntar de novo é defeito.
2. **`marca.json` na pasta em que você está.** Achou? Use.
3. **Nenhum dos dois?** Aí sim, faça a entrevista abaixo, antes de qualquer outra
   coisa. Uma pergunta por vez, esperando a resposta.

### As cinco perguntas

1. **"Qual é a empresa e o que ela faz?"** — nome, o que vende, em uma frase.
2. **"Quem lê isso?"** — público. Dono de PME? Designer? Mãe de primeira viagem?
   Isso decide o vocabulário, não a cor.
3. **"Tem cor de marca?"** — se souber, peça o código; se não, pergunte "que sensação
   a marca tem que passar: séria e sóbria, leve e clara, ou direta e enérgica?" e use
   a resposta pra escolher o estilo.
4. **"Tem logo?"** — se tiver SVG, peça o caminho e extraia o `d` do path principal.
   Se não tiver, siga sem — o rodapé usa só o handle.
5. **"Qual o @ e onde vai postar?"** — handle e rede (muda só o formato de saída).

### Escolhendo o estilo

Leia `estilos/`. Três predefinições, cada uma com o `quando` explicando o encaixe:

| Estilo | Serve para |
|---|---|
| `escuro-editorial` | Autoridade, consultoria, B2B, conteúdo que ensina |
| `claro-minimo` | Design, arquitetura, saúde, bem-estar, moda |
| `alto-contraste` | Oferta direta, vendas, fitness, infoproduto |

Escolha pela resposta 3, **proponha ao usuário e confirme** antes de gravar. Se ele
deu cores próprias, use as dele e mantenha o resto da predefinição.

Grave seguindo `marca.exemplo.json` e mostre o que gravou.

**Onde gravar:** se existir uma pasta `marca/` na raiz do workspace, grave em
`marca/marca.json` e diga que gravou lá — assim nenhuma outra skill vai perguntar
isso de novo. Se não existir, grave `marca.json` na pasta de trabalho e ofereça:
*"Quer que eu guarde isso em `marca/marca.json`? Aí as outras skills já saem com
a tua marca sem perguntar nada."*

## Passo 2 — escrever o conteúdo

Crie a pasta `carrossel-<tema>-<AAAA-MM-DD>/` e **copie pra dentro dela, com o nome
`marca.json`, a marca que você resolveu no Passo 1** — venha ela de `marca/marca.json`,
da pasta de trabalho ou da entrevista. O motor lê a marca de dentro da pasta da peça e
não procura em outro lugar; sem essa cópia ele para com erro.

Depois escreva `conteudo.json`.

**Tipos de slide disponíveis:** `capa`, `contraste`, `trilha`, `comparacao`,
`declaracao`, `cta`. O formato de cada um está no bloco de exemplo em
`motor/base.html`.

Regras que a arte cobra e o texto tem que respeitar:

- **uma ideia por slide** — se tem duas, são dois slides
- **frase curta** — o molde é generoso com espaço, não com texto comprido
- capa que para a rolagem, e `cta` no fim com o handle
- de 5 a 8 slides. Menos que 5 não sustenta, mais que 8 ninguém termina

## Passo 3 — renderizar

Na primeira vez, dentro de `motor/`:

```bash
npm install puppeteer
```

Depois, para cada peça:

```bash
node motor/render.js carrossel-<tema>-<data>
```

Os PNGs saem em `<pasta-da-peca>/instagram/`, 2160x2700.

O motor avisa quando um texto está perto de estourar o slide. **Se avisar, encurte
o texto** — não mexa na arte. O molde tem geometria validada; texto comprido é
problema do texto.

## Passo 4 — entregar

Mostre os PNGs ao usuário e escreva a legenda do post junto. Se ele pedir tamanho
nativo do Instagram, gere a cópia reduzida em pasta temporária e não versione.

## Nunca

- **Não edite `motor/base.html`.** A marca entra por injeção, no `render.js`.
  Editar o molde quebra a coesão entre as peças e a geometria validada
- Não invente slide fora dos seis tipos. Se falta um layout, acrescente ao molde
  como tipo novo — não improvise numa peça solta
- Não gere peça com a identidade de outra empresa que não a do `marca.json`
