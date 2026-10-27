import React from 'react'

import { Html } from '@/site/components/Html'
import { SiteLink } from '@/site/components/SiteLink'
import type { SuccessStoriesBlock } from '@/site/types'

export function SuccessStories({ eyebrow, title, description, stories }: SuccessStoriesBlock) {
  return (
    <section className="success-stories-section">
      <div className="container success-stories-heading">
        <div className="success-stories-heading-left">
          <SiteLink
            href={eyebrow.href}
            className="success-stories-eyebrow fade-anim"
            data-fade-from="bottom"
            data-delay="0.1"
          >
            {eyebrow.label} <i className="fa-solid fa-arrow-trend-up"></i>
          </SiteLink>
          <Html
            as="h2"
            className="success-stories-title fade-anim"
            data-fade-from="bottom"
            data-delay="0.2"
            html={title}
          />
        </div>
        <p className="success-stories-desc fade-anim" data-fade-from="bottom" data-delay="0.3">
          {description}
        </p>
      </div>

      <div className="container success-stories-grid">
        {stories.map((story) => (
          <article className="success-story-card" key={story.title}>
            <SiteLink href={story.href} className="success-story-media">
              <img src={story.image.src} alt={story.image.alt} className="success-story-img" loading="lazy" />
            </SiteLink>
            <div className="success-story-body">
              <h3 className="success-story-name">
                <SiteLink href={story.href}>{story.title}</SiteLink>
              </h3>
              <ul className="success-story-tags">
                {story.tags.map((tag) => (
                  <li key={tag}>
                    <span className="success-story-tag">{tag}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
