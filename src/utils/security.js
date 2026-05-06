const CONTROL_CHARACTERS_REGEX = /[\u0000-\u001F\u007F]/g
const CONTROL_CHARACTERS_MULTILINE_REGEX = /[\u0000-\u0008\u000B-\u001F\u007F]/g
const ANGLE_BRACKETS_REGEX = /[<>]/g
const MULTIPLE_SPACES_REGEX = /\s+/g
const DISALLOWED_SEARCH_CHARACTERS_REGEX = /[`"'\\]/g

export const EXTERNAL_LINK_PROPS = Object.freeze({
  target: '_blank',
  rel: 'noopener noreferrer',
})

const normalizeInput = (value) => String(value ?? '').normalize('NFKC')
const normalizePathname = (value) =>
  value === '/' ? value : value.replace(/\/+$/, '') || '/'

export const sanitizePlainText = (value, { maxLength = 280 } = {}) => {
  const sanitized = normalizeInput(value)
    .replace(CONTROL_CHARACTERS_REGEX, ' ')
    .replace(ANGLE_BRACKETS_REGEX, '')
    .replace(MULTIPLE_SPACES_REGEX, ' ')
    .trim()

  return sanitized.slice(0, maxLength)
}

export const sanitizeMultilineText = (value, { maxLength = 1400 } = {}) => {
  const sanitized = normalizeInput(value)
    .replace(/\r\n?/g, '\n')
    .replace(CONTROL_CHARACTERS_MULTILINE_REGEX, ' ')
    .replace(ANGLE_BRACKETS_REGEX, '')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/[ \t]*\n[ \t]*/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()

  return sanitized.slice(0, maxLength)
}

export const sanitizeSearchTerm = (value) =>
  sanitizePlainText(value, { maxLength: 80 }).replace(
    DISALLOWED_SEARCH_CHARACTERS_REGEX,
    '',
  )

const parseAndValidateUrl = (
  value,
  {
    label,
    allowedHosts,
    allowedProtocols = ['https:'],
    allowedPathPrefixes = [],
    allowedSearchParams,
    customValidator,
  },
) => {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`${label} must be a non-empty string.`)
  }

  let parsedUrl

  try {
    parsedUrl = new URL(value)
  } catch {
    throw new Error(`${label} must be a valid absolute URL.`)
  }

  if (parsedUrl.username || parsedUrl.password) {
    throw new Error(`${label} must not contain embedded credentials.`)
  }

  if (!allowedProtocols.includes(parsedUrl.protocol)) {
    throw new Error(`${label} must use one of: ${allowedProtocols.join(', ')}`)
  }

  if (!allowedHosts.includes(parsedUrl.hostname.toLowerCase())) {
    throw new Error(`${label} host is not allowed.`)
  }

  if (allowedPathPrefixes.length) {
    const normalizedPath = normalizePathname(parsedUrl.pathname)
    const allowedPaths = allowedPathPrefixes.map((path) => normalizePathname(path))

    if (
      !allowedPaths.some(
        (path) =>
          normalizedPath === path || normalizedPath.startsWith(`${path}/`),
      )
    ) {
      throw new Error(`${label} path is not allowed.`)
    }
  }

  if (Array.isArray(allowedSearchParams)) {
    const allowedParams = new Set(allowedSearchParams)

    for (const [parameterName] of parsedUrl.searchParams) {
      if (!allowedParams.has(parameterName)) {
        throw new Error(
          `${label} contains a query parameter that is not allowed.`,
        )
      }
    }
  }

  if (typeof customValidator === 'function') {
    customValidator(parsedUrl)
  }

  parsedUrl.hash = ''

  return parsedUrl
}

export const validateExternalUrl = (value, options) =>
  parseAndValidateUrl(value, options).toString()

export const validateWhatsAppBaseUrl = (value) => {
  const parsedUrl = parseAndValidateUrl(value, {
    label: 'WhatsApp public URL',
    allowedHosts: ['wa.me'],
  })

  const phoneNumber = parsedUrl.pathname.replace(/\//g, '')

  if (!/^\d{10,15}$/.test(phoneNumber)) {
    throw new Error(
      'WhatsApp public URL must use the wa.me format with digits only.',
    )
  }

  parsedUrl.search = ''
  parsedUrl.hash = ''

  return `${parsedUrl.origin}/${phoneNumber}`
}

export const validateWhatsAppCtaUrl = (value) => {
  const parsedUrl = parseAndValidateUrl(value, {
    label: 'WhatsApp CTA URL',
    allowedHosts: ['wa.me'],
    allowedSearchParams: ['text'],
  })

  const phoneNumber = parsedUrl.pathname.replace(/\//g, '')

  if (!/^\d{10,15}$/.test(phoneNumber)) {
    throw new Error(
      'WhatsApp CTA URL must use the wa.me format with digits only.',
    )
  }

  parsedUrl.hash = ''

  return parsedUrl.toString()
}
