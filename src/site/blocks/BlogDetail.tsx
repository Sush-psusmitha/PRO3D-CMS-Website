'use client'

import React, { useEffect, useState } from 'react'

import { SiteLink } from '@/site/components/SiteLink'
import type { BlogDetailBlock } from '@/site/types'

export function BlogDetail({
  heroBg,
  bannerImage,
  title,
  author,
  publishDate,
  readTime,
  leadParagraph,
  secondaryParagraph,
  sections,
  toc,
  recentPosts,
  sidebarPromo,
}: BlogDetailBlock) {
  const [activeId, setActiveId] = useState<string>('challenge-1')

  // Smooth scroll and active TOC tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200
      for (const item of toc) {
        const element = document.getElementById(item.id)
        if (element) {
          const top = element.offsetTop
          const height = element.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveId(item.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [toc])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const target = document.getElementById(id)
    if (target) {
      const topOffset = 100
      const elementPosition = target.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - topOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
      setActiveId(id)
    }
  }

  return (
    <article className="blog-detail-article">
      {/* ======================================================================
          1. HERO SECTION (Separate section: Breadcrumb, Title, Metadata)
          ====================================================================== */}
      <section
        className="blog-hero-section"
        style={{
          backgroundImage: `url(${heroBg.src})`,
        }}
      >
        <div className="blog-hero-container">
          {/* Breadcrumb */}
          <nav className="blog-hero-breadcrumb" aria-label="Breadcrumb">
            <SiteLink href="/">Home</SiteLink>
            <span className="breadcrumb-sep">/</span>
            <SiteLink href="/blog.html">Blog</SiteLink>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">3D Design</span>
          </nav>

          {/* Main Article Title */}
          <h1 className="blog-hero-title">{title}</h1>

          {/* Author & Meta bar */}
          <div className="blog-hero-meta">
            <div className="blog-meta-item">
              <span className="blog-meta-label">Posted by</span>
              {author.avatar ? (
                <div className="blog-meta-author-avatar">
                  <img src={author.avatar.src} alt={author.name} />
                </div>
              ) : (
                <div className="blog-meta-author-avatar">{author.name.charAt(0)}</div>
              )}
              <span className="blog-meta-value">{author.name}</span>
            </div>

            <div className="blog-meta-divider" />

            <div className="blog-meta-item">
              <span className="blog-meta-label">Published on</span>
              <i className="fa-regular fa-calendar blog-meta-icon"></i>
              <span className="blog-meta-value">{publishDate}</span>
            </div>

            {readTime && (
              <>
                <div className="blog-meta-divider" />
                <div className="blog-meta-item">
                  <i className="fa-regular fa-clock blog-meta-icon"></i>
                  <span className="blog-meta-label">{readTime}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ======================================================================
          2. SEPARATE INTRO BANNER SECTION
          (Sits at bottom of hero; top 20% overlaps bottom of hero section)
          ====================================================================== */}
      <section className="blog-banner-section" aria-label="Article Banner">
        <div className="blog-banner-container">
          <div className="blog-banner-card">
            <img
              src={bannerImage.src}
              alt={bannerImage.alt || title}
              width={1360}
              height={680}
            />
          </div>
        </div>
      </section>

      {/* ======================================================================
          3. MAIN CONTENT AREA (70% Left Content, 30% Right Sticky Sidebar)
          ====================================================================== */}
      <section className="blog-body-section">
        <div className="blog-body-container">
          <div className="blog-layout-grid">
            {/* ----------------------------------------------------------------
                70% LEFT COLUMN: BLOG CONTENT
                ---------------------------------------------------------------- */}
            <div className="blog-main-content">
              {/* Lead Paragraph */}
              <p className="blog-lead-paragraph">{leadParagraph}</p>

              {secondaryParagraph && (
                <p className="blog-secondary-paragraph">{secondaryParagraph}</p>
              )}

              {/* Dynamic Content Sections */}
              {sections.map((section) => (
                <div key={section.id} id={section.id} className="blog-section">
                  {/* Section Title */}
                  <h2 className="blog-section-title">{section.title}</h2>

                  {/* Section Paragraphs */}
                  {section.paragraphs?.map((p, idx) => (
                    <p key={idx} className="blog-paragraph">
                      {p}
                    </p>
                  ))}

                  {/* Challenges List (with solutions) */}
                  {section.challenges && section.challenges.length > 0 && (
                    <div className="blog-challenges-list">
                      {section.challenges.map((ch) => (
                        <div key={ch.id} id={ch.id} className="blog-challenge-card">
                          <h3 className="blog-challenge-title">
                            <span className="blog-challenge-arrow">►</span>
                            <span>
                              Challenge #{ch.number}: {ch.title}
                            </span>
                          </h3>

                          <p className="blog-challenge-desc">{ch.description}</p>

                          {ch.solutionBullets.length > 0 && (
                            <div className="blog-solution-box">
                              <div className="blog-solution-heading">
                                <span className="blog-solution-dot"></span>
                                Solution:
                              </div>
                              <ul className="blog-solution-list">
                                {ch.solutionBullets.map((bullet, bIdx) => (
                                  <li key={bIdx} className="blog-solution-item">
                                    {bullet}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tools List */}
                  {section.tools && section.tools.length > 0 && (
                    <div className="blog-tools-list">
                      {section.tools.map((tool, tIdx) => (
                        <div key={tIdx} className="blog-tool-item">
                          <h3 className="blog-tool-name">
                            {tool.name} <span className="blog-tool-role">({tool.role})</span>
                          </h3>
                          <p className="blog-tool-desc">{tool.description}</p>
                          {tool.bullets.length > 0 && (
                            <ul className="blog-tool-bullets">
                              {tool.bullets.map((b, bi) => (
                                <li key={bi}>{b}</li>
                              ))}
                            </ul>
                          )}
                          {tool.note && (
                            <p
                              className="blog-paragraph"
                              style={{ fontStyle: 'italic', fontSize: '14px', color: '#6B7280' }}
                            >
                              {tool.note}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Specialist Bullet Points */}
                  {section.points && section.points.length > 0 && (
                    <ol className="blog-points-list">
                      {section.points.map((pt, pIdx) => (
                        <li key={pIdx}>{pt}</li>
                      ))}
                    </ol>
                  )}

                  {/* Closing Paragraphs */}
                  {section.closingParagraphs?.map((cp, cIdx) => (
                    <p key={cIdx} className="blog-paragraph">
                      {cp}
                    </p>
                  ))}
                </div>
              ))}

              {/* Author Bio Box */}
              <div className="blog-author-card">
                <span className="blog-author-tag">AUTHOR »</span>
                <div className="blog-author-header">
                  <h3 className="blog-author-name">{author.name}</h3>

                  {/* Social links */}
                  {author.social && author.social.length > 0 && (
                    <div className="blog-author-socials">
                      {author.social.map((s, idx) => (
                        <a
                          key={idx}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.label}
                          className="blog-author-social-link"
                        >
                          <i className={s.icon}></i>
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                <p className="blog-author-bio">{author.bio}</p>
              </div>
            </div>

            {/* ----------------------------------------------------------------
                30% RIGHT COLUMN: STICKY SIDEBAR
                ---------------------------------------------------------------- */}
            <aside className="blog-sidebar">
              {/* Widget 1: Table of Content */}
              <div className="widget-toc">
                <div className="widget-toc-header">
                  <h3 className="widget-toc-title">Table of Content</h3>
                  <div className="widget-toc-accent" />
                </div>

                <nav className="widget-toc-list" aria-label="Table of Contents">
                  {toc.map((item) => {
                    const isActive = activeId === item.id
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={(e) => scrollToSection(e, item.id)}
                        className={`widget-toc-link ${item.isSub ? 'is-sub' : ''} ${
                          isActive ? 'is-active' : ''
                        }`}
                      >
                        {item.label}
                      </a>
                    )
                  })}
                </nav>
              </div>

              {/* Widget 2: Recent Posts */}
              <div className="widget-recent-posts">
                <h3 className="widget-recent-title">Recent Posts</h3>

                <div className="widget-recent-list">
                  {recentPosts.map((post, idx) => (
                    <div key={idx} className="widget-recent-item">
                      <span className="widget-recent-cat">{post.category}</span>
                      <div className="widget-recent-row">
                        <SiteLink href={post.href} className="widget-recent-link">
                          {post.title}
                        </SiteLink>
                        {post.hasArrow !== false && (
                          <SiteLink
                            href={post.href}
                            className="widget-recent-arrow-btn"
                            aria-label={`Read ${post.title}`}
                            tabIndex={-1}
                          >
                            <i
                              className="fa-solid fa-arrow-up-right-from-square"
                              style={{ fontSize: '10px' }}
                            ></i>
                          </SiteLink>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Widget 3: Sidebar Promo Banner */}
              <div
                className="widget-promo-banner"
                style={{
                  backgroundImage: `url(${sidebarPromo.bgImage.src})`,
                }}
              >
                {/* Top Badge */}
                <div>
                  <span className="widget-promo-badge">{sidebarPromo.badge}</span>
                </div>

                {/* Bottom Content */}
                <div className="widget-promo-content">
                  <h4 className="widget-promo-title">{sidebarPromo.title}</h4>
                  <p className="widget-promo-desc">{sidebarPromo.description}</p>
                  <SiteLink href={sidebarPromo.button.href} className="widget-promo-btn">
                    <span>{sidebarPromo.button.label}</span>
                    <i className="fa-solid fa-arrow-right" style={{ fontSize: '11px' }}></i>
                  </SiteLink>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </article>
  )
}
