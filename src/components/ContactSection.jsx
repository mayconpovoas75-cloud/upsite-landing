import { Instagram, MessageCircleMore } from 'lucide-react'
import { PUBLIC_LINKS } from '../config/publicConfig'
import { quickOrderLink, siteConfig } from '../data/menuItems'
import { EXTERNAL_LINK_PROPS } from '../utils/security'
import SectionHeading from './SectionHeading'

const ContactSection = () => (
  <section
    className="py-24"
    id="contato"
  >
    <div className="section-container">
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div
          className="panel reveal p-8 sm:p-10"
          data-reveal=""
        >
          <SectionHeading
            eyebrow="Contato"
            title="Peça agora na Fuego"
            description="Atendimento direto, rápido e pronto para transformar o cardápio em mais pedidos."
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <article
            className="panel-soft reveal p-6"
            data-reveal=""
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sand">
              WhatsApp
            </p>
            <h3 className="mt-4 font-display text-4xl tracking-[0.04em] text-cream">
              {siteConfig.phoneDisplay}
            </h3>
            <a
              className="btn-primary mt-6 w-full"
              href={quickOrderLink}
              {...EXTERNAL_LINK_PROPS}
            >
              <MessageCircleMore className="h-4 w-4" />
              Pedir no WhatsApp
            </a>
          </article>

          <article
            className="panel-soft reveal p-6"
            data-reveal=""
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sand">
              Instagram
            </p>
            <h3 className="mt-4 font-display text-4xl tracking-[0.04em] text-cream">
              {siteConfig.instagramHandle}
            </h3>
            <a
              className="btn-secondary mt-6 w-full"
              href={PUBLIC_LINKS.instagram}
              {...EXTERNAL_LINK_PROPS}
            >
              <Instagram className="h-4 w-4" />
              Ver Instagram
            </a>
          </article>
        </div>
      </div>
    </div>
  </section>
)

export default ContactSection
