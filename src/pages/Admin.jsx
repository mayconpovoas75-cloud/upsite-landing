import {
  ArrowLeft,
  CheckCircle2,
  ImagePlus,
  ShieldCheck,
  XCircle,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { formatCurrencyBRL, formatPoints } from '../data/menuItems'
import { useAuth } from '../context/AuthContext'
import { Link } from '../lib/router'

const formatDate = (value) =>
  new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(value))

const OrderCard = ({ canManageOrders, onCancelOrder, onCompleteOrder, order }) => {
  const [finalTotal, setFinalTotal] = useState(
    String(order.final_total ?? order.requested_total ?? 0),
  )
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    setFinalTotal(String(order.final_total ?? order.requested_total ?? 0))
  }, [order.final_total, order.requested_total])

  const isClosed = order.status === 'completed' || order.status === 'cancelled'

  const handleComplete = async () => {
    setFeedback('')

    const parsedValue = Number(String(finalTotal).replace(',', '.'))
    const { error } = await onCompleteOrder(order.id, parsedValue)

    setFeedback(
      error
        ? 'Nao foi possivel finalizar esse pedido.'
        : 'Pedido finalizado e pontos liberados.',
    )
  }

  const handleCancel = async () => {
    setFeedback('')
    const { error } = await onCancelOrder(order.id)

    setFeedback(
      error
        ? 'Nao foi possivel cancelar esse pedido.'
        : 'Pedido cancelado com seguranca.',
    )
  }

  return (
    <article className="panel-soft p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="section-kicker">{order.public_code}</p>
          <h3 className="mt-4 font-display text-4xl tracking-[0.05em] text-cream">
            {order.customer_name || 'Cliente sem nome'}
          </h3>
          <p className="mt-2 text-sm text-cream/62">
            {order.customer_email || 'Sem e-mail'}{' '}
            {order.customer_phone ? `- ${order.customer_phone}` : ''}
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.22em] text-cream/44">
            {formatDate(order.created_at)}
          </p>
        </div>

        <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sand">
            Status
          </p>
          <p className="mt-2 font-display text-3xl tracking-[0.05em] text-cream">
            {order.status}
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
          <p className="font-semibold text-cream">Itens enviados</p>
          <div className="mt-4 space-y-3 text-sm text-cream/68">
            {(order.order_items ?? []).map((item, index) => (
              <div
                key={`${order.id}-${item.name}-${index}`}
                className="rounded-[18px] border border-white/10 bg-white/5 p-3"
              >
                <p className="font-semibold text-cream">
                  {item.quantity}x {item.name}
                </p>
                <p className="mt-1">
                  {item.paymentType === 'points'
                    ? `${formatPoints(item.pointsCost ?? 0)} por unidade`
                    : `${formatCurrencyBRL(item.price ?? 0)} por unidade`}
                </p>
                {item.summaryLines?.length ? (
                  <div className="mt-2 space-y-1">
                    {item.summaryLines.map((summaryLine) => (
                      <p key={summaryLine}>- {summaryLine}</p>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
          <p className="font-semibold text-cream">Governanca do pedido</p>

          <label className="mt-4 block">
            <span className="mb-2 block text-sm font-semibold text-cream">
              Total final confirmado
            </span>
            <input
              className="field-input"
              disabled={!canManageOrders || isClosed}
              type="text"
              value={finalTotal}
              onChange={(event) => setFinalTotal(event.target.value)}
            />
          </label>

          <div className="mt-4 rounded-[18px] border border-white/10 bg-white/5 p-3 text-sm text-cream/68">
            <p>
              Resgate usado:{' '}
              <span className="font-semibold text-cream">
                {formatPoints(order.points_spent ?? 0)}
              </span>
            </p>
            <p className="mt-2">
              Pontos previstos:{' '}
              <span className="font-semibold text-cream">
                {formatPoints(order.projected_points_earned ?? 0)}
              </span>
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-3">
            <button
              className={`btn-primary ${!canManageOrders || isClosed ? 'pointer-events-none opacity-50' : ''}`}
              disabled={!canManageOrders || isClosed}
              type="button"
              onClick={handleComplete}
            >
              <CheckCircle2 className="h-4 w-4" />
              Finalizar pedido
            </button>
            <button
              className={`btn-secondary ${!canManageOrders || isClosed ? 'pointer-events-none opacity-50' : ''}`}
              disabled={!canManageOrders || isClosed}
              type="button"
              onClick={handleCancel}
            >
              <XCircle className="h-4 w-4" />
              Cancelar pedido
            </button>
          </div>

          {feedback ? (
            <p className="mt-4 text-sm text-cream/76">{feedback}</p>
          ) : null}
        </div>
      </div>
    </article>
  )
}

const Admin = () => {
  const {
    adminOrders,
    cancelOrder,
    completeOrder,
    dashboardLoading,
    isAdmin,
    role,
  } = useAuth()

  return (
    <div className="min-h-screen bg-charcoal py-10">
      <div className="section-container">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            className="btn-secondary"
            to="/dashboard"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao dashboard
          </Link>

          <span className="section-kicker">
            Painel {role === 'editor' ? 'editorial' : 'administrativo'}
          </span>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
          <div className="panel p-6 sm:p-8">
            <h1 className="font-display text-6xl tracking-[0.05em] text-cream">
              Painel protegido
            </h1>
            <p className="mt-4 text-sm leading-7 text-cream/68">
              O acesso aqui depende de sessao valida e role autorizada. A
              autorizacao real continua no backend com RLS e RPCs.
            </p>

            <div className="mt-8 grid gap-4">
              <div className="stat-card">
                <ShieldCheck className="h-5 w-5 text-flame" />
                <p className="mt-3 font-semibold text-cream">
                  Seu papel atual: {role}
                </p>
                <p className="mt-2 text-sm leading-6 text-cream/62">
                  {isAdmin
                    ? 'Admin pode revisar pedidos, operar fidelidade e governar todo o painel.'
                    : 'Editor pode acessar o painel e a camada editorial, mas operacoes criticas devem continuar restritas no backend.'}
                </p>
              </div>

              <div className="stat-card">
                <ImagePlus className="h-5 w-5 text-flame" />
                <p className="mt-3 font-semibold text-cream">
                  Cardapio e imagens
                </p>
                <p className="mt-2 text-sm leading-6 text-cream/62">
                  Quando o catalogo migrar para banco/storage, apenas roles
                  `admin` e `editor` devem receber policies de escrita.
                </p>
              </div>
            </div>
          </div>

          <div className="panel p-6 sm:p-8">
            <h2 className="font-display text-5xl tracking-[0.05em] text-cream">
              Fila operacional
            </h2>
            <p className="mt-4 text-sm leading-7 text-cream/68">
              Pontos so devem ser liberados apos pedido finalizado. Se o usuario
              tiver apenas role `editor`, mantenha a confirmacao financeira e de
              fidelidade protegida por regra server-side.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-5">
          {dashboardLoading ? (
            <div className="panel-soft p-6 text-sm text-cream/68">
              Carregando pedidos do painel...
            </div>
          ) : adminOrders.length ? (
            adminOrders.map((order) => (
              <OrderCard
                key={order.id}
                canManageOrders={isAdmin}
                order={order}
                onCancelOrder={cancelOrder}
                onCompleteOrder={completeOrder}
              />
            ))
          ) : (
            <div className="panel-soft p-6 text-sm leading-6 text-cream/68">
              Nenhum pedido registrado ainda.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Admin
