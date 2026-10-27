'use client'

import React, { useEffect, useRef, useState } from 'react'

import { SiteLink } from '@/site/components/SiteLink'
import type { WhyChooseBlock } from '@/site/types'

export function WhyChoose({ background, image, video, eyebrow, title, features, button }: WhyChooseBlock) {
  const [open, setOpen] = useState(false)
  // The video file is only requested once the visitor presses play
  const [loaded, setLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const openModal = () => {
    setLoaded(true)
    setOpen(true)
  }
  const closeModal = () => setOpen(false)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (open) {
      document.body.style.overflow = 'hidden'
      if (!v.currentSrc) v.load() // <source> was just added
      v.play().catch(() => {})
    } else {
      document.body.style.overflow = ''
      v.pause()
    }
  }, [open, loaded])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <>
      <section className="why-choose-section">
        <img src={background.src} alt="" className="why-choose-bg-img" aria-hidden="true" />
        <div className="why-choose-bg-overlay"></div>

        <div className="container why-choose-grid">
          <div className="why-choose-media fade-anim" data-fade-from="left" data-delay="0.1">
            <img
              src={image.src}
              alt={image.alt}
              className="why-choose-img"
              width={image.width}
              height={image.height}
              loading="lazy"
              decoding="async"
            />
            {video && (
              <button
                type="button"
                className="why-choose-play-btn"
                aria-label="Play showreel video"
                aria-haspopup="dialog"
                onClick={openModal}
              >
                <i className="fa-solid fa-play"></i>
              </button>
            )}
          </div>

          <div className="why-choose-content">
            <SiteLink
              href={eyebrow.href}
              className="about-eyebrow why-choose-eyebrow fade-anim"
              data-fade-from="bottom"
              data-delay="0.1"
            >
              {eyebrow.label} <i className="fa-solid fa-arrow-trend-up"></i>
            </SiteLink>
            <h2 className="why-choose-title fade-anim" data-fade-from="bottom" data-delay="0.2">
              {title}
            </h2>

            <div className="why-choose-features">
              {features.map((f, i) => (
                <div
                  className="why-choose-feature fade-anim"
                  data-fade-from="bottom"
                  data-delay={String(0.05 * (i + 1))}
                  key={f.title}
                >
                  <span className="why-choose-feature-icon">
                    <i className={`fa-solid ${f.icon}`}></i>
                  </span>
                  <div className="why-choose-feature-content">
                    <h3 className="why-choose-feature-title">{f.title}</h3>
                    <p className="why-choose-feature-desc">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <SiteLink
              href={button.href}
              className="btn-primary-gradient why-choose-cta fade-anim"
              data-fade-from="bottom"
              data-delay="0.35"
            >
              {button.label} <i className="fa-solid fa-arrow-trend-up"></i>
            </SiteLink>
          </div>
        </div>
      </section>

      {video && (
        <div className={`video-modal${open ? ' open' : ''}`} aria-hidden={!open}>
          <div className="video-modal-backdrop" onClick={closeModal}></div>
          <div className="video-modal-inner">
            <button type="button" className="video-modal-close" aria-label="Close video" onClick={closeModal}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            <video ref={videoRef} className="video-modal-video" controls playsInline poster={video.poster} preload="none">
              {loaded && <source src={video.src} type="video/mp4" />}
            </video>
          </div>
        </div>
      )}
    </>
  )
}
