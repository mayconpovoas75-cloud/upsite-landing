import {
  Flame,
  LayoutGrid,
  MessageCircleMore,
  PackageCheck,
} from 'lucide-react'
import { benefits } from '../data/menuItems'

const iconMap = {
  whatsapp: MessageCircleMore,
  combos: PackageCheck,
  brasa: Flame,
  menu: LayoutGrid,
}

const BenefitsSection = () => (
  <section className="pb-12 pt-4 sm:pb-16">
    <div className="section-container">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {benefits.map((benefit, index) => {
          const Icon = iconMap[benefit.icon]

          return (
            <article
              key={benefit.title}
              className="panel-soft reveal card-hover p-5"
              data-reveal=""
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-flame/20 bg-flame/10 text-flame shadow-ember">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-cream">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-cream/68">
                {benefit.description}
              </p>
            </article>
          )
        })}
      </div>
    </div>
  </section>
)

export default BenefitsSection
