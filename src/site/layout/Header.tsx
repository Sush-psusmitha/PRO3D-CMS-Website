'use client'

import { usePathname } from 'next/navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { SiteLink } from '@/site/components/SiteLink'
import type { HeaderData } from '@/site/types'

import { MegaMenuPanel } from './MegaMenuPanel'

const DESKTOP_MIN = 1100 // mega menus only open above this width (same as the design)

export function Header({ data }: { data: HeaderData }) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [activeMenu, setActiveMenu] = useState<number | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [openAccordion, setOpenAccordion] = useState<number | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // 1. Glass header after 20px of scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock page scroll while the search modal or mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = searchOpen || drawerOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [searchOpen, drawerOpen])

  const closeSearch = useCallback(() => {
    setSearchOpen(false)
    setSearchValue('')
  }, [])

  // Close everything on navigation
  useEffect(() => {
    setActiveMenu(null)
    setDrawerOpen(false)
    closeSearch()
  }, [pathname, closeSearch])

  // Esc closes search, drawer and mega menu; shrinking below desktop closes mega menu
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      closeSearch()
      setDrawerOpen(false)
      setActiveMenu(null)
    }
    const onResize = () => {
      if (window.innerWidth <= DESKTOP_MIN) setActiveMenu(null)
    }
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [closeSearch])

  const openMenu = (index: number) => {
    if (window.innerWidth <= DESKTOP_MIN) return
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActiveMenu(index)
  }

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setActiveMenu(null), 120)
  }

  const openSearch = () => {
    setSearchOpen(true)
    setTimeout(() => searchInputRef.current?.focus(), 100)
  }

  const headerClass = [
    'site-header',
    scrolled && 'scrolled',
    activeMenu !== null && 'mega-menu-open',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <>
      <header className={headerClass} id="siteHeader">
        <div className="header-container">
          <SiteLink href="/" className="header-brand" aria-label="ThePro3DStudio Home">
            <img src={data.logo.light} alt={data.logo.alt} className="logo-white" height={42} />
            <img src={data.logo.dark} alt={data.logo.alt} className="logo-black" height={42} />
          </SiteLink>

          <nav className="d-none d-desktop-block" aria-label="Primary Navigation">
            <ul className="header-nav">
              {data.nav.map((item, i) => (
                <li
                  key={item.label}
                  className={[
                    'header-nav-item',
                    item.megaMenu && 'has-mega-menu',
                    activeMenu === i && 'menu-active',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onMouseLeave={item.megaMenu ? scheduleClose : undefined}
                >
                  <SiteLink
                    href={item.href}
                    className="header-nav-link"
                    onMouseEnter={item.megaMenu ? () => openMenu(i) : undefined}
                  >
                    <span className="nav-text">{item.label}</span>
                    {item.megaMenu && (
                      <>
                        {' '}
                        <i className="fa-solid fa-chevron-down nav-arrow"></i>
                      </>
                    )}
                  </SiteLink>
                  {item.megaMenu && (
                    <MegaMenuPanel
                      menu={item.megaMenu}
                      onMouseEnter={() => openMenu(i)}
                      onMouseLeave={scheduleClose}
                    />
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-actions">
            <button type="button" className="header-search-btn" aria-label="Open Search" onClick={openSearch}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <SiteLink href={data.cta.href} className="btn-header-cta">
              {data.cta.label}
            </SiteLink>
            <button
              type="button"
              className="header-hamburger"
              aria-label="Toggle Mobile Menu"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(true)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Search modal */}
      <div className={`search-modal-backdrop${searchOpen ? ' active' : ''}`} onClick={closeSearch}></div>
      <div
        className={`search-modal-container${searchOpen ? ' active' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site Search"
      >
        <div className="search-modal-box">
          <div className="search-modal-header">
            <div className="search-input-wrapper">
              <i className="fa-solid fa-magnifying-glass search-input-icon"></i>
              <input
                ref={searchInputRef}
                type="text"
                className="search-input"
                placeholder={data.search.placeholder}
                autoComplete="off"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button
                type="button"
                className={`search-clear-btn${searchValue.trim() ? ' visible' : ''}`}
                aria-label="Clear search input"
                onClick={() => {
                  setSearchValue('')
                  searchInputRef.current?.focus()
                }}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <button type="button" className="search-modal-close" aria-label="Close search" onClick={closeSearch}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className="search-quick-links">
            <span className="quick-links-title">Popular searches:</span>
            <div className="quick-links-tags">
              {data.search.quickLinks.map((link) => (
                <SiteLink key={link.href} href={link.href}>
                  {link.label}
                </SiteLink>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`mobile-nav-backdrop${drawerOpen ? ' active' : ''}`} onClick={() => setDrawerOpen(false)}></div>
      <div
        className={`mobile-nav-drawer${drawerOpen ? ' active' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        <div>
          <div className="mobile-drawer-header">
            <SiteLink href="/" className="header-brand">
              <img src={data.logo.light} alt="ThePro3DStudio" height={34} />
            </SiteLink>
            <button
              type="button"
              className="mobile-drawer-close"
              aria-label="Close Mobile Menu"
              onClick={() => setDrawerOpen(false)}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <ul className="mobile-nav-list">
            {data.nav.map((item, i) => {
              if (!item.mobileLinks?.length) {
                return (
                  <li className="mobile-nav-item" key={item.label}>
                    <SiteLink href={item.href} className="mobile-nav-btn">
                      {item.label}
                    </SiteLink>
                  </li>
                )
              }
              const open = openAccordion === i
              return (
                <li className="mobile-nav-item" key={item.label}>
                  <button
                    type="button"
                    className={`mobile-nav-btn${open ? ' open' : ''}`}
                    aria-expanded={open}
                    onClick={() => setOpenAccordion(open ? null : i)}
                  >
                    {item.label} <i className="fa-solid fa-chevron-down arrow"></i>
                  </button>
                  <ul className={`mobile-sub-menu${open ? ' open' : ''}`}>
                    {item.mobileLinks.map((link) => (
                      <li key={link.href}>
                        <SiteLink href={link.href}>
                          <i className={`fa-solid ${link.icon}`}></i> {link.label}
                        </SiteLink>
                      </li>
                    ))}
                  </ul>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="mobile-drawer-footer">
          <SiteLink href={data.cta.href} className="btn-primary-gradient w-100 text-center">
            {data.cta.label}
          </SiteLink>
        </div>
      </div>
    </>
  )
}
