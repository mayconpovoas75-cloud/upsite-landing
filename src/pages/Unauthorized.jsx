import { ArrowLeft, ShieldAlert } from 'lucide-react'
import { Link } from '../lib/router'

const Unauthorized = () => (
  <div className="min-h-screen bg-charcoal py-10">
    <div className="section-container">
      <div className="panel mx-auto max-w-3xl p-8 text-center sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-flame/20 bg-flame/10 text-flame">
          <ShieldAlert className="h-6 w-6" />
        </div>

        <p className="section-kicker mx-auto mt-6">Acesso protegido</p>
        <h1 className="mt-5 font-display text-6xl tracking-[0.05em] text-cream">
          Acesso nao autorizado
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-cream/68">
          Sua conta nao tem permissao para entrar nessa area. Se voce deveria
          ter acesso, revise o role no provedor de autenticacao e no banco.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            className="btn-secondary"
            to="/dashboard"
          >
            Ir para dashboard
          </Link>
          <Link
            className="btn-primary"
            to="/"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao site
          </Link>
        </div>
      </div>
    </div>
  </div>
)

export default Unauthorized
