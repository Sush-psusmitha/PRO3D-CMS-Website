import React from 'react'

import type { MapsystemsIntroBlock } from '@/site/types'

export function MapsystemsIntro({ image, title, description, points }: MapsystemsIntroBlock) {
  return (
    <section className="mapsystems-intro-section">
      <div className="container mapsystems-intro-grid">
        <div className="mapsystems-intro-media fade-anim" data-fade-from="left" data-delay="0.1">
          <img
            src={image.src}
            alt={image.alt}
            className="mapsystems-intro-img"
            width={image.width}
            height={image.height}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="mapsystems-intro-content">
          <h2 className="mapsystems-intro-title fade-anim" data-fade-from="bottom" data-delay="0.15">
            {title}
          </h2>
          <p className="mapsystems-intro-desc fade-anim" data-fade-from="bottom" data-delay="0.25">
            {description}
          </p>
          <div className="mapsystems-intro-points fade-anim" data-fade-from="bottom" data-delay="0.35">
            {points.map((point) => (
              <div className="mapsystems-intro-point" key={point.title}>
                <h3 className="mapsystems-intro-point-title">
                  <i className="fa-solid fa-circle-check" aria-hidden="true"></i> {point.title}
                </h3>
                <p className="mapsystems-intro-point-desc">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
