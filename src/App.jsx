import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Clock3,
  Code2,
  Globe,
  LayoutTemplate,
  MapPin,
  Menu,
  MessageCircle,
  Megaphone,
  MonitorSmartphone,
  MousePointerClick,
  PhoneCall,
  Scissors,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  Store,
  TrendingUp,
  UserRound,
  UtensilsCrossed,
  WandSparkles,
  X,
} from 'lucide-react'
import { PUBLIC_BUSINESS_INFO, PUBLIC_LINKS } from './config/publicConfig'
import { EXTERNAL_LINK_PROPS } from './utils/security'

const navigationItems = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#beneficios', label: 'Beneficios' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#planos', label: 'Planos' },
  { href: '#portfolio', label: 'Portfolio' },
]

const BRAND_ASSETS = {
  full: '/images/upsite-logo-full-nodigital.png?v=blend1',
  symbol: '/images/upsite-logo-mark-nodigital.png?v=blend1',
  wordmark: '/images/upsite-logo-wordmark-nodigital.png?v=blend1',
}

const heroSeals = [
  { icon: Clock3, label: 'Entrega rapida' },
  { icon: MonitorSmartphone, label: 'Site responsivo' },
  { icon: MessageCircle, label: 'WhatsApp integrado' },
  { icon: Globe, label: 'Para qualquer nicho' },
]

const heroSignalCards = [
  {
    icon: Code2,
    title: 'Estrutura limpa',
    description: 'Visual profissional, rapido e pronto para divulgar.',
  },
  {
    icon: MousePointerClick,
    title: 'Conversao clara',
    description: 'Texto objetivo e botao de WhatsApp no lugar certo.',
  },
  {
    icon: WandSparkles,
    title: 'Estetica premium',
    description: 'Acabamento moderno para sua empresa parecer maior.',
  },
]

const heroTickerItems = [
  'WhatsApp',
  'UI clean',
  'CTA forte',
  'Mobile first',
  'Conversao',
]

const heroOrbitTags = [
  { label: 'Lead', modifier: 'hero-orbit__tag--one' },
  { label: 'Mobile', modifier: 'hero-orbit__tag--two' },
  { label: 'Ads', modifier: 'hero-orbit__tag--three' },
  { label: 'WhatsApp', modifier: 'hero-orbit__tag--four' },
]

const footerTickerItems = [
  'UP SITE',
  'Sites que geram clientes',
  'WhatsApp integrado',
  'Mobile first',
  'Visual premium',
  'Atendimento para todo o Brasil',
]

const footerTickerItemsSecondary = [
  'Landing pages premium',
  'Conversao no WhatsApp',
  'Design responsivo',
  'Estrutura para anuncios',
  'Mais confianca online',
  'Sites para qualquer nicho',
]

const heroTitleLines = [
  { text: 'Seu negocio esta' },
  { text: 'perdendo clientes' },
  { text: 'por nao ter um', accent: true },
  { text: 'site profissional', accent: true },
]

const heroPreviewTags = ['CTA forte', 'Mobile first', 'Credibilidade']

const heroPreviewImage = '/images/hero/whatsapp-scene.webp?v=1'

const heroProofAvatars = [
  '/images/hero/proof-avatar-1.webp?v=1',
  '/images/hero/proof-avatar-2.webp?v=1',
  '/images/hero/proof-avatar-3.webp?v=1',
  '/images/hero/proof-avatar-4.webp?v=1',
]

const problemCards = [
  {
    icon: LayoutTemplate,
    title: 'Instagram desorganizado',
    description:
      'O cliente ate entra no perfil, mas nao encontra rapido o que voce vende.',
  },
  {
    icon: Search,
    title: 'Cliente nao sabe onde pedir',
    description:
      'Sem uma pagina clara, ele fica perdido e acaba desistindo do contato.',
  },
  {
    icon: ShieldCheck,
    title: 'Pouca confianca',
    description:
      'Quando a marca nao parece profissional, a decisao de compra fica mais dificil.',
  },
  {
    icon: MessageCircle,
    title: 'Atendimento perdido no WhatsApp',
    description:
      'Muita conversa repetida e pouca organizacao para levar o cliente ate a compra.',
  },
  {
    icon: Building2,
    title: 'Empresa sem presenca profissional',
    description:
      'Fica faltando um link que apresente seu negocio do jeito certo.',
  },
  {
    icon: TrendingUp,
    title: 'Concorrente parecendo mais preparado',
    description:
      'Quem chega melhor apresentado ganha mais atencao e mais chamadas.',
  },
]

const solutionCards = [
  {
    icon: BadgeCheck,
    title: 'Apresentacao profissional',
    description:
      'Seu negocio passa mais seriedade e fica mais facil de confiar.',
  },
  {
    icon: PhoneCall,
    title: 'Botao direto para WhatsApp',
    description:
      'O visitante entende o proximo passo e chama voce com um toque.',
  },
  {
    icon: MonitorSmartphone,
    title: 'Layout bonito no celular',
    description:
      'A maior parte do trafego chega pelo celular, e a experiencia precisa acompanhar.',
  },
  {
    icon: LayoutTemplate,
    title: 'Informacoes organizadas',
    description:
      'Servico, horarios, endereco, beneficios e contato no lugar certo.',
  },
  {
    icon: ShieldCheck,
    title: 'Mais confianca para o cliente',
    description:
      'Uma pagina bem feita ajuda a remover duvidas e acelerar a decisao.',
  },
  {
    icon: Megaphone,
    title: 'Estrutura pronta para anuncios',
    description:
      'Quem clica no anuncio chega em uma pagina pensada para gerar conversa.',
  },
]

const benefitItems = [
  'Mais clientes chamando no WhatsApp',
  'Mais credibilidade para sua empresa',
  'Mais clareza sobre seus servicos',
  'Melhor apresentacao do seu negocio',
  'Pagina pronta para divulgar em anuncios',
  'Link profissional para colocar no Instagram',
  'Atendimento mais direto',
  'Presenca online mais forte',
]

const nicheCards = [
  { icon: UtensilsCrossed, title: 'Restaurantes e lanchonetes' },
  { icon: Scissors, title: 'Barbearias e saloes' },
  { icon: Stethoscope, title: 'Clinicas e estetica' },
  { icon: Store, title: 'Lojas fisicas' },
  { icon: BriefcaseBusiness, title: 'Prestadores de servico' },
  { icon: UserRound, title: 'Autonomos' },
  { icon: Building2, title: 'Pequenas empresas' },
  { icon: MapPin, title: 'Negocios locais' },
]

