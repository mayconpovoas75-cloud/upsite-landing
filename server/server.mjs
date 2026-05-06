import { createServer } from 'node:http'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { config } from './env.mjs'
import {
  applyCorsHeaders,
  isBlockedRequestPath,
  requestWantsJson,
  sendGenericError,
  sendJson,
  sendMethodNotAllowed,
  sendNotFound,
  serveStaticFile,
} from './security.mjs'

const resolveStaticPath = (pathname) => {
  const relativePath =
    pathname === '/'
      ? 'index.html'
      : decodeURIComponent(pathname).replace(/^\/+/u, '')

  const resolvedPath = path.resolve(config.distDir, relativePath)
  const normalizedDistDir = path.resolve(config.distDir)

  if (!resolvedPath.startsWith(normalizedDistDir)) {
    throw new Error('INVALID_STATIC_PATH')
  }

  return resolvedPath
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url || '/', config.appOrigin)
  const pathname = url.pathname
  const wantsJson = requestWantsJson(request, pathname)

  try {
    if (!applyCorsHeaders(request, response, config)) {
      sendJson(response, 403, { error: 'CORS bloqueado.' }, config)
      return
    }

    if (request.method === 'OPTIONS') {
      response.statusCode = 204
      response.end()
      return
    }

    if (!['GET', 'HEAD'].includes(request.method || '')) {
      sendMethodNotAllowed(response, config, wantsJson)
      return
    }

    if (isBlockedRequestPath(pathname)) {
      sendNotFound(response, config, wantsJson)
      return
    }

    const staticFilePath = resolveStaticPath(pathname)
    const cacheControl =
      pathname === '/' || staticFilePath.endsWith(`${path.sep}index.html`)
        ? 'no-store'
        : pathname.startsWith('/assets/')
          ? 'public, max-age=31536000, immutable'
          : 'public, max-age=3600'

    await fs.access(staticFilePath)
    await serveStaticFile(
      response,
      staticFilePath,
      config,
      cacheControl,
      request.method,
    )
  } catch (error) {
    if (
      String(error?.code).includes('ENOENT') ||
      String(error?.message).includes('STATIC_FILE_NOT_FOUND') ||
      String(error?.message).includes('INVALID_STATIC_PATH')
    ) {
      sendNotFound(response, config, wantsJson)
      return
    }

    console.error('[secure-server] unexpected failure', {
      message: error?.message,
      method: request.method,
      pathname,
    })
    sendGenericError(response, config, wantsJson)
  }
})

server.listen(config.port, config.host, () => {
  console.log(
    `[secure-server] listening on ${config.appOrigin} serving ${config.distDir}`,
  )
})
