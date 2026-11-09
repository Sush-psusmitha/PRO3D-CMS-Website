'use client'

import React, { useEffect, useRef } from 'react'

import { SiteLink } from '@/site/components/SiteLink'
import type { VerticalsBlock } from '@/site/types'

/**
 * Working Verticals: wheel-driven horizontal slider with eased (LERP) motion.
 * On desktop the mouse wheel over the row moves the cards; once the first or
 * last card is reached the page scrolls normally again. Mouse drag and the
 * prev/next buttons also work. Below 1025px it falls back to native swipe.
 */
export function Verticals({ variant = 'dark', eyebrow, title, background, items }: VerticalsBlock) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const track = trackRef.current
    const prevBtn = prevRef.current
    const nextBtn = nextRef.current
    if (!wrap || !track) return

    const desktopQuery = window.matchMedia('(min-width: 1025px)')
    const LERP = 0.14
    const state = { current: 0, target: 0, max: 0, raf: 0 as number | 0 }

    const recalcMax = () => {
      state.max = Math.max(0, track.scrollWidth - track.clientWidth)
      state.target = Math.min(state.target, state.max)
      state.current = Math.min(state.current, state.max)
    }

    const getStep = () => {
      const card = track.querySelector('.vertical-card')
      if (!card) return track.clientWidth
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0
      return card.getBoundingClientRect().width + gap
    }

    const updateButtons = () => {
      if (!prevBtn || !nextBtn) return
      prevBtn.disabled = state.target <= 0.5
      nextBtn.disabled = state.max <= 0.5 || state.target >= state.max - 0.5
    }

    const render = () => {
      state.current += (state.target - state.current) * LERP
      if (Math.abs(state.target - state.current) < 0.05) state.current = state.target
      track.scrollLeft = state.current
      updateButtons()
      state.raf = Math.abs(state.target - state.current) > 0.05 ? requestAnimationFrame(render) : 0
    }

    const setTarget = (value: number) => {
      state.target = Math.min(state.max, Math.max(0, value))
      if (!state.raf) state.raf = requestAnimationFrame(render)
    }

    const onWheel = (e: WheelEvent) => {
      if (!desktopQuery.matches || state.max <= 0) return
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      const forward = delta > 0
      if ((forward && state.target >= state.max - 0.5) || (!forward && state.target <= 0.5)) return
      e.preventDefault()
      setTarget(state.target + delta * 1.1)
    }

    let dragging = false
    let dragStartX = 0
    let dragStartTarget = 0
    let dragMoved = false

    const onPointerDown = (e: MouseEvent) => {
      if (!desktopQuery.matches || state.max <= 0) return
      dragging = true
      dragMoved = false
      dragStartX = e.clientX
      dragStartTarget = state.target
      track.classList.add('is-dragging')
    }
    const onPointerMove = (e: MouseEvent) => {
      if (!dragging) return
      const deltaX = dragStartX - e.clientX
      if (Math.abs(deltaX) > 3) dragMoved = true
      setTarget(dragStartTarget + deltaX)
    }
    const onPointerUp = () => {
      if (!dragging) return
      dragging = false
      track.classList.remove('is-dragging')
    }
    const onClickCapture = (e: MouseEvent) => {
      if (dragMoved) {
        e.preventDefault()
        dragMoved = false
      }
    }
    const onDragStart = (e: DragEvent) => e.preventDefault()

    const applyMode = (isDesktop: boolean) => {
      recalcMax()
      if (!isDesktop) {
        state.current = 0
        state.target = 0
        track.scrollLeft = 0
      } else {
        track.scrollLeft = state.current
      }
      updateButtons()
    }
    const onModeChange = (e: MediaQueryListEvent) => applyMode(e.matches)

    let resizeTimer: ReturnType<typeof setTimeout>
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => applyMode(desktopQuery.matches), 200)
    }
    const goPrev = () => setTarget(state.target - getStep())
    const goNext = () => setTarget(state.target + getStep())

    applyMode(desktopQuery.matches)
    desktopQuery.addEventListener('change', onModeChange)
    wrap.addEventListener('wheel', onWheel, { passive: false })
    track.addEventListener('mousedown', onPointerDown)
    window.addEventListener('mousemove', onPointerMove)
    window.addEventListener('mouseup', onPointerUp)
    track.addEventListener('dragstart', onDragStart)
    track.addEventListener('click', onClickCapture, true)
    track.addEventListener('scroll', updateButtons, { passive: true })
    window.addEventListener('resize', onResize)
    prevBtn?.addEventListener('click', goPrev)
    nextBtn?.addEventListener('click', goNext)

    return () => {
      if (state.raf) cancelAnimationFrame(state.raf)
      clearTimeout(resizeTimer)
      desktopQuery.removeEventListener('change', onModeChange)
      wrap.removeEventListener('wheel', onWheel)
      track.removeEventListener('mousedown', onPointerDown)
      window.removeEventListener('mousemove', onPointerMove)
      window.removeEventListener('mouseup', onPointerUp)
      track.removeEventListener('dragstart', onDragStart)
      track.removeEventListener('click', onClickCapture, true)
      track.removeEventListener('scroll', updateButtons)
      window.removeEventListener('resize', onResize)
      prevBtn?.removeEventListener('click', goPrev)
      nextBtn?.removeEventListener('click', goNext)
    }
  }, [])

  return (
    <section className={`verticals-section${variant === 'light' ? ' verticals-light' : ''}`}>
      {variant === 'dark' && background && (
        <>
          <img src={background.src} alt="" className="verticals-bg-img" aria-hidden="true" />
          <div className="verticals-bg-overlay"></div>
        </>
      )}

      <div className="container verticals-content">
        <div className="verticals-heading">
          <SiteLink
            href={eyebrow.href}
            className="about-eyebrow verticals-eyebrow fade-anim"
            data-fade-from="bottom"
            data-delay="0.1"
          >
            {eyebrow.label} <i className="fa-solid fa-arrow-trend-up"></i>
          </SiteLink>
          <h2 className="verticals-title fade-anim" data-fade-from="bottom" data-delay="0.2">
            {title}
          </h2>
        </div>

        <div className="verticals-slider-wrap fade-anim" data-fade-from="bottom" data-delay="0.3" ref={wrapRef}>
          <button type="button" className="verticals-nav verticals-nav-prev" aria-label="Previous industry" ref={prevRef}>
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          <div className="verticals-track" id="verticalsTrack" ref={trackRef}>
            {items.map((item) => {
              const card = (
                <>
                  <div className="vertical-card-img-wrap">
                    <img src={item.image.src} alt={item.image.alt} loading="lazy" />
                  </div>
                  <div className="vertical-card-label">{item.label}</div>
                </>
              )
              return item.href ? (
                <SiteLink key={item.label} href={item.href} className="vertical-card">
                  {card}
                </SiteLink>
              ) : (
                <div key={item.label} className="vertical-card">
                  {card}
                </div>
              )
            })}
          </div>

          <button type="button" className="verticals-nav verticals-nav-next" aria-label="Next industry" ref={nextRef}>
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  )
}
