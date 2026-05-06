import {
  Instagram,
  Menu,
  MessageCircleMore,
  ShieldCheck,
  ShoppingBag,
  UserRound,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { PUBLIC_LINKS } from '../config/publicConfig'
import { navigationItems, quickOrderLink } from '../data/menuItems'
import { createLoginPath } from '../lib/auth'
import { Link } from '../lib/router'
import { EXTERNAL_LINK_PROPS } from '../utils/security'
import LogoMark from './LogoMark'

const Header = ({
  activeSection,
  canAccessAdminPanel,
  cartCount,
  isAuthenticated,
  onOpenCart,
  scrolled,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const closeMenu = () => setIsOpen(false)

    window.addEventListener('hashchange', closeMenu)

    return () => window.removeEventListener('hashchange', closeMenu)
  }, [])

  const accountHref = isAuthenticated
    ? canAccessAdminPanel
      ? '/admin'
      : '/dashboard'
    : createLoginPath('/dashboard')
  const accountLabel = isAuthenticated
    ? canAccessAdminPanel
      ? 'Painel'
      : 'Minha conta'
    : 'Entrar'

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div
        className={`mx-auto max-w-7xl rounded-[28px] border transition duration-300 ${
          scrolled
            ? 'border-flame/20 bg-[#090604]/86 shadow-panel backdrop-blur-2xl'
            : 'border-flame/10 bg-black/45 backdrop-blur-xl'
        }`}
      >
        <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link
            aria-label="Ir para o inicio"
            className="shrink-0"
            to="/"
          >
            <LogoMark compact />
          </Link>

          <nav className="hidden items-center gap-2 lg:flex">
            {navigationItems.map((item) => {
              const isActive = activeSection === item.id

              return (
                <a
                  key={item.id}
                  className={`nav-pill ${isActive ? 'nav-pill-active' : ''}`}
                  href={item.href}
                >
                  {item.label}
                </a>
              )
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <button
              aria-label="Abrir carrinho"
              className="icon-button relative"
              type="button"
              onClick={onOpenCart}
            >
              <ShoppingBag className="h-4 w-4" />
              {cartCount > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-flame px-1 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              ) : null}
            </button>
            <a
              aria-label="Ver Instagram da Fuego"
              className="icon-button"
              href={PUBLIC_LINKS.instagram}
              {...EXTERNAL_LINK_PROPS}
            >
              <Instagram className="h-4 w-4" />
            </a>
            <Link
              className="btn-secondary"
              to={accountHref}
            >
              {canAccessAdminPanel && isAuthenticated ? (
                <ShieldCheck className="h-4 w-4" />
              ) : (
                <UserRound className="h-4 w-4" />
              )}
              {accountLabel}
            </Link>
            <a
              className="btn-primary"
              href={quickOrderLink}
              {...EXTERNAL_LINK_PROPS}
            >
              Pedir no WhatsApp
              <MessageCircleMore className="h-4 w-4" />
            </a>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              aria-label="Abrir carrinho"
              className="icon-button relative"
              type="button"
              onClick={onOpenCart}
            >
              <ShoppingBag className="h-4 w-4" />
              {cartCount > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-flame px-1 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              ) : null}
            </button>
            <a
              aria-label="Pedir no WhatsApp"
              className="icon-button"
              href={quickOrderLink}
              {...EXTERNAL_LINK_PROPS}
            >
              <MessageCircleMore className="h-4 w-4" />
            </a>
            <button
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
              className="icon-button"
              type="button"
              onClick={() => setIsOpen((currentValue) => !currentValue)}
            >
              {isOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <div className="scroll-progress-track">
          <span className="scroll-progress-fill" />
        </div>

        {isOpen ? (
          <div className="border-t border-flame/10 px-4 py-4 lg:hidden">
            <nav className="flex flex-col gap-2">
              {navigationItems.map((item) => {
                const isActive = activeSection === item.id

                return (
                  <a
                    key={item.id}
                    className={`nav-pill w-full justify-between ${isActive ? 'nav-pill-active' : ''}`}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                    <span className="text-xs uppercase tracking-[0.24em] text-cream/44">
                      ir
                    </span>
                  </a>
                )
              })}
            </nav>

            <div className="mt-4 flex flex-col gap-3">
              <Link
                className="btn-secondary w-full"
                to={accountHref}
              >
                {accountLabel}
              </Link>

              <div className="flex gap-3">
                <a
                  className="btn-secondary flex-1"
                  href={PUBLIC_LINKS.instagram}
                  {...EXTERNAL_LINK_PROPS}
                >
                  Instagram
                </a>
                <a
                  className="btn-primary flex-1"
                  href={quickOrderLink}
                  {...EXTERNAL_LINK_PROPS}
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  )
}

export default Header
