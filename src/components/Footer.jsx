import LogoMark from './LogoMark'
import { PUBLIC_LINKS } from '../config/publicConfig'
import { EXTERNAL_LINK_PROPS } from '../utils/security'

const Footer = () => (
  <footer className="border-t border-flame/10 bg-black/30 py-10">
    <div className="section-container">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <LogoMark className="max-w-max" />
          <p className="mt-4 max-w-md text-sm leading-6 text-cream/66">
            Burger artesanal com sabor de brasa.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-cream/72">
          <a
            className="transition hover:text-flame"
            href="#inicio"
          >
            Inicio
          </a>
          <a
            className="transition hover:text-flame"
            href="#cardapio"
          >
            Cardapio
          </a>
          <a
            className="transition hover:text-flame"
            href="#combos"
          >
            Combos
          </a>
          <a
            className="transition hover:text-flame"
            href="#fidelidade"
          >
            Fidelidade
          </a>
          <a
            className="transition hover:text-flame"
            href={PUBLIC_LINKS.instagram}
            {...EXTERNAL_LINK_PROPS}
          >
            Instagram
          </a>
          <a
            className="transition hover:text-flame"
            href={PUBLIC_LINKS.whatsapp}
            {...EXTERNAL_LINK_PROPS}
          >
            WhatsApp
          </a>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-cream/52 sm:flex-row sm:items-center sm:justify-between">
        <p>Fuego Burger &amp; Steak</p>
        <p>Site demonstrativo temporario criado para apresentacao comercial.</p>
      </div>
    </div>
  </footer>
)

export default Footer
