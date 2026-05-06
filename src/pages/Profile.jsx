import { ArrowLeft, Phone, Save, ShieldCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from '../lib/router'

const Profile = () => {
  const { accountReady, authError, profile, role, saveProfilePhone, user } =
    useAuth()
  const [phoneValue, setPhoneValue] = useState(profile?.phone ?? '')
  const [feedback, setFeedback] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    setPhoneValue(profile?.phone ?? '')
  }, [profile?.phone])

  if (!accountReady) {
    return (
      <div className="min-h-screen bg-charcoal py-10">
        <div className="section-container">
          <div className="panel p-8 text-center">
            <span className="section-kicker">Perfil protegido</span>
            <h1 className="mt-5 font-display text-5xl tracking-[0.05em] text-cream">
              Carregando seus dados
            </h1>
            <p className="mt-4 text-sm leading-7 text-cream/68">
              Estamos validando suas informacoes antes de liberar edicao.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const handleSave = async () => {
    setIsSaving(true)
    setFeedback('')

    const { error } = await saveProfilePhone(phoneValue)

    if (error) {
      setFeedback('Nao foi possivel salvar. Revise o telefone e tente novamente.')
      setIsSaving(false)
      return
    }

    setFeedback('Telefone salvo com sucesso.')
    setIsSaving(false)
  }

  return (
    <div className="min-h-screen bg-charcoal py-10">
      <div className="section-container">
        <Link
          className="btn-secondary"
          to="/dashboard"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao dashboard
        </Link>

        <div className="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="panel p-6 sm:p-8">
            <span className="section-kicker">Perfil protegido</span>
            {authError ? (
              <div className="mt-5 rounded-[22px] border border-red-500/20 bg-red-500/10 p-4 text-sm leading-6 text-red-100">
                {authError}
              </div>
            ) : null}
            <h1 className="mt-5 font-display text-6xl tracking-[0.05em] text-cream">
              Seus dados
            </h1>
            <p className="mt-4 text-sm leading-7 text-cream/68">
              Atualize apenas os dados operacionais necessarios para vincular
              pedidos e fidelidade com seguranca.
            </p>

            <div className="mt-8 space-y-4">
              <div className="stat-card">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sand">
                  Nome
                </p>
                <p className="mt-3 text-base font-semibold text-cream">
                  {profile?.full_name || user?.email || 'Cliente Fuego'}
                </p>
              </div>

              <div className="stat-card">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sand">
                  E-mail
                </p>
                <p className="mt-3 text-base font-semibold text-cream">
                  {profile?.email || user?.email || 'Sem e-mail'}
                </p>
              </div>

              <div className="stat-card">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sand">
                  Papel
                </p>
                <p className="mt-3 text-base font-semibold text-cream">
                  {role}
                </p>
              </div>
            </div>
          </div>

          <div className="panel p-6 sm:p-8">
            <span className="section-kicker">Contato validado</span>
            <h2 className="mt-5 font-display text-5xl tracking-[0.05em] text-cream">
              Telefone da conta
            </h2>
            <p className="mt-4 text-sm leading-7 text-cream/68">
              Esse campo e sanitizado no front, mas a validacao real continua no
              backend antes de aceitar qualquer alteracao persistida.
            </p>

            <label className="mt-8 block">
              <span className="mb-3 flex items-center gap-2 font-semibold text-cream">
                <Phone className="h-4 w-4 text-flame" />
                Telefone
              </span>
              <input
                className="field-input"
                maxLength={30}
                placeholder="(91) 99999-9999"
                type="text"
                value={phoneValue}
                onChange={(event) => setPhoneValue(event.target.value)}
              />
            </label>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                className="btn-primary"
                disabled={isSaving}
                type="button"
                onClick={handleSave}
              >
                <Save className="h-4 w-4" />
                {isSaving ? 'Salvando...' : 'Salvar telefone'}
              </button>
              <Link
                className="btn-secondary"
                to="/dashboard"
              >
                <ShieldCheck className="h-4 w-4" />
                Voltar ao resumo
              </Link>
            </div>

            {feedback ? (
              <div className="mt-5 rounded-[22px] border border-white/10 bg-black/20 p-4 text-sm leading-6 text-cream/76">
                {feedback}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