const portfolioCards = [
  {
    accent: '#ff9333',
    accentSoft: 'rgba(255, 147, 51, 0.18)',
    badge: 'Pronto para adaptar',
    benefit: 'Cardapio organizado e pedidos direto no WhatsApp.',
    cta: 'Ver como ficaria o seu',
    emotionalCopy: 'Seu concorrente ja pode estar usando algo assim.',
    icon: UtensilsCrossed,
    microCopy: 'Esse modelo pode ser adaptado para o seu negocio.',
    previewBrand: 'Brasa Prime',
    previewCta: 'Pedir no WhatsApp',
    previewDescription:
      'Destaques, horarios e um pedido rapido para o cliente agir sem pensar demais.',
    previewEyebrow: 'Menu + pedidos',
    previewSections: ['Combos', 'Pratos', 'Local'],
    previewTags: ['Entrega', 'Reserva', 'Cardapio'],
    previewTitle: 'Mais pedidos com um cardapio facil de entender',
    previewVisualLabel: 'Combos do dia',
    previewMenu: ['Inicio', 'Cardapio', 'Reserva', 'Contato'],
    previewMobileCta: 'Pedir agora',
    previewImage: '/images/portfolio/restaurant-demo-hq.webp?v=1',
    previewScene: 'restaurant',
    title: 'Restaurantes e lanchonetes',
  },
  {
    accent: '#6de3ff',
    accentSoft: 'rgba(109, 227, 255, 0.18)',
    badge: 'Modelo estrategico',
    benefit: 'Agendamentos simples e visual profissional.',
    cta: 'Aplicar no meu negocio',
    emotionalCopy: 'Seu concorrente ja pode estar usando algo assim.',
    icon: Scissors,
    microCopy: 'Esse modelo pode ser adaptado para o seu negocio.',
    previewBrand: 'Corte Select',
    previewCta: 'Agendar horario',
    previewDescription:
      'Servicos, equipe e horarios em uma estrutura limpa para facilitar o agendamento.',
    previewEyebrow: 'Agenda aberta',
    previewSections: ['Cortes', 'Equipe', 'Planos'],
    previewTags: ['Barba', 'Cabelo', 'Horarios'],
    previewTitle: 'Agendamento simples com aparencia de marca forte',
    previewVisualLabel: 'Corte em destaque',
    previewMenu: ['Inicio', 'Servicos', 'Equipe', 'Contato'],
    previewMobileCta: 'Agendar',
    previewImage: '/images/portfolio/barber-demo-hq.webp?v=1',
    previewScene: 'barber',
    title: 'Barbearias e saloes',
  },
  {
    accent: '#8ad5ff',
    accentSoft: 'rgba(138, 213, 255, 0.16)',
    badge: 'Pode ser o seu site',
    benefit: 'Mais confianca e autoridade para seus clientes.',
    cta: 'Ver como ficaria o seu',
    emotionalCopy: 'Seu concorrente ja pode estar usando algo assim.',
    icon: Stethoscope,
    microCopy: 'Esse modelo pode ser adaptado para o seu negocio.',
    previewBrand: 'Clinica Axis',
    previewCta: 'Falar com a equipe',
    previewDescription:
      'Tratamentos, prova visual e contato no ponto certo para passar seguranca.',
    previewEyebrow: 'Atendimento premium',
    previewSections: ['Tratamentos', 'Equipe', 'Endereco'],
    previewTags: ['Consulta', 'Credibilidade', 'WhatsApp'],
    previewTitle: 'Autoridade visual para quem precisa transmitir confianca',
    previewVisualLabel: 'Ambiente profissional',
    previewMenu: ['Inicio', 'Tratamentos', 'Sobre', 'Contato'],
    previewMobileCta: 'Agendar avaliacao',
    previewImage: '/images/portfolio/clinic-demo-hq.webp?v=1',
    previewScene: 'clinic',
    title: 'Clinicas e estetica',
  },
  {
    accent: '#52b7ff',
    accentSoft: 'rgba(82, 183, 255, 0.18)',
    badge: 'Pronto para adaptar',
    benefit: 'Produtos em destaque e contato rapido.',
    cta: 'Aplicar no meu negocio',
    emotionalCopy: 'Seu concorrente ja pode estar usando algo assim.',
    icon: Store,
    microCopy: 'Esse modelo pode ser adaptado para o seu negocio.',
    previewBrand: 'Loja Vertice',
    previewCta: 'Chamar atendimento',
    previewDescription:
      'Uma vitrine clara para destacar oferta, produto e o proximo passo do cliente.',
    previewEyebrow: 'Vitrine online',
    previewSections: ['Destaques', 'Ofertas', 'Contato'],
    previewTags: ['Produtos', 'Oferta', 'Entrega'],
    previewTitle: 'Vitrine pronta para transformar curiosidade em conversa',
    previewVisualLabel: 'Produto em alta',
    previewMenu: ['Inicio', 'Produtos', 'Ofertas', 'Contato'],
    previewMobileCta: 'Ver oferta',
    previewImage: '/images/portfolio/store-demo-hq.webp?v=1',
    previewScene: 'store',
    title: 'Lojas fisicas',
  },
  {
    accent: '#ffb257',
    accentSoft: 'rgba(255, 178, 87, 0.17)',
    badge: 'Modelo estrategico',
    benefit: 'Mais orcamentos com uma apresentacao clara.',
    cta: 'Ver como ficaria o seu',
    emotionalCopy: 'Seu concorrente ja pode estar usando algo assim.',
    icon: BriefcaseBusiness,
    microCopy: 'Esse modelo pode ser adaptado para o seu negocio.',
    previewBrand: 'Prime Solucoes',
    previewCta: 'Solicitar orcamento',
    previewDescription:
      'Beneficios, processo e chamada certa para transformar visita em pedido de proposta.',
    previewEyebrow: 'Gerar orcamento',
    previewSections: ['Beneficios', 'Processo', 'Contato'],
    previewTags: ['Resultado', 'Clareza', 'WhatsApp'],
    previewTitle: 'Apresentacao pensada para fazer o cliente pedir proposta',
    previewVisualLabel: 'Servico em foco',
    previewMenu: ['Inicio', 'Servicos', 'Processo', 'Contato'],
    previewMobileCta: 'Pedir proposta',
    previewImage: '/images/portfolio/services-demo-hq.webp?v=1',
    previewScene: 'services',
    title: 'Prestadores de servico',
  },
  {
    accent: '#7fc4ff',
    accentSoft: 'rgba(127, 196, 255, 0.16)',
    badge: 'Pode ser o seu site',
    benefit: 'Seu trabalho com aparencia profissional.',
    cta: 'Aplicar no meu negocio',
    emotionalCopy: 'Seu concorrente ja pode estar usando algo assim.',
    icon: UserRound,
    microCopy: 'Esse modelo pode ser adaptado para o seu negocio.',
    previewBrand: 'Oficio Pro',
    previewCta: 'Falar comigo',
    previewDescription:
      'Uma pagina direta para explicar o que voce faz e facilitar o primeiro contato.',
    previewEyebrow: 'Marca pessoal',
    previewSections: ['Trabalhos', 'Sobre', 'Contato'],
    previewTags: ['Agenda', 'Portfolio', 'Confianca'],
    previewTitle: 'Seu trabalho apresentado com postura de profissional serio',
    previewVisualLabel: 'Seu servico aqui',
    previewMenu: ['Inicio', 'Trabalhos', 'Sobre', 'Contato'],
    previewMobileCta: 'Chamar agora',
    previewImage: '/images/portfolio/autonomous-demo-hq.webp?v=1',
    previewScene: 'autonomous',
    title: 'Autonomos',
  },
  {
    accent: '#5cd2ff',
    accentSoft: 'rgba(92, 210, 255, 0.17)',
    badge: 'Pronto para adaptar',
    benefit: 'Mais presenca online e mais clientes.',
    cta: 'Ver como ficaria o seu',
    emotionalCopy: 'Seu concorrente ja pode estar usando algo assim.',
    icon: Building2,
    microCopy: 'Esse modelo pode ser adaptado para o seu negocio.',
    previewBrand: 'Atlas Negocios',
    previewCta: 'Conversar no WhatsApp',
    previewDescription:
      'Uma estrutura completa para a empresa parecer organizada, forte e pronta para vender.',
    previewEyebrow: 'Empresa mais forte',
    previewSections: ['Solucoes', 'Equipe', 'Credibilidade'],
    previewTags: ['Marca', 'Presenca', 'Resultado'],
    previewTitle: 'Aparencia de empresa pronta para crescer com consistencia',
    previewVisualLabel: 'Marca em destaque',
    previewMenu: ['Inicio', 'Solucoes', 'Sobre', 'Contato'],
    previewMobileCta: 'Falar com a empresa',
    previewImage: '/images/portfolio/business-demo-hq.webp?v=1',
    previewScene: 'business',
    title: 'Pequenas empresas',
  },
  {
    accent: '#92dfff',
    accentSoft: 'rgba(146, 223, 255, 0.16)',
    badge: 'Modelo estrategico',
    benefit: 'Mais visibilidade na sua regiao.',
    cta: 'Aplicar no meu negocio',
    emotionalCopy: 'Seu concorrente ja pode estar usando algo assim.',
    icon: MapPin,
    microCopy: 'Esse modelo pode ser adaptado para o seu negocio.',
    previewBrand: 'Bairro Forte',
    previewCta: 'Chamar pelo WhatsApp',
    previewDescription:
      'Localizacao, prova social e contato simples para ser encontrado e lembrado com mais facilidade.',
    previewEyebrow: 'Negocio local',
    previewSections: ['Endereco', 'Servicos', 'Horarios'],
    previewTags: ['Mapa', 'Bairro', 'Contato'],
    previewTitle: 'Mais visibilidade para quem precisa vender na propria regiao',
    previewVisualLabel: 'Atendimento local',
    previewMenu: ['Inicio', 'Servicos', 'Local', 'Contato'],
    previewMobileCta: 'Ver local',
    previewImage: '/images/portfolio/local-demo-hq.webp?v=1',
    previewScene: 'local',
    title: 'Negocios locais',
  },
]

