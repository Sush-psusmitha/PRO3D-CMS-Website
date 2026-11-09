import React from 'react'

import type { ImageRef } from '@/site/types'

/** Grayscale client logo marquee; the set is rendered twice for a seamless loop. */
export function ClientLogos({ logos }: { logos: ImageRef[] }) {
  return (
    <div className="about-clients-row fade-anim" data-fade-from="bottom" data-delay="0.1" data-start="96%">
      <div className="about-clients-track">
        {logos.map((logo) => (
          <div className="about-client-logo" key={logo.src}>
            <img src={logo.src} alt={logo.alt} loading="lazy" />
          </div>
        ))}
        {logos.map((logo) => (
          <div className="about-client-logo" aria-hidden="true" key={`dup-${logo.src}`}>
            <img src={logo.src} alt="" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  )
}
