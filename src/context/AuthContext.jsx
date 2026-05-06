import { createContext, useContext, useEffect, useState } from 'react'
import {
  buildOAuthRedirectUrl,
  isAuthConfigured,
  isStaffRole,
  normalizeRole,
  supabase,
} from '../lib/auth'
import { sanitizeMultilineText, sanitizePlainText } from '../utils/security'

const AuthContext = createContext(null)

const emptyPointSummary = Object.freeze({
  availablePoints: 0,
  lifetimePoints: 0,
  pendingEarnedPoints: 0,
  reservedPoints: 0,
  spendablePoints: 0,
})

const safePhone = (value) =>
  sanitizePlainText(value ?? '', { maxLength: 30 }).replace(
    /[^0-9()+\-\s]/g,
    '',
  )

const safeProfileName = (currentUser) =>
  sanitizePlainText(
    currentUser?.user_metadata?.full_name ??
      currentUser?.user_metadata?.name ??
      currentUser?.email?.split('@')[0] ??
      'Cliente Fuego',
    { maxLength: 80 },
  )

const safeProfileAvatar = (currentUser) =>
  sanitizePlainText(
    currentUser?.user_metadata?.avatar_url ??
      currentUser?.user_metadata?.picture ??
      '',
    { maxLength: 400 },
  )

const normalizePointSummary = (data) => ({
  availablePoints: Number(data?.available_points ?? 0),
  lifetimePoints: Number(data?.lifetime_points ?? 0),
  pendingEarnedPoints: Number(data?.pending_earned_points ?? 0),
  reservedPoints: Number(data?.reserved_points ?? 0),
  spendablePoints: Number(data?.spendable_points ?? 0),
})

