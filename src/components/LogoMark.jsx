import { Flame } from 'lucide-react'
import { useState } from 'react'
import { siteConfig } from '../data/menuItems'

const LogoMark = ({
  className = '',
  compact = false,
  showTagline = true,
}) => {
  const [failed, setFailed] = useState(false)

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-flame/20 bg-white/5 shadow-soft">
        {failed ? (
          <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.3),transparent_55%),linear-gradient(180deg,rgba(29,14,10,0.92),rgba(12,7,5,0.94))] text-flame">
            <Flame className="h-6 w-6" />
          </div>
        ) : (
          <img
            alt={`Logo ${siteConfig.name}`}
            className="h-full w-full object-cover"
            src={siteConfig.logo}
            onError={() => setFailed(true)}
          />
        )}
      </div>

      {compact ? (
        <div className="min-w-0">
          <p className="truncate font-display text-2xl tracking-[0.08em] text-cream">
            Fuego
          </p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cream/60">
            Burger &amp; Steak
          </p>
        </div>
      ) : (
        <div className="min-w-0">
          <p className="truncate font-display text-3xl tracking-[0.08em] text-cream">
            Fuego Burger &amp; Steak
          </p>
          {showTagline ? (
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cream/58">
              Burger artesanal com sabor de brasa
            </p>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default LogoMark
