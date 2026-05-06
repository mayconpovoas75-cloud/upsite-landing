import { ArrowLeft, ShieldCheck } from 'lucide-react'
import { useEffect } from 'react'
import OAuthButtons from '../components/OAuthButtons'
import { useAuth } from '../context/AuthContext'
import { sanitizeRedirectPath } from '../lib/auth'
import { Link, useLocation, useNavigate, useSearchParams } from '../lib/router'

const Login = () => {
  const {
    activeProvider,
    authError,
    authReady,
    isAuthenticated,
    isAuthConfigured,
    signInWithProvider,
  } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const nextPath =
    sanitizeRedirectPath(
      searchParams.get('next') ?? location.state?.from ?? '/dashboard',
    )

  useEffect(() => {
    if (authReady && isAuthenticated) {
      navigate(nextPath, { replace: true })
    }
  }, [authReady, isAuthenticated, navigate, nextPath])

  const handleLogin = async (providerId) => {
    await signInWithProvider(providerId, nextPath)
  }

  return (
    <div className="min-h-screen bg-charcoal py-10">
      <div className="section-container">
        <Link
          className="btn-secondary"
          to="/"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao site
        </Link>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="panel p-6 sm:p-8">
            <span className="section-kicker">Autenticacao segura</span>
            <h1 className="mt-5 font-display text-6xl tracking-[0.05em] text-cream">
              Entrar na sua conta
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-cream/68">
              O login usa OAuth oficial via provedor confiavel. Nenhuma senha e
              nenhum client secret ficam no React.
            </p>

            <div className="mt-8 grid gap-4">
              <div className="stat-card">
                <ShieldCheck className="h-5 w-5 text-flame" />
                <p className="mt-3 font-semibold text-cream">
                  Sessao e callback validados
                </p>
                <p className="mt-2 text-sm leading-6 text-cream/62">
                  O redirecionamento volta apenas para caminhos internos do app.
                </p>
              </div>

              <div className="stat-card">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sand">
                  Rotas protegidas
                </p>
                <p className="mt-3 text-sm leading-6 text-cream/62">
                  `/dashboard`, `/perfil` e `/admin` exigem sessao valida antes
                  de abrir.
                </p>
              </div>
            </div>
          </div>

          <div className="panel p-6 sm:p-8">
            <span className="section-kicker">Login social</span>
            <h2 className="mt-5 font-display text-5xl tracking-[0.05em] text-cream">
              Escolha um provedor
            </h2>
            <p className="mt-4 text-sm leading-7 text-cream/68">
              Depois do login, voce sera redirecionado com seguranca para a area
              protegida.
            </p>

            {!isAuthConfigured ? (
              <div className="mt-6 rounded-[24px] border border-amber-400/20 bg-amber-400/10 p-5 text-sm leading-6 text-amber-100">
                A autenticacao ainda nao foi configurada neste ambiente. Preencha
                as variaveis publicas do provedor e ative Google, Facebook e
                X/Twitter no painel.
              </div>
            ) : (
              <div className="mt-6">
                <OAuthButtons
                  activeProvider={activeProvider}
                  onLogin={handleLogin}
                  stacked
                />
              </div>
            )}

            {authError ? (
              <div className="mt-5 rounded-[22px] border border-red-500/20 bg-red-500/10 p-4 text-sm leading-6 text-red-100">
                {authError || 'Nao foi possivel entrar. Tente novamente.'}
              </div>
            ) : null}

            <div className="mt-8 rounded-[24px] border border-white/10 bg-black/20 p-5 text-sm leading-6 text-cream/62">
              Dica: para validar a seguranca, teste login, logout, rota protegida
              e acesso negado com usuario sem permissao.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
