import {
  Clock3,
  Flame,
  MonitorSmartphone,
  Sandwich,
  Soup,
  Wheat,
} from 'lucide-react'
import SectionHeading from './SectionHeading'
import { experienceItems } from '../data/menuItems'

const iconMap = {
  carne: Flame,
  pao: Wheat,
  acompanhamento: Soup,
  molho: Sandwich,
  rapidez: Clock3,
  premium: MonitorSmartphone,
}

const ExperienceSection = () => (
  <section
    className="py-24"
    id="experiencia"
  >
    <div className="section-container">
      <SectionHeading
        eyebrow="Experiência"
        title="O sabor da brasa no seu pedido"
        description="A Fuego Burger & Steak combina hambúrguer artesanal, carne suculenta, acompanhamentos crocantes e uma experiência de pedido mais prática para o cliente."
      />

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {experienceItems.map((item, index) => {
          const Icon = iconMap[item.icon]

          return (
            <article
              key={item.title}
              className="panel-soft reveal card-hover p-6"
              data-reveal=""
              style={{ transitionDelay: `${index * 70}ms` }}
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-flame">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-2xl font-display tracking-[0.04em] text-cream">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-cream/70">
                {item.description}
              </p>
            </article>
          )
        })}
      </div>
    </div>
  </section>
)

export default ExperienceSection
