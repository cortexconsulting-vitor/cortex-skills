#!/usr/bin/env python3
"""Auditoria de origem do Cortex Skills.

Mede o maior trecho LITERAL em comum entre cada arquivo do produto e o conjunto
das fontes derivadas do MazyOS. Rode antes de vender qualquer versao nova, e
sempre que entrar skill nova.

    python3 auditoria/auditar.py

Sai com codigo 1 se algum arquivo passar do limite.

Por que trecho literal, e nao "similaridade": dois markdowns em portugues sobre
o mesmo assunto batem ~90% em qualquer medida de frequencia de caractere, o que
nao mede copia nenhuma. O que mede e o tamanho do maior pedaco identico.

Por que janela com hash, e nao difflib: difflib e quadratico e nao termina com
30 fontes. Aqui, para cada tamanho K testado, guardamos o hash de toda janela de
K caracteres das fontes e perguntamos se alguma janela nossa cai no conjunto.
Busca binaria em K acha o maior trecho em tempo linear.
"""
import os, re, glob, sys

LIMITE = 120  # caracteres. Paragrafo copiado passa de 200; abaixo de ~80 e idioma.
LIMITE_DESC = 30  # frontmatter description, ja sem o andaime.
                  # As descricoes do MazyOS ficam carregadas no contexto de quem
                  # escreve, e sao o lugar mais facil de ecoar sem perceber. Mas
                  # o andaime tem que sair antes de medir: "use quando o usuario
                  # disser" e convencao do proprio Claude Code, e a lista de
                  # gatilhos entre aspas e necessidade funcional — a skill
                  # chamada salvar precisa reagir a palavra "salvar". Nada disso
                  # e expressao protegivel, e medir com o andaime dentro produz
                  # alarme falso, que e pior que alarme nenhum: ensina a ignorar.

def so_o_essencial(desc):
    """Tira o andaime da description e devolve so a parte autoral."""
    d = re.split(r'\buse (?:quando|para)\b', desc, maxsplit=1)[0]
    d = re.sub(r'"[^"]*"', ' ', d)      # gatilhos entre aspas
    d = re.sub(r'/[a-z-]+', ' ', d)     # gatilhos tipo /salvar
    return re.sub(r'\s+', ' ', d).strip()
TETO = 600    # maior trecho que vale a pena procurar

FONTES = [
    '~/Cortex/operacao/.claude/skills/*/*.md',
    '~/Cortex/laboratorio/legado-cortex-os/.claude/skills/*/*.md',
]

def norm(t):
    return re.sub(r'\s+', ' ', t.lower()).strip()

def janelas(texto, k):
    return {texto[i:i + k] for i in range(len(texto) - k + 1)}

def maior_trecho(meu, blobs_por_k, blob):
    """Busca binaria: maior k tal que meu e blob compartilhem alguma janela."""
    baixo, alto, achado = 1, min(TETO, len(meu)), ''
    while baixo <= alto:
        k = (baixo + alto) // 2
        if k not in blobs_por_k:
            blobs_por_k[k] = janelas(blob, k)
        comum = next((w for w in (meu[i:i + k] for i in range(len(meu) - k + 1))
                      if w in blobs_por_k[k]), None)
        if comum:
            achado, baixo = comum, k + 1
        else:
            alto = k - 1
    return achado

def main():
    raiz = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    os.chdir(raiz)

    nossos = sorted(glob.glob('.claude/skills/*/*.md') + glob.glob('.claude/skills/*/*.js')
                    + glob.glob('.claude/skills/*/*/*.html') + glob.glob('.claude/skills/*/*/*.js')
                    + glob.glob('.claude/skills/*/*.json'))
    fontes = []
    for padrao in FONTES:
        fontes += glob.glob(os.path.expanduser(padrao))
    fontes.sort()

    if not fontes:
        print('✗ nenhuma fonte encontrada — a auditoria nao verificou nada.')
        print('  as pastas de origem sumiram ou mudaram de lugar.')
        return 1

    textos = {f: norm(open(f, encoding='utf-8', errors='replace').read()) for f in fontes}
    # \x00 entre as fontes impede que um trecho "atravesse" dois arquivos.
    blob = '\x00'.join(textos.values())
    cache = {}

    print(f'produto: {len(nossos)} arquivos · fontes MazyOS: {len(fontes)} arquivos')
    print(f'limite: {LIMITE} caracteres\n')

    reprovados = []
    for n in nossos:
        bruto = open(n, encoding='utf-8').read()
        meu = norm(bruto)
        trecho = maior_trecho(meu, cache, blob)
        tam = len(trecho)
        onde = next((f for f, t in textos.items() if trecho and trecho in t), '—')
        ok = tam < LIMITE
        if not ok:
            reprovados.append((n, onde, tam, trecho))
        print(f'{"  " if ok else "✗ "}{n:46s} {tam:4d} car.  "{trecho[:50]}"')

        # A description do frontmatter passa por um limite mais apertado.
        m = re.search(r'^description:(.*)$', bruto, re.M)
        if m:
            d = so_o_essencial(norm(m.group(1)))
            td = maior_trecho(d, cache, blob) if d else ''
            if len(td) >= LIMITE_DESC:
                onded = next((f for f, t in textos.items() if td in t), '—')
                reprovados.append((n + ' (description)', onded, len(td), td))
                print(f'  ✗ ^ description: {len(td)} car. em comum  "{td[:50]}"')

    print()
    if reprovados:
        print(f'✗ REPROVADO: {len(reprovados)} arquivo(s) passaram do limite.')
        for n, onde, tam, tr in reprovados:
            print(f'  {n}  ({tam} car.)  contra  {onde}')
            print(f'    "{tr[:200]}"')
        print('\nNao vender esta versao. Reescrever os trechos apontados.')
        return 1

    print('✓ APROVADO: nenhum arquivo do produto tem trecho literal acima do limite.')
    return 0

if __name__ == '__main__':
    sys.exit(main())
