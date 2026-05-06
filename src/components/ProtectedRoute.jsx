import { Navigate, Outlet, useLocation } from '../lib/router'
import { useAuth } from '../context/AuthContext'
import { createLoginPath } from '../lib/auth'

const ProtectedRoute = () => {
  const location = useLocation()
  const { authReady, isAuthenticated } = useAuth()

  if (!authReady) {
    return (
      <div className="min-h-screen bg-charcoal px-4 py-20 text-cream">
        <div className="section-container">
          <div className="panel mx-auto max-w-xl p-8 text-center">
            <p className="section-kicker mx-auto">Sessao</p>
            <h1 className="mt-5 font-display text-5xl tracking-[0.05em] text-cream">
              Validando acesso
            </h1>
            <p className="mt-4 text-sm leading-7 text-cream/68">
              Estamos conferindo sua sessao com seguranca.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        replace
        state={{ from: location.pathname }}
        to={createLoginPath(location.pathname)}
      />
    )
  }

  return <Outlet />
}

export default ProtectedRoute