const resolveFriendlyError = (error, fallbackMessage) => {
  if (!error) {
    return ''
  }

  const normalizedMessage = sanitizePlainText(
    error.message ?? fallbackMessage,
    { maxLength: 220 },
  )

  if (
    normalizedMessage.includes('Auth session missing') ||
    normalizedMessage.includes('JWT')
  ) {
    return 'Sessao expirada. Faca login novamente.'
  }

  if (
    normalizedMessage.includes('provider is not enabled') ||
    normalizedMessage.includes('Unsupported provider')
  ) {
    return 'Esse login social ainda nao foi ativado no painel do provedor.'
  }

  if (
    normalizedMessage.includes('FORBIDDEN') ||
    normalizedMessage.includes('Not authorized')
  ) {
    return 'Acesso nao autorizado.'
  }

  if (normalizedMessage.includes('AUTH_REQUIRED')) {
    return 'Sessao expirada. Faca login novamente.'
  }

  if (normalizedMessage.includes('INSUFFICIENT_POINTS')) {
    return 'Voce nao tem pontos suficientes para concluir esse resgate.'
  }

  if (normalizedMessage.includes('INVALID_PHONE')) {
    return 'Informe um telefone valido para continuar.'
  }

  if (normalizedMessage.includes('INVALID_TOTAL')) {
    return 'Informe um total final valido para concluir o pedido.'
  }

  if (normalizedMessage.includes('ORDER_NOT_FOUND')) {
    return 'Nao foi possivel localizar esse pedido.'
  }

  if (normalizedMessage.includes('COMPLETED_ORDER_CANNOT_BE_CANCELLED')) {
    return 'Pedido finalizado nao pode ser cancelado.'
  }

  return normalizedMessage || fallbackMessage
}

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [pointSummary, setPointSummary] = useState(emptyPointSummary)
  const [customerOrders, setCustomerOrders] = useState([])
  const [adminOrders, setAdminOrders] = useState([])
  const [authReady, setAuthReady] = useState(!isAuthConfigured)
  const [accountReady, setAccountReady] = useState(!isAuthConfigured)
  const [authLoading, setAuthLoading] = useState(false)
  const [dashboardLoading, setDashboardLoading] = useState(false)
  const [activeProvider, setActiveProvider] = useState('')
  const [authError, setAuthError] = useState('')

  const resetTransientState = () => {
    setProfile(null)
    setPointSummary(emptyPointSummary)
    setCustomerOrders([])
    setAdminOrders([])
  }

  const syncProfile = async (currentUser) => {
    if (!supabase || !currentUser) {
      return null
    }

    const { data, error } = await supabase.rpc('sync_profile_from_auth')

    if (error) {
      throw error
    }

    return {
      ...data,
      role: normalizeRole(data?.role),
    }
  }

  const fetchAccountData = async (currentUser) => {
    if (!supabase || !currentUser) {
      resetTransientState()
      setAccountReady(true)
      return
    }

    setDashboardLoading(true)
    setAccountReady(false)
    setAuthError('')

    try {
      const syncedProfile = await syncProfile(currentUser)
      setProfile(syncedProfile)

      const [
        pointSummaryResult,
        customerOrdersResult,
        adminOrdersResult,
      ] = await Promise.all([
        supabase.rpc('get_loyalty_summary'),
        supabase
          .from('orders')
          .select(
            'id, public_code, status, customer_name, customer_email, customer_phone, requested_total, final_total, points_spent, points_earned, projected_points_earned, order_items, created_at, completed_at',
          )
          .eq('user_id', currentUser.id)
          .order('created_at', { ascending: false })
          .limit(10),
        isStaffRole(syncedProfile?.role)
          ? supabase
              .from('orders')
              .select(
                'id, public_code, status, customer_name, customer_email, customer_phone, requested_total, final_total, points_spent, points_earned, projected_points_earned, order_items, created_at, completed_at',
              )
              .order('created_at', { ascending: false })
              .limit(40)
          : Promise.resolve({ data: [], error: null }),
      ])

      if (pointSummaryResult.error) {
        throw pointSummaryResult.error
      }

      if (customerOrdersResult.error) {
        throw customerOrdersResult.error
      }

      if (adminOrdersResult.error) {
        throw adminOrdersResult.error
      }

      setPointSummary(normalizePointSummary(pointSummaryResult.data))
      setCustomerOrders(customerOrdersResult.data ?? [])
      setAdminOrders(adminOrdersResult.data ?? [])
    } catch (error) {
      setAuthError(
        resolveFriendlyError(
          error,
          'Nao foi possivel carregar sua conta agora.',
        ),
      )
    } finally {
      setDashboardLoading(false)
      setAccountReady(true)
    }
  }

  useEffect(() => {
    if (!supabase) {
      return undefined
    }

    let isMounted = true

    const bootstrapSession = async () => {
      setAuthLoading(true)
      const { data, error } = await supabase.auth.getSession()

      if (!isMounted) {
        return
      }

      if (error) {
        setAuthError(
          resolveFriendlyError(
            error,
            'Nao foi possivel validar a sessao atual.',
          ),
        )
      }

      setSession(data.session ?? null)
      setUser(data.session?.user ?? null)
      setAuthReady(true)
      setAccountReady(!data.session?.user)
      setAuthLoading(false)
    }

    bootstrapSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession ?? null)
      setUser(nextSession?.user ?? null)
      setAuthReady(true)
      setAccountReady(!nextSession?.user)
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!supabase) {
      return
    }

    if (!user) {
      resetTransientState()
      setDashboardLoading(false)
      setAccountReady(true)
      return
    }

    fetchAccountData(user)
  }, [user?.id])

  const signInWithProvider = async (
    provider,
    nextPath = '/dashboard',
  ) => {
    if (!supabase) {
      setAuthError('Autenticacao ainda nao configurada para este ambiente.')
      return {
        error: new Error('AUTH_NOT_CONFIGURED'),
      }
    }

    setActiveProvider(provider)
    setAuthError('')

    const { error } = await supabase.auth.signInWithOAuth({
      options: {
        redirectTo: buildOAuthRedirectUrl(nextPath),
      },
      provider,
    })

    if (error) {
      setActiveProvider('')
      setAuthError(
        resolveFriendlyError(
          error,
          'Nao foi possivel entrar. Tente novamente.',
        ),
      )
    }

    return { error }
  }

  const signOut = async () => {
    if (!supabase) {
      resetTransientState()
      setSession(null)
      setUser(null)
      setAccountReady(true)
      return
    }

    try {
      await supabase.auth.signOut({ scope: 'local' })
    } finally {
      setActiveProvider('')
      setAuthError('')
      setSession(null)
      setUser(null)
      setAccountReady(true)
      resetTransientState()
    }
  }

  const saveProfilePhone = async (phoneValue) => {
    if (!supabase || !user) {
      return {
        error: new Error('AUTH_REQUIRED'),
      }
    }

    const sanitizedPhone = safePhone(phoneValue)

    if (sanitizedPhone.length < 8) {
      return {
        error: new Error('INVALID_PHONE'),
      }
    }

    const { data, error } = await supabase
      .from('profiles')
      .update({ phone: sanitizedPhone })
      .eq('id', user.id)
      .select('*')
      .single()

    if (!error) {
      setProfile({
        ...data,
        role: normalizeRole(data?.role),
      })
    }

    return { data, error }
  }

  const submitWebsiteOrder = async ({
    cartItems,
    cashTotal,
    pointsEarned,
    pointsSpent,
    whatsappMessage,
  }) => {
    if (!supabase || !user) {
      return {
        data: null,
        error: new Error('AUTH_REQUIRED'),
      }
    }

    // Rate limit recomendado no backend/RPC para evitar abuso de criacao de pedidos.
    const sanitizedItems = cartItems.map((item) => ({
      name: sanitizePlainText(item.name, { maxLength: 120 }),
      paymentType: item.paymentType === 'points' ? 'points' : 'cash',
      pointsCost: Math.max(Number(item.pointsCost ?? 0), 0),
      price: Math.max(Number(item.price ?? 0), 0),
      quantity: Math.min(Math.max(Number(item.quantity ?? 1), 1), 50),
      summaryLines: (item.summaryLines ?? []).map((summaryLine) =>
        sanitizePlainText(summaryLine, { maxLength: 200 }),
      ),
    }))

    const payload = {
      cash_total: Number(cashTotal.toFixed(2)),
      customer_email: sanitizePlainText(user.email ?? '', { maxLength: 140 }),
      customer_name: safeProfileName(user),
      customer_phone: safePhone(profile?.phone ?? ''),
      order_items: sanitizedItems,
      points_spent: pointsSpent,
      projected_points_earned: pointsEarned,
      whatsapp_message: sanitizeMultilineText(whatsappMessage, {
        maxLength: 1800,
      }),
    }

    const { data, error } = await supabase.rpc('submit_website_order', {
      payload,
    })

    if (!error) {
      await fetchAccountData(user)
    }

    return { data, error }
  }

  const completeOrder = async (orderId, finalTotal) => {
    if (!supabase || !user) {
      return {
        data: null,
        error: new Error('AUTH_REQUIRED'),
      }
    }

    const normalizedFinalTotal = Number(finalTotal)

    if (Number.isNaN(normalizedFinalTotal) || normalizedFinalTotal < 0) {
      return {
        data: null,
        error: new Error('INVALID_TOTAL'),
      }
    }

    // Esse endpoint tambem deve ter rate limit e auditoria no backend.
    const { data, error } = await supabase.rpc('complete_order', {
      final_total: normalizedFinalTotal,
      order_id: orderId,
    })

    if (!error) {
      await fetchAccountData(user)
    }

    return { data, error }
  }

  const cancelOrder = async (orderId) => {
    if (!supabase || !user) {
      return {
        data: null,
        error: new Error('AUTH_REQUIRED'),
      }
    }

    const { data, error } = await supabase.rpc('cancel_order', {
      order_id: orderId,
    })

    if (!error) {
      await fetchAccountData(user)
    }

    return { data, error }
  }

  const derivedRole = normalizeRole(profile?.role)

  const value = {
    accountReady,
    activeProvider,
    adminOrders,
    authError,
    authLoading,
    authReady,
    canAccessAdminPanel: isStaffRole(derivedRole),
    cancelOrder,
    completeOrder,
    customerOrders,
    dashboardLoading,
    isAdmin: derivedRole === 'admin',
    isAuthenticated: Boolean(session?.user),
    isAuthConfigured,
    isEditor: derivedRole === 'editor',
    pointSummary,
    profile,
    refreshAccountData: () => fetchAccountData(user),
    role: derivedRole,
    saveProfilePhone,
    session,
    signInWithProvider,
    signOut,
    submitWebsiteOrder,
    user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider.')
  }

  return context
}
