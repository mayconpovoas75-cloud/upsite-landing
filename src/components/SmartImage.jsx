import { Flame } from 'lucide-react'
import { useEffect, useState } from 'react'

const SmartImage = ({
  src,
  alt,
  title,
  subtitle,
  className = '',
  imageClassName = '',
  roundedClassName = 'rounded-[28px]',
  priority = false,
}) => {
  const [failed, setFailed] = useState(!src)

  useEffect(() => {
    setFailed(!src)
  }, [src])

  return (
    <div
      className={`relative overflow-hidden bg-[linear-gradient(180deg,rgba(40,18,11,0.92),rgba(11,7,5,0.94))] ${roundedClassName} ${className}`}
    >
      {failed ? (
        <div className="absolute inset-0 flex flex-col justify-between bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.26),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(153,27,27,0.3),transparent_35%),linear-gradient(180deg,rgba(22,13,9,0.92),rgba(8,6,4,0.96))] p-5">
          <div className="flex items-center justify-between">
            {subtitle ? (
              <span className="inline-flex rounded-full border border-flame/20 bg-flame/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-sand">
                {subtitle}
              </span>
            ) : (
              <span />
            )}
            <div className="rounded-2xl border border-white/10 bg-white/10 p-3 text-flame">
              <Flame className="h-5 w-5" />
            </div>
          </div>
          <div>
            <p className="font-display text-4xl tracking-[0.05em] text-cream">
              {title}
            </p>
            <p className="mt-2 max-w-xs text-sm leading-6 text-cream/66">
              Imagem demonstrativa ausente. O layout já está pronto para receber
              o arquivo real nesta posição.
            </p>
          </div>
        </div>
      ) : (
        <>
          <img
            alt={alt}
            className={`h-full w-full object-cover ${imageClassName}`}
            loading={priority ? 'eager' : 'lazy'}
            src={src}
            onError={() => setFailed(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        </>
      )}
    </div>
  )
}

export default SmartImage
