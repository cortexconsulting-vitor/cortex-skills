# Guia — Salvar

## Pra que serve

Guarda teu trabalho no Git sem você precisar saber Git. Ela olha o que mudou,
separa por assunto, escreve as mensagens e te pergunta antes de enviar.

## Quando usar e quando não usar

**Use** ao terminar um bloco de trabalho — uma peça pronta, um documento fechado,
um ajuste que funcionou.

**Não use** para:

- **Salvar arquivo.** Isso o editor já fez. Esta é a cópia versionada, com
  histórico e possibilidade de voltar atrás
- **A cada dez minutos.** Commit a cada respiro vira histórico ilegível, que é o
  mesmo que não ter histórico
- **Publicar site ou subir para produção.** Ela envia para o repositório. Deploy
  é outra coisa
- **Guardar dado de cliente ou senha.** Ela vai te barrar, e está certa

## O que esperar

Primeiro ela te mostra o que mudou. Depois separa em commits por assunto — se
você mexeu numa proposta e num carrossel, saem dois, não um.

Aí ela mostra o que vai subir e **pergunta**. Enviar sempre precisa do teu sim,
toda vez. Ter autorizado ontem não vale para hoje.

Se achar `.env`, senha, token ou export de cliente no meio, ela **para** e te
mostra, em vez de perguntar se pode incluir.

## O erro comum

**Achar que ela vai limpar segredo que já subiu.**

Não vai, e ninguém vai. Quando um token entra no histórico do Git, ele está no
histórico de todo mundo que clonou, e reescrever isso é caro e costuma falhar
pela metade. A hora de pegar é antes do commit — que é exatamente onde ela olha.

Se você já subiu um segredo: **revogue a chave**, não tente apagar o commit. Chave
revogada é lixo; chave apagada do histórico continua no clone de alguém.

O segundo erro é **deixar tudo pra salvar no fim do dia**. Não porque se perde
trabalho, mas porque um commit gigante com sete assuntos não serve pra voltar
atrás em nenhum deles — e voltar atrás é a única razão de existir do Git.

## Como ajustar

**1. `.gitignore`.** O ajuste que mais poupa aborrecimento. Coloque ali o que
nunca deve subir antes que ela precise te barrar.

**2. Branch.** Se a mudança é grande ou incerta, peça branch. Ela oferece quando
você está na principal, mas não impõe.

**3. As mensagens.** Se as mensagens dela não estão do teu gosto, diga como você
quer — em português ou inglês, com ou sem prefixo tipo `feat:`. Ela segue o padrão
que já existe no repositório quando encontra um.
