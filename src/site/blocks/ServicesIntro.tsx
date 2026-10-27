import React from 'react'

import { ClientLogos } from '@/site/components/ClientLogos'
import { SiteLink } from '@/site/components/SiteLink'
import type { ServicesIntroBlock } from '@/site/types'

export function ServicesIntro({
  image,
  breadcrumb,
  title,
  paragraphs,
  stats,
  contentLogos,
  missionVision,
  clientLogos,
}: ServicesIntroBlock) {
  return (
    <section className="services-intro-section">
      <div className="container services-intro-grid">
        <div className="services-intro-media fade-anim" data-fade-from="left" data-delay="0.1">
          <img
            src={image.src}
            alt={image.alt}
            className="services-intro-img"
            width={image.width}
            height={image.height}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="services-intro-content">
          <nav
            className="services-intro-breadcrumb fade-anim"
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
          <h2 className="services-intro-title fade-anim" data-fade-from="bottom" data-delay="0.2">
            {title}
          </h2>
          {paragraphs.map((text, i) => (
            <p className="services-intro-desc fade-anim" data-fade-from="bottom" data-delay="0.3" key={i}>
              {text}
            </p>
          ))}
          {stats?.length ? (
            <div className="services-intro-stats fade-anim" data-fade-from="bottom" data-delay="0.45">
              {stats.map((stat) => (
                <div className="services-intro-stat-item" key={stat.label}>
                  <div className="services-intro-stat-number">
                    {stat.value}
                    <span className="stat-symbol">{stat.suffix}</span>
                    {stat.unit && ` ${stat.unit}`}
                  </div>
                  <div className="services-intro-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          ) : null}
          {contentLogos?.length ? (
            <div className="services-intro-clients fade-anim" data-fade-from="bottom" data-delay="0.45">
              {/* The set is rendered twice for a seamless loop */}
              <div className="services-intro-clients-row" data-start="96%">
                <div className="services-intro-clients-track">
                  {contentLogos.map((logo) => (
                    <div className="services-intro-client-logo" key={logo.src}>
                      <img src={logo.src} alt={logo.alt} loading="lazy" />
                    </div>
                  ))}
                  {contentLogos.map((logo) => (
                    <div className="services-intro-client-logo" aria-hidden="true" key={`dup-${logo.src}`}>
                      <img src={logo.src} alt="" loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {missionVision && (
        <div className="container our-mission-vision">
          <div className="mission-vision-card mission-card fade-anim" data-fade-from="bottom" data-delay="0.1">
            <h3 className="mission-vision-title">Our Mission</h3>
            <p className="mission-vision-desc">{missionVision.mission}</p>
          </div>
          <div className="mission-vision-card vision-card fade-anim" data-fade-from="bottom" data-delay="0.2">
            <h3 className="mission-vision-title">Our Vision</h3>
            <p className="mission-vision-desc">{missionVision.vision}</p>
          </div>
        </div>
      )}

      {/* In the About design the logo strip sits directly in the section, outside .container */}
      {clientLogos?.length ? <ClientLogos logos={clientLogos} /> : null}
    </section>
  )
}
