import { Navigate, Outlet, useLocation } from '../lib/router'
import { useAuth } from '../context/AuthContext'
import { createLoginPath } from '../lib/auth'

const AdminRoute = ({ allowedRoles = ['admin', 'editor'] }) => {
  const location = useLocation()
  const { accountReady, authError, authReady, isAuthenticated, profile, role } =
    useAuth()

  if (!authReady || (isAuthenticated && !accountReady)) {
    return (
      <div className="min-h-screen bg-charcoal px-4 py-20 text-cream">
        <div className="section-container">
          <div className="panel mx-auto max-w-xl p-8 text-center">
            <p className="section-kicker mx-auto">Permissoes</p>
            <h1 className="mt-5 font-display text-5xl tracking-[0.05em] text-cream">
              Validando acesso
            </h1>
            <p className="mt-4 text-sm leading-7 text-cream/68">
              Conferindo sessao e papel do usuario antes de abrir a area restrita.
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

  if (!profile) {
    return (
      <div className="min-h-screen bg-charcoal px-4 py-20 text-cream">
        <div className="section-container">
          <div className="panel mx-auto max-w-xl p-8 text-center">
            <p className="section-kicker mx-auto">Validacao</p>
            <h1 className="mt-5 font-display text-5xl tracking-[0.05em] text-cream">
              Nao foi possivel validar suas permissoes
            </h1>
            <p className="mt-4 text-sm leading-7 text-cream/68">
              {authError || 'Tente novamente em instantes.'}
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Esta checagem no front melhora a UX, mas a autorizacao real precisa
  // continuar protegida no backend/provedor com RLS, policies e RPCs.
  if (!allowedRoles.includes(role)) {
    return <Navigate replace to="/unauthorized" />
  }

  return <Outlet />
}

export default AdminRoute
