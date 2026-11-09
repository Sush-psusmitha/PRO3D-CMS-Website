import React from 'react'

import { SiteLink } from '@/site/components/SiteLink'
import type { ServicesGridBlock } from '@/site/types'

export function ServicesGrid({ eyebrow, title, cards }: ServicesGridBlock) {
  return (
    <section className="services-section">
      <div className="container">
        <div className="services-heading">
          <SiteLink
            href={eyebrow.href}
            className="about-eyebrow services-eyebrow fade-anim"
            data-fade-from="bottom"
            data-delay="0.1"
          >
            {eyebrow.label} <i className="fa-solid fa-arrow-trend-up"></i>
          </SiteLink>
          <h2 className="services-title fade-anim" data-fade-from="bottom" data-delay="0.2">
            {title}
          </h2>
        </div>

        <div className="services-grid">
          {cards.map((card) => (
            <SiteLink key={card.href} href={card.href} className={`service-card service-card-${card.theme}`}>
              <img src={card.image.src} alt={card.image.alt} className="service-card-img" />
              <div
                className={`service-card-content${card.contentPosition === 'top' ? ' service-card-content-top' : ''}`}
              >
                <h3 className="service-card-title">{card.title}</h3>
                <p className="service-card-desc">{card.description}</p>
              </div>
            </SiteLink>
          ))}
        </div>
      </div>
    </section>
  )
}
