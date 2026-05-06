import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { mapProjectPathToGeneratedStorage } from '../generated-paths.mjs'

const rootDir = fileURLToPath(new URL('../', import.meta.url))

const stripQuotes = (value) => {
  const trimmed = String(value ?? '').trim()

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1)
  }

  return trimmed
}

export const loadEnvFile = (envPath = path.join(rootDir, '.env')) => {
  if (!existsSync(envPath)) {
    return
  }

  const content = readFileSync(envPath, 'utf8')

  for (const rawLine of content.split(/\r?\n/u)) {
    const line = rawLine.trim()

    if (!line || line.startsWith('#')) {
      continue
    }

    const withoutExport = line.startsWith('export ') ? line.slice(7) : line
    const separatorIndex = withoutExport.indexOf('=')

    if (separatorIndex <= 0) {
      continue
    }

    const key = withoutExport.slice(0, separatorIndex).trim()
    const value = stripQuotes(withoutExport.slice(separatorIndex + 1))

    if (!process.env[key]) {
      process.env[key] = value
    }
  }
}

loadEnvFile()

const distDir = mapProjectPathToGeneratedStorage({
  originalPath: path.join(rootDir, 'dist'),
  projectRoot: rootDir,
})

const parseInteger = (value, fallback) => {
  const parsed = Number.parseInt(String(value ?? ''), 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

const normalizeOrigin = (value, fallback) => {
  try {
    const parsed = new URL(value || fallback)
    return parsed.origin
  } catch {
    return fallback
  }
}

const isProduction = process.env.NODE_ENV === 'production'
const host = process.env.HOST || '127.0.0.1'
const port = parseInteger(process.env.PORT, 4173)
const defaultOrigin = `http://${host}:${port}`
const appOrigin = normalizeOrigin(process.env.APP_URL, defaultOrigin)
const corsAllowedOrigin = normalizeOrigin(
  process.env.CORS_ALLOWED_ORIGIN,
  appOrigin,
)

export const config = Object.freeze({
  appOrigin,
  corsAllowedOrigin,
  distDir,
  host,
  isProduction,
  port,
  rootDir,
})
