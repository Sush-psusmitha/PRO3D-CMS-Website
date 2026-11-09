'use client'

import React, { useState } from 'react'

import { SiteLink } from '@/site/components/SiteLink'
import type { FaqBlock } from '@/site/types'

/** Two-column accordion; only one answer is open at a time (the first one by default). */
export function Faq({ eyebrow, title, items }: FaqBlock) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const half = Math.ceil(items.length / 2)
  const columns = [
    { side: 'left', items: items.slice(0, half), offset: 0 },
    { side: 'right', items: items.slice(half), offset: half },
  ]

  return (
    <section className="services-faq-section">
      <div className="container services-faq-grid">
        <div className="services-faq-heading">
          <SiteLink
            href={eyebrow.href}
            className="about-eyebrow services-faq-eyebrow fade-anim"
            data-fade-from="bottom"
            data-delay="0.1"
          >
            {eyebrow.label} <i className="fa-solid fa-arrow-trend-up"></i>
          </SiteLink>
          <h2 className="services-faq-title fade-anim" data-fade-from="bottom" data-delay="0.2">
            {title}
          </h2>
        </div>

        {columns.map((col) => (
          <div className={`services-faq-list services-faq-list-${col.side}`} key={col.side}>
            {col.items.map((item, i) => {
              const index = col.offset + i
              const open = openIndex === index
              return (
                <div
                  className={`faq-item${open ? ' open' : ''} fade-anim`}
                  data-fade-from={col.side}
                  data-delay={String(0.05 * (i + 1))}
                  key={item.question}
                >
                  <button
                    type="button"
                    className="faq-question"
                    aria-expanded={open}
                    onClick={() => setOpenIndex(open ? null : index)}
                  >
                    <span>{item.question}</span>
                    <span className="faq-icon" aria-hidden="true">
                      <span className="faq-icon-bar faq-icon-bar-h"></span>
                      <span className="faq-icon-bar faq-icon-bar-v"></span>
                    </span>
                  </button>
                  <div className="faq-answer">
                    <div className="faq-answer-inner">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </section>
  )
}
