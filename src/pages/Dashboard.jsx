import { ArrowLeft, LogOut, ShieldCheck, UserRound, WalletCards } from 'lucide-react'
import { formatCurrencyBRL, formatPoints } from '../data/menuItems'
import { useAuth } from '../context/AuthContext'
import { Link } from '../lib/router'

const formatDate = (value) =>
  new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(value))

const roleLabels = {
  admin: 'Admin',
  editor: 'Editor',
  viewer: 'Viewer',
}

const Dashboard = () => {
  const {
    accountReady,
    authError,
    canAccessAdminPanel,
    customerOrders,
    dashboardLoading,
    pointSummary,
    profile,
    role,
    signOut,
    user,
  } = useAuth()

  const profileName = profile?.full_name || user?.email || 'Cliente Fuego'
  const avatarUrl = profile?.avatar_url || user?.user_metadata?.avatar_url || ''

  if (!accountReady) {
    return (
      <div className="min-h-screen bg-charcoal py-10">
        <div className="section-container">
          <div className="panel p-8 text-center">
            <span className="section-kicker">Conta protegida</span>
            <h1 className="mt-5 font-display text-5xl tracking-[0.05em] text-cream">
              Carregando sua conta
            </h1>
            <p className="mt-4 text-sm leading-7 text-cream/68">
              Estamos validando sessao, perfil e saldo com seguranca.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-charcoal py-10">
      <div className="section-container">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            className="btn-secondary"
            to="/"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao site
          </Link>

          <div className="flex flex-wrap gap-3">
            <Link
              className="btn-secondary"
              to="/perfil"
            >
              <UserRound className="h-4 w-4" />
              Perfil
            </Link>
            {canAccessAdminPanel ? (
              <Link
                className="btn-secondary"
                to="/admin"
              >
                <ShieldCheck className="h-4 w-4" />
                Painel
              </Link>
            ) : null}
            <button
              className="btn-primary"
              type="button"
              onClick={signOut}
            >
              <LogOut className="h-4 w-4" />
              Sair
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="panel p-6 sm:p-8">
            <span className="section-kicker">Dashboard protegido</span>
            {authError ? (
              <div className="mt-5 rounded-[22px] border border-red-500/20 bg-red-500/10 p-4 text-sm leading-6 text-red-100">
                {authError}
              </div>
            ) : null}
            <div className="mt-6 flex flex-wrap items-center gap-5">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-flame/20 bg-black/20 text-2xl font-bold text-cream">
                {avatarUrl ? (
                  <img
                    alt={profileName}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    src={avatarUrl}
                  />
                ) : (
                  profileName.slice(0, 1).toUpperCase()
                )}
              </div>

              <div>
                <h1 className="font-display text-6xl tracking-[0.05em] text-cream">
                  {profileName}
                </h1>
                <p className="mt-3 text-sm text-cream/68">
                  {profile?.email || user?.email || 'Sem e-mail'}
                </p>
                <p className="mt-3 inline-flex rounded-full border border-flame/20 bg-flame/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-sand">
                  Tipo de conta: {roleLabels[role] || 'Viewer'}
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="stat-card">
                <WalletCards className="h-5 w-5 text-flame" />
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-sand">
                  Pontos disponiveis
                </p>
                <p className="mt-2 font-display text-4xl tracking-[0.05em] text-cream">
                  {formatPoints(pointSummary.spendablePoints)}
                </p>
              </div>

              <div className="stat-card">
                <ShieldCheck className="h-5 w-5 text-flame" />
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-sand">
                  Pontos pendentes
                </p>
                <p className="mt-2 font-display text-4xl tracking-[0.05em] text-cream">
                  {formatPoints(pointSummary.pendingEarnedPoints)}
                </p>
              </div>
            </div>
          </div>

          <div className="panel p-6 sm:p-8">
            <span className="section-kicker">Pedidos recentes</span>
            <h2 className="mt-5 font-display text-5xl tracking-[0.05em] text-cream">
              Historico da conta
            </h2>

            {dashboardLoading ? (
              <p className="mt-6 text-sm text-cream/68">
                Carregando historico...
              </p>
            ) : customerOrders.length ? (
              <div className="mt-6 space-y-4">
                {customerOrders.map((order) => {
                  const orderTotal = order.final_total ?? order.requested_total ?? 0

                  return (
                    <article
                      key={order.id}
                      className="rounded-[22px] border border-white/10 bg-black/20 p-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="font-semibold text-cream">
                            {order.public_code}
                          </p>
                          <p className="mt-1 text-xs uppercase tracking-[0.22em] text-cream/44">
                            {formatDate(order.created_at)}
                          </p>
                        </div>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-sand">
                          {order.status}
                        </span>
                      </div>

                      <div className="mt-4 grid gap-2 text-sm text-cream/68 sm:grid-cols-3">
                        <p>
                          Total:{' '}
                          <span className="font-semibold text-cream">
                            {formatCurrencyBRL(orderTotal)}
                          </span>
                        </p>
                        <p>
                          Resgate:{' '}
                          <span className="font-semibold text-cream">
                            {formatPoints(order.points_spent ?? 0)}
                          </span>
                        </p>
                        <p>
                          Liberado:{' '}
                          <span className="font-semibold text-cream">
                            {formatPoints(order.points_earned ?? 0)}
                          </span>
                        </p>
                      </div>
                    </article>
                  )
                })}
              </div>
            ) : (
              <p className="mt-6 text-sm leading-7 text-cream/68">
                Seus pedidos registrados no site vao aparecer aqui depois do login.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
