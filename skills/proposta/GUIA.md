# Guia — Proposta

## Pra que serve

Você conta o caso do cliente e recebe a proposta pronta, com a sua marca, num
arquivo que abre no navegador e vira PDF. Escopo, o que não está incluído, fases
com prazo, valor e próximo passo — nas seções que fazem o cliente decidir.

## Quando usar e quando não usar

**Use** quando você já conversou com o cliente e sabe o que vai entregar, em
quanto tempo e por quanto.

**Não use** para:

- **Descobrir quanto cobrar.** Ela não estima preço, e vai te pedir o número.
  Isso é de propósito: valor chutado vira âncora e você não tira mais
- **Mandar antes de conversar.** Proposta escrita a partir de um email de duas
  linhas sai genérica, e genérica perde pra qualquer concorrente que ouviu
- **Contrato.** É proposta comercial. O que vira contrato é outra conversa, com
  advogado
- **Orçamento de produto com tabela.** O modelo é de serviço — escopo, fases,
  entrega. Item e quantidade não cabem aqui

## O que esperar

Primeiro ela pede o que falta do briefing, tudo de uma vez.

Depois escreve **só a seção "O que eu entendi"** e te mostra. É a parte que ganha
a proposta, e é a que ela quer aprovada antes de escrever o resto.

Com o aval, monta o documento inteiro e roda:

```
node montar.js proposta-<cliente>-<data>
```

Sai um `proposta.html`. Abre no navegador, Cmd+P, Salvar como PDF. **Não precisa
instalar nada** — nem Node além do que você já tem, nem biblioteca nenhuma.

No fim ela escreve a mensagem de envio, três linhas, separada do documento.

## O erro comum

**Pular "O que não está incluído" porque parece pouco generoso.**

Todo mundo faz isso na primeira vez. A proposta fica mais bonita e você trabalha
de graça três semanas depois, quando o cliente supôs que o treinamento vinha
junto e você não tem onde apontar.

Escreva o que ele pode razoavelmente supor que vem — e diga quando for **decisão**,
não limitação: "sistema sob medida não entra; a primeira volta é em planilha, de
propósito" é uma frase que vende, não que se desculpa.

O segundo erro é **deixar ela traduzir o problema pro seu vocabulário.** Se o
cliente disse "tá tudo no WhatsApp e ninguém acha nada" e a proposta diz "gestão
de comunicação ineficiente", ele para de se reconhecer na primeira página. Se o
entendimento vier em jargão, mande reescrever com as palavras dele.

## Como ajustar

**1. O título.** É o campo que mais muda o efeito. Ponha o **resultado** que ele
quer, não o nome do serviço: "Reduzir a perda entre a colheita e a entrega" vale
mais que "Consultoria em logística".

**2. A cor.** Sai de `paleta.acento` da sua marca, e é a única cor da marca que
entra. O papel continua claro de propósito — proposta se imprime, e fundo escuro
gasta tinta e fica ruim no papel.

**3. As fases.** De 3 a 5. Se você tem 8 etapas, agrupe: menos de 3 não mostra
método, mais de 5 vira cronograma e ninguém lê.

## Dependências

Nenhuma. Só o Node que roda o `montar.js`, e o navegador que você já tem.
