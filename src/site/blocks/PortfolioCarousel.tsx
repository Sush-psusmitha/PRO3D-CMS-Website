'use client'

import React, { useRef } from 'react'

import { Html } from '@/site/components/Html'
import { SiteLink } from '@/site/components/SiteLink'
import { prefersReducedMotion, useSlick } from '@/site/hooks/useSlick'
import type { PortfolioCarouselBlock } from '@/site/types'

export function PortfolioCarousel({ variant, eyebrow, title, description, background, items }: PortfolioCarouselBlock) {
  const sliderRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)

  useSlick(sliderRef, ({ $ }) => ({
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    centerMode: true,
    centerPadding: '60px',
    autoplay: !prefersReducedMotion(),
    autoplaySpeed: 2500,
    speed: 250,
    pauseOnHover: true,
    pauseOnFocus: true,
    arrows: true,
    prevArrow:
      '<button type="button" class="portfolio-nav portfolio-nav-prev" aria-label="Previous project"><i class="fa-solid fa-chevron-left"></i></button>',
    nextArrow:
      '<button type="button" class="portfolio-nav portfolio-nav-next" aria-label="Next project"><i class="fa-solid fa-chevron-right"></i></button>',
    appendArrows: $(navRef.current!),
    dots: true,
    appendDots: $(navRef.current!),
    responsive: [
      { breakpoint: 1500, settings: { slidesToShow: 4, centerPadding: '50px' } },
      { breakpoint: 1250, settings: { slidesToShow: 3, centerPadding: '45px' } },
      { breakpoint: 1024, settings: { slidesToShow: 2, centerPadding: '40px' } },
      { breakpoint: 640, settings: { slidesToShow: 1, centerPadding: '32px' } },
    ],
  }))

  const isLight = variant === 'light'

  return (
    <section className={`portfolio-carousel-section${isLight ? ' portfolio-carousel-light' : ''}`}>
      {!isLight && background && (
        <>
          <img src={background.src} alt="" className="portfolio-carousel-bg-img" aria-hidden="true" />
          <div className="portfolio-carousel-bg-overlay"></div>
        </>
      )}

      <div className="container portfolio-carousel-heading">
        <div className="portfolio-carousel-heading-left">
          <SiteLink
            href={eyebrow.href}
            className="about-eyebrow portfolio-carousel-eyebrow fade-anim"
            data-fade-from="bottom"
            data-delay="0.1"
          >
            {eyebrow.label} <i className="fa-solid fa-arrow-trend-up"></i>
          </SiteLink>
          <Html
            as="h2"
            className="portfolio-carousel-title fade-anim"
            data-fade-from="bottom"
            data-delay="0.2"
            html={title}
          />
        </div>
        <p className="portfolio-carousel-desc fade-anim" data-fade-from="bottom" data-delay="0.3">
          {description}
        </p>
      </div>

      <div className="portfolio-carousel-wrap fade-anim" data-fade-from="bottom" data-delay="0.1">
        <div className="portfolio-slick" id="portfolioSlick" ref={sliderRef}>
          {items.map((item) => (
            <SiteLink key={item.image.src} href={item.href} className="portfolio-card">
              <img src={item.image.src} alt={item.image.alt} className="portfolio-card-img" loading="lazy" />
              <span className="portfolio-card-label">{item.label}</span>
            </SiteLink>
          ))}
        </div>
        <div className="portfolio-carousel-nav" ref={navRef}></div>
      </div>
    </section>
  )
}
