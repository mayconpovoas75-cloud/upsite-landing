import { Search } from 'lucide-react'
import ProductCard from './ProductCard'
import SectionHeading from './SectionHeading'

const MenuSection = ({
  cartQuantities,
  categories,
  items,
  resultsCount,
  searchTerm,
  selectedCategory,
  onAddToCart,
  onCategoryChange,
  onOpenCustomizer,
  onSearchChange,
}) => (
  <div className="min-w-0">
    <SectionHeading
      eyebrow="Cardapio completo"
      title="Cardapio completo"
      description="Escolha por categoria, busque seu item favorito e finalize o pedido pelo WhatsApp."
    />

    <div
      className="panel reveal mt-8 overflow-hidden p-5 sm:p-6"
      data-reveal=""
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <label className="search-field">
          <Search className="h-4 w-4 text-cream/45" />
          <input
            aria-label="Buscar item do cardapio"
            className="w-full bg-transparent text-sm text-cream outline-none placeholder:text-cream/40"
            placeholder="Busque por burger, combo, batata, cheddar..."
            type="search"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </label>

        <div className="flex items-center gap-3 text-sm text-cream/66">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 font-semibold">
            {resultsCount} {resultsCount === 1 ? 'item encontrado' : 'itens encontrados'}
          </span>
        </div>
      </div>

      <div className="mt-5 flex gap-3 overflow-x-auto pb-1 hide-scrollbar">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`menu-chip ${selectedCategory === category.id ? 'menu-chip-active' : ''}`}
            type="button"
            onClick={() => onCategoryChange(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>

    {items.length ? (
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="reveal"
            data-reveal=""
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            <ProductCard
              cartQuantity={cartQuantities[item.id] ?? 0}
              item={item}
              onAddToCart={onAddToCart}
              onOpenCustomizer={onOpenCustomizer}
            />
          </div>
        ))}
      </div>
    ) : (
      <div
        className="panel-soft reveal mt-8 p-8 text-center"
        data-reveal=""
      >
        <p className="font-display text-4xl tracking-[0.04em] text-cream">
          Nenhum item encontrado
        </p>
        <p className="mt-3 text-sm leading-6 text-cream/66">
          Tente outro termo de busca ou troque a categoria para continuar
          navegando pelo cardapio.
        </p>
      </div>
    )}
  </div>
)

export default MenuSection
