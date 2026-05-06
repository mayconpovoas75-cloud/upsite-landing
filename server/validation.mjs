import { sanitizeMultilineText, sanitizePlainText } from '../src/utils/security.js'

const EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/iu
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu

export class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ValidationError'
  }
}

export const sanitizeInternalPath = (value, fallback = '/dashboard') => {
  const safeValue = sanitizePlainText(value ?? '', { maxLength: 240 })

  if (!safeValue.startsWith('/')) {
    return fallback
  }

  if (safeValue.startsWith('//') || safeValue.includes('://')) {
    return fallback
  }

  return safeValue
}

export const validateEmail = (value) => {
  const normalized = sanitizePlainText(value ?? '', { maxLength: 140 }).toLowerCase()

  if (!EMAIL_REGEX.test(normalized)) {
    throw new ValidationError('INVALID_EMAIL')
  }

  return normalized
}

export const validatePassword = (value) => {
  const normalized = String(value ?? '').trim()

  if (normalized.length < 8 || normalized.length > 200) {
    throw new ValidationError('INVALID_PASSWORD')
  }

  return normalized
}

export const validatePhone = (value) => {
  const normalized = sanitizePlainText(value ?? '', { maxLength: 30 }).replace(
    /[^0-9()+\-\s]/g,
    '',
  )

  if (normalized && normalized.length < 8) {
    throw new ValidationError('INVALID_PHONE')
  }

  return normalized
}

export const validateUuid = (value) => {
  const normalized = sanitizePlainText(value ?? '', { maxLength: 40 }).toLowerCase()

  if (!UUID_REGEX.test(normalized)) {
    throw new ValidationError('INVALID_IDENTIFIER')
  }

  return normalized
}

const validateCurrency = (value) => {
  const normalized = Number(String(value ?? '').replace(',', '.'))

  if (!Number.isFinite(normalized) || normalized < 0) {
    throw new ValidationError('INVALID_TOTAL')
  }

  return Number(normalized.toFixed(2))
}

export const validateLoginPayload = (payload) => ({
  email: validateEmail(payload?.email),
  nextPath: sanitizeInternalPath(payload?.next || payload?.nextPath, '/dashboard'),
  password: validatePassword(payload?.password),
})

export const validatePhonePayload = (payload) => ({
  phone: validatePhone(payload?.phone),
})

export const validateOrderActionPayload = (payload) => ({
  finalTotal:
    payload?.finalTotal === undefined ? null : validateCurrency(payload.finalTotal),
})

export const validateOrderPayload = (payload) => {
  if (!payload || typeof payload !== 'object') {
    throw new ValidationError('INVALID_ORDER')
  }

  const cartItems = Array.isArray(payload.cartItems) ? payload.cartItems : []

  if (!cartItems.length || cartItems.length > 50) {
    throw new ValidationError('INVALID_ORDER')
  }

  const sanitizedItems = cartItems.map((item) => {
    const quantity = Math.min(Math.max(Number(item?.quantity ?? 1), 1), 50)
    const price = Math.max(Number(item?.price ?? 0), 0)
    const pointsCost = Math.max(Number(item?.pointsCost ?? 0), 0)

    return {
      name: sanitizePlainText(item?.name ?? '', { maxLength: 120 }),
      paymentType: item?.paymentType === 'points' ? 'points' : 'cash',
      pointsCost,
      price: Number(price.toFixed(2)),
      quantity,
      summaryLines: Array.isArray(item?.summaryLines)
        ? item.summaryLines
            .slice(0, 10)
            .map((line) => sanitizePlainText(line, { maxLength: 200 }))
            .filter(Boolean)
        : [],
    }
  })

  return {
    cashTotal: validateCurrency(payload?.cashTotal ?? 0),
    cartItems: sanitizedItems,
    pointsEarned: Math.max(Number(payload?.pointsEarned ?? 0), 0),
    pointsSpent: Math.max(Number(payload?.pointsSpent ?? 0), 0),
    whatsappMessage: sanitizeMultilineText(payload?.whatsappMessage ?? '', {
      maxLength: 1800,
    }),
  }
}
