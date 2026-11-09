import React from 'react'

import { SiteLink } from '@/site/components/SiteLink'
import type { SolutionsIntroBlock } from '@/site/types'

export function SolutionsIntro({ image, breadcrumb, title, features, stats }: SolutionsIntroBlock) {
  return (
    <section className="solutions-intro-section">
      <div className="container solutions-intro-grid">
        <div className="solutions-intro-media fade-anim" data-fade-from="left" data-delay="0.1">
          <img
            src={image.src}
            alt={image.alt}
            className="solutions-intro-img"
            width={image.width}
            height={image.height}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="solutions-intro-content">
          <nav
            className="services-intro-breadcrumb solutions-intro-breadcrumb fade-anim"
            data-fade-from="bottom"
            data-delay="0.15"
            aria-label="Breadcrumb"
          >
            {breadcrumb.map((crumb, i) => (
              <React.Fragment key={`${crumb.label}-${i}`}>
                {i > 0 && <span className="services-intro-breadcrumb-sep">&bull;</span>}
                {crumb.href ? (
                  <SiteLink href={crumb.href}>{crumb.label}</SiteLink>
                ) : (
                  <span className="services-intro-breadcrumb-current">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
          <h2 className="solutions-intro-title fade-anim" data-fade-from="bottom" data-delay="0.2">
            {title}
          </h2>
          <ul className="solutions-intro-features fade-anim" data-fade-from="bottom" data-delay="0.3">
            {features.map((feature) => (
              <li key={feature}>
                <i className="fa-regular fa-circle-check" aria-hidden="true"></i> {feature}
              </li>
            ))}
          </ul>
          <div className="solutions-intro-stats fade-anim" data-fade-from="bottom" data-delay="0.4">
            {stats.map((stat) => (
              <div className="solutions-intro-stat" key={stat.label}>
                <div className="solutions-intro-stat-number">{stat.value}</div>
                <div className="solutions-intro-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
