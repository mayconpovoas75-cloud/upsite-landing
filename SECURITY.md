# Security Guide

## Escopo

Este projeto usa React no front-end e Supabase Auth como provedor de autenticacao social.
O navegador pode consumir apenas dados publicos e a chave publica `anon`.

## O que e seguro no front-end

- Textos, imagens, links publicos e configuracoes visuais.
- A URL publica do provedor de autenticacao.
- A chave publica `anon` do Supabase.
- Regras de UX como redirecionar usuario nao logado para `/login`.

## O que nunca deve ir para o front-end

- `SERVICE_ROLE_KEY`
- `CLIENT_SECRET`
- `DATABASE_PASSWORD`
- `JWT_SECRET`
- Senhas de usuarios
- Credenciais OAuth privadas do Google, Facebook ou X/Twitter

## Login social seguro

- O projeto usa OAuth oficial via provedor confiavel.
- Nenhuma senha e criada manualmente no app.
- Nenhum segredo OAuth fica no React.
- O callback volta para `/login` com caminho interno validado.
- Dominios e redirect URLs devem ser configurados no painel do provedor.

## Variaveis de ambiente

Use apenas variaveis `VITE_*` publicas no front-end:

- `VITE_PUBLIC_APP_URL`
- `VITE_AUTH_PROVIDER_URL`
- `VITE_AUTH_PUBLIC_KEY`

Nao publique `.env`, `.env.local` ou `.env.production`.

## Protecao do painel admin

- As rotas `/dashboard` e `/perfil` exigem sessao valida.
- A rota `/admin` exige sessao valida e role `admin` ou `editor`.
- O front-end faz a checagem para UX, mas a autorizacao real precisa continuar no backend/provedor.
- Em Supabase, proteja tudo com RLS, policies e RPCs.

## Como proteger o banco

- Nunca conecte com chave administrativa no navegador.
- Use apenas a chave publica `anon`.
- Ative Row Level Security.
- Garanta que usuario comum nao consiga alterar perfis administrativos.
- Permita operacoes sensiveis somente por RPC/policy para roles corretos.

## Login social e dominio autorizado

- Adicione o dominio final do site no provedor OAuth.
- Registre a redirect URL exata do ambiente:
  - `https://seudominio.com/login`
- Em homologacao, adicione tambem o dominio temporario usado para testes.
- Nao permita redirects genericos ou dominos nao autorizados.

## WhatsApp e links externos

- Toda mensagem de WhatsApp deve usar `encodeURIComponent`.
- Todo link externo com `target="_blank"` deve usar `rel="noopener noreferrer"`.

## Formularios e XSS

- O projeto nao usa `dangerouslySetInnerHTML`.
- Entradas sao sanitizadas e limitadas em tamanho.
- Validacoes feitas no front precisam ser repetidas no backend.

## Upload de imagem

Se o projeto evoluir para upload:

- Permita apenas imagens.
- Valide MIME type e extensao.
- Limite o tamanho do arquivo.
- Renomeie o arquivo no backend/storage.
- Nunca confie no nome original enviado pelo usuario.
- Proteja upload com rate limit e policy de role.

## Publicacao segura

- HTTPS obrigatorio.
- CSP configurada.
- `X-Frame-Options` ativo.
- `X-Content-Type-Options` ativo.
- `Referrer-Policy` restritiva.
- `Permissions-Policy` minima.

## Checklist antes de producao

- `.env` nao esta versionado.
- Login Google/Facebook/X funcionando.
- Logout funcionando.
- Rotas protegidas funcionando.
- Usuario comum nao entra em `/admin`.
- Roles `admin`, `editor` e `viewer` revisadas.
- Nenhum segredo exposto no front-end.
- Sem logs de token, sessao ou dados sensiveis.
- HTTPS e dominio autorizado configurados.
