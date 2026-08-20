---
name: anuncio-google
description: Monta a campanha de Google Ads de busca — grupos por intenção, títulos e descrições dentro do limite de caracteres, palavras-chave com o tipo de correspondência certo e a lista de negativas que impede desperdício. Entrega o plano e um CSV para importar. Use quando alguém disser "criar campanha no Google", "anunciar no Google", "google ads", "quero aparecer patrocinado", ou /anuncio-google.
---

# Anúncio no Google

Campanha de busca mal montada não perde por criativo. Perde por **estrutura**: um
grupo com quarenta palavras diferentes, correspondência ampla sem negativa, e verba
indo para quem procurava outra coisa.

## Passo 0 — a memória e três perguntas

`negocio.md` para o que a empresa vende. Depois:

1. **"Quanto você pode gastar por mês, sem apertar?"**
2. **"Quanto vale um cliente novo pra você?"** — sem isso não dá para dizer se um
   clique de R$ 4 é caro ou barato
3. **"Para onde a pessoa vai clicando?"** — se não houver página específica do
   serviço, **pare**: mandar tráfego pago para a home é o jeito mais rápido de queimar
   verba, e uma página basta para consertar

**Se a verba for menor que R$ 600 por mês, diga.** Abaixo disso o dado demora tanto a
aparecer que não dá para otimizar nada — melhor concentrar em um serviço só, e diga
qual.

## Passo 1 — os grupos, por intenção

**Um grupo por intenção, de 5 a 15 palavras cada.** É a regra que mais separa campanha
que funciona de campanha que gasta.

Quarenta palavras num grupo só significa que o anúncio não fala com nenhuma delas.

| Intenção | Exemplo | Anúncio fala de |
|---|---|---|
| Serviço direto | "consultoria logística" | O serviço |
| Serviço + lugar | "consultoria logística curitiba" | O serviço e a cidade |
| Problema | "reduzir perda na entrega" | O problema, depois a solução |
| Concorrente | nome do concorrente | Cuidado: caro e delicado |

**Não inclua o grupo de concorrente no começo.** É caro, o índice de qualidade é baixo,
e o concorrente costuma revidar.

## Passo 2 — correspondência e negativas

- **Comece por frase e exata.** Ampla sem histórico entrega busca sem relação nenhuma
- **A ampla só entra depois** que houver conversão para o algoritmo aprender

**A lista de negativas é a peça que mais poupa dinheiro**, e a que ninguém faz.
Comece sempre por: `grátis`, `gratuito`, `curso`, `como fazer`, `vaga`, `emprego`,
`salário`, `pdf`, `download`, `o que é`, `significado`, `reclame aqui`.

Acrescente as do ramo. Se a empresa não faz algo que parece próximo — atende empresa
e não pessoa física, por exemplo — isso vira negativa.

## Passo 3 — os textos, dentro do limite

Anúncio responsivo de busca:

| Campo | Limite | Quantidade |
|---|---|---|
| Título | **30 caracteres** | de 8 a 15 |
| Descrição | **90 caracteres** | 4 |
| Caminho exibido | 15 cada | 2 |

**Conte os caracteres. Não estime.** Título de 31 caracteres é rejeitado na
importação, e a pessoa descobre no meio do upload.

Regras que funcionam:

- **O termo do grupo aparece em pelo menos três títulos** — é o que segura o índice
  de qualidade
- Três títulos com o serviço, três com diferencial, três com chamada, um com preço ou
  prazo se houver
- **Nada de superlativo vazio.** "A melhor da região" não é aprovado e não convence
- **Se tem preço a partir de, use.** Filtra quem não pode pagar, e isso é economia
- Uma extensão de chamada e uma de local, se o negócio for local

## Passo 4 — o CSV

Gere `campanha-<AAAA-MM-DD>.csv` com uma linha por item e estas colunas:

```
Campanha,Grupo,Tipo,Conteudo,Correspondencia,Observacao
```

`Tipo` é `palavra-chave`, `negativa`, `titulo`, `descricao` ou `caminho`.

**Este é um formato nosso, legível, para conferência.** O importador do Google Ads
Editor tem formato próprio e ele muda entre versões — **não prometa que importa
direto**. Diga à pessoa para conferir o mapeamento de colunas na importação, ou
colar manualmente, que para uma campanha inicial leva quinze minutos.

Entregue junto o plano em markdown: os grupos, por que cada um existe, e o que
observar nas duas primeiras semanas.

## Passo 5 — o que fazer depois de publicar

Diga em três linhas, porque é aqui que a campanha se salva ou se perde:

1. **Termos de pesquisa, dia sim dia não, nas duas primeiras semanas.** Toda busca sem
   relação vira negativa. É o trabalho que faz a diferença
2. **Não mexa em lance nos primeiros 14 dias.** O algoritmo está aprendendo
3. **Sem conversão configurada, nada disso mede nada.** Configure antes de publicar

## Nunca

- **Não invente volume de busca nem custo por clique.** Você não tem a ferramenta.
  Diga que é estimativa
- **Não estoure limite de caractere.** Conte
- **Não publique nem acesse a conta.** Você monta; quem sobe é a pessoa
- **Não prometa retorno, posição ou custo por lead**
- **Não recomende ampla no começo**
- **Não mande tráfego pago para a home**
