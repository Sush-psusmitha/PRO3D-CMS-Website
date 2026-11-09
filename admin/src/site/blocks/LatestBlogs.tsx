import React from 'react'

import { SiteLink } from '@/site/components/SiteLink'
import type { LatestBlogsBlock } from '@/site/types'

export function LatestBlogs({ eyebrow, title, button, posts }: LatestBlogsBlock) {
  return (
    <section className="latest-blogs-section">
      <div className="container latest-blogs-heading">
        <div className="latest-blogs-heading-left">
          <SiteLink
            href={eyebrow.href}
            className="about-eyebrow latest-blogs-eyebrow fade-anim"
            data-fade-from="bottom"
            data-delay="0.1"
          >
            {eyebrow.label} <i className="fa-solid fa-arrow-trend-up"></i>
          </SiteLink>
          <h2 className="latest-blogs-title fade-anim" data-fade-from="bottom" data-delay="0.2">
            {title}
          </h2>
        </div>
        <div className="latest-blogs-btn-wrap fade-anim" data-fade-from="bottom" data-delay="0.3">
          <SiteLink href={button.href} className="latest-blogs-btn">
            {button.label}
          </SiteLink>
          <SiteLink href={button.href} className="latest-blogs-btn-circle" aria-label={button.label}>
            <i className="fa-solid fa-share"></i>
          </SiteLink>
        </div>
      </div>

      <div className="container latest-blogs-grid">
        {posts.map((post, i) => (
          <SiteLink
            key={post.title}
            href={post.href}
            className="blog-card fade-anim"
            data-fade-from="bottom"
            data-delay={String(0.15 * (i + 1))}
          >
            <div className="blog-card-img-wrap">
              <img src={post.image.src} alt={post.image.alt} className="blog-card-img" loading="lazy" />
            </div>
            <h3 className="blog-card-title">{post.title}</h3>
            <p className="blog-card-meta">
              By <span className="blog-card-author">{post.author}</span> — {post.date}
            </p>
          </SiteLink>
        ))}
      </div>
    </section>
  )
}
