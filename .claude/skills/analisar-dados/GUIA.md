# Guia — Analisar dados

## Pra que serve

Você manda a planilha e recebe o que os números dizem: o que mudou, o que está fora
da curva, o que dá pra decidir. Sem abrir Excel e sem montar tabela dinâmica.

## Quando usar e quando não usar

**Use** com export de sistema, relatório de vendas, planilha de controle, extrato em
CSV — qualquer arquivo tabular que você olha e não sabe por onde começar.

**Não use** para:

- **Concluir tendência com pouco dado.** Três meses não é série histórica. Ela vai
  te dizer isso em vez de fingir que dá
- **Prever o futuro.** Ela lê o que aconteceu
- **Planilha com fórmula e formatação.** Exporte para CSV primeiro. Ela lê CSV e TSV
- **Dado pessoal de terceiro** — CPF, endereço, telefone, saúde — sem você ter certeza
  de que pode. Ela vai perguntar

## O que esperar

Primeiro ela roda um perfilador: quantas linhas, que tipo é cada coluna, quantos
vazios, faixa e soma. **Isso é medido, não estimado** — é o que impede número
inventado.

Depois ela te pergunta **o que você quer decidir**. A mesma planilha responde
perguntas diferentes, e sem saber qual é a sua ela produz um resumo correto e inútil.

Aí vem o resumo: a frase que resume, dois a quatro achados com número do lado, e —
a parte mais valiosa — **o que ela não conseguiu explicar**.

## O erro comum

**Aceitar o total sem procurar a linha de total.**

Muito export do Brasil vem com uma linha "TOTAL" no meio ou no fim dos dados. Ela
entra na contagem como se fosse uma venda, e a soma sai exatamente o dobro. O
resultado parece plausível — é só grande demais — e você toma decisão em cima.

Quando a soma vier maior do que você esperava, **procure a linha de total antes de
acreditar**. A skill avisa quando o máximo destoa, mas quem conhece o arquivo é você.

O segundo erro é **não dizer o que você quer decidir**. "Analisa aí" produz retrato
geral. "Preciso saber se corto o vendedor que menos vende" produz a análise que você
vai usar — e às vezes a resposta de que os dados não bastam para essa decisão, que é
a informação mais barata que existe.

## Como ajustar

**1. Diga a decisão, não o pedido.** O ajuste de maior efeito, e custa uma frase.

**2. Confira a linha "lido como formato".** Ela informa se leu `1.250` como mil
duzentos e cinquenta ou como um e vinte e cinco. Em export estrangeiro isso inverte,
e é o tipo de erro que passa despercebido — se estiver errado, diga.

**3. Exporte sem formatação.** CSV cru, sem célula mesclada, sem cabeçalho de duas
linhas, sem linha de total. Cinco segundos na exportação evitam meia hora depois.
