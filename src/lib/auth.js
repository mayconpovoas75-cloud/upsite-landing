import { createClient } from '@supabase/supabase-js'
import { sanitizePlainText } from '../utils/security'

const PUBLIC_APP_URL = String(import.meta.env.VITE_PUBLIC_APP_URL ?? '').trim()
const AUTH_PROVIDER_URL = String(
  import.meta.env.VITE_AUTH_PROVIDER_URL ?? '',
).trim()
const AUTH_PUBLIC_KEY = String(import.meta.env.VITE_AUTH_PUBLIC_KEY ?? '').trim()

const normalizeUrl = (value) => {
  if (!value) {
    return ''
  }

  try {
    const parsedUrl = new URL(value)

    if (!['https:', 'http:'].includes(parsedUrl.protocol)) {
      return ''
    }

    parsedUrl.hash = ''

    return parsedUrl.toString().replace(/\/+$/, '')
  } catch {
    return ''
  }
}

const currentOrigin =
  typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173'

export const normalizeRole = (role) => {
  const safeRole = sanitizePlainText(role ?? '', { maxLength: 30 }).toLowerCase()

  if (safeRole === 'admin' || safeRole === 'editor' || safeRole === 'viewer') {
    return safeRole
  }

  return 'viewer'
}

export const authConfig = Object.freeze({
  appUrl: normalizeUrl(PUBLIC_APP_URL) || currentOrigin,
  providerUrl: normalizeUrl(AUTH_PROVIDER_URL),
  publicKey: AUTH_PUBLIC_KEY,
})

export const isAuthConfigured =
  Boolean(authConfig.providerUrl) && Boolean(authConfig.publicKey)

export const oauthProviders = Object.freeze([
  { id: 'google', label: 'Google' },
  { id: 'facebook', label: 'Facebook' },
  { id: 'twitter', label: 'X/Twitter' },
])

export const STAFF_ROLES = Object.freeze(['admin', 'editor'])

export const createLoginPath = (nextPath = '/dashboard') =>
  `/login?next=${encodeURIComponent(sanitizeRedirectPath(nextPath))}`

export const sanitizeRedirectPath = (value) => {
  const safeValue = sanitizePlainText(value ?? '', { maxLength: 240 })

  if (!safeValue.startsWith('/')) {
    return '/dashboard'
  }

  if (safeValue.startsWith('//') || safeValue.includes('://')) {
    return '/dashboard'
  }

  return safeValue
}

export const buildOAuthRedirectUrl = (nextPath = '/dashboard') =>
  `${authConfig.appUrl}/login?next=${encodeURIComponent(
    sanitizeRedirectPath(nextPath),
  )}`

// O front-end usa apenas a chave publica anon. Qualquer autorizacao real
// precisa continuar protegida por RLS, policies e RPCs no provedor.
export const supabase = isAuthConfigured
  ? createClient(authConfig.providerUrl, authConfig.publicKey, {
      auth: {
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: 'pkce',
        persistSession: true,
        storageKey: 'fuego-auth-session',
      },
    })
  : null

export const isStaffRole = (role) => STAFF_ROLES.includes(normalizeRole(role))
