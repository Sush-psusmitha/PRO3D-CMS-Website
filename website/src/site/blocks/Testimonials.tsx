'use client'

import React, { useRef } from 'react'

import { SiteLink } from '@/site/components/SiteLink'
import { prefersReducedMotion, useSlick } from '@/site/hooks/useSlick'
import type { TestimonialsBlock } from '@/site/types'

export function Testimonials({ eyebrow, title, button, items }: TestimonialsBlock) {
  const sliderRef = useRef<HTMLDivElement>(null)

  useSlick(
    sliderRef,
    () => ({
      slidesToShow: 4,
      slidesToScroll: 1,
      infinite: true,
      centerMode: true,
      centerPadding: '50px',
      autoplay: !prefersReducedMotion(),
      autoplaySpeed: 3000,
      speed: 600,
      pauseOnHover: true,
      pauseOnFocus: true,
      arrows: false,
      dots: false,
      responsive: [
        { breakpoint: 1200, settings: { slidesToShow: 3, centerPadding: '35px' } },
        { breakpoint: 992, settings: { slidesToShow: 2, centerPadding: '30px' } },
        { breakpoint: 769, settings: { slidesToShow: 1, centerPadding: '28px' } },
      ],
    }),
    ({ $, el }) => {
      // Quote lengths differ, so give every card (clones included) the height of the tallest real card
      const equalize = () => {
        const $cards = el.find('.testimonial-card')
        $cards.css('min-height', '')
        let max = 0
        el.find('.testimonial-card:not(.slick-cloned)').each(function () {
          max = Math.max(max, this.getBoundingClientRect().height)
        })
        $cards.css('min-height', `${max}px`)
      }
      el.on('init reInit setPosition breakpoint', () => requestAnimationFrame(equalize))

      let timer: ReturnType<typeof setTimeout>
      const onResize = () => {
        clearTimeout(timer)
        timer = setTimeout(equalize, 150)
      }
      $(window).on('resize', onResize)
      return () => {
        clearTimeout(timer)
        el.off('init reInit setPosition breakpoint')
        $(window).off('resize', onResize)
      }
    },
  )

  return (
    // id: target of the menu link /about.html#testimonials
    <section className="testimonials-section" id="testimonials">
      <div className="container testimonials-heading">
        <div className="testimonials-heading-left">
          <SiteLink href={eyebrow.href} className="testimonials-eyebrow">
            {eyebrow.label} <i className="fa-solid fa-arrow-trend-up"></i>
          </SiteLink>
          <h2 className="testimonials-title">{title}</h2>
        </div>
        <SiteLink href={button.href} className="testimonials-btn">
          {button.label} <i className="fa-solid fa-arrow-trend-up"></i>
        </SiteLink>
      </div>

      <div className="testimonials-carousel-wrap">
        <div className="testimonials-slick" id="testimonialsSlick" ref={sliderRef}>
          {items.map((t) => (
            <div className="testimonial-card" key={`${t.company}-${t.role}`}>
              <div className="testimonial-card-top">
                <img src={t.avatar.src} alt={t.avatar.alt} className="testimonial-avatar" loading="lazy" />
                <div className="testimonial-person">
                  <span className="testimonial-role">{t.role}</span>
                  <span className="testimonial-company">{t.company}</span>
                </div>
              </div>
              <p className="testimonial-quote">&quot;{t.quote}&quot;</p>
              <div className="testimonial-stars" aria-label={`Rated ${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }, (_, i) => (
                  <i className="fa-solid fa-star" key={i}></i>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
