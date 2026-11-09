import React from 'react'

import { Html } from '@/site/components/Html'
import { SiteLink } from '@/site/components/SiteLink'
import type { HighlightsBlock } from '@/site/types'

/** "Why choose ThePro3DStudio?" grid of icon cards (About page). */
export function Highlights({ eyebrow, title, description, cards }: HighlightsBlock) {
  return (
    <section className="highlights-section">
      <div className="container success-stories-heading">
        <div className="success-stories-heading-left">
          <SiteLink
            href={eyebrow.href}
            className="success-stories-eyebrow fade-anim"
            data-fade-from="bottom"
            data-delay="0.1"
          >
            {eyebrow.label} <i className="fa-solid fa-arrow-trend-up"></i>
          </SiteLink>
          <Html
            as="h2"
            className="success-stories-title fade-anim"
            data-fade-from="bottom"
            data-delay="0.2"
            html={title}
          />
        </div>
        <p className="success-stories-desc fade-anim" data-fade-from="bottom" data-delay="0.3">
          {description}
        </p>
      </div>

      <div className="container highlights-grid">
        {cards.map((card, i) => (
          <article
            className="highlight-card fade-anim"
            data-fade-from="bottom"
            data-delay={String(0.1 + 0.05 * (i % 4))}
            key={card.title}
          >
            <img
              src={card.icon.src}
              alt=""
              className="highlight-card-icon"
              width={32}
              height={32}
              loading="lazy"
              aria-hidden="true"
            />
            <h3 className="highlight-card-title">{card.title}</h3>
            <p className="highlight-card-desc">{card.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
