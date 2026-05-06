import {
  LoaderCircle,
  MessageCircleMore,
  Minus,
  Plus,
  ShoppingBag,
  TicketPercent,
  Trash2,
  UserRound,
  X,
} from 'lucide-react'
import { formatCurrencyBRL, formatPoints } from '../data/menuItems'

const CartItem = ({
  item,
  canIncrease,
  onDecrease,
  onIncrease,
  onRemove,
}) => (
  <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="font-semibold text-cream">{item.name}</p>
        <p className="mt-1 text-sm text-cream/62">
          {item.paymentType === 'points'
            ? `${formatPoints(item.pointsCost)} cada`
            : `${formatCurrencyBRL(item.price)} cada`}
        </p>
      </div>
      <button
        aria-label={`Remover ${item.name}`}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-cream/65 transition hover:border-flame/20 hover:text-white"
        type="button"
        onClick={() => onRemove(item.lineId)}
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>

    {item.summaryLines?.length ? (
      <div className="mt-3 space-y-1 text-sm text-cream/62">
        {item.summaryLines.map((summaryLine) => (
          <p key={`${item.lineId}-${summaryLine}`}>- {summaryLine}</p>
        ))}
      </div>
    ) : null}

    <div className="mt-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-2 py-2">
        <button
          aria-label={`Diminuir quantidade de ${item.name}`}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-cream transition hover:bg-white/10"
          type="button"
          onClick={() => onDecrease(item.lineId)}
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="min-w-8 text-center text-sm font-bold text-cream">
          {item.quantity}
        </span>
        <button
          aria-label={`Aumentar quantidade de ${item.name}`}
          className={`inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-cream transition hover:bg-white/10 ${canIncrease ? '' : 'cursor-not-allowed opacity-40'}`}
          disabled={!canIncrease}
          type="button"
          onClick={() => onIncrease(item.lineId)}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <p className="font-display text-3xl tracking-[0.03em] text-cream">
        {item.paymentType === 'points'
          ? formatPoints(item.pointsCost * item.quantity)
          : formatCurrencyBRL(item.price * item.quantity)}
      </p>
    </div>
  </div>
)

