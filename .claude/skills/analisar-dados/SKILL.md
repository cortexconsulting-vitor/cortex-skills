---
name: analisar-dados
description: Lê uma planilha ou export (CSV, TSV) e devolve o que os números dizem — o que mudou, o que está fora da curva, o que decidir. Perfila o arquivo por medição em vez de ler linha a linha, para não inventar número. Use quando a pessoa mandar um arquivo de dados, ou disser "analisa essa planilha", "o que esses dados mostram", "resume esse relatório", "olha esse export", ou /analisar-dados.
---

# Analisar dados

O risco desta skill não é errar a conta. É **inventar número** — ler metade do
arquivo, formar uma impressão e apresentá-la com a confiança de quem contou.

Por isso a regra é dura: **todo número que você disser tem que ter saído do
perfilador.**

## Passo 1 — perfilar antes de abrir

```bash
node perfil.js <arquivo.csv>
```

Devolve linhas, colunas, tipo de cada uma, vazios, faixa, soma e os valores mais
frequentes. Ele lê o arquivo inteiro em disco e calcula — não estima.

**Nunca leia o arquivo direto para a conversa.** Planilha de 40 mil linhas estoura o
contexto, e o que estoura vira lacuna que você preenche sem perceber.

Para uma coluna específica: `node perfil.js <arquivo> --col valor`

## Passo 2 — olhar o que o perfil denuncia

Antes de qualquer conclusão, confira quatro coisas — e **diga o que achou**:

| Sinal | O que costuma ser |
|---|---|
| Coluna com muitos vazios | Campo opcional, ou integração que parou de gravar |
| Linhas com número de colunas diferente | Export quebrado. **Pare e avise** |
| "lido como formato americano/brasileiro" | Confira se bate. `1.250` é mil duzentos e cinquenta ou um vírgula vinte e cinco? |
| Máximo absurdo | Teste em produção, centavo virado real, ou linha de total no meio dos dados |

**Linha de total dentro do arquivo é a armadilha mais comum.** Se a soma parecer o
dobro do esperado, procure por ela antes de concluir qualquer coisa.

## Passo 3 — a pergunta antes da análise

Pergunte **uma** coisa:

> "O que você quer decidir com isso?"

A mesma planilha responde perguntas diferentes. Vendas por vendedor serve para
comissão, para redistribuir carteira ou para demitir — e as três análises são
diferentes. Sem saber, você produz um resumo correto e inútil.

Se a pessoa disser "só quero entender", faça o retrato geral e pare.

## Passo 4 — escrever o que os números dizem

Estrutura, nesta ordem:

1. **A frase que resume** — uma, com o número que a sustenta
2. **De dois a quatro achados**, cada um com o número do lado
3. **O que está estranho** — o que você não sabe explicar. Isto vale mais que os
   achados, porque é onde mora o erro de cadastro e a fraude
4. **O que fazer** — só se ela disse o que quer decidir

Regras:

- **Número sem contexto não é achado.** "Ana vendeu R$ 28 mil" não diz nada;
  "Ana vendeu 60% do total sozinha" diz
- **Não use percentual com base pequena.** "Aumentou 200%" sobre 3 casos é ruído
- **Correlação não é causa**, e com três meses de dado nem correlação é
- **Não recomende o que os dados não sustentam.** Se falta informação, diga qual

## Passo 5 — entregar

Resumo no chat. Se a pessoa quiser arquivo, escreva `analise-<AAAA-MM-DD>.md` com os
mesmos números e a saída do perfil no fim — para conferência.

## Nunca

- **Não cite número que não veio do perfilador.** Nem "aproximadamente", nem
  "cerca de"
- **Não analise arquivo com linhas irregulares** sem avisar antes
- **Não conclua tendência** com menos de 6 pontos no tempo
- **Não abra planilha de dado pessoal** (CPF, endereço, telefone, saúde) sem a
  pessoa dizer que pode. E não repita esses dados no resumo
- **Não invente a causa.** "Caiu 30% em março" é fato; "porque o mercado esfriou"
  é palpite — e palpite dito com número do lado parece fato
