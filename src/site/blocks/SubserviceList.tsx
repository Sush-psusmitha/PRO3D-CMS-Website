'use client'

import { gsap } from 'gsap'
import React, { useEffect, useRef, useState } from 'react'

import { SiteLink } from '@/site/components/SiteLink'
import type { SubserviceListBlock } from '@/site/types'

/**
 * "What we do" list: hovering an item cross-fades its image into the stacked
 * media column (from js/subservice-panel.js). The media column stays in view
 * while the list scrolls via CSS position: sticky, no JS needed.
 */
export function SubserviceList({ eyebrow, title, description, items, button }: SubserviceListBlock) {
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])
  const [active, setActive] = useState<number | null>(null)

  useEffect(() => {
    const images = imageRefs.current.filter(Boolean)
    if (!images.length) return
    gsap.set(images, { opacity: 0, y: 50, scale: 1 })
    gsap.set(images[0]!, { opacity: 1, y: 0, zIndex: 2 })
    return () => {
      gsap.killTweensOf(images)
    }
  }, [])

  const show = (index: number) => {
    setActive(index)
    imageRefs.current.forEach((img, i) => {
      if (!img) return
      if (i === index) gsap.to(img, { opacity: 1, y: 0, scale: 1, duration: 0.8, zIndex: 2 })
      else gsap.to(img, { opacity: 0, y: 200, scale: 0.8, duration: 0.8, zIndex: 1 })
    })
  }

  return (
    <section className="what-we-do-subservice">
      <div className="container what-we-do-subservice-heading">
        <SiteLink
          href={eyebrow.href}
          className="about-eyebrow what-we-do-subservice-eyebrow fade-anim"
          data-fade-from="bottom"
          data-delay="0.1"
        >
          {eyebrow.label} <i className="fa-solid fa-arrow-trend-up"></i>
        </SiteLink>
        <h2 className="what-we-do-subservice-title fade-anim" data-fade-from="bottom" data-delay="0.2">
          {title}
        </h2>
        <p className="what-we-do-subservice-desc fade-anim" data-fade-from="bottom" data-delay="0.3">
          {description}
        </p>
      </div>

      <div className="container what-we-do-subservice-grid">
        <div className="what-we-do-subservice-media">
          <div className="what-we-do-subservice-media-inner">
            <div className="what-we-do-subservice-image-stack">
              {items.map((item, i) => (
                <div
                  className="what-we-do-subservice-image"
                  key={item.title}
                  ref={(el) => {
                    imageRefs.current[i] = el
                  }}
                >
                  <img src={item.image.src} alt={item.image.alt} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="what-we-do-subservice-list">
          {items.map((item, i) => (
            <div
              className={`what-we-do-subservice-item${active === i ? ' is-active' : ''}`}
              key={item.title}
              onMouseEnter={() => show(i)}
            >
              <div className="what-we-do-subservice-item-number">
                <span>[{String(i + 1).padStart(2, '0')}]</span>
              </div>
              <div className="what-we-do-subservice-item-content">
                <h3 className="what-we-do-subservice-item-title">{item.title}</h3>
                <p className="what-we-do-subservice-item-text">{item.text}</p>
              </div>
              <div className="what-we-do-subservice-item-thumb">
                <img src={item.thumb.src} alt={item.thumb.alt} loading="lazy" />
              </div>
            </div>
          ))}

          <div className="what-we-do-subservice-btn-wrap">
            <SiteLink href={button.href} className="what-we-do-subservice-btn">
              {button.label} <i className="fa-solid fa-arrow-trend-up"></i>
            </SiteLink>
          </div>
        </div>
      </div>
    </section>
  )
}
