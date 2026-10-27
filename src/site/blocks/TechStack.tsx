import React from 'react'

import { SiteLink } from '@/site/components/SiteLink'
import type { TechStackBlock } from '@/site/types'

/** Sticky left column (CSS position: sticky) with a scrolling list of stack rows on the right. */
export function TechStack({ badge, title, description, button, rows }: TechStackBlock) {
  return (
    <section className="tech-stack-section">
      <div className="container tech-stack-grid">
        <div className="tech-stack-left">
          <div className="tech-stack-sticky">
            <span className="tech-stack-badge fade-anim" data-fade-from="bottom" data-delay="0.1">
              {badge}
            </span>
            <h2 className="tech-stack-title fade-anim" data-fade-from="bottom" data-delay="0.15">
              {title}
            </h2>
            <p className="tech-stack-desc fade-anim" data-fade-from="bottom" data-delay="0.2">
              {description}
            </p>
            <div className="fade-anim" data-fade-from="bottom" data-delay="0.25">
              <SiteLink href={button.href} className="tech-stack-btn">
                {button.label} <i className="fa-solid fa-arrow-trend-up"></i>
              </SiteLink>
            </div>
          </div>
        </div>

        <ul className="tech-stack-list">
          {rows.map((row) => (
            <li className="tech-stack-row fade-anim" data-fade-from="bottom" data-delay="0.1" key={row.title}>
              <span className="tech-stack-row-title">{row.title}</span>
              <span className="tech-stack-row-items">{row.items.join(' · ')}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