const workflowSteps = [
  {
    step: 'Passo 1',
    title: 'Voce chama no WhatsApp',
    description:
      'Conversamos rapido sobre seu negocio e o que voce precisa.',
  },
  {
    step: 'Passo 2',
    title: 'Eu monto a estrutura',
    description:
      'Crio o site com visual profissional, textos claros e botao de contato.',
  },
  {
    step: 'Passo 3',
    title: 'Voce comeca a divulgar',
    description:
      'Depois de aprovado, voce usa o link no Instagram, WhatsApp, anuncios e cartoes.',
  },
]

const planCards = [
  {
    name: 'Plano Start',
    price: 'R$397',
    subtitle: 'Pra quem nao tem nada e quer comecar',
    items: [
      'Pagina unica estilo landing page',
      'Botao direto para WhatsApp',
      'Apresentacao do negocio',
      'Informacoes principais',
      'Layout profissional simples',
      'Ideal para autonomos e pequenos negocios',
    ],
    cta: 'Quero comecar',
  },
  {
    name: 'Plano Profissional',
    price: 'R$797',
    subtitle: 'Pra quem quer parecer empresa de verdade',
    badge: 'Mais escolhido',
    featured: true,
    items: [
      'Site completo com 3 a 5 secoes',
      'Design profissional',
      'WhatsApp integrado',
      'Estrutura organizada',
      'Otimizado para celular',
      'Ideal para restaurantes, barbearias, clinicas, lojas e servicos',
      'Foco em atrair cliente',
    ],
    cta: 'Quero o profissional',
  },
  {
    name: 'Plano Premium',
    price: 'R$1.300+',
    subtitle: 'Pra quem quer crescer com estrategia, automacao e mais valor percebido',
    items: [
      'Tudo do plano Profissional',
      'Textos mais estrategicos para venda',
      'Estrutura focada em conversao',
      'Organizacao do atendimento',
      'Base para anuncios',
      'Estrutura pronta para integrar IA de conversa',
      'Ideal para empresas que querem escalar',
    ],
    note: 'Projetos com IA conversacional e automacoes mais avancadas sao avaliados pelo escopo.',
    cta: 'Quero o premium',
  },
]

const guaranteeSeals = [
  'Ajustes inclusos',
  'Atendimento direto',
  'Foco em resultado',
  'Site feito para celular',
]

const testimonials = [
  {
    avatar: heroProofAvatars[0],
    name: 'Perfil: clinica de estetica',
    role: 'Mais confianca no primeiro contato',
    quote:
      'Agora eu consigo mandar um link bonito, explicar meus tratamentos sem textao e receber mensagens muito mais certeiras no WhatsApp.',
  },
  {
    avatar: heroProofAvatars[1],
    name: 'Perfil: prestador de servico',
    role: 'Mais clareza para gerar orcamento',
    quote:
      'Antes eu perdia tempo explicando tudo na conversa. Com um site claro, o cliente ja chega entendendo o valor e pedindo orcamento com mais seguranca.',
  },
  {
    avatar: heroProofAvatars[2],
    name: 'Perfil: negocio local',
    role: 'Mais presenca e mais credibilidade',
    quote:
      'Ficou muito mais facil parecer empresa de verdade. Hoje eu tenho um link profissional para enviar e isso muda a forma como o cliente enxerga meu negocio.',
  },
]

const finalCtaPoints = [
  {
    icon: MessageCircle,
    title: 'Resposta humanizada',
    description: 'Voce fala direto comigo, sem robo e sem enrolacao.',
  },
  {
    icon: LayoutTemplate,
    title: 'Direcao clara',
    description: 'Eu te mostro qual estrutura faz mais sentido para o seu nicho.',
  },
  {
    icon: Sparkles,
    title: 'Pronto para evoluir',
    description: 'Se fizer sentido, ja pensamos em IA, automacao e atendimento.',
  },
]

