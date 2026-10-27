import React from 'react'

import { SiteLink } from '@/site/components/SiteLink'
import type { ServiceCardsBlock } from '@/site/types'

/** "What we do" grid of linked service cards (3D Modeling page). */
export function ServiceCards({ eyebrow, title, description, cards }: ServiceCardsBlock) {
  return (
    <section className="what-we-do-section">
      <div className="container">
        <div className="what-we-do-heading">
          <SiteLink
            href={eyebrow.href}
            className="about-eyebrow what-we-do-eyebrow fade-anim"
            data-fade-from="bottom"
            data-delay="0.1"
          >
            {eyebrow.label} <i className="fa-solid fa-arrow-trend-up"></i>
          </SiteLink>
          <h2 className="what-we-do-title fade-anim" data-fade-from="bottom" data-delay="0.2">
            {title}
          </h2>
          <p className="what-we-do-desc fade-anim" data-fade-from="bottom" data-delay="0.3">
            {description}
          </p>
        </div>

        <div className="what-we-do-grid">
          {cards.map((card, i) => (
            <SiteLink
              key={card.href}
              href={card.href}
              className="what-we-do-card fade-anim"
              data-fade-from="bottom"
              data-delay={String(0.05 * (i + 1))}
            >
              <img
                src={card.image.src}
                alt={card.image.alt}
                className="what-we-do-img"
                width={190}
                height={135}
                loading="lazy"
                decoding="async"
              />
              <div className="what-we-do-content">
                <h3 className="what-we-do-card-title">{card.title}</h3>
                <p className="what-we-do-card-desc">{card.description}</p>
                <span className="what-we-do-link">
                  Learn More <i className="fa-solid fa-arrow-right"></i>
                </span>
              </div>
            </SiteLink>
          ))}
        </div>
      </div>
    </section>
  )
}
