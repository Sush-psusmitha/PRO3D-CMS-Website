'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

gsap.registerPlugin(ScrollTrigger)

/**
 * GSAP scroll animations from the design (js/animations.js), re-run on every
 * page change and cleaned up via gsap.context. The Working Verticals slider
 * lives in its own block component.
 */
export function ScrollAnimations() {
  const pathname = usePathname()

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      // 1. Generic fade-in reveal. Attributes: data-fade-from (top|bottom|left|right),
      // data-fade-offset, data-duration, data-delay, data-ease, data-start, data-on-scroll (0|1)
      gsap.utils.toArray<HTMLElement>('.fade-anim').forEach((item) => {
        if (reduced) {
          gsap.set(item, { opacity: 1, x: 0, y: 0 })
          return
        }
        const offset = parseFloat(item.dataset.fadeOffset ?? '') || 24
        const duration = parseFloat(item.dataset.duration ?? '') || 0.75
        const from = item.dataset.fadeFrom || 'bottom'
        const onScroll = item.dataset.onScroll === undefined ? 1 : parseInt(item.dataset.onScroll, 10)
        const delayParsed = parseFloat(item.dataset.delay ?? '')
        const delay = isNaN(delayParsed) ? 0.15 : delayParsed
        const start = item.dataset.start || '92%'

        gsap.fromTo(
          item,
          {
            opacity: 0,
            x: from === 'left' ? -offset : from === 'right' ? offset : 0,
            y: from === 'top' ? -offset : from === 'bottom' ? offset : 0,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            ease: item.dataset.ease || 'power2.out',
            duration,
            delay,
            clearProps: 'transform',
            ...(onScroll === 1
              ? { scrollTrigger: { trigger: item, start: `top ${start}`, toggleActions: 'play none none none' } }
              : {}),
          },
        )
      })

      // 2. Service cards: scale + fade entrance with a left-to-right image wipe
      gsap.utils.toArray<HTMLElement>('.service-card').forEach((card, index) => {
        const img = card.querySelector('.service-card-img')
        const content = card.querySelector('.service-card-content')
        if (reduced) {
          gsap.set(card, { opacity: 1, y: 0, scale: 1 })
          if (img) gsap.set(img, { clipPath: 'inset(0% 0% 0% 0%)' })
          if (content) gsap.set(content, { opacity: 1, y: 0 })
          return
        }
        gsap.set(card, { opacity: 0, y: 30, scale: 0.98 })
        if (img) gsap.set(img, { clipPath: 'inset(0% 100% 0% 0%)' })
        if (content) gsap.set(content, { opacity: 0, y: 16 })

        const tl = gsap.timeline({
          scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
          delay: index * 0.1,
        })
        tl.to(card, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'power2.out' })
        if (img) tl.to(img, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: 'power3.inOut' }, '<0.05')
        if (content) tl.to(content, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.3')
      })

      // 3. CTA: image wipe on the contact card + background parallax
      const ctaCardImg = document.querySelector('#ctaHomeCard .cta-home-card-img')
      if (ctaCardImg && !reduced) {
        gsap.set(ctaCardImg, { clipPath: 'inset(0% 100% 0% 0%)' })
        gsap.to(ctaCardImg, {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: '#ctaHomeCard', start: 'top 85%', toggleActions: 'play none none none' },
        })
      }
      const ctaBgImg = document.querySelector('.cta-home-bg-img')
      const ctaSection = document.querySelector('.cta-home-section')
      if (ctaBgImg && ctaSection && !reduced) {
        gsap.set(ctaBgImg, { scale: 1.15 })
        gsap.fromTo(
          ctaBgImg,
          { y: '-4%' },
          {
            y: '4%',
            ease: 'none',
            scrollTrigger: { trigger: ctaSection, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      }

      // 4. Success stories: cards reveal in sequence as the grid enters the viewport
      const grid = document.querySelector('.success-stories-grid')
      if (grid) {
        const cards = grid.querySelectorAll('.success-story-card')
        if (cards.length) {
          if (reduced) gsap.set(cards, { opacity: 1, y: 0 })
          else
            gsap.from(cards, {
              opacity: 0,
              y: 40,
              duration: 0.7,
              ease: 'power2.out',
              stagger: 0.18,
              scrollTrigger: { trigger: grid, start: 'top 85%', toggleActions: 'play none none none' },
            })
        }
      }

      // 5. Success stories: image zoom-in reveal
      gsap.utils.toArray<HTMLElement>('.success-story-media').forEach((wrap) => {
        const img = wrap.querySelector('.success-story-img')
        if (!img) return
        if (reduced) {
          gsap.set(img, { opacity: 1, scale: 1 })
          return
        }
        gsap.fromTo(
          img,
          { autoAlpha: 0, scale: 1.2 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 2,
            ease: 'power2.out',
            clearProps: 'all',
            scrollTrigger: { trigger: wrap, start: 'top 100%', toggleActions: 'play none none none' },
          },
        )
      })
    })

    // 6. Trigger positions are measured before lazy images load; refresh once they have
    const refresh = () => ScrollTrigger.refresh()
    if (document.readyState === 'complete') requestAnimationFrame(refresh)
    else window.addEventListener('load', refresh)

    return () => {
      window.removeEventListener('load', refresh)
      ctx.revert()
    }
  }, [pathname])

  return null
}
