---
name: novo-projeto
description: Monta a pasta de um cliente ou trabalho novo com a estrutura certa, a memória própria dele e um registro do que foi combinado. Impede que a marca de um cliente vaze para a peça de outro. Use quando a pessoa disser "cliente novo", "começar um projeto", "fechei com o fulano", "monta a pasta do", ou /novo-projeto.
---

# Novo projeto

Existe por um motivo prático: **memória de cliente é local, e local significa uma
pasta por cliente.** Trabalhar dois clientes na mesma pasta é como se publica a peça
de um com a cor do outro.

## Passo 1 — quatro perguntas, uma rodada

1. **"Quem é o cliente, e o que ele faz?"**
2. **"O que você vai entregar?"** — em substantivo concreto
3. **"Tem prazo?"** — só data real. "Urgente" não é data
4. **"O que foi combinado que não está óbvio?"** — o valor, a forma de pagamento,
   quem é o ponto de contato, o que ficou de fora. É o que ninguém anota e todo mundo
   esquece

Se ela não souber alguma, **siga e deixe o campo vazio**. Campo vazio é honesto;
campo inventado vira promessa que a empresa vai ter que cumprir.

## Passo 2 — onde a pasta nasce

**Pergunte antes de criar**, e proponha o vizinho das que já existem:

> "Crio em `clientes/<nome>/`? Vi que a Serra Alta e a Verde Norte estão lá."

**Nunca crie a pasta de um cliente dentro da pasta de outro.** E nunca dentro da
pasta do próprio Cortex Skills — um `/salvar` distraído mandaria o trabalho do
cliente para o repositório do produto.

Estrutura mínima. Não crie pasta vazia "por precaução": ela nasce quando houver
conteúdo:

```
<cliente>/
├── marca/marca.json     # a marca DELE, não a sua
└── PROJETO.md           # o que foi combinado
```

## Passo 3 — a marca do cliente

**Esta é a parte que evita o erro caro.** Se o trabalho é em nome do cliente —
carrossel, proposta, email saindo com o nome dele — a pasta precisa da marca **dele**
em `marca/marca.json`.

Sem isso, as skills caem na marca global, que é a sua, e a peça sai com a sua cara no
feed dele.

Pergunte:

> "As peças saem com a marca dele ou com a tua? Se for a dele, eu faço as cinco
> perguntas de marca agora e gravo só nesta pasta."

Se for em nome próprio (consultoria que assina o próprio trabalho), não crie
`marca/` — a global resolve, e um arquivo a menos é um a menos para desatualizar.

## Passo 4 — o `PROJETO.md`

Curto. Se passar de uma tela, ninguém relê:

```markdown
# <Cliente>

**Começou em:** DD/MM/AAAA · **Status:** ativo

## O que é
Uma frase.

## O que eu entrego
- Item concreto

## O que ficou de fora
- O limite combinado

## Combinado
Valor, forma de pagamento, prazo, ponto de contato.

## Próximo passo
Uma linha. Atualize esta quando mudar.
```

**"O que ficou de fora" é a linha que evita trabalho de graça.** Se a pessoa não
souber responder, é sinal de que o combinado ainda está vago — diga isso agora, que é
barato, e não em novembro.

## Passo 5 — entregar

Mostre o que criou e o caminho. Termine com o que dá para fazer já:

> "Pasta pronta. Se quiser, `/proposta` aqui dentro já sai com a marca dele."

Se a pessoa usa Git, ofereça um repositório **próprio para o cliente** — nunca uma
subpasta do seu. Não crie sem ela pedir.

## Nunca

- **Não crie a pasta de um cliente dentro da de outro**, nem dentro deste repositório
- **Não copie a marca de um cliente para outro.** Cada pasta, a sua
- **Não invente valor, prazo ou escopo.** Campo vazio é honesto
- **Não crie estrutura grande "por organização".** Pasta vazia envelhece e confunde
- **Não guarde credencial, export ou dado de cliente final** nesta pasta se ela vai
  para um Git compartilhado
