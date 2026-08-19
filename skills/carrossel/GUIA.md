# Guia — Carrossel

## Pra que serve

Transforma uma ideia sua num carrossel pronto pra postar, com a sua identidade
visual, sem você abrir Canva nem editor nenhum. Você fala o tema, ele escreve,
desenha e exporta os PNGs.

## Quando usar e quando não usar

**Use** quando você já sabe o que quer dizer e quer transformar isso em post:
uma ideia que você explica sempre pro cliente, um erro que você vê todo mundo
cometer, uma comparação entre dois caminhos.

**Não use** para:

- **Post de foto ou produto.** Este carrossel é de texto e estrutura. Não tem
  slot pra foto de produto, e forçar isso quebra o layout
- **Carrossel de 15 slides.** O molde foi feito pra 5 a 8. Acima disso ninguém
  chega no fim, e a arte não foi validada nessa extensão
- **Descobrir o que postar.** Ele executa a ideia, não inventa a pauta. Se você
  não sabe o tema, o carrossel vai sair genérico — e vai parecer genérico

## O que esperar

Uma pasta com os slides em PNG, 2160x2700 (o dobro de 1080x1350, pra não pixelar),
mais a legenda escrita. Cada slide usa um dos seis layouts:

| Layout | O que faz |
|---|---|
| `capa` | Rótulo curto + a frase que para a rolagem |
| `contraste` | "O que parece" contra "o que é" |
| `trilha` | Etapas de um processo, com uma delas destacada |
| `comparacao` | Duas ou três opções lado a lado |
| `declaracao` | A conclusão, sozinha na tela |
| `cta` | Fechamento com seu @ |

## O erro comum

**Texto comprido demais.** É o que trava todo mundo na primeira vez.

O molde tem espaço generoso, e por isso dá a impressão de que cabe mais. Não cabe.
Quando o texto passa do limite, o motor avisa no terminal com o slide e o trecho.

A saída certa é **cortar o texto**, não mexer na arte. Se você aumentar a caixa ou
diminuir a fonte pra caber, aquela peça sai diferente de todas as outras e o feed
perde a coesão — que é justamente o que este molde existe pra garantir.

Regra prática: se a frase não cabe num respiro falado, não cabe no slide.

## Como ajustar

Três coisas valem a pena mexer, e só elas:

**1. O estilo.** Em `estilos/` tem três predefinições. Trocar o estilo no
`marca.json` muda a peça inteira sem tocar em código. Você pode rodar o mesmo
conteúdo nos três e escolher.

**2. As cores, dentro do estilo.** Se sua marca tem código de cor definido, edite
`paleta` no `marca.json`. Mexa em `acento` primeiro — é a cor que aparece nos
destaques e é a que mais muda a percepção da peça.

**3. A quantidade de slides.** Cinco é o mínimo que sustenta um argumento. Oito é
o máximo que alguém termina.

## Dependência

Precisa do **Node.js** e, na primeira vez, de `npm install puppeteer` dentro de
`motor/` — cerca de 300 MB, baixados uma vez só. O puppeteer é software livre
(Apache 2.0) e não tem custo nem limite de uso comercial.

O molde e o motor são autoria da Córtex. Nenhum arquivo de terceiro foi
redistribuído aqui.
