import React from 'react'

import { Html } from '@/site/components/Html'
import { SiteLink } from '@/site/components/SiteLink'
import type { HeroBlock } from '@/site/types'

export function Hero({ background, title, description, primaryButton, secondaryButton }: HeroBlock) {
  return (
    <section className="hero-section">
      <img
        src={background.src}
        alt={background.alt}
        className="hero-bg-img"
        width={background.width}
        height={background.height}
        fetchPriority="high"
        decoding="async"
      />
      <div className="hero-overlay"></div>
      <div className="hero-container">
        <div className="hero-content">
          <Html
            as="h1"
            className="hero-title fade-anim"
            data-on-scroll="0"
            data-fade-from="right"
            data-delay="0.15"
            html={title}
          />
          <Html
            as="p"
            className="hero-description fade-anim"
            data-on-scroll="0"
            data-fade-from="left"
            data-delay="0.35"
            html={description}
          />
          <div className="hero-actions fade-anim" data-on-scroll="0" data-fade-from="bottom" data-delay="0.55">
            <div className="launch-cta-wrap">
              <SiteLink href={primaryButton.href} className="btn-launch-main">
                {primaryButton.label}
              </SiteLink>
              <SiteLink href={primaryButton.href} className="btn-launch-circle" aria-label={primaryButton.label}>
                <i className="fa-solid fa-arrow-trend-up"></i>
              </SiteLink>
            </div>
            {secondaryButton && (
              <SiteLink href={secondaryButton.href} className="btn-see-case-studies">
                {secondaryButton.label} <i className="fa-solid fa-arrow-trend-up"></i>
              </SiteLink>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
