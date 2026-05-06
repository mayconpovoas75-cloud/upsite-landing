import { useEffect } from 'react'

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)
const resetMotionVariables = (root) => {
  root.style.setProperty('--scroll-progress', '0')
  root.style.setProperty('--hero-shift', '0px')
  root.style.setProperty('--shell-shift', '0px')
  root.style.setProperty('--shell-glow-shift', '0px')
}

export const useScrollDynamics = () => {
  useEffect(() => {
    const root = document.documentElement

    if (!root) {
      return undefined
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const isTouchDevice = window.matchMedia('(hover: none), (pointer: coarse)')
      .matches

    // In-app mobile browsers frequently fire resize/viewport updates while the
    // address bar animates, which can make scroll-driven transforms look like
    // the page is refreshing. On touch devices we keep the layout stable.
    if (prefersReducedMotion || isTouchDevice) {
      resetMotionVariables(root)
      return undefined
    }

    let frameId = 0

    const updateMotion = () => {
      frameId = 0

      const scrollTop = window.scrollY || window.pageYOffset || 0
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      )
      const progress = clamp(scrollTop / maxScroll, 0, 1)
      const heroShift = Math.round(clamp(scrollTop * 0.18, 0, 48))
      const shellShift = Math.round(clamp(scrollTop * 0.035, 0, 24))
      const shellGlowShift = Math.round(clamp(scrollTop * 0.06, 0, 36))

      root.style.setProperty('--scroll-progress', progress.toFixed(4))
      root.style.setProperty('--hero-shift', `${heroShift}px`)
      root.style.setProperty('--shell-shift', `${shellShift}px`)
      root.style.setProperty('--shell-glow-shift', `${shellGlowShift}px`)
    }

    const requestTick = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(updateMotion)
      }
    }

    updateMotion()
    window.addEventListener('scroll', requestTick, { passive: true })
    window.addEventListener('resize', requestTick)
    window.addEventListener('orientationchange', requestTick)

    return () => {
      window.removeEventListener('scroll', requestTick)
      window.removeEventListener('resize', requestTick)
      window.removeEventListener('orientationchange', requestTick)

      if (frameId) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [])
}
