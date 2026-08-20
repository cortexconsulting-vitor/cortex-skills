---
name: relatorio-ads
description: Lê os CSVs exportados do Google Ads e do Meta Ads e devolve o relatório da semana — o que deu retorno, o que está queimando verba, o que decidir na segunda-feira. Trabalha com export, nunca com senha ou API. Use quando a pessoa mandar export de campanha, ou disser "relatório de ads", "como foram os anúncios", "performance da semana", "relatório de campanha", ou /relatorio-ads.
---

# Relatório de ads

O relatório que não serve é o que repete os números que já estavam no painel. Este
tem que responder **o que mudar na segunda-feira**.

## Passo 0 — export, nunca credencial

Esta skill lê arquivo exportado. **Não peça login, senha, token ou acesso à conta.**
Nenhuma skill deste pacote toca em credencial, e ligar direto na API significaria
guardar chave de anúncio — que é acesso ao dinheiro da pessoa.

Se ela não souber exportar:

- **Google Ads:** Campanhas → Relatórios → Baixar → CSV
- **Meta Ads:** Gerenciador → Relatórios → Exportar → CSV

Peça o **mesmo período da semana anterior também**. Sem comparação, todo número é
apenas um número.

## Passo 1 — conferir antes de analisar

Se a skill `analisar-dados` estiver instalada:

```bash
node ../analisar-dados/perfil.js <arquivo.csv>
```

Se não estiver, leia o CSV direto — export de campanha costuma ter dezenas de linhas,
não milhares.

Confira três coisas antes de qualquer conclusão:

1. **O período** que o arquivo cobre. Export de 30 dias comparado com 7 produz
   conclusão invertida
2. **A moeda e o formato do número.** `1.250` é mil duzentos e cinquenta ou um e
   vinte e cinco? Export em inglês inverte
3. **Linha de total** no meio dos dados. Dobra tudo silenciosamente

## Passo 2 — os números que decidem

Calcule, não estime:

| Número | Conta | Para que serve |
|---|---|---|
| **Custo por resultado** | investido ÷ conversões | O único que importa de verdade |
| **CTR** | cliques ÷ impressões | Anúncio ruim ou público errado |
| **Custo por clique** | investido ÷ cliques | Leilão apertando |
| **Taxa de conversão** | conversões ÷ cliques | Anúncio bom, página ruim |
| **Frequência** (Meta) | impressões ÷ pessoas | Acima de 3, o público cansou |

**Sem conversão configurada, diga isso na primeira linha e pare de fingir.** Relatório
de campanha que só mede clique mede o preço da atenção, não do cliente. Recomende
configurar antes de continuar investindo.

## Passo 3 — separar o que é sinal do que é ruído

Antes de recomendar qualquer coisa:

**Duas coisas diferentes precisam de volumes diferentes.** Confundir as duas trava
recomendação boa e libera recomendação ruim:

| Sobre | Precisa de | Exemplo |
|---|---|---|
| **Conversão** — está valendo a pena? | 50 cliques **e** 5 conversões | "o custo por lead subiu" |
| **Entrega** — a máquina está funcionando? | bem menos | frequência, CTR, custo por clique |

**Frequência acima de 3 é conclusiva com duas conversões**, porque mede saturação de
público, não resultado. O mesmo vale para CTR muito baixo e custo por clique
disparando. Diga essas coisas mesmo sem volume de conversão — e diga **por que** você
pode dizer.

Sem o volume da primeira coluna, sobre conversão diga **"ainda sem dado"**, não "está
performando mal".

- **Variação de até 20% semana a semana é normal.** Não é tendência
- **Compare com o mesmo dia da semana.** Segunda com sábado não se compara

**Recomendar corte por resultado ruim com base em três cliques é o erro mais caro
desta skill** — mata campanha que ia funcionar e ninguém fica sabendo. Mas recusar
apontar um público saturado porque "faltam conversões" é o erro oposto, e queima
verba enquanto você espera dado que não vai melhorar.

## Passo 4 — o relatório

Quatro blocos, nesta ordem:

1. **O número da semana** — quanto entrou, quanto saiu, custo por resultado, e se
   subiu ou caiu contra a semana anterior
2. **O que está funcionando** — a campanha, o anúncio, o público. Com número do lado
3. **O que está queimando verba** — onde o dinheiro sai sem voltar. Com o valor
   perdido em reais, não em porcentagem
4. **O que fazer na segunda** — no máximo **três** ações, em ordem de impacto

Cada ação com a conta do lado: *"Pausar o anúncio 3: R$ 340 gastos, zero conversão em
2 semanas."*

## Passo 5 — entregar

`relatorio-ads-<AAAA-MM-DD>.md`. Se houver histórico das semanas anteriores na pasta,
**leia e diga o que mudou desde a última recomendação** — inclusive quando a pessoa
não fez o que você sugeriu. Sem isso o relatório vira ritual.

## Nunca

- **Não peça credencial, login ou acesso à conta**
- **Não conclua com pouco dado.** "Ainda sem dado" é resposta profissional
- **Não recomende aumentar verba** em campanha sem conversão medida
- **Não invente número que não está no export.** Nem "aproximadamente"
- **Não mexa nas campanhas.** Você lê e recomenda; quem clica é a pessoa
- **Não culpe o algoritmo.** Se você não sabe a causa, diga que não sabe
