import type { Metadata } from 'next'
import React from 'react'

import { footer } from '@/content/footer'
import { header } from '@/content/header'
import { Footer } from '@/site/layout/Footer'
import { Header } from '@/site/layout/Header'
import { ScrollAnimations } from '@/site/layout/ScrollAnimations'

import '@/styles/fontawesome.min.css'
import '@/styles/slick.min.css'
import '@/styles/style.css'
import '@/styles/blog.css'

// Header and footer content come from src/content for now; they become the
// Header / Footer globals in Payload once the database is connected.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US">
      <body>
        <Header data={header} />
        <main>{children}</main>
        <Footer data={footer} />
        <ScrollAnimations />
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://professional3dservices.com'),
  icons: { icon: '/img/favicon.png' },
  robots: { 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  openGraph: { locale: 'en_US', siteName: 'ThePro3DStudio', type: 'website' },
  twitter: { card: 'summary_large_image' },
  alternates: { types: { 'application/rss+xml': 'https://professional3dservices.com/feed.xml' } },
}
