import { MessageCircleMore, Plus, X } from 'lucide-react'
import {
  buildWhatsAppLink,
  formatCurrencyBRL,
  getCustomizedItemPrice,
  getCustomizationSummary,
} from '../data/menuItems'
import { EXTERNAL_LINK_PROPS } from '../utils/security'
import SmartImage from './SmartImage'

const CustomizationGroup = ({ group, selectedIds, onToggleOption }) => (
  <fieldset className="space-y-3">
    <legend className="text-sm font-semibold uppercase tracking-[0.2em] text-sand">
      {group.title}
    </legend>

    <div className="grid gap-3">
      {group.options.map((option) => {
        const isSelected = selectedIds.includes(option.id)

        return (
          <button
            key={option.id}
            className={`option-card ${isSelected ? 'option-card-active' : ''}`}
            type="button"
            onClick={() => onToggleOption(group, option.id)}
          >
            <div>
              <p className="font-semibold text-cream">{option.label}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-cream/46">
                {group.type === 'single' ? 'Escolha unica' : 'Adicional opcional'}
              </p>
            </div>
            <span className="text-sm font-bold text-sand">
              {option.price > 0 ? `+ ${formatCurrencyBRL(option.price)}` : 'Incluso'}
            </span>
          </button>
        )
      })}
    </div>
  </fieldset>
)

const CustomizationModal = ({
  item,
  selections,
  onClose,
  onConfirm,
  onToggleOption,
}) => {
  if (!item) {
    return null
  }

  const summaryLines = getCustomizationSummary(item, selections)
  const totalPrice = getCustomizedItemPrice(item, selections)
  const previewMessage = buildWhatsAppLink(
    `Ola, vim pelo site e gostaria de pedir: ${item.name}\n${summaryLines
      .map((line) => `- ${line}`)
      .join('\n')}\nValor estimado: ${formatCurrencyBRL(totalPrice)}`,
  )

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/75 p-4 backdrop-blur-sm sm:items-center">
      <div className="panel relative max-h-[92vh] w-full max-w-4xl overflow-hidden">
        <button
          aria-label="Fechar personalizacao"
          className="icon-button absolute right-4 top-4 z-10"
          type="button"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid max-h-[92vh] overflow-y-auto lg:grid-cols-[0.95fr_1.05fr]">
          <div className="p-4 sm:p-5">
            <SmartImage
              alt={item.name}
              className="aspect-[4/3]"
              priority
              src={item.image}
              subtitle={item.categoryLabel}
              title={item.name}
            />
          </div>

          <div className="flex flex-col gap-6 p-5 sm:p-6">
            <div>
              <span className="section-kicker">Monte seu pedido</span>
              <h3 className="mt-4 font-display text-5xl tracking-[0.05em] text-cream">
                {item.name}
              </h3>
              <p className="mt-4 text-sm leading-7 text-cream/68">
                {item.longDescription ?? item.description}
              </p>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sand">
                    Valor atualizado
                  </p>
                  <p className="font-display text-4xl tracking-[0.05em] text-cream">
                    {formatCurrencyBRL(totalPrice)}
                  </p>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cream/68">
                  Base {formatCurrencyBRL(item.price)}
                </div>
              </div>

              {summaryLines.length ? (
                <div className="mt-4 space-y-2 text-sm text-cream/68">
                  {summaryLines.map((summaryLine) => (
                    <p key={summaryLine}>- {summaryLine}</p>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="space-y-6">
              {item.customizationGroups.map((group) => (
                <CustomizationGroup
                  key={group.id}
                  group={group}
                  selectedIds={selections[group.id] ?? []}
                  onToggleOption={onToggleOption}
                />
              ))}
            </div>

            <div className="flex flex-col gap-3 border-t border-white/10 pt-2 sm:flex-row">
              <button
                className="btn-primary flex-1"
                type="button"
                onClick={() => onConfirm(item, selections)}
              >
                <Plus className="h-4 w-4" />
                Adicionar ao carrinho
              </button>
              <a
                className="btn-secondary flex-1"
                href={previewMessage}
                {...EXTERNAL_LINK_PROPS}
              >
                <MessageCircleMore className="h-4 w-4" />
                Pedir pelo WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomizationModal
