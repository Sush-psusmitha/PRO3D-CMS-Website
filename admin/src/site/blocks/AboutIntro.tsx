import React from 'react'

import { ClientLogos } from '@/site/components/ClientLogos'
import { SiteLink } from '@/site/components/SiteLink'
import type { AboutIntroBlock } from '@/site/types'

export function AboutIntro({ eyebrow, headline, button, intro, stats, media, clientLogos }: AboutIntroBlock) {
  const [first, second] = media

  return (
    <section className="about-section" id="about-intro">
      <div className="container">
        <div className="about-top-row">
          <SiteLink href={eyebrow.href} className="about-eyebrow fade-anim" data-fade-from="left" data-delay="0.1">
            {eyebrow.label} <i className="fa-solid fa-arrow-trend-up"></i>
          </SiteLink>
        </div>

        <div className="about-heading-row">
          <h2 className="about-headline fade-anim" data-fade-from="bottom" data-delay="0.15">
            {headline}
          </h2>
          <SiteLink
            href={button.href}
            className="btn-primary-gradient about-learn-more fade-anim"
            data-fade-from="right"
            data-delay="0.25"
          >
            {button.label} <i className="fa-solid fa-arrow-trend-up"></i>
          </SiteLink>
        </div>

        <div className="about-grid">
          <div className="about-text-col">
            <div className="about-intro-block">
              <img
                src={intro.icon.src}
                alt={intro.icon.alt}
                className="about-intro-icon fade-anim"
                data-fade-from="left"
                data-delay="0.1"
              />
              <p className="about-intro-text fade-anim" data-fade-from="bottom" data-delay="0.2">
                {intro.text}
              </p>
            </div>
            <div className="about-stats-grid fade-anim" data-fade-from="bottom" data-delay="0.35">
              {stats.map((stat) => (
                <div className="about-stat-item" key={stat.label}>
                  <div className="about-stat-number">
                    {stat.value}
                    <span className="stat-symbol">{stat.suffix}</span>
                  </div>
                  <div className="about-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {first && (
            <div className="about-media-col fade-anim" data-fade-from="bottom" data-delay="0.25">
              <div className="about-media-img-wrap">
                <img src={first.image.src} alt={first.image.alt} className="about-media-img" />
              </div>
              <h4 className="about-media-title">{first.title}</h4>
              <p className="about-media-desc">{first.description}</p>
            </div>
          )}

          {second && (
            <div className="about-media-col about-media-col-reverse fade-anim" data-fade-from="bottom" data-delay="0.4">
              <h4 className="about-media-title">{second.title}</h4>
              <p className="about-media-desc">{second.description}</p>
              <div className="about-media-img-wrap">
                <img src={second.image.src} alt={second.image.alt} className="about-media-img" />
              </div>
            </div>
          )}
        </div>

        <ClientLogos logos={clientLogos} />
      </div>
    </section>
  )
}
