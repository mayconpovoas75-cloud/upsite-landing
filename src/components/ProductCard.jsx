import { MessageCircleMore, Plus, SlidersHorizontal } from 'lucide-react'
import {
  buildItemWhatsAppLink,
  formatCurrencyBRL,
  isItemCustomizable,
} from '../data/menuItems'
import { EXTERNAL_LINK_PROPS } from '../utils/security'
import SmartImage from './SmartImage'

const ProductCard = ({
  cartQuantity,
  item,
  featured = false,
  onAddToCart,
  onOpenCustomizer,
}) => {
  const customizable = isItemCustomizable(item)

  return (
    <article className="panel card-hover h-full overflow-hidden p-4 sm:p-5">
      <SmartImage
        alt={item.name}
        className={featured ? 'aspect-[4/3]' : 'aspect-[16/11]'}
        src={item.image}
        subtitle={item.tag ?? item.categoryLabel}
        title={item.name}
      />

      <div className="mt-5 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sand/88">
              {item.categoryHighlight ?? item.categoryLabel}
            </p>
            <h3 className="mt-2 font-display text-3xl tracking-[0.04em] text-cream">
              {item.name}
            </h3>
          </div>
          {item.tag ? (
            <span className="rounded-full border border-flame/20 bg-flame/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-sand">
              {item.tag}
            </span>
          ) : null}
        </div>

        <p className="min-h-[72px] text-sm leading-6 text-cream/70">
          {item.description}
        </p>

        {customizable ? (
          <div className="rounded-[22px] border border-flame/15 bg-flame/8 px-4 py-3 text-sm text-cream/72">
            Escolha ponto da carne, bebida, acompanhamento, molhos e adicionais
            antes de colocar o combo no carrinho.
          </div>
        ) : null}

        <div className="mt-auto flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cream/46">
              {cartQuantity > 0 ? `${cartQuantity} no carrinho` : 'Pedido individual'}
            </p>
            <p className="price-glow font-display text-4xl tracking-[0.04em] text-cream">
              {formatCurrencyBRL(item.price)}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            className="btn-primary flex-1"
            type="button"
            onClick={() => onAddToCart(item)}
          >
            {customizable ? (
              <SlidersHorizontal className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            {customizable ? 'Montar combo' : 'Adicionar'}
          </button>

          {customizable ? (
            <button
              className="btn-secondary flex-1"
              type="button"
              onClick={() => onOpenCustomizer(item)}
            >
              <MessageCircleMore className="h-4 w-4" />
              Ver adicionais
            </button>
          ) : (
            <a
              className="btn-secondary flex-1"
              href={buildItemWhatsAppLink(item.name)}
              {...EXTERNAL_LINK_PROPS}
            >
              <MessageCircleMore className="h-4 w-4" />
              Pedir agora
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default ProductCard
