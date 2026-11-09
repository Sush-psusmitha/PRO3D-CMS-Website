'use client'

import React, { useRef } from 'react'

import { Html } from '@/site/components/Html'
import { SiteLink } from '@/site/components/SiteLink'
import { prefersReducedMotion, useSlick } from '@/site/hooks/useSlick'
import type { ServiceSuccessStoriesBlock } from '@/site/types'

export function ServiceSuccessStories({ eyebrow, title, description, stories }: ServiceSuccessStoriesBlock) {
  const sliderRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)

  useSlick(sliderRef, ({ $ }) => ({
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    centerMode: true,
    centerPadding: '80px',
    autoplay: !prefersReducedMotion(),
    autoplaySpeed: 1800,
    speed: 500,
    pauseOnHover: true,
    pauseOnFocus: true,
    arrows: true,
    prevArrow:
      '<button type="button" class="service-success-stories-nav-prev" aria-label="Previous success story"><i class="fa-solid fa-chevron-left"></i></button>',
    nextArrow:
      '<button type="button" class="service-success-stories-nav-next" aria-label="Next success story"><i class="fa-solid fa-chevron-right"></i></button>',
    appendArrows: $(navRef.current!),
    dots: true,
    appendDots: $(navRef.current!),
    responsive: [
      { breakpoint: 1600, settings: { slidesToShow: 2, centerPadding: '60px' } },
      { breakpoint: 992, settings: { slidesToShow: 1, centerPadding: '40px' } },
      { breakpoint: 600, settings: { slidesToShow: 1, centerPadding: '24px' } },
    ],
  }))

  return (
    <section className="service-page-success-stories">
      <div className="container service-success-stories-heading">
        <div className="service-success-stories-heading-left">
          <SiteLink
            href={eyebrow.href}
            className="service-success-stories-eyebrow fade-anim"
            data-fade-from="bottom"
            data-delay="0.1"
          >
            {eyebrow.label} <i className="fa-solid fa-arrow-trend-up"></i>
          </SiteLink>
          <Html
            as="h2"
            className="service-success-stories-title fade-anim"
            data-fade-from="bottom"
            data-delay="0.2"
            html={title}
          />
        </div>
        <p className="service-success-stories-desc fade-anim" data-fade-from="bottom" data-delay="0.3">
          {description}
        </p>
      </div>

      <div className="service-success-stories-wrap fade-anim" data-fade-from="bottom" data-delay="0.1">
        <div className="service-success-stories-slick" id="successStoriesSlick" ref={sliderRef}>
          {stories.map((story) => (
            <article className="service-success-story-card" key={story.title}>
              <SiteLink href={story.href} className="service-success-story-media">
                <img src={story.image.src} alt={story.image.alt} className="service-success-story-img" loading="lazy" />
              </SiteLink>
              <div className="service-success-story-body">
                <h3 className="service-success-story-name">
                  <SiteLink href={story.href}>{story.title}</SiteLink>
                </h3>
                <ul className="service-success-story-tags">
                  {story.tags.map((tag) => (
                    <li key={tag}>
                      <span className="service-success-story-tag">{tag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
        <div className="service-success-stories-nav" ref={navRef}></div>
      </div>
    </section>
  )
}
