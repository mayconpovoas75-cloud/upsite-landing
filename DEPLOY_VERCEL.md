# Deploy profissional na Vercel

## Caminho recomendado

Para este projeto, o caminho mais simples e profissional e:

1. dominio na Hostinger
2. deploy do site na Vercel
3. DNS da Hostinger apontando para a Vercel

## Antes de subir

Confirme estes pontos no projeto:

- `npm install`
- `npm run build`
- variavel publica `VITE_PUBLIC_SITE_URL` com `https://upsite.business`
- variavel publica `VITE_PUBLIC_WHATSAPP_URL` com o link final do WhatsApp

## Passo a passo na Vercel

1. Suba este projeto para um repositorio no GitHub.
2. Entre na Vercel e clique em `Add New Project`.
3. Importe o repositorio.
4. Confirme estas configuracoes:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Em `Environment Variables`, adicione:
   - `VITE_PUBLIC_SITE_URL=https://upsite.business`
   - `VITE_PUBLIC_WHATSAPP_URL=https://wa.me/5591985789442?text=Ol%C3%A1%2C%20vi%20o%20site%20da%20UP%20SITE%20e%20quero%20saber%20como%20posso%20ter%20um%20site%20para%20meu%20neg%C3%B3cio`
6. Clique em `Deploy`.

## Conectar o dominio upsite.business

1. Dentro do projeto na Vercel, abra `Settings > Domains`.
2. Adicione `upsite.business`.
3. A Vercel vai mostrar os registros DNS exatos que precisam ser criados.
4. No painel da Hostinger, abra a zona DNS do dominio `upsite.business`.
5. Crie exatamente os registros que a Vercel pedir.
6. Volte para a Vercel e aguarde a validacao.

## Depois da propagacao

Teste estes pontos:

- `https://upsite.business`
- versao mobile
- botao do WhatsApp
- favicon
- carregamento das imagens do carrossel
- links do menu

## Observacoes importantes

- Nao suba o arquivo `.env`.
- A Vercel nao precisa do servidor Node local para publicar esta landing page.
- O arquivo `vercel.json` ja deixa os headers de seguranca basicos aplicados no deploy.
