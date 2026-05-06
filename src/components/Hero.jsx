import {
  ArrowRight,
  Flame,
  Instagram,
  MessageCircleMore,
  Sparkles,
} from 'lucide-react'
import { PUBLIC_LINKS } from '../config/publicConfig'
import {
  heroBadges,
  heroStats,
  quickOrderLink,
  siteConfig,
} from '../data/menuItems'
import { EXTERNAL_LINK_PROPS } from '../utils/security'
import LogoMark from './LogoMark'
import SmartImage from './SmartImage'

const Hero = () => (
  <section
    className="relative overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32"
    id="inicio"
  >
    <div className="hero-orb-left absolute left-0 top-0 h-72 w-72 rounded-full bg-flame/20 blur-[120px]" />
    <div className="hero-orb-right absolute right-0 top-16 h-80 w-80 rounded-full bg-ember/25 blur-[130px]" />
    <div className="hero-orb-bottom absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-flame/10 blur-[120px]" />

    <div className="section-container relative">
      <div className="grid gap-10 xl:grid-cols-[1.08fr_0.92fr] xl:items-center">
        <div
          className="hero-motion-panel reveal max-w-2xl"
          data-reveal=""
        >
          <span className="section-kicker">
            <Flame className="h-3.5 w-3.5" />
            Burger artesanal premium
          </span>

          <div className="mt-6">
            <LogoMark />
          </div>

          <h1 className="mt-8 font-display text-[4.25rem] leading-[0.9] tracking-[0.05em] text-cream sm:text-[5.5rem] lg:text-[7rem]">
            {siteConfig.heroTitle}
          </h1>
          <p className="mt-4 text-2xl font-semibold text-sand sm:text-3xl">
            {siteConfig.heroSubtitle}
          </p>
          <p className="mt-5 max-w-xl text-base leading-8 text-cream/72 sm:text-lg">
            {siteConfig.heroDescription}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {heroBadges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cream/76"
              >
                <Sparkles className="h-3.5 w-3.5 text-flame" />
                {badge}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              className="btn-secondary"
              href="#cardapio"
            >
              Ver cardápio
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              className="btn-primary"
              href={quickOrderLink}
              {...EXTERNAL_LINK_PROPS}
            >
              Pedir agora
              <MessageCircleMore className="h-4 w-4" />
            </a>
            <a
              className="btn-secondary"
              href={PUBLIC_LINKS.instagram}
              {...EXTERNAL_LINK_PROPS}
            >
              Ver Instagram
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div
          className="hero-motion-media reveal"
          data-reveal=""
        >
          <div className="panel relative overflow-hidden p-3 sm:p-4">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(153,27,27,0.18),transparent_32%)]" />
            <SmartImage
              alt="Banner principal da Fuego Burger & Steak"
              className="aspect-[4/4.4] sm:aspect-[16/14]"
              imageClassName="scale-[1.02]"
              priority
              src={siteConfig.heroImage}
              subtitle="Banner principal"
              title="Fuego Burger & Steak"
            />

            <div className="absolute inset-x-6 bottom-6 grid gap-3 sm:grid-cols-3">
              {heroStats.map((item) => (
                <div
                  key={item.title}
                  className="hero-highlight-card rounded-3xl border border-white/10 bg-black/45 p-4 backdrop-blur-md"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sand">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-cream/72">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default Hero
