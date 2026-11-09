'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useEffect, useRef } from 'react'

import { SiteLink } from '@/site/components/SiteLink'
import type { IndustriesWhyChooseBlock } from '@/site/types'

gsap.registerPlugin(ScrollTrigger)

/**
 * "Why choose us" cards that scroll sideways (from js/industries-why-choose.js):
 * the section pins while the page scrolls down, moving the card track
 * horizontally in step, with a progress bar. Normal scrolling resumes after
 * the last card. With prefers-reduced-motion the track is a plain scrollable row.
 */
export function IndustriesWhyChoose({ background, eyebrow, title, button, cards }: IndustriesWhyChooseBlock) {
  const pinRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const pin = pinRef.current
    const track = trackRef.current
    const bar = barRef.current
    if (!pin || !track) return

    // Mobile address-bar show/hide fires resize; refreshing then makes the pin jump
    ScrollTrigger.config({ ignoreMobileResize: true })

    // Distance the track travels so the last card comes fully into view
    const getScroll = () => Math.max(0, track.scrollWidth - window.innerWidth + 40)

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.to(track, {
        x: () => -getScroll(),
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: () => `+=${getScroll() + window.innerHeight * 0.35}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          // Refresh before the fade-in triggers below, so they account for the pin's extra scroll
          refreshPriority: 1,
          onUpdate: (self) => {
            if (bar) gsap.set(bar, { width: `${self.progress * 100}%` })
          },
        },
      })
    })

    // Re-measure the pin whenever content above it changes height (images, sliders, fonts)
    let timer: ReturnType<typeof setTimeout>
    const queueRefresh = () => {
      clearTimeout(timer)
      timer = setTimeout(() => ScrollTrigger.refresh(), 150)
    }
    let lastHeight = document.body.scrollHeight
    const observer = new ResizeObserver(() => {
      const h = document.body.scrollHeight
      if (h !== lastHeight) {
        lastHeight = h
        queueRefresh()
      }
    })
    observer.observe(document.body)
    void document.fonts?.ready.then(queueRefresh)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
      mm.revert()
    }
  }, [])

  return (
    <section className="industries-why-choose-us">
      <div className="industries-why-choose-pin" ref={pinRef}>
        {/* Background sits inside the pinned element so it stays fixed with the content */}
        <img src={background.src} alt="" className="industries-why-choose-bg-img" aria-hidden="true" />
        <div className="industries-why-choose-overlay"></div>

        <div className="container industries-why-choose-head">
          <div className="industries-why-choose-head-left">
            <SiteLink
              href={eyebrow.href}
              className="industries-why-choose-eyebrow fade-anim"
              data-fade-from="bottom"
              data-delay="0.1"
            >
              {eyebrow.label} <i className="fa-solid fa-arrow-trend-up"></i>
            </SiteLink>
            <h2 className="industries-why-choose-title fade-anim" data-fade-from="bottom" data-delay="0.2">
              {title}
            </h2>
          </div>
          <SiteLink
            href={button.href}
            className="industries-why-choose-btn fade-anim"
            data-fade-from="bottom"
            data-delay="0.3"
          >
            {button.label} <i className="fa-solid fa-arrow-trend-up"></i>
          </SiteLink>
        </div>

        <div className="industries-why-choose-track-wrap">
          <div className="industries-why-choose-progress">
            <span className="industries-why-choose-progress-bar" ref={barRef}></span>
          </div>
          <div className="industries-why-choose-track" ref={trackRef}>
            {cards.map((card) => (
              <article className="industries-why-choose-card" key={card.title}>
                <span className="industries-why-choose-card-icon">
                  <i className={`fa-solid ${card.icon}`}></i>
                </span>
                <h3 className="industries-why-choose-card-title">{card.title}</h3>
                <p className="industries-why-choose-card-desc">{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
