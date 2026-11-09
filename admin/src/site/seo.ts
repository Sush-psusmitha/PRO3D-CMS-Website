import type { Metadata } from 'next'

import type { FaqBlock, SitePage } from '@/site/types'

export const SITE_URL = 'https://professional3dservices.com'

const pageUrl = (page: SitePage) => `${SITE_URL}/${page.path}`

/** <title>, description, canonical, Open Graph and Twitter tags for a page. */
export function buildMetadata(page: SitePage): Metadata {
  const { title, description, keywords, image } = page.meta
  const images = image ? [`${SITE_URL}${image}`] : undefined
  return {
    title: { absolute: title },
    description,
    keywords,
    alternates: { canonical: pageUrl(page) },
    ...(page.meta.index === false
      ? { robots: { index: false, follow: false } }
      : { robots: { 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } }),
    openGraph: { url: pageUrl(page), title, description, images },
    twitter: { title, description, images },
  }
}

const organization = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'ThePro3DStudio',
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/img/logo-white.png`,
  sameAs: [
    'https://www.facebook.com/thepro3dcompany',
    'https://x.com/thepro3dstudio',
    'https://www.youtube.com/@thepro3dstudio',
    'https://www.instagram.com/thepro3dstudio/',
    'https://www.linkedin.com/company/thepro3dstudio',
  ],
  contactPoint: [
    { '@type': 'ContactPoint', telephone: '+1-919-251-5085', contactType: 'Customer Service', areaServed: 'US', availableLanguage: 'English' },
    { '@type': 'ContactPoint', telephone: '+91-9353276532', contactType: 'Customer Service', areaServed: 'IN', availableLanguage: 'English' },
  ],
  address: [
    { '@type': 'PostalAddress', streetAddress: '34/1, Upkar Chambers, 3rd Floor, Rashtriya Vidyalaya Rd, 2nd Block, Basavanagudi', addressLocality: 'Bengaluru', addressRegion: 'Karnataka', postalCode: '560004', addressCountry: 'IN' },
    { '@type': 'PostalAddress', streetAddress: '12600 Deerfield Parkway, Suite #100', addressLocality: 'Alpharetta', addressRegion: 'GA', postalCode: '30004', addressCountry: 'US' },
    { '@type': 'PostalAddress', streetAddress: '3305 Patton Lane', addressLocality: 'Durham', addressRegion: 'NC', postalCode: '27713', addressCountry: 'US' },
  ],
}

/**
 * JSON-LD for a page: Organization + WebSite + WebPage on every page, the page's
 * own `schema` entries, and an FAQPage built from its FAQ block, so the schema
 * always matches the questions shown on the page.
 */
export function buildJsonLd(page: SitePage) {
  const faq = page.layout.find((b): b is FaqBlock => b.blockType === 'faq')
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organization,
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: 'ThePro3DStudio',
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl(page)}#webpage`,
        url: pageUrl(page),
        name: page.meta.title,
        description: page.meta.description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#organization` },
      },
      ...(page.schema ?? []),
      ...(faq
        ? [
            {
              '@type': 'FAQPage',
              '@id': `${pageUrl(page)}#faq`,
              mainEntity: faq.items.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: { '@type': 'Answer', text: item.answer },
              })),
            },
          ]
        : []),
    ],
  }
}
