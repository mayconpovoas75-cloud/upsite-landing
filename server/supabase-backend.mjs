import { createClient } from '@supabase/supabase-js'
import { config } from './env.mjs'
import { sanitizePlainText } from '../src/utils/security.js'

const ACCOUNT_ORDER_SELECT =
  'id, public_code, status, customer_name, customer_email, customer_phone, requested_total, final_total, points_spent, points_earned, projected_points_earned, order_items, created_at, completed_at'

const createBaseClient = () => {
  if (!config.supabaseConfigured) {
    throw new Error('SUPABASE_NOT_CONFIGURED')
  }

  return createClient(config.supabaseUrl, config.supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  })
}

const createScopedClient = (accessToken) => {
  if (!config.supabaseConfigured) {
    throw new Error('SUPABASE_NOT_CONFIGURED')
  }

  return createClient(config.supabaseUrl, config.supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  })
}

const normalizeRole = (value) => {
  const normalized = sanitizePlainText(value ?? '', { maxLength: 30 }).toLowerCase()
  return ['admin', 'editor', 'viewer'].includes(normalized)
    ? normalized
    : 'viewer'
}

const sanitizeProfile = (profile) => ({
  avatarUrl: sanitizePlainText(profile?.avatar_url ?? '', { maxLength: 400 }),
  email: sanitizePlainText(profile?.email ?? '', { maxLength: 140 }),
  fullName: sanitizePlainText(profile?.full_name ?? '', { maxLength: 120 }),
  id: sanitizePlainText(profile?.id ?? '', { maxLength: 40 }),
  phone: sanitizePlainText(profile?.phone ?? '', { maxLength: 30 }),
  role: normalizeRole(profile?.role),
})

export const signInWithPassword = async ({ email, password }) => {
  const client = createBaseClient()
  return client.auth.signInWithPassword({ email, password })
}

export const refreshAuthSession = async (refreshToken) => {
  const client = createBaseClient()
  return client.auth.refreshSession({ refresh_token: refreshToken })
}

export const getAuthenticatedUser = async (accessToken) => {
  const client = createBaseClient()
  return client.auth.getUser(accessToken)
}

export const syncProfileFromAuth = async (accessToken) => {
  const client = createScopedClient(accessToken)
  return client.rpc('sync_profile_from_auth')
}

export const loadProfile = async (accessToken, userId) => {
  const client = createScopedClient(accessToken)
  const { data, error } = await client
    .from('profiles')
    .select('id, email, full_name, phone, avatar_url, role')
    .eq('id', userId)
    .single()

  if (error) {
    return { data: null, error }
  }

  return { data: sanitizeProfile(data), error: null }
}

export const loadAccountOverview = async (accessToken, userId) => {
  const client = createScopedClient(accessToken)
  const [profileResult, summaryResult, ordersResult] = await Promise.all([
    client
      .from('profiles')
      .select('id, email, full_name, phone, avatar_url, role')
      .eq('id', userId)
      .single(),
    client.rpc('get_loyalty_summary'),
    client
      .from('orders')
      .select(ACCOUNT_ORDER_SELECT)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(10),
  ])

  return {
    orders: ordersResult.data ?? [],
    ordersError: ordersResult.error,
    profile: profileResult.data ? sanitizeProfile(profileResult.data) : null,
    profileError: profileResult.error,
    summary: summaryResult.data ?? null,
    summaryError: summaryResult.error,
  }
}

export const loadAdminOrders = async (accessToken) => {
  const client = createScopedClient(accessToken)
  return client
    .from('orders')
    .select(ACCOUNT_ORDER_SELECT)
    .order('created_at', { ascending: false })
    .limit(40)
}

export const updateProfilePhone = async (accessToken, userId, phone) => {
  const client = createScopedClient(accessToken)
  const result = await client
    .from('profiles')
    .update({ phone })
    .eq('id', userId)
    .select('id, email, full_name, phone, avatar_url, role')
    .single()

  return {
    data: result.data ? sanitizeProfile(result.data) : null,
    error: result.error,
  }
}

export const submitWebsiteOrder = async (accessToken, payload) => {
  const client = createScopedClient(accessToken)
  return client.rpc('submit_website_order', { payload })
}

export const completeOrder = async (accessToken, { finalTotal, orderId }) => {
  const client = createScopedClient(accessToken)
  return client.rpc('complete_order', {
    final_total: finalTotal,
    order_id: orderId,
  })
}

export const cancelOrder = async (accessToken, orderId) => {
  const client = createScopedClient(accessToken)
  return client.rpc('cancel_order', { order_id: orderId })
}
