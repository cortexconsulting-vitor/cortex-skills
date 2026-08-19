# Convenção do Cortex Skills

Toda skill deste repositório tem **duas camadas**. É isso que separa o Cortex Skills
de um `git clone` qualquer: o comprador não recebe só instrução de máquina, recebe
o entendimento junto.

```
skills/<nome-da-skill>/
├── SKILL.md      # o que o Claude lê e executa
├── GUIA.md       # o que a PESSOA lê antes de usar
└── (arquivos de apoio: templates, scripts, exemplos)
```

## SKILL.md — camada da máquina

Frontmatter com `name` e `description`. A `description` decide se a skill dispara
na hora certa: precisa dizer **quando usar**, com as palavras que a pessoa usaria.
Corpo em passos executáveis, sem enrolação.

## GUIA.md — camada humana

Cinco seções, sempre nesta ordem:

1. **Pra que serve** — em uma frase, sem jargão
2. **Quando usar e quando não usar** — o "quando não" vale mais que o "quando"
3. **O que esperar** — o resultado concreto, com exemplo real
4. **O erro comum** — o que trava na primeira vez e como sair
5. **Como ajustar** — os dois ou três parâmetros que valem a pena mexer

## Regras de origem

- **Nada de terceiro entra aqui.** Nenhum arquivo derivado do MazyOS, do Remotion
  ou de qualquer repositório sem licença de redistribuição
- Skill que depende de ferramenta externa **instrui a instalar**, não embala
- Toda dependência com licença comercial é declarada no `GUIA.md`, com o limite
  (ex.: Remotion é livre até 3 funcionários; acima disso o comprador precisa de
  licença própria)

## Regra de marca

Nenhuma skill sai com a identidade da Córtex embutida. Cor, fonte, logo e rodapé
são **parâmetros do comprador**, lidos de `marca/marca.json`. Peça gerada com a
marca da Córtex no feed de outra pessoa é defeito, não recurso.