const cn = (...classNames) => classNames.filter(Boolean).join(' ')

const SectionHeading = ({ eyebrow, title, description, centered = false }) => (
  <div
    className={cn('section-heading', 'reveal', centered && 'section-heading--center')}
    data-reveal
  >
    <span className="section-heading__eyebrow">{eyebrow}</span>
    <h2>{title}</h2>
    <p>{description}</p>
  </div>
)

const WhatsAppButton = ({
  children,
  className = '',
  compact = false,
  pulse = false,
}) => (
  <a
    className={cn(
      'button',
      compact ? 'button--compact' : '',
      pulse && 'button--pulse',
      className,
    )}
    href={PUBLIC_LINKS.whatsapp}
    {...EXTERNAL_LINK_PROPS}
  >
    <span>{children}</span>
    <ArrowRight aria-hidden="true" size={18} />
  </a>
)

const BrandLogo = ({
  alt = 'UP SITE',
  className = '',
  variant = 'wordmark',
}) => (
  <img
    alt={alt}
    className={cn('brand-logo', `brand-logo--${variant}`, className)}
    src={BRAND_ASSETS[variant]}
  />
)

const buildPortfolioWhatsAppUrl = (title) => {
  const url = new URL(PUBLIC_LINKS.whatsapp)

  url.searchParams.set(
    'text',
    `Ola, vi o modelo para ${title} no site da UP SITE e quero entender como ele ficaria no meu negocio.`,
  )

  return url.toString()
}

