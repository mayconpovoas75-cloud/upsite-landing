import { createReadStream, promises as fs } from 'node:fs'
import path from 'node:path'
import { sanitizePlainText } from '../src/utils/security.js'

const MIME_TYPES = Object.freeze({
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
})

const BLOCKED_PREFIXES = [
  '/.codex',
  '/.git',
  '/.idea',
  '/.vite',
  '/.vscode',
  '/backups',
  '/exports',
  '/node_modules',
  '/server',
  '/src',
  '/supabase',
]

const BLOCKED_EXACT_PATHS = new Set([
  '/auth_setup.md',
  '/package-lock.json',
  '/package.json',
  '/postcss.config.js',
  '/readme.md',
  '/security.md',
  '/security_headers.md',
  '/tailwind.config.js',
  '/vite.config.js',
])

const BLOCKED_FILENAME_REGEX =
  /(^|\/)\.(?!well-known\/)|\.(bak|backup|env|log|old|pem|key|crt|sql|sqlite|sqlite3)(?:$|\?)/iu

export const applySecurityHeaders = (response, config, options = {}) => {
  const cacheControl = options.cacheControl || 'no-store'
  const csp = [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data:",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "manifest-src 'self'",
  ].join('; ')

  response.setHeader('Cache-Control', cacheControl)
  response.setHeader('Content-Security-Policy', csp)
  response.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
  response.setHeader('Cross-Origin-Resource-Policy', 'same-origin')
  response.setHeader('Origin-Agent-Cluster', '?1')
  response.setHeader(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  )
  response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.setHeader('X-Content-Type-Options', 'nosniff')
  response.setHeader('X-DNS-Prefetch-Control', 'off')
  response.setHeader('X-Frame-Options', 'DENY')
  response.setHeader('X-Permitted-Cross-Domain-Policies', 'none')

  if (config.isProduction) {
    response.setHeader(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains',
    )
  }
}

export const applyCorsHeaders = (request, response, config) => {
  const origin = request.headers.origin

  if (!origin) {
    return true
  }

  // Para uma landing page estática, arquivos públicos podem ser carregados
  // normalmente mesmo quando o navegador envia o header Origin.
  if (['GET', 'HEAD'].includes(request.method || '')) {
    return true
  }

  if (origin !== config.corsAllowedOrigin) {
    return false
  }

  response.setHeader('Access-Control-Allow-Credentials', 'false')
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  response.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS')
  response.setHeader('Access-Control-Allow-Origin', origin)
  response.setHeader('Vary', 'Origin')

  return true
}

export const sendJson = (response, statusCode, payload, config, options = {}) => {
  applySecurityHeaders(response, config, options)
  response.statusCode = statusCode
  response.setHeader('Content-Type', 'application/json; charset=utf-8')
  response.end(JSON.stringify(payload))
}

export const sendHtml = (response, statusCode, html, config, options = {}) => {
  applySecurityHeaders(response, config, options)
  response.statusCode = statusCode
  response.setHeader('Content-Type', 'text/html; charset=utf-8')
  response.end(html)
}

export const sendNotFound = (response, config, wantsJson = false) => {
  if (wantsJson) {
    sendJson(response, 404, { error: 'Recurso nao encontrado.' }, config)
    return
  }

  sendHtml(
    response,
    404,
    '<!doctype html><html lang="pt-BR"><body><h1>404</h1><p>Recurso nao encontrado.</p></body></html>',
    config,
  )
}

export const sendMethodNotAllowed = (response, config, wantsJson = false) => {
  if (wantsJson) {
    sendJson(response, 405, { error: 'Metodo nao permitido.' }, config)
    return
  }

  sendHtml(
    response,
    405,
    '<!doctype html><html lang="pt-BR"><body><h1>405</h1><p>Metodo nao permitido.</p></body></html>',
    config,
  )
}

export const sendGenericError = (response, config, wantsJson = false) => {
  if (wantsJson) {
    sendJson(
      response,
      500,
      { error: 'Nao foi possivel concluir a solicitacao agora.' },
      config,
    )
    return
  }

  sendHtml(
    response,
    500,
    '<!doctype html><html lang="pt-BR"><body><h1>Erro</h1><p>Algo deu errado. Tente novamente mais tarde.</p></body></html>',
    config,
  )
}

export const requestWantsJson = (request, pathname) => {
  const acceptHeader = request.headers.accept || ''
  return pathname.startsWith('/api/') || acceptHeader.includes('application/json')
}

export const isBlockedRequestPath = (pathname) => {
  const safePath = sanitizePlainText(pathname ?? '', { maxLength: 400 })
  const normalizedPath = safePath.toLowerCase()

  if (!safePath.startsWith('/')) {
    return true
  }

  if (BLOCKED_EXACT_PATHS.has(normalizedPath)) {
    return true
  }

  if (
    BLOCKED_PREFIXES.some(
      (prefix) => normalizedPath === prefix || normalizedPath.startsWith(`${prefix}/`),
    )
  ) {
    return true
  }

  return BLOCKED_FILENAME_REGEX.test(normalizedPath)
}

export const serveStaticFile = async (
  response,
  filePath,
  config,
  cacheControl,
  method = 'GET',
) => {
  const extension = path.extname(filePath).toLowerCase()
  const mimeType = MIME_TYPES[extension] || 'application/octet-stream'
  const stats = await fs.stat(filePath)

  if (!stats.isFile()) {
    throw new Error('STATIC_FILE_NOT_FOUND')
  }

  applySecurityHeaders(response, config, {
    cacheControl,
  })
  response.statusCode = 200
  response.setHeader('Content-Length', stats.size)
  response.setHeader('Content-Type', mimeType)

  if (method === 'HEAD') {
    response.end()
    return
  }

  await new Promise((resolve, reject) => {
    const stream = createReadStream(filePath)
    stream.on('error', reject)
    stream.on('end', resolve)
    stream.pipe(response)
  })
}
