# Extensões — o que você instala por fora

Algumas coisas boas **não podem vir dentro do Cortex Skills**, e não é descuido: são
obra de outras pessoas, com licença própria. Embalar aqui seria redistribuir o
trabalho delas — ver "Cobrar pelo acesso é distribuir" no [`CONVENCAO.md`](CONVENCAO.md).

O que a gente faz em vez disso é o que você está lendo: **dizer o que vale a pena, de
onde vem, o que custa, e como instalar.** Uma vez instalada, a extensão vive ao lado
das nossas skills e as duas se conversam normalmente.

---

## Remotion — vídeo feito por código

Cria vídeo escrevendo React: animação, gráfico que se move, legenda animada, abertura
com a sua marca. É outra categoria do que a nossa skill `video` faz — a nossa **edita
o que já existe**, o Remotion **desenha do zero**.

**Fonte oficial:** [remotion.dev/docs/ai/skills](https://www.remotion.dev/docs/ai/skills)
· repositório [remotion-dev/skills](https://github.com/remotion-dev/skills)

```bash
npx remotion skills add
```

Instala em `.agents/skills` do projeto, com `.claude/skills` apontando pra lá. Para
atualizar depois: `npx remotion skills update`.

**Licença — leia antes de construir em cima.** O Remotion é gratuito para pessoa
física, empresa com **até 3 funcionários** e projeto sem fins lucrativos. Acima disso
exige licença paga por assento. Isso é entre você e o Remotion; não passa por nós.
Confira as condições atuais em [remotion.pro](https://www.remotion.pro/license) antes
de virar dependência do seu processo.

**Exige:** Node e alguma familiaridade com React. Se você nunca escreveu componente,
o caminho curto é a nossa `video`, não esta.

---

## Analisar vídeo — assistir e resumir

Skill que assiste a um vídeo e devolve resumo, marcações de tempo e trechos que
valem corte. Combina bem com a nossa `video`: uma acha o trecho, a outra corta.

**Ainda não indicamos uma fonte.** Existem várias implementações públicas, com
qualidades e licenças diferentes, e recomendar uma que a gente não testou seria
empurrar o problema pro comprador. Quando houver uma testada, ela entra aqui com
fonte, licença e limite — como o Remotion acima.

**O que toda opção vai te cobrar:** transcrição. Ou uma API paga por minuto de
áudio, ou um modelo local pesado na sua máquina. Não existe versão sem esse custo,
e quem prometer que existe está escondendo a conta.

---

## Como instalar qualquer skill de terceiro

O formato é sempre o mesmo. Uma skill é uma pasta com um `SKILL.md` dentro:

```bash
# valendo em todas as pastas
git clone <repositorio-da-skill> ~/.claude/skills/<nome>

# valendo só neste projeto
git clone <repositorio-da-skill> .claude/skills/<nome>
```

Reinicie o Claude Code depois. Se a skill não aparecer, quase sempre é uma destas
duas coisas: o `SKILL.md` não está na raiz da pasta, ou o frontmatter dele não tem
`name` e `description`.

### Antes de instalar, três perguntas

1. **Qual a licença?** Sem arquivo de licença, o padrão é copyright fechado — você
   pode usar, mas não redistribuir nem incluir num produto seu
2. **O que ela custa para rodar?** API paga, assinatura, modelo local pesado
3. **Ela pede credencial?** Skill que pede chave, token ou senha merece leitura
   linha a linha antes de rodar. As nossas nunca pedem

### O que isso significa para quem revende

**Extensão instalada não vira parte do seu produto.** Se você vende o Cortex Skills
adaptado, o que você vende continua sendo o que está neste repositório. As extensões
o seu comprador instala por conta dele, pela fonte oficial, e a licença é entre ele e
o autor — nunca através de você.