// Mockup visual do hero com fundo mais realista para reforcar a ideia de venda.
const PortfolioPreview = ({
  eyebrow,
  previewTitle,
  previewTags,
  previewImage,
}) => (
  <div
    aria-hidden="true"
    className="portfolio-preview"
  >
    <div className="portfolio-preview__desktop">
      <div className="portfolio-preview__bar">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="portfolio-preview__screen">
        {previewImage ? (
          <>
            <img
              alt=""
              className="portfolio-preview__bg"
              loading="eager"
              src={previewImage}
            />
            <span className="portfolio-preview__bg-overlay"></span>
          </>
        ) : null}

        <div className="portfolio-preview__content">
          <span className="portfolio-preview__eyebrow">{eyebrow}</span>
          <strong>{previewTitle}</strong>
          <div className="portfolio-preview__lines">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="portfolio-preview__chips">
            {previewTags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="portfolio-preview__cards">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>

    <div className="portfolio-preview__phone">
      <div className="portfolio-preview__phone-screen">
        <span className="portfolio-preview__phone-badge">Mobile</span>
        <div className="portfolio-preview__phone-lines">
          <span></span>
          <span></span>
        </div>
        <div className="portfolio-preview__phone-button"></div>
      </div>
    </div>
  </div>
)

const PortfolioModelPreview = ({
  previewImage,
  title,
}) => (
  <div aria-hidden="true" className="portfolio-model-preview">
    <div className="portfolio-model-preview__image-shell">
      <img
        alt={`Exemplo visual para ${title}`}
        className="portfolio-model-preview__image"
        loading="lazy"
        src={previewImage}
      />
      <div className="portfolio-model-preview__image-overlay"></div>
    </div>
  </div>
)

const App = () => {
  const [isAppReady, setIsAppReady] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHeaderSolid, setIsHeaderSolid] = useState(false)
  const [showFloatingWhatsApp, setShowFloatingWhatsApp] = useState(false)
  const [activePortfolioIndex, setActivePortfolioIndex] = useState(0)
  const heroVisualRef = useRef(null)
  const portfolioTrackRef = useRef(null)
  const portfolioDragStateRef = useRef({
    isDragging: false,
    pointerId: null,
    startX: 0,
    scrollLeft: 0,
  })

  useEffect(() => {
    let frameId = 0

    const syncScrollState = () => {
      frameId = 0

      const scrollY = window.scrollY
      const root = document.documentElement
      const parallaxOffset = Math.min(scrollY * 0.18, 88)
      const parallaxSoft = Math.min(scrollY * 0.12, 48)
      const isMobileViewport = window.innerWidth <= 720

      setIsHeaderSolid(scrollY > 18)
      setShowFloatingWhatsApp(!isMobileViewport || scrollY > 440)
      root.style.setProperty('--parallax-offset', `${parallaxOffset.toFixed(2)}px`)
      root.style.setProperty('--parallax-soft', `${parallaxSoft.toFixed(2)}px`)
    }

    const handleScroll = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(syncScrollState)
      }
    }

    syncScrollState()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (frameId) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [])

  useEffect(() => {
    let timerId = 0
    let frameId = 0

    frameId = window.requestAnimationFrame(() => {
      timerId = window.setTimeout(() => {
        setIsAppReady(true)
      }, 420)
    })

    return () => {
      window.cancelAnimationFrame(frameId)
      window.clearTimeout(timerId)
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 960) {
        setIsMenuOpen(false)
      }
    }

    const closeMenu = () => setIsMenuOpen(false)

    window.addEventListener('resize', handleResize)
    window.addEventListener('hashchange', closeMenu)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('hashchange', closeMenu)
    }
  }, [])

  useEffect(() => {
    const revealItems = document.querySelectorAll('[data-reveal]')

    if (!revealItems.length) {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.12) {
            entry.target.classList.add('is-visible')
          } else {
            entry.target.classList.remove('is-visible')
          }
        })
      },
      {
        rootMargin: '0px 0px -8% 0px',
        threshold: [0, 0.12, 0.24, 0.42],
      },
    )

    revealItems.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const track = portfolioTrackRef.current

    if (!track) {
      return undefined
    }

    const getSlides = () => Array.from(track.querySelectorAll('[data-portfolio-slide]'))

    const syncActiveSlide = () => {
      const slides = getSlides()

      if (!slides.length) {
        return
      }

      const trackCenter = track.scrollLeft + track.clientWidth / 2
      let nextIndex = 0
      let shortestDistance = Number.POSITIVE_INFINITY

      slides.forEach((slide, index) => {
        const slideCenter = slide.offsetLeft + slide.clientWidth / 2
        const distance = Math.abs(slideCenter - trackCenter)

        if (distance < shortestDistance) {
          shortestDistance = distance
          nextIndex = index
        }
      })

      setActivePortfolioIndex((currentIndex) =>
        currentIndex === nextIndex ? currentIndex : nextIndex,
      )
    }

    syncActiveSlide()
    track.addEventListener('scroll', syncActiveSlide, { passive: true })
    window.addEventListener('resize', syncActiveSlide)

    return () => {
      track.removeEventListener('scroll', syncActiveSlide)
      window.removeEventListener('resize', syncActiveSlide)
    }
  }, [])

  const handleHeroPointerMove = (event) => {
    const heroVisual = heroVisualRef.current

    if (!heroVisual) {
      return
    }

    const rect = heroVisual.getBoundingClientRect()
    const pointerX = ((event.clientX - rect.left) / rect.width) * 100
    const pointerY = ((event.clientY - rect.top) / rect.height) * 100
    const tiltX = (0.5 - pointerY / 100) * 8
    const tiltY = (pointerX / 100 - 0.5) * 10

    heroVisual.style.setProperty('--pointer-x', `${pointerX.toFixed(2)}%`)
    heroVisual.style.setProperty('--pointer-y', `${pointerY.toFixed(2)}%`)
    heroVisual.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`)
    heroVisual.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`)
  }

  const resetHeroPointer = () => {
    const heroVisual = heroVisualRef.current

    if (!heroVisual) {
      return
    }

    heroVisual.style.setProperty('--pointer-x', '72%')
    heroVisual.style.setProperty('--pointer-y', '28%')
    heroVisual.style.setProperty('--tilt-x', '0deg')
    heroVisual.style.setProperty('--tilt-y', '0deg')
  }

  const getNearestPortfolioIndex = (track) => {
    const slides = Array.from(track.querySelectorAll('[data-portfolio-slide]'))

    if (!slides.length) {
      return 0
    }

    const trackCenter = track.scrollLeft + track.clientWidth / 2
    let nextIndex = 0
    let shortestDistance = Number.POSITIVE_INFINITY

    slides.forEach((slide, index) => {
      const slideCenter = slide.offsetLeft + slide.clientWidth / 2
      const distance = Math.abs(slideCenter - trackCenter)

      if (distance < shortestDistance) {
        shortestDistance = distance
        nextIndex = index
      }
    })

    return nextIndex
  }

  const scrollPortfolioTo = (nextIndex) => {
    const track = portfolioTrackRef.current

    if (!track) {
      return
    }

    const slides = Array.from(track.querySelectorAll('[data-portfolio-slide]'))
    const safeIndex = Math.max(0, Math.min(nextIndex, slides.length - 1))
    const targetSlide = slides[safeIndex]

    if (!targetSlide) {
      return
    }

    const leftOffset =
      targetSlide.offsetLeft - (track.clientWidth - targetSlide.clientWidth) / 2

    track.scrollTo({
      left: Math.max(0, leftOffset),
      behavior: 'smooth',
    })
  }

  const handlePortfolioWheel = (event) => {
    const track = portfolioTrackRef.current

    if (!track || window.innerWidth < 961 || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
      return
    }

    event.preventDefault()
    track.scrollBy({
      left: event.deltaY,
      behavior: 'auto',
    })
  }

  const handlePortfolioPointerDown = (event) => {
    if (event.pointerType !== 'mouse') {
      return
    }

    if (event.target instanceof Element && event.target.closest('a, button')) {
      return
    }

    const track = portfolioTrackRef.current

    if (!track) {
      return
    }

    portfolioDragStateRef.current = {
      isDragging: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      scrollLeft: track.scrollLeft,
    }

    track.classList.add('is-dragging')
    track.setPointerCapture(event.pointerId)
  }

  const handlePortfolioPointerMove = (event) => {
    const track = portfolioTrackRef.current
    const dragState = portfolioDragStateRef.current

    if (!track || !dragState.isDragging || dragState.pointerId !== event.pointerId) {
      return
    }

    event.preventDefault()
    const offsetX = event.clientX - dragState.startX
    track.scrollLeft = dragState.scrollLeft - offsetX
  }

  const endPortfolioDrag = (event) => {
    const track = portfolioTrackRef.current
    const dragState = portfolioDragStateRef.current

    if (!track || !dragState.isDragging || dragState.pointerId !== event.pointerId) {
      return
    }

    portfolioDragStateRef.current = {
      isDragging: false,
      pointerId: null,
      startX: 0,
      scrollLeft: 0,
    }

    track.classList.remove('is-dragging')

    if (track.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId)
    }

    scrollPortfolioTo(getNearestPortfolioIndex(track))
  }

  const handlePortfolioKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      scrollPortfolioTo(activePortfolioIndex + 1)
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      scrollPortfolioTo(activePortfolioIndex - 1)
    }
  }

  const currentYear = new Date().getFullYear()

  return (
    <div className={cn('app-shell', isAppReady && 'app-shell--ready')}>
      <div
        aria-hidden={isAppReady}
        className={cn('app-loader', isAppReady && 'app-loader--hidden')}
      >
        <div className="app-loader__content">
          <BrandLogo className="app-loader__logo" variant="full" />
          <div className="app-loader__copy">
            <strong>UP SITE</strong>
            <span>Carregando experiencia premium</span>
          </div>
          <div className="app-loader__bar">
            <span></span>
          </div>
        </div>
      </div>

      <header className={cn('site-header', isHeaderSolid && 'site-header--solid')}>
        <div className="site-header__inner">
          <a
            className="brand"
            href="#inicio"
            onClick={() => setIsMenuOpen(false)}
          >
            <BrandLogo className="brand__logo" variant="wordmark" />
          </a>

          <button
            aria-controls="primary-navigation"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            className="menu-button"
            onClick={() => setIsMenuOpen((currentState) => !currentState)}
            type="button"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <div
            className={cn('site-header__nav-shell', isMenuOpen && 'is-open')}
            id="primary-navigation"
          >
            <nav
              aria-label="Menu principal"
              className="site-nav"
            >
              {navigationItems.map((item) => (
                <a
                  className="site-nav__link"
                  href={item.href}
                  key={item.label}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <WhatsAppButton
              className="site-header__cta"
              compact
            >
              Falar no WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      </header>

      <main>
        <section
          className="hero-section"
          id="inicio"
        >
          <div className="hero-section__backdrop" aria-hidden="true">
            <span className="hero-orb hero-orb--primary"></span>
            <span className="hero-orb hero-orb--secondary"></span>
            <span className="hero-grid"></span>
            <span className="hero-beam hero-beam--one"></span>
            <span className="hero-beam hero-beam--two"></span>
            <span className="hero-beam hero-beam--three"></span>
          </div>

          <div className="section-shell hero-section__content">
            <div
              className="hero-copy reveal is-visible"
              data-reveal
            >
              <div
                className="hero-copy__eyebrow-row hero-sequence"
                style={{ '--sequence-index': 0 }}
              >
                <span className="hero-copy__eyebrow">Sites profissionais</span>
                <span className="hero-copy__eyebrow hero-copy__eyebrow--ghost">
                  Padrao premium
                </span>
              </div>
              <p className="hero-copy__kicker hero-sequence" style={{ '--sequence-index': 1 }}>
                Criamos sites modernos que passam confianca e levam clientes direto para o seu WhatsApp.
              </p>
              <h1 aria-label="Seu negocio esta perdendo clientes por nao ter um site profissional?">
                {heroTitleLines.map(({ text, accent }, index) => (
                  <span
                    className={cn(
                      'hero-copy__title-line',
                      accent && 'hero-copy__title-line--accent',
                    )}
                    key={text}
                    style={{ '--sequence-index': index + 2 }}
                  >
                    {text}
                  </span>
                ))}
              </h1>
              <p className="hero-copy__lead hero-sequence" style={{ '--sequence-index': 7 }}>
                Sites claros, bonitos e estrategicos para sua empresa parecer mais forte,
                vender melhor e receber mais pedidos.
              </p>

              <div className="hero-copy__actions hero-sequence" style={{ '--sequence-index': 8 }}>
                <WhatsAppButton pulse>Quero meu site agora</WhatsAppButton>
                <a className="button button--ghost" href="#planos">
                  <span>Ver planos</span>
                </a>
              </div>

              <div className="hero-copy__price-tag hero-sequence" style={{ '--sequence-index': 9 }}>
                <BadgeCheck aria-hidden="true" size={18} />
                <span>Sites a partir de R$397</span>
              </div>

              <div className="hero-proof hero-sequence" style={{ '--sequence-index': 10 }}>
                <div className="hero-proof__avatars" aria-hidden="true">
                  {heroProofAvatars.map((avatarSrc, index) => (
                    <img
                      alt=""
                      decoding="async"
                      height="34"
                      key={avatarSrc}
                      loading="lazy"
                      src={avatarSrc}
                      width="34"
                    />
                  ))}
                </div>
                <div className="hero-proof__content">
                  <div className="hero-proof__stars" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star fill="currentColor" key={index} size={14} />
                    ))}
                  </div>
                  <span>+200 negocios impulsionados</span>
                </div>
              </div>
            </div>

            <div
              className="hero-visual reveal is-visible"
              data-reveal
              onPointerLeave={resetHeroPointer}
              onPointerMove={handleHeroPointerMove}
              ref={heroVisualRef}
              style={{ '--reveal-delay': '0.08s' }}
            >
              <div className="hero-orbit" aria-hidden="true">
                <span className="hero-orbit__ring hero-orbit__ring--outer"></span>
                <span className="hero-orbit__ring hero-orbit__ring--middle"></span>
                <span className="hero-orbit__ring hero-orbit__ring--inner"></span>
                <span className="hero-orbit__pulse"></span>
                <span className="hero-orbit__core"></span>

                {heroOrbitTags.map(({ label, modifier }) => (
                  <span className={cn('hero-orbit__tag', modifier)} key={label}>
                    {label}
                  </span>
                ))}
              </div>

              <div className="hero-stage">
                <div className="hero-stage__topline">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <div className="hero-stage__copy hero-stage__copy--brand">
                  <BrandLogo className="hero-stage__brand-image" variant="full" />
                  <p>
                    Visual moderno com fundo premium, informacoes claras e botao de WhatsApp no lugar certo.
                  </p>
                </div>

                <div className="hero-stage__preview-shell">
                  <PortfolioPreview
                    eyebrow="Landing page"
                    previewImage={heroPreviewImage}
                    previewTags={heroPreviewTags}
                    previewTitle="Visual pronto para vender no WhatsApp"
                  />
                </div>

                <div className="hero-stage__signals hero-stage__signals--summary">
                  {heroSignalCards.map(({ icon: Icon, title, description }) => (
                    <article
                      className="hero-signal-card"
                      key={title}
                    >
                      <div className="hero-signal-card__icon">
                        <Icon aria-hidden="true" size={16} />
                      </div>
                      <strong>{title}</strong>
                      <span>{description}</span>
                    </article>
                  ))}
                </div>
              </div>

              <div className="hero-note hero-note--floating">
                <Sparkles aria-hidden="true" size={18} />
                <span>Mesmo clima visual da sua referencia: limpo, premium e tecnologico.</span>
              </div>

              <div className="hero-phone-card">
                <div className="hero-phone-card__screen">
                  <BrandLogo
                    alt="Simbolo UP SITE"
                    className="hero-phone-card__logo"
                    variant="symbol"
                  />
                  <span className="hero-phone-card__status">WhatsApp integrado</span>
                  <strong>Pronto para converter no celular</strong>
                  <p>Do anuncio ou Instagram para uma pagina que explica, valoriza e chama para a acao.</p>
                  <div className="hero-phone-card__cta">Quero esse resultado</div>
                </div>
              </div>
            </div>

            <div className="hero-seals hero-seals--full">
              {heroSeals.map(({ icon: Icon, label }, index) => (
                <div
                  className="hero-seal reveal is-visible"
                  data-reveal
                  key={label}
                  style={{ '--reveal-delay': `${0.08 * (index + 1)}s` }}
                >
                  <Icon aria-hidden="true" size={18} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell section-block">
          <SectionHeading
            description="Muitos negocios perdem vendas todos os dias porque dependem apenas do Instagram, tem informacoes baguncadas ou nao passam confianca na internet."
            eyebrow="Problema"
            title="Seu cliente pode estar procurando por voce... mas nao te encontra."
          />

          <div className="card-grid">
            {problemCards.map(({ icon: Icon, title, description }, index) => (
              <article
                className="surface-card reveal"
                data-reveal
                key={title}
                style={{ '--reveal-delay': `${0.06 * index}s` }}
              >
                <div className="surface-card__icon">
                  <Icon aria-hidden="true" size={20} />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block section-block--accent">
          <div className="section-shell section-split">
            <div
              className="section-split__content reveal"
              data-reveal
            >
              <SectionHeading
                description="A UP SITE cria paginas modernas, simples e estrategicas para apresentar seu negocio, mostrar seus servicos e levar o cliente direto para o WhatsApp."
                eyebrow="Solucao"
                title="Com um site profissional, seu negocio fica mais facil de encontrar, entender e chamar."
              />

              <WhatsAppButton className="section-split__cta" compact>
                Pedir orcamento no WhatsApp
              </WhatsAppButton>
            </div>

            <div className="card-grid card-grid--compact">
              {solutionCards.map(({ icon: Icon, title, description }, index) => (
                <article
                  className="surface-card surface-card--soft reveal"
                  data-reveal
                  key={title}
                  style={{ '--reveal-delay': `${0.05 * index}s` }}
                >
                  <div className="surface-card__icon surface-card__icon--blue">
                    <Icon aria-hidden="true" size={20} />
                  </div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="section-shell section-block"
          id="beneficios"
        >
          <div className="benefits-layout">
            <div
              className="benefits-layout__copy reveal"
              data-reveal
            >
              <SectionHeading
                description="Mais do que ter um layout bonito, o objetivo e facilitar a decisao do cliente e deixar sua empresa melhor apresentada."
                eyebrow="Beneficios"
                title="O que seu negocio ganha com um site?"
              />

              <div className="benefits-panel">
                <div>
                  <strong>Foco total em resultado</strong>
                  <p>
                    A pagina e pensada para explicar bem, organizar informacoes e
                    fazer o visitante clicar no WhatsApp.
                  </p>
                </div>

                <WhatsAppButton compact>Quero entender qual plano faz sentido</WhatsAppButton>
              </div>
            </div>

            <div className="benefits-list">
              {benefitItems.map((item, index) => (
                <article
                  className="benefit-item reveal"
                  data-reveal
                  key={item}
                  style={{ '--reveal-delay': `${0.04 * index}s` }}
                >
                  <CheckCircle2 aria-hidden="true" size={20} />
                  <span>{item}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-block section-block--subtle">
          <div className="section-shell">
            <SectionHeading
              centered
              description="Cada site e adaptado para o tipo de negocio, com foco em levar o cliente para a acao certa: pedir, agendar, solicitar orcamento ou chamar no WhatsApp."
              eyebrow="Nichos"
              title="Sites para qualquer tipo de negocio"
            />

            <div className="niche-grid">
              {nicheCards.map(({ icon: Icon, title }, index) => (
                <article
                  className="niche-card reveal"
                  data-reveal
                  key={title}
                  style={{ '--reveal-delay': `${0.05 * index}s` }}
                >
                  <Icon aria-hidden="true" size={20} />
                  <span>{title}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="section-shell section-block"
          id="portfolio"
        >
          <SectionHeading
            centered
            description="Veja como seu negocio pode se apresentar online com um site profissional focado em resultado."
            eyebrow="Catalogo visual"
            title="Modelos de sites pensados para gerar clientes"
          />

          <div className="portfolio-carousel reveal" data-reveal>
            <div className="portfolio-carousel__top">
              <div className="portfolio-carousel__meta">
                <span>Modelos premium</span>
                <strong>
                  {String(activePortfolioIndex + 1).padStart(2, '0')} /{' '}
                  {String(portfolioCards.length).padStart(2, '0')}
                </strong>
              </div>
            </div>

            <div
              aria-label="Catalogo de modelos de sites por nicho"
              className="portfolio-carousel__track"
              onKeyDown={handlePortfolioKeyDown}
              onPointerCancel={endPortfolioDrag}
              onPointerDown={handlePortfolioPointerDown}
              onPointerMove={handlePortfolioPointerMove}
              onPointerUp={endPortfolioDrag}
              onWheel={handlePortfolioWheel}
              ref={portfolioTrackRef}
              tabIndex={0}
            >
            {portfolioCards.map(
              (
                {
                  accent,
                  accentSoft,
                  badge,
                  benefit,
                  cta,
                  emotionalCopy,
                  icon,
                  microCopy,
                  previewBrand,
                  previewCta,
                  previewDescription,
                  previewEyebrow,
                  previewImage,
                  previewMenu,
                  previewMobileCta,
                  previewScene,
                  previewSections,
                  previewTags,
                  previewTitle,
                  previewVisualLabel,
                  title,
                },
                index,
              ) => (
                <article
                  className={cn(
                    'portfolio-card',
                    'portfolio-card--carousel',
                    activePortfolioIndex === index && 'portfolio-card--active',
                  )}
                  data-portfolio-slide
                  key={title}
                  style={{
                    '--portfolio-accent': accent,
                    '--portfolio-accent-soft': accentSoft,
                  }}
                >
                  <PortfolioModelPreview
                    previewImage={previewImage}
                    title={title}
                  />

                  <div className="portfolio-card__content">
                    <span className="portfolio-card__label">{badge}</span>
                    <h3>{title}</h3>
                    <p className="portfolio-card__benefit">{benefit}</p>
                    <p className="portfolio-card__microcopy">
                      {'\u{1F449}'} {microCopy}
                    </p>
                    <div className="portfolio-card__cta-row">
                      <span className="portfolio-card__emotional">{emotionalCopy}</span>
                      <a
                        className="portfolio-card__hover-cta"
                        href={buildPortfolioWhatsAppUrl(title)}
                        {...EXTERNAL_LINK_PROPS}
                      >
                        <span>{cta}</span>
                        <ArrowRight aria-hidden="true" size={16} />
                      </a>
                    </div>
                  </div>
                </article>
              ),
            )}
            </div>

            <div className="portfolio-carousel__footer">
              <p className="portfolio-carousel__hint">
                Arraste para o lado e explore formatos pensados para o visitante se enxergar ali.
              </p>

              <div className="portfolio-carousel__dots" aria-label="Indicadores do carrossel">
                {portfolioCards.map(({ title }, index) => (
                  <button
                    aria-label={`Ir para ${title}`}
                    aria-pressed={activePortfolioIndex === index}
                    className={cn(
                      'portfolio-carousel__dot',
                      activePortfolioIndex === index && 'is-active',
                    )}
                    key={title}
                    onClick={() => scrollPortfolioTo(index)}
                    type="button"
                  />
                ))}
              </div>
            </div>
          </div>

          <p className="portfolio-carousel__microcopy reveal" data-reveal>
            Escolha um modelo acima e veja como ele ficaria no seu negocio em poucos minutos.
          </p>
        </section>

        <section
          className="section-block section-block--accent"
          id="como-funciona"
        >
          <div className="section-shell">
            <SectionHeading
              centered
              description="Processo simples para voce sair do zero e ter um link profissional para divulgar."
              eyebrow="Como funciona"
              title="Como funciona para ter seu site"
            />

            <div className="steps-grid">
              {workflowSteps.map(({ step, title, description }, index) => (
                <article
                  className="step-card reveal"
                  data-reveal
                  key={step}
                  style={{ '--reveal-delay': `${0.08 * index}s` }}
                >
                  <span className="step-card__number">{step}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="section-shell section-block"
          id="planos"
        >
          <SectionHeading
            centered
            description="Escolha o formato que mais combina com o momento do seu negocio."
            eyebrow="Planos"
            title="Escolha o plano ideal para seu momento"
          />

          <div className="pricing-grid">
            {planCards.map(({ name, price, subtitle, items, cta, featured, badge, note }, index) => (
              <article
                className={cn('pricing-card reveal', featured && 'pricing-card--featured')}
                data-reveal
                key={name}
                style={{ '--reveal-delay': `${0.08 * index}s` }}
              >
                {badge ? <span className="pricing-card__badge">{badge}</span> : null}
                <div className="pricing-card__header">
                  <h3>{name}</h3>
                  <strong>{price}</strong>
                  <p>{subtitle}</p>
                </div>

                <ul className="pricing-card__list">
                  {items.map((item) => (
                    <li key={item}>
                      <CheckCircle2 aria-hidden="true" size={18} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {note ? <p className="pricing-card__note">{note}</p> : null}

                <WhatsAppButton className={featured ? 'button--primary-glow' : ''} pulse={featured}>
                  {cta}
                </WhatsAppButton>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block section-block--subtle">
          <div className="section-shell guarantee-panel">
            <div
              className="guarantee-panel__copy reveal"
              data-reveal
            >
              <SectionHeading
                description="Eu ajusto o visual e as informacoes ate o site ficar alinhado com seu negocio. A ideia e entregar algo profissional, claro e pronto para divulgar."
                eyebrow="Confianca"
                title="Voce nao recebe um site jogado de qualquer jeito."
              />
            </div>

            <div className="seal-grid">
              {guaranteeSeals.map((seal, index) => (
                <article
                  className="seal-card reveal"
                  data-reveal
                  key={seal}
                  style={{ '--reveal-delay': `${0.07 * index}s` }}
                >
                  <ShieldCheck aria-hidden="true" size={20} />
                  <span>{seal}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell section-block">
          <SectionHeading
            centered
            description="Perfis ilustrativos para mostrar como diferentes tipos de negocio costumam reagir quando passam a se apresentar melhor online."
            eyebrow="Depoimentos"
            title="Como esse tipo de cliente costuma se sentir ao receber um site profissional"
          />

          <div className="testimonial-grid">
            {testimonials.map(({ avatar, name, role, quote }, index) => (
              <article
                className="testimonial-card reveal"
                data-reveal
                key={name}
                style={{ '--reveal-delay': `${0.08 * index}s` }}
              >
                <div className="testimonial-card__profile">
                  <img
                    alt=""
                    className="testimonial-card__avatar"
                    height="52"
                    loading="lazy"
                    src={avatar}
                    width="52"
                  />
                  <div className="testimonial-card__identity">
                    <strong>{name}</strong>
                    <span>{role}</span>
                  </div>
                </div>
                <div className="testimonial-card__stars">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star aria-hidden="true" fill="currentColor" key={starIndex} size={16} />
                  ))}
                </div>
                <p>"{quote}"</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block section-block--cta">
          <div className="section-shell final-cta">
            <div
              className="final-cta__content reveal"
              data-reveal
            >
              <h2>Vamos montar uma versao do seu site pensada para vender melhor no WhatsApp?</h2>
              <p>
                Voce me chama, eu entendo o seu negocio e te respondo de forma clara,
                humana e direta, mostrando o melhor caminho para sua empresa comecar ou subir de nivel.
              </p>
              <div className="final-cta__points">
                {finalCtaPoints.map(({ icon: Icon, title, description }) => (
                  <article className="final-cta__point" key={title}>
                    <div className="final-cta__point-icon">
                      <Icon aria-hidden="true" size={16} />
                    </div>
                    <div>
                      <strong>{title}</strong>
                      <span>{description}</span>
                    </div>
                  </article>
                ))}
              </div>
              <WhatsAppButton className="final-cta__button" pulse>
                Falar no WhatsApp agora
              </WhatsAppButton>
              <small>{PUBLIC_BUSINESS_INFO.serviceArea}</small>
            </div>
            <div
              className="final-cta__side reveal"
              data-reveal
              style={{ '--reveal-delay': '0.08s' }}
            >
              <div className="final-cta__profile-card">
                <div className="final-cta__profile-head">
                  <img
                    alt=""
                    className="final-cta__profile-avatar"
                    height="54"
                    loading="lazy"
                    src={heroProofAvatars[3]}
                    width="54"
                  />
                  <div>
                    <strong>Atendimento UP SITE</strong>
                    <span>Resposta direta no WhatsApp</span>
                  </div>
                </div>

                <div className="final-cta__chat">
                  <div className="final-cta__bubble final-cta__bubble--incoming">
                    Oi. Tenho um negocio local e queria entender qual tipo de site faria mais sentido pra mim.
                  </div>
                  <div className="final-cta__bubble final-cta__bubble--outgoing">
                    Consigo te mostrar sim. Me fala seu nicho e o que voce vende que eu te passo uma direcao clara, a faixa de investimento e como isso pode funcionar no seu WhatsApp.
                  </div>
                </div>

                <div className="final-cta__chips">
                  <span>Resposta clara</span>
                  <span>Sem compromisso</span>
                  <span>Ja pensando em IA</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <a
        aria-label="Falar no WhatsApp"
        className={cn(
          'floating-whatsapp',
          'floating-whatsapp--pulse',
          showFloatingWhatsApp && 'is-visible',
        )}
        href={PUBLIC_LINKS.whatsapp}
        {...EXTERNAL_LINK_PROPS}
      >
        <MessageCircle aria-hidden="true" size={22} />
        <span>WhatsApp</span>
      </a>

      <footer className="site-footer">
        <div aria-hidden="true" className="site-footer__ticker">
          <div className="site-footer__ticker-row">
            <div className="site-footer__ticker-track site-footer__ticker-track--primary">
              {[0, 1].map((groupIndex) => (
                <div className="site-footer__ticker-group" key={`primary-${groupIndex}`}>
                  {footerTickerItems.map((item, index) => (
                    <span className="site-footer__ticker-item" key={`primary-${groupIndex}-${item}-${index}`}>
                      {item}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="site-footer__ticker-row site-footer__ticker-row--secondary">
            <div className="site-footer__ticker-track site-footer__ticker-track--secondary">
              {[0, 1].map((groupIndex) => (
                <div className="site-footer__ticker-group" key={`secondary-${groupIndex}`}>
                  {footerTickerItemsSecondary.map((item, index) => (
                    <span className="site-footer__ticker-item" key={`secondary-${groupIndex}-${item}-${index}`}>
                      {item}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="section-shell site-footer__content">
          <div className="site-footer__brand">
            <BrandLogo className="site-footer__logo" variant="wordmark" />
            <div className="site-footer__brand-copy">
              <p>Sites que geram clientes. Resultados que impulsionam.</p>
              <a
                className="site-footer__cta"
                href={PUBLIC_LINKS.whatsapp}
                {...EXTERNAL_LINK_PROPS}
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>

          <nav aria-label="Links do rodape" className="site-footer__links">
            {navigationItems.map((item) => (
              <a href={item.href} key={item.label}>
                {item.label}
              </a>
            ))}
            <a href={PUBLIC_LINKS.whatsapp} {...EXTERNAL_LINK_PROPS}>
              WhatsApp
            </a>
          </nav>

          <div className="site-footer__meta">
            <p>Criacao de sites profissionais para empresas, autonomos e negocios locais.</p>
            <p>{PUBLIC_BUSINESS_INFO.location}</p>
            <small>{currentYear} UP SITE</small>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
