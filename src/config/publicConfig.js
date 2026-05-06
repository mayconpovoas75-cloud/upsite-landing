import { validateWhatsAppCtaUrl } from '../utils/security'

const DEFAULT_WHATSAPP_URL =
  'https://wa.me/5591985789442?text=Ol%C3%A1%2C%20vi%20o%20site%20da%20UP%20SITE%20e%20quero%20saber%20como%20posso%20ter%20um%20site%20para%20meu%20neg%C3%B3cio'

const DEFAULT_SITE_URL = 'https://upsite.business'

const PUBLIC_WHATSAPP_URL =
  String(import.meta.env.VITE_PUBLIC_WHATSAPP_URL ?? '').trim() ||
  DEFAULT_WHATSAPP_URL

const PUBLIC_SITE_URL =
  String(import.meta.env.VITE_PUBLIC_SITE_URL ?? '').trim() || DEFAULT_SITE_URL

// Somente dados publicos e seguros para exposicao no navegador.
export const PUBLIC_BUSINESS_INFO = Object.freeze({
  location: 'Belem / Ananindeua - Atendimento online para todo o Brasil.',
  name: 'UP SITE',
  phoneDisplay: '(91) 98578-9442',
  serviceArea: 'Atendimento para Belem, Ananindeua e empresas de todo o Brasil.',
  supportText:
    'Criacao de sites profissionais para empresas, autonomos e negocios locais, com foco em gerar mais clientes pelo WhatsApp.',
  tagline: 'Sites que geram clientes. Resultados que impulsionam.',
})

export const PUBLIC_LINKS = Object.freeze({
  site: PUBLIC_SITE_URL,
  whatsapp: validateWhatsAppCtaUrl(PUBLIC_WHATSAPP_URL),
})
