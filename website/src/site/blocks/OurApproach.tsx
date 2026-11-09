import React from 'react'

import { SiteLink } from '@/site/components/SiteLink'
import type { OurApproachBlock } from '@/site/types'

/** Sticky left media + text, with the project phases scrolling on the right. */
export function OurApproach({ title, description, image, button, phases }: OurApproachBlock) {
  return (
    <section className="our-approach-section">
      <div className="container our-approach-grid">
        <div className="our-approach-media">
          <div className="our-approach-sticky">
            <h2 className="our-approach-title fade-anim" data-fade-from="left" data-delay="0.1">
              {title}
            </h2>
            <p className="our-approach-desc fade-anim" data-fade-from="left" data-delay="0.2">
              {description}
            </p>
            <div className="our-approach-img-wrap fade-anim" data-fade-from="left" data-delay="0.3">
              <img src={image.src} alt={image.alt} className="our-approach-img" loading="lazy" />
            </div>
            <SiteLink href={button.href} className="our-approach-btn fade-anim" data-fade-from="left" data-delay="0.4">
              {button.label} <i className="fa-solid fa-arrow-trend-up"></i>
            </SiteLink>
          </div>
        </div>

        <div className="our-approach-list">
          {phases.map((phase, i) => (
            <div
              className="our-approach-phase fade-anim"
              data-fade-from="bottom"
              data-delay={String(0.1 + 0.05 * i)}
              key={phase.title}
            >
              <span className="our-approach-phase-label">[Phase {String(i + 1).padStart(2, '0')}]</span>
              <h3 className="our-approach-phase-title">{phase.title}</h3>
              <p className="our-approach-phase-desc">{phase.description}</p>
              <div className="our-approach-phase-meta">
                <div className="our-approach-meta-item">
                  <span className="our-approach-meta-label">Duration:</span>
                  <span className="our-approach-meta-value">{phase.duration}</span>
                </div>
                <div className="our-approach-meta-item">
                  <span className="our-approach-meta-label">Deliverable:</span>
                  <span className="our-approach-meta-value">{phase.deliverable}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
