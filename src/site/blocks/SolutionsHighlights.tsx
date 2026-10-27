import React from 'react'

import { SiteLink } from '@/site/components/SiteLink'
import type { SolutionsHighlightsBlock } from '@/site/types'

export function SolutionsHighlights({ eyebrow, title, description, button, image }: SolutionsHighlightsBlock) {
  return (
    <section className="solutions-highlights-section">
      <div className="container solutions-highlights-grid">
        <div className="solutions-highlights-content">
          <SiteLink
            href={eyebrow.href}
            className="about-eyebrow solutions-highlights-eyebrow fade-anim"
            data-fade-from="bottom"
            data-delay="0.1"
          >
            {eyebrow.label} <i className="fa-solid fa-arrow-trend-up"></i>
          </SiteLink>
          <h2 className="solutions-highlights-title fade-anim" data-fade-from="bottom" data-delay="0.15">
            {title}
          </h2>
          <p className="solutions-highlights-desc fade-anim" data-fade-from="bottom" data-delay="0.2">
            {description}
          </p>
          <div className="fade-anim" data-fade-from="bottom" data-delay="0.25">
            <SiteLink href={button.href} className="tech-stack-btn">
              {button.label} <i className="fa-solid fa-arrow-trend-up"></i>
            </SiteLink>
          </div>
        </div>
        <div className="solutions-highlights-media fade-anim" data-fade-from="right" data-delay="0.15">
          <img
            src={image.src}
            alt={image.alt}
            className="solutions-highlights-img"
            width={image.width}
            height={image.height}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  )
}
