import { randomBytes } from 'node:crypto'

const createSessionId = () => randomBytes(32).toString('base64url')

export const createSessionStore = ({ ttlMs }) => {
  const store = new Map()

  const cleanupExpired = () => {
    const now = Date.now()

    for (const [sessionId, session] of store.entries()) {
      if (session.expiresAt <= now) {
        store.delete(sessionId)
      }
    }
  }

  const interval = setInterval(cleanupExpired, Math.min(ttlMs, 15 * 60 * 1000))
  interval.unref()

  return {
    create(sessionData) {
      const sessionId = createSessionId()
      const now = Date.now()

      store.set(sessionId, {
        ...sessionData,
        createdAt: now,
        expiresAt: now + ttlMs,
        lastSeenAt: now,
      })

      return sessionId
    },

    destroy(sessionId) {
      store.delete(sessionId)
    },

    get(sessionId) {
      const session = store.get(sessionId)

      if (!session) {
        return null
      }

      if (session.expiresAt <= Date.now()) {
        store.delete(sessionId)
        return null
      }

      return session
    },

    touch(sessionId, nextData = {}) {
      const session = store.get(sessionId)

      if (!session) {
        return null
      }

      const updatedSession = {
        ...session,
        ...nextData,
        expiresAt: Date.now() + ttlMs,
        lastSeenAt: Date.now(),
      }

      store.set(sessionId, updatedSession)

      return updatedSession
    },
  }
}
