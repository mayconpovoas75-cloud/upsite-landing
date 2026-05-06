import { MessageCircleMore } from 'lucide-react'
import { quickOrderLink } from '../data/menuItems'
import { EXTERNAL_LINK_PROPS } from '../utils/security'

const FloatingWhatsApp = () => (
  <a
    aria-label="Pedir no WhatsApp"
    className="fixed bottom-6 right-4 z-40 inline-flex items-center gap-3 rounded-full border border-flame/30 bg-[#1b100c]/90 px-4 py-3 text-sm font-bold text-cream shadow-ember backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-[#22120d] sm:right-6"
    href={quickOrderLink}
    {...EXTERNAL_LINK_PROPS}
  >
    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-flame text-white shadow-lg shadow-flame/40">
      <MessageCircleMore className="h-5 w-5" />
    </span>
    <span className="hidden sm:inline">Pedir no WhatsApp</span>
  </a>
)

export default FloatingWhatsApp
