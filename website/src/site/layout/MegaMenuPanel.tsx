import React from 'react'

import { Html } from '@/site/components/Html'
import { SiteLink } from '@/site/components/SiteLink'
import type { MegaCta, MegaMenu } from '@/site/types'

function CtaColumn({ cta }: { cta: MegaCta }) {
  if (cta.variant === 'poster') {
    return (
      <div className="mega-menu-cta-col verticals-cta-col">
        <img src={cta.image.src} alt={cta.image.alt} className="verticals-cta-img" />
        <div className="verticals-cta-overlay"></div>
        <div className="verticals-cta-content">
          <Html as="div" className="verticals-cta-title" html={cta.title} />
          <SiteLink href={cta.button.href} className="btn-mega-cta verticals-cta-btn">
            {cta.button.label} <i className="fa-solid fa-arrow-trend-up"></i>
          </SiteLink>
        </div>
      </div>
    )
  }

  if (cta.variant === 'horizontal') {
    return (
      <div className={['mega-menu-cta-col solutions-cta-col', cta.extraClass].filter(Boolean).join(' ')}>
        <div className="solutions-cta-inner">
          <div className="solutions-cta-img-wrap">
            <img src={cta.image.src} alt={cta.image.alt} className="solutions-cta-img" />
          </div>
          <div className="solutions-cta-content">
            <Html as="div" className="mega-cta-title solutions-cta-title" html={cta.title} />
            <p className="mega-cta-desc solutions-cta-desc">{cta.description}</p>
            <SiteLink href={cta.button.href} className="btn-mega-cta">
              {cta.button.label} <i className="fa-solid fa-arrow-trend-up"></i>
            </SiteLink>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mega-menu-cta-col">
      <div className="mega-cta-card">
        <div className="mega-cta-img-wrap">
          <img src={cta.image.src} alt={cta.image.alt} className="mega-cta-img" />
        </div>
        <div className="mega-cta-content">
          <Html as="div" className="mega-cta-title" html={cta.title} />
          <p className="mega-cta-desc">{cta.description}</p>
          <SiteLink href={cta.button.href} className="btn-mega-cta">
            {cta.button.label} <i className="fa-solid fa-arrow-trend-up"></i>
          </SiteLink>
        </div>
      </div>
    </div>
  )
}

export function MegaMenuPanel({
  menu,
  onMouseEnter,
  onMouseLeave,
}: {
  menu: MegaMenu
  onMouseEnter: () => void
  onMouseLeave: () => void
}) {
  if (menu.layout === 'columns') {
    return (
      <div className="mega-menu-panel" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <div className="mega-menu-wrapper">
          {menu.columns.map((col) => (
            <div className="mega-menu-col" key={col.title}>
              <div className="mega-col-title">
                {col.titleHref ? <SiteLink href={col.titleHref}>{col.title}</SiteLink> : col.title}
              </div>
              <p className="mega-col-desc">{col.description}</p>
              <ul className="mega-link-list">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <SiteLink href={link.href}>
                      <i className={`fa-solid ${link.icon}`}></i> <span>{link.label}</span>
                    </SiteLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <CtaColumn cta={menu.cta} />
        </div>
      </div>
    )
  }

  // Feature layout: 'solution' (3D Solutions, Resources) or 'vertical' (Working Verticals)
  const s = menu.style
  const wrapperClass = s === 'solution' ? 'mega-menu-wrapper solutions-mega-wrapper' : 'mega-menu-wrapper'
  const colClass = s === 'solution' ? 'mega-menu-col solutions-col' : 'mega-menu-col verticals-col'

  return (
    <div className="mega-menu-panel" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className={wrapperClass}>
        {menu.columns.map((col, i) => (
          <div className={colClass} key={i}>
            {col.map((item) => (
              <div className={`${s}-feature-item`} key={item.href}>
                <SiteLink href={item.href} className={`${s}-feature-link`}>
                  <div className={`${s}-feature-header`}>
                    <i className={`fa-solid ${item.icon} ${s}-feature-icon`}></i>
                    <span className={`${s}-feature-title`}>{item.label}</span>
                  </div>
                  <p className={`${s}-feature-desc`}>{item.description}</p>
                </SiteLink>
              </div>
            ))}
          </div>
        ))}
        <CtaColumn cta={menu.cta} />
      </div>
    </div>
  )
}
