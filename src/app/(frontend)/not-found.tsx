import React from 'react'

import { SiteLink } from '@/site/components/SiteLink'

// Interim 404 using the design system's classes; the designed 404 page comes later.
export default function NotFound() {
  return (
    <section className="about-section" style={{ paddingTop: '180px', minHeight: '60vh' }}>
      <div className="container">
        <div className="about-heading-row">
          <h1 className="about-headline">404 — This page could not be found.</h1>
          <SiteLink href="/" className="btn-primary-gradient about-learn-more">
            Go home <i className="fa-solid fa-arrow-trend-up"></i>
          </SiteLink>
        </div>
      </div>
    </section>
  )
}
