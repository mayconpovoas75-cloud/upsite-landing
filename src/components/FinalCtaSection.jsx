import { ArrowRight, MessageCircleMore } from 'lucide-react'
import { quickOrderLink } from '../data/menuItems'
import { EXTERNAL_LINK_PROPS } from '../utils/security'

const FinalCtaSection = () => (
  <section className="py-24">
    <div className="section-container">
      <div
        className="panel reveal relative overflow-hidden px-6 py-10 sm:px-10 lg:px-14 lg:py-14"
        data-reveal=""
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.24),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(153,27,27,0.24),transparent_35%)]" />
        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <span className="section-kicker">Chamada de conversão</span>
            <h2 className="mt-5 font-display text-5xl tracking-[0.05em] text-cream sm:text-6xl">
              Tá com fome?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-cream/72 sm:text-lg">
              Escolha seu burger favorito e finalize o pedido direto pelo
              WhatsApp.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a
              className="btn-primary"
              href="#cardapio"
            >
              Ver cardápio
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              className="btn-secondary"
              href={quickOrderLink}
              {...EXTERNAL_LINK_PROPS}
            >
              Chamar no WhatsApp
              <MessageCircleMore className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default FinalCtaSection
