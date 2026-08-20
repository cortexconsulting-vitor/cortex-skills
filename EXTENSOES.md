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
· skills em [remotion-dev/skills](https://github.com/remotion-dev/skills)
· framework em [remotion-dev/remotion](https://github.com/remotion-dev/remotion)

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

## claude-video — assistir, transcrever e resumir vídeo

Baixa o vídeo (URL ou arquivo local), extrai quadros, pega a legenda ou transcreve o
áudio, e responde perguntas sobre o conteúdo. Serve para resumir, achar o minuto de
um trecho, analisar vídeo de concorrente e diagnosticar bug a partir de gravação de
tela. O comando é `/watch`.

Combina bem com a nossa `video`: **esta acha o minuto, a nossa corta**.

**Fonte oficial:** [github.com/bradautomates/claude-video](https://github.com/bradautomates/claude-video)

```
/plugin marketplace add bradautomates/claude-video
/plugin install watch@claude-video
```

Fora do Claude Code: `npx skills add bradautomates/claude-video -g`.

**Licença: MIT.** É a mais permissiva das três desta página — permite usar,
modificar e **redistribuir**, desde que a licença e o crédito ao autor viajem junto.
Mesmo assim apontamos para a fonte em vez de embalar: o projeto se atualiza, cópia
embalada envelhece parada, e o comprador precisa configurar chave própria de
qualquer jeito.

**Exige, e isto é o que custa:**

| Item | O que é |
|---|---|
| `ffmpeg` | Livre. Você já instalou se usa a nossa `video` |
| `yt-dlp` | Livre. `brew install yt-dlp` |
| Chave de Groq **ou** OpenAI | **Paga.** Só entra quando o vídeo não tem legenda |

Vídeo com legenda disponível sai de graça. Sem legenda, a transcrição é cobrada por
minuto de áudio. Não existe versão sem essa conta — o que existe é escolher entre
pagar por API ou rodar um modelo pesado na própria máquina.

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
