import { ArrowRight } from 'lucide-react'
import SectionHeading from './SectionHeading'
import SmartImage from './SmartImage'
import { comboShowcase, siteConfig } from '../data/menuItems'

const CombosSection = ({ onCategoryChange }) => (
  <section
    className="py-24"
    id="combos"
  >
    <div className="section-container">
      <SectionHeading
        eyebrow="Combos"
        title="Combos para matar a fome"
        description="Opções completas para quem quer praticidade sem abrir mão do sabor."
      />

      <div className="mt-10 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div
          className="panel reveal overflow-hidden p-3 sm:p-4"
          data-reveal=""
        >
          <SmartImage
            alt="Banner de combos da Fuego"
            className="aspect-[16/10]"
            imageClassName="scale-[1.03]"
            src={siteConfig.heroImage}
            subtitle="Banner de combos"
            title="Combos da Fuego"
          />
        </div>

        <div className="grid gap-4">
          {comboShowcase.map((item, index) => (
            <article
              key={item.title}
              className="panel-soft reveal card-hover p-5"
              data-reveal=""
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <h3 className="font-display text-3xl tracking-[0.04em] text-cream">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-cream/68">
                {item.description}
              </p>
              <a
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-flame transition hover:text-cream"
                href="#cardapio"
                onClick={() => onCategoryChange(item.categoryId)}
              >
                Explorar categoria
                <ArrowRight className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
)

export default CombosSection
