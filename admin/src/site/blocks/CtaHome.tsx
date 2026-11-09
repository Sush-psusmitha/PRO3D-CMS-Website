import React from 'react'

import { SiteLink } from '@/site/components/SiteLink'
import type { CtaHomeBlock } from '@/site/types'

export function CtaHome({ background, title, description, button, card }: CtaHomeBlock) {
  return (
    <section className="cta-home-section">
      <img src={background.src} alt="" className="cta-home-bg-img" aria-hidden="true" />
      <div className="cta-home-overlay"></div>

      <div className="container cta-home-content">
        <div className="cta-home-text">
          <h2 className="cta-home-title fade-anim" data-fade-from="left" data-delay="0.1">
            {title}
          </h2>
          <p className="cta-home-desc fade-anim" data-fade-from="bottom" data-delay="0.25">
            {description}
          </p>
          <div className="cta-home-btn-wrap fade-anim" data-fade-from="bottom" data-delay="0.4">
            <SiteLink href={button.href} className="cta-home-btn">
              {button.label}
            </SiteLink>
            <SiteLink href={button.href} className="cta-home-btn-circle" aria-label={button.label}>
              <i className="fa-solid fa-share"></i>
            </SiteLink>
          </div>
        </div>

        <div className="cta-home-card fade-anim" data-fade-from="top" data-delay="0.2" id="ctaHomeCard">
          <img src={card.image.src} alt={card.image.alt} className="cta-home-card-img" />
          <div className="cta-home-card-overlay"></div>
          <div className="cta-home-card-content">
            <span className="cta-home-card-eyebrow">
              {card.eyebrow} <i className="fa-solid fa-arrow-trend-up"></i>
            </span>
            <p className="cta-home-card-desc">{card.description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
