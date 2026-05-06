import { escapeHtml } from './security.mjs'

const documentShell = ({ body, title }) => `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body>
    ${body}
  </body>
</html>`

export const renderLoginPage = ({
  authConfigured,
  feedbackMessage = '',
  nextPath = '/dashboard',
}) =>
  documentShell({
    title: 'Login seguro',
    body: `
      <main>
        <h1>Login seguro</h1>
        <p>Esta area usa sessao protegida por cookie httpOnly e validacao no backend.</p>
        ${
          feedbackMessage
            ? `<p><strong>${escapeHtml(feedbackMessage)}</strong></p>`
            : ''
        }
        ${
          authConfigured
            ? `
              <form method="post" action="/login" novalidate>
                <input type="hidden" name="next" value="${escapeHtml(nextPath)}" />
                <p>
                  <label for="email">E-mail</label><br />
                  <input id="email" name="email" type="email" autocomplete="username" required />
                </p>
                <p>
                  <label for="password">Senha</label><br />
                  <input id="password" name="password" type="password" autocomplete="current-password" required />
                </p>
                <button type="submit">Entrar</button>
              </form>
            `
            : '<p>A autenticacao segura ainda nao foi configurada neste ambiente.</p>'
        }
        <p><a href="/">Voltar ao site</a></p>
      </main>
    `,
  })

export const renderProtectedPage = ({
  profile,
  title,
  subtitle,
}) =>
  documentShell({
    title,
    body: `
      <main>
        <h1>${escapeHtml(title)}</h1>
        <p>${escapeHtml(subtitle)}</p>
        <p><strong>Usuario:</strong> ${escapeHtml(profile.fullName || profile.email || 'Conta autenticada')}</p>
        <p><strong>Role:</strong> ${escapeHtml(profile.role)}</p>
        <form method="post" action="/logout">
          <button type="submit">Encerrar sessao</button>
        </form>
        <p><a href="/">Voltar ao inicio</a></p>
      </main>
    `,
  })

export const renderUnauthorizedPage = () =>
  documentShell({
    title: 'Acesso negado',
    body: `
      <main>
        <h1>Acesso negado</h1>
        <p>Voce nao tem permissao para acessar esta area.</p>
        <p><a href="/">Voltar ao inicio</a></p>
      </main>
    `,
  })
