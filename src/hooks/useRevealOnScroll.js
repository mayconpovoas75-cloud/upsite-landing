import { useEffect } from 'react'

export const useRevealOnScroll = () => {
  useEffect(() => {
    const revealElements = Array.from(document.querySelectorAll('[data-reveal]'))

    if (!revealElements.length) {
      return undefined
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const isTouchDevice = window.matchMedia('(hover: none), (pointer: coarse)')
      .matches
    const hasIntersectionObserver = 'IntersectionObserver' in window

    // Mobile in-app browsers can fail to trigger reveal observers consistently,
    // which leaves sections invisible while still occupying space.
    if (prefersReducedMotion || isTouchDevice || !hasIntersectionObserver) {
      revealElements.forEach((element) => element.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.14,
        rootMargin: '0px 0px -8% 0px',
      },
    )

    revealElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])
}
