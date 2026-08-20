#!/usr/bin/env python3
"""Auditoria de origem do Cortex Skills.

Mede o maior trecho LITERAL em comum entre cada arquivo do produto e o conjunto
das fontes derivadas do MazyOS. Rode antes de vender qualquer versao nova, e
sempre que entrar skill nova.

    python3 auditoria/auditar.py
    python3 auditoria/auditar.py --source ~/outro/caminho/.claude/skills

Sai com codigo 1 se: nenhuma fonte for encontrada, nenhum arquivo do produto
for descoberto, ou algum trecho passar do limite. Nunca aprova em silencio.

Por que trecho literal, e nao "similaridade": dois markdowns em portugues sobre
o mesmo assunto batem ~90% em qualquer medida de frequencia de caractere, o que
nao mede copia nenhuma. O que mede e o tamanho do maior pedaco identico.

Por que janela com hash, e nao difflib: difflib e quadratico e nao termina com
30 fontes. Aqui, para cada tamanho K testado, guardamos o hash de toda janela de
K caracteres das fontes e perguntamos se alguma janela nossa cai no conjunto.
Busca binaria em K acha o maior trecho em tempo linear.

Este script e uma ferramenta do AUTOR, para provar de onde vem o texto antes de
publicar uma versao nova. O comprador do produto nao precisa roda-lo — ele nao
tem as pastas de origem na maquina, e sem elas o script recusa aprovar (ve
"nenhuma fonte encontrada" abaixo). Um clone publico sem --source configurado
deve falhar ruidosamente, nunca aprovar vazio.
"""
import argparse, os, re, sys

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
TETO = 600    # maior trecho que vale a pena procurar

EXTENSOES_AUTORAIS = {'.md', '.js', '.html', '.json', '.css', '.py', '.sh', '.txt'}

# Fallback do autor: as duas linhas derivadas do MazyOS, preservadas fora deste
# repositorio. --source substitui esta lista inteira quando informado.
FONTES_PADRAO = [
    '~/Cortex/operacao/.claude/skills',
    '~/Cortex/laboratorio/legado-cortex-os/.claude/skills',
]

# Nomes que nunca sao autorais mesmo com extensao autoral: lockfile de
# terceiro, cache, saida gerada.
IGNORAR_NOME = {'package-lock.json'}
IGNORAR_DIR = {'node_modules', '__pycache__', '.git', 'instagram'}

def so_o_essencial(desc):
    """Tira o andaime da description e devolve so a parte autoral."""
    d = re.split(r'\buse (?:quando|para)\b', desc, maxsplit=1)[0]
    d = re.sub(r'"[^"]*"', ' ', d)      # gatilhos entre aspas
    d = re.sub(r'/[a-z-]+', ' ', d)     # gatilhos tipo /salvar
    return re.sub(r'\s+', ' ', d).strip()

def norm(t):
    return re.sub(r'\s+', ' ', t.lower()).strip()

def descobrir(raiz):
    """Varre raiz recursivamente e devolve todo arquivo de texto autoral.

    Recursivo de proposito: um glob fixo por profundidade (`*/*.md`,
    `*/*/*.html`) para de enxergar assim que a estrutura de pastas de uma
    skill cresce um nivel — foi assim que os tres estilos/*.json do carrossel
    ficaram fora da auditoria por semanas, sem nenhum aviso.
    """
    achados = []
    for atual, dirs, arquivos in os.walk(raiz):
        dirs[:] = [d for d in dirs if d not in IGNORAR_DIR]
        for nome in arquivos:
            if nome in IGNORAR_NOME:
                continue
            if os.path.splitext(nome)[1].lower() in EXTENSOES_AUTORAIS:
                achados.append(os.path.join(atual, nome))
    return sorted(achados)

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
    ap = argparse.ArgumentParser(description=__doc__.split('\n\n')[0],
                                  formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--source', action='append', dest='fontes', metavar='PASTA',
                     help='pasta de skills a comparar (repetivel). Sem isto, usa o '
                          'fallback do autor — as duas linhas locais derivadas do '
                          'MazyOS, que nao existem fora da maquina de quem escreveu '
                          'este produto.')
    args = ap.parse_args()

    raiz = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    os.chdir(raiz)

    nossos = descobrir('.claude/skills')
    if not nossos:
        print('✗ nenhum arquivo do produto foi descoberto em .claude/skills/.')
        print('  isto e mais grave que reprovar: significa que a auditoria nao')
        print('  verificou nada. Confira se voce esta na raiz do repositorio.')
        return 1

    padroes_fonte = args.fontes or FONTES_PADRAO
    fontes = []
    for padrao in padroes_fonte:
        fontes += descobrir(os.path.expanduser(padrao))
    fontes.sort()

    if not fontes:
        print('✗ nenhuma fonte encontrada — a auditoria nao verificou nada.')
        if not args.fontes:
            print('  as pastas de origem do autor sumiram ou mudaram de lugar:')
            for p in FONTES_PADRAO:
                print(f'    {p}')
            print('  isto e esperado numa maquina que nao e a do autor: quem')
            print('  compra o produto nao precisa rodar esta auditoria. Para')
            print('  comparar com outras fontes, use --source <pasta>.')
        else:
            print('  nenhuma das pastas passadas em --source existe ou tem arquivo:')
            for p in args.fontes:
                print(f'    {p}')
        return 1

    textos = {f: norm(open(f, encoding='utf-8', errors='replace').read()) for f in fontes}
    # \x00 entre as fontes impede que um trecho "atravesse" dois arquivos.
    blob = '\x00'.join(textos.values())
    cache = {}

    print(f'produto: {len(nossos)} arquivos · fontes: {len(fontes)} arquivos')
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
        print(f'{"  " if ok else "✗ "}{n:52s} {tam:4d} car.  "{trecho[:50]}"')

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
