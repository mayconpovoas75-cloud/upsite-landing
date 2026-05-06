import ProductCard from './ProductCard'
import SectionHeading from './SectionHeading'
import { featuredItems } from '../data/menuItems'

const FeaturedSection = ({
  cartQuantities,
  onAddToCart,
  onOpenCustomizer,
}) => (
  <section
    className="py-24"
    id="mais-pedidos"
  >
    <div className="section-container">
      <SectionHeading
        eyebrow="Mais pedidos"
        title="Mais pedidos da Fuego"
        description="Os favoritos para quem quer pedir sem erro."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
        {featuredItems.map((item, index) => (
          <div
            key={item.id}
            className="reveal"
            data-reveal=""
            style={{ transitionDelay: `${index * 90}ms` }}
          >
            <ProductCard
              cartQuantity={cartQuantities[item.id] ?? 0}
              featured
              item={item}
              onAddToCart={onAddToCart}
              onOpenCustomizer={onOpenCustomizer}
            />
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default FeaturedSection
