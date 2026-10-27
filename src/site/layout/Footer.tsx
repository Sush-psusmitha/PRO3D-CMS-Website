import React from 'react'

import { Html } from '@/site/components/Html'
import { SiteLink } from '@/site/components/SiteLink'
import type { FooterData } from '@/site/types'

export function Footer({ data }: { data: FooterData }) {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-col footer-brand-col">
          <SiteLink href="/" className="footer-brand" aria-label="ThePro3DStudio Home">
            <img src={data.logo.src} alt={data.logo.alt} height={data.logo.height} />
          </SiteLink>
          <p className="footer-desc">{data.description}</p>
          <div className="footer-iso-badges">
            {data.badges.map((badge) => (
              <img key={badge.src} src={badge.src} alt={badge.alt} className="footer-iso-badge" loading="lazy" />
            ))}
          </div>
        </div>

        {data.linkColumns.map((col) => (
          <nav className="footer-col footer-nav-col" aria-label={col.label} key={col.label}>
            <ul className="footer-nav-list">
              {col.links.map((link) => (
                <li key={link.href}>
                  <SiteLink href={link.href} className="footer-link">
                    {link.label}
                  </SiteLink>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="footer-col footer-contact-col">
          <a href={data.contact.phone.href} className="footer-link footer-contact-line">
            {data.contact.phone.label}
          </a>
          <a href={data.contact.email.href} className="footer-link footer-contact-line">
            {data.contact.email.label}
          </a>
          <Html as="p" className="footer-contact-hours" html={data.contact.hours} />
          <Html as="p" className="footer-contact-address" html={data.contact.address} />
        </div>

        <div className="footer-col footer-social-col">
          {data.social.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="footer-link footer-social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="footer-social-icon">
                <i className={`fa-brands ${s.icon}`}></i>
              </span>
              {s.label}
              <i className="fa-solid fa-share footer-social-arrow"></i>
            </a>
          ))}
        </div>
      </div>

      <div className="container footer-bottom-nav">
        {data.bottomNav.map((link) => (
          <SiteLink key={link.href} href={link.href} className="footer-link footer-bottom-nav-link">
            {link.label}
          </SiteLink>
        ))}
      </div>

      <div className="footer-legal-bar">
        <div className="container footer-legal-inner">
          <p className="footer-legal-text">
            {data.legal.text}{' '}
            {data.legal.links.map((link) => (
              <React.Fragment key={link.href}>
                <SiteLink href={link.href} className="footer-link footer-legal-link">
                  {link.label}
                </SiteLink>{' '}
                |{' '}
              </React.Fragment>
            ))}
            {data.legal.copyright}
          </p>
          <p className="footer-legal-since">{data.legal.since}</p>
        </div>
      </div>
    </footer>
  )
}
