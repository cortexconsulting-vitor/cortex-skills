---
name: resposta-cliente
description: Escreve a resposta para uma mensagem de cliente — WhatsApp, email, direct — no tom da própria empresa. Serve para pedido de desconto, reclamação, orçamento parado, cobrança atrasada, pedido fora do combinado e "vou pensar". Use quando a pessoa colar uma mensagem de cliente, ou disser "como eu respondo isso", "responde esse cliente", "o cliente falou X", "me ajuda com essa mensagem", "/resposta-cliente".
---

# Resposta a cliente

Escreve a resposta que a pessoa mandaria se tivesse duas horas para pensar nela.

## Passo 0 — a voz existe?

Siga o contrato de memória: `marca/marca.json` no workspace, `marca.json` na pasta,
`~/.claude/cortex-.claude/skills/marca.json` no global. Achou, **use e não pergunte nada**.

O que importa aqui é o bloco `voz`. **Se a marca existe mas não tem `voz`**, faça
só estas três perguntas — não repita as de identidade, que já estão respondidas:

1. **"Você trata cliente por *você* ou por *senhor*?"**
2. **"Como você fala com cliente: direto ao ponto, ou mais cuidadoso e explicativo?"**
3. **"Tem alguma coisa que você nunca escreveria?"** — jargão, emoji, promessa de
   resultado, desculpa longa. É o campo que mais evita retrabalho.

Grave `voz` no mesmo arquivo de onde veio a marca e diga onde gravou.

**Sem marca nenhuma?** Faça as três acima e mais uma — *"Como você assina?"* — e
ofereça gravar em `~/.claude/cortex-.claude/skills/marca.json`.

## Passo 1 — dizer o que a mensagem realmente é

Antes de escrever qualquer linha, **nomeie o que chegou**. É a parte que a pessoa
não consegue fazer sozinha, porque ela está dentro da conversa.

Leia a mensagem e diga, em uma frase, o que ela é por baixo do texto:

| O que parece | O que costuma ser |
|---|---|
| "Quanto custa?" na primeira mensagem | Ainda não há problema definido. Preço agora vira leilão |
| "Achei um pouco caro" | Pedido de desconto, ou valor não ficou claro. São saídas opostas |
| "Vou pensar e te falo" | Sumiço educado, ou falta uma informação para decidir |
| "Só uma coisinha rápida" | Escopo crescendo. A terceira "coisinha" já é um projeto |
| Reclamação longa e detalhada | A pessoa quer ser ouvida antes de querer solução |
| Silêncio depois do orçamento | Quase nunca é sobre você |

**Diga isso ao usuário antes de escrever.** Se você leu errado, ele corrige ali —
e corrigir a leitura custa uma frase, enquanto corrigir a resposta custa o texto
inteiro.

Se a mensagem não encaixa em nada disso, diga o que você entendeu e siga.

## Passo 2 — uma pergunta, não cinco

Você precisa saber **o que a pessoa quer que aconteça** depois da resposta. Quase
sempre é uma pergunta só:

> "O que você quer que aconteça aqui: manter o preço, dar desconto com contrapartida,
> ou entender melhor antes de falar de valor?"

Ofereça as saídas reais daquele caso, e **diga qual você recomenda e por quê**. Não
devolva um formulário.

Se faltar informação que só ela tem — o que foi combinado, quanto foi orçado, há
quanto tempo está parado — pergunte junto, na mesma mensagem. Uma rodada, não seis.

## Passo 3 — escrever

Aplique `voz`: `tratamento`, `tom`, `evitar`, `assinatura`. `evitar` é regra dura —
se está lá, não aparece, nem em versão suavizada.

Regras que valem em qualquer resposta de cliente:

- **Curta.** Mensagem de cliente se responde em 3 a 6 linhas. Texto longo lê como
  defesa, e defesa parece culpa
- **Uma pergunta no fim, no máximo.** Duas perguntas fazem a pessoa responder só
  a segunda
- **Nada de pedido de desculpa que não é devido.** "Desculpa incomodar" na cobrança
  de um pagamento atrasado inverte quem deve o quê
- **Diga a próxima ação com data.** "Te mando quinta" fecha; "te aviso" não fecha
- **Sem promessa que a empresa não controla.** Prazo de terceiro, resultado de
  campanha, aprovação alheia
- **Escreva no canal certo.** WhatsApp não tem parágrafo de abertura. Email tem
  assunto — escreva o assunto também

## Passo 4 — entregar

Devolva **a resposta pronta para copiar**, sem comentário no meio do texto.

Depois dela, e só depois, em duas ou três linhas: o que você escolheu não escrever,
e por quê. É onde a pessoa aprende — mas ela precisa poder copiar antes de ler.

Se o caso tem duas saídas legítimas (manter o preço ou negociar), escreva **as duas
versões** e diga qual você mandaria. Nunca mais que duas.

## Nunca

- **Não invente fato.** Prazo, valor, garantia, o que foi combinado. Se não está na
  mensagem nem na memória, **pergunte** — inventar aqui vira promessa que a empresa
  vai ter que cumprir
- **Não escreva antes de nomear a mensagem.** O Passo 1 é o que separa esta skill
  de um gerador de texto educado
- **Não amacie cobrança.** Quem deve é quem deve
- **Não use `evitar` "só dessa vez"**
- **Não mande você mesmo.** Você escreve; quem envia é a pessoa