const CartContent = ({
  availablePoints,
  canIncreaseItem,
  checkoutError,
  checkoutState,
  isAuthenticated,
  isSupabaseConfigured,
  items,
  total,
  pointsSpent,
  pointsEarned,
  projectedPoints,
  onCheckout,
  onClose,
  onDecrease,
  onGuestCheckout,
  onIncrease,
  onOpenAuth,
  onRemove,
  mode,
}) => {
  const isEmpty = items.length === 0
  const isSubmitting = checkoutState === 'submitting'
  const shouldShowLoginNotice = isSupabaseConfigured && !isAuthenticated

  return (
    <div className={`panel ${mode === 'panel' ? 'sticky top-28 p-6' : 'p-5 sm:p-6'}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="section-kicker">Seu carrinho</span>
          <h3 className="mt-4 font-display text-4xl tracking-[0.05em] text-cream">
            Pedido em andamento
          </h3>
        </div>
        {mode === 'drawer' ? (
          <button
            aria-label="Fechar carrinho"
            className="icon-button"
            type="button"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      {shouldShowLoginNotice ? (
        <div className="mt-6 rounded-[24px] border border-sky-400/20 bg-sky-400/10 p-4 text-sm leading-6 text-sky-100">
          Entre na conta antes de concluir se quiser vincular o pedido ao
          cliente e liberar pontos reais depois da confirmacao do dono.
        </div>
      ) : null}

      {isEmpty ? (
        <div className="mt-8 rounded-[24px] border border-dashed border-white/10 bg-white/5 p-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-flame/15 bg-flame/10 text-flame">
            <ShoppingBag className="h-5 w-5" />
          </div>
          <p className="mt-4 font-display text-3xl tracking-[0.04em] text-cream">
            Seu carrinho esta vazio
          </p>
          <p className="mt-3 text-sm leading-6 text-cream/68">
            Escolha um item do cardapio para comecar.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {items.map((item) => (
            <CartItem
              key={item.lineId}
              canIncrease={canIncreaseItem(item)}
              item={item}
              onDecrease={onDecrease}
              onIncrease={onIncrease}
              onRemove={onRemove}
            />
          ))}
        </div>
      )}

      <div className="mt-8 space-y-4">
        <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sand">
              Total em dinheiro
            </p>
            <p className="font-display text-4xl tracking-[0.05em] text-cream">
              {formatCurrencyBRL(total)}
            </p>
          </div>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
          <div className="flex items-start gap-3">
            <TicketPercent className="mt-1 h-5 w-5 text-flame" />
            <div className="grid flex-1 gap-3 sm:grid-cols-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sand">
                  Saldo da conta
                </p>
                <p className="mt-2 font-display text-3xl tracking-[0.04em] text-cream">
                  {formatPoints(availablePoints)}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sand">
                  Pontos usados
                </p>
                <p className="mt-2 font-display text-3xl tracking-[0.04em] text-cream">
                  {formatPoints(pointsSpent)}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sand">
                  Projetado apos pedido
                </p>
                <p className="mt-2 font-display text-3xl tracking-[0.04em] text-cream">
                  {formatPoints(projectedPoints)}
                </p>
              </div>
            </div>
          </div>

          <p className="mt-4 text-sm text-cream/62">
            Esta compra gera {formatPoints(pointsEarned)} pendentes e usa{' '}
            {formatPoints(pointsSpent)} em resgates. Os pontos ganhos so devem
            ser liberados apos a confirmacao final do pedido.
          </p>
        </div>
      </div>

      {checkoutError ? (
        <div className="mt-5 rounded-[22px] border border-red-500/20 bg-red-500/10 p-4 text-sm leading-6 text-red-100">
          {checkoutError}
        </div>
      ) : null}

      {shouldShowLoginNotice ? (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            className={`btn-primary ${isEmpty ? 'pointer-events-none opacity-50' : ''}`}
            disabled={isEmpty}
            type="button"
            onClick={onGuestCheckout}
          >
            <MessageCircleMore className="h-4 w-4" />
            Seguir no WhatsApp
          </button>
          <button
            className="btn-secondary"
            type="button"
            onClick={onOpenAuth}
          >
            <UserRound className="h-4 w-4" />
            Entrar para pontuar
          </button>
        </div>
      ) : (
        <button
          className={`btn-primary mt-6 w-full ${isEmpty ? 'pointer-events-none opacity-50' : ''}`}
          disabled={isEmpty || isSubmitting}
          type="button"
          onClick={onCheckout}
        >
          {isSubmitting ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : (
            <MessageCircleMore className="h-4 w-4" />
          )}
          {isAuthenticated && isSupabaseConfigured
            ? isSubmitting
              ? 'Registrando pedido...'
              : 'Registrar pedido e enviar'
            : 'Finalizar no WhatsApp'}
        </button>
      )}
    </div>
  )
}

const Cart = ({
  availablePoints,
  canIncreaseItem,
  checkoutError,
  checkoutState,
  isAuthenticated,
  isOpen = true,
  isSupabaseConfigured,
  items,
  mode = 'panel',
  total,
  pointsSpent,
  pointsEarned,
  projectedPoints,
  onCheckout,
  onClose = () => {},
  onDecrease,
  onGuestCheckout,
  onIncrease,
  onOpenAuth,
  onRemove,
}) => {
  if (mode === 'drawer') {
    return (
      <div
        className={`fixed inset-0 z-50 ${isOpen ? '' : 'pointer-events-none'}`}
      >
        <button
          aria-label="Fechar carrinho"
          className={`absolute inset-0 bg-black/65 backdrop-blur-sm transition duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          type="button"
          onClick={onClose}
        />
        <div
          className={`absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-[32px] bg-charcoal p-3 transition duration-300 lg:inset-y-0 lg:right-0 lg:left-auto lg:max-h-none lg:w-full lg:max-w-md lg:rounded-none lg:rounded-l-[32px] ${isOpen ? 'translate-y-0 lg:translate-x-0' : 'translate-y-full lg:translate-y-0 lg:translate-x-full'}`}
        >
          <CartContent
            availablePoints={availablePoints}
            canIncreaseItem={canIncreaseItem}
            checkoutError={checkoutError}
            checkoutState={checkoutState}
            isAuthenticated={isAuthenticated}
            isSupabaseConfigured={isSupabaseConfigured}
            items={items}
            mode={mode}
            pointsEarned={pointsEarned}
            pointsSpent={pointsSpent}
            projectedPoints={projectedPoints}
            total={total}
            onCheckout={onCheckout}
            onClose={onClose}
            onDecrease={onDecrease}
            onGuestCheckout={onGuestCheckout}
            onIncrease={onIncrease}
            onOpenAuth={onOpenAuth}
            onRemove={onRemove}
          />
        </div>
      </div>
    )
  }

  return (
    <CartContent
      availablePoints={availablePoints}
      canIncreaseItem={canIncreaseItem}
      checkoutError={checkoutError}
      checkoutState={checkoutState}
      isAuthenticated={isAuthenticated}
      isSupabaseConfigured={isSupabaseConfigured}
      items={items}
      mode={mode}
      pointsEarned={pointsEarned}
      pointsSpent={pointsSpent}
      projectedPoints={projectedPoints}
      total={total}
      onCheckout={onCheckout}
      onClose={onClose}
      onDecrease={onDecrease}
      onGuestCheckout={onGuestCheckout}
      onIncrease={onIncrease}
      onOpenAuth={onOpenAuth}
      onRemove={onRemove}
    />
  )
}

export default Cart
