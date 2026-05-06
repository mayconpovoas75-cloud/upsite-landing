import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

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

const readStorageRootFromEnvFile = (projectRoot) => {
  const envPath = path.join(projectRoot, '.env')

  if (!existsSync(envPath)) {
    return ''
  }

  const content = readFileSync(envPath, 'utf8')

  for (const rawLine of content.split(/\r?\n/u)) {
    const line = rawLine.trim()

    if (!line || line.startsWith('#')) {
      continue
    }

    const normalized = line.startsWith('export ') ? line.slice(7) : line
    const separatorIndex = normalized.indexOf('=')

    if (separatorIndex <= 0) {
      continue
    }

    const key = normalized.slice(0, separatorIndex).trim()

    if (key !== 'GENERATED_STORAGE_ROOT') {
      continue
    }

    return stripQuotes(normalized.slice(separatorIndex + 1))
  }

  return ''
}

export const resolveGeneratedStorageRoot = ({
  projectRoot,
  env = process.env,
} = {}) => {
  const fallbackRoot = path.resolve(projectRoot ?? process.cwd())
  const configuredRoot = String(
    env.GENERATED_STORAGE_ROOT || readStorageRootFromEnvFile(fallbackRoot) || '',
  ).trim()

  return configuredRoot ? path.resolve(configuredRoot) : fallbackRoot
}

export const mapProjectPathToGeneratedStorage = ({
  projectRoot,
  originalPath,
  env = process.env,
}) => {
  const resolvedProjectRoot = path.resolve(projectRoot)
  const resolvedOriginalPath = path.resolve(originalPath)
  const relativePath = path.relative(resolvedProjectRoot, resolvedOriginalPath)

  if (
    !relativePath ||
    relativePath === '..' ||
    relativePath.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relativePath)
  ) {
    return resolvedOriginalPath
  }

  return path.resolve(
    resolveGeneratedStorageRoot({
      env,
      projectRoot: resolvedProjectRoot,
    }),
    relativePath,
  )
}

export const resolveGeneratedSubpath = ({
  projectRoot,
  subpath,
  env = process.env,
}) =>
  path.resolve(
    resolveGeneratedStorageRoot({
      env,
      projectRoot,
    }),
    subpath,
  )
