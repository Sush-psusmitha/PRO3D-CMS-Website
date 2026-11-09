import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { pages } from '@/content/pages'
import { PageView } from '@/site/components/PageView'
import { buildMetadata } from '@/site/seo'
import { getPageFromCMS } from '@/utilities/getPageFromCMS'

type Props = { params: Promise<{ path: string[] }> }

// Allow newly created CMS pages to render dynamically on demand
export const dynamicParams = true

// Pre-build pages known across Services, Subservices, Case Studies, and Pages at build time
export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config })
    const [pagesRes, servicesRes, subservicesRes, caseStudiesRes] = await Promise.all([
      payload.find({ collection: 'pages', limit: 1000, select: { path: true } }),
      payload.find({ collection: 'services', limit: 1000, select: { path: true } }),
      payload.find({ collection: 'subservices', limit: 1000, select: { path: true } }),
      payload.find({ collection: 'case-studies', limit: 1000, select: { path: true } }),
    ])

    const allDocs = [
      ...pagesRes.docs,
      ...servicesRes.docs,
      ...subservicesRes.docs,
      ...caseStudiesRes.docs,
    ]

    const cmsPaths = allDocs
      .filter((doc) => doc.path)
      .map((doc) => ({ path: doc.path!.split('/') }))

    if (cmsPaths.length > 0) return cmsPaths
  } catch (err) {
    console.warn('Falling back to static params from content/pages:', err)
  }

  return pages.filter((page) => page.path).map((page) => ({ path: page.path.split('/') }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { path } = await params
  const page = await getPageFromCMS(path.join('/'))
  return page ? buildMetadata(page) : {}
}

export default async function CatchAllPage({ params }: Props) {
  const { path } = await params
  const page = await getPageFromCMS(path.join('/'))
  if (!page) notFound()
  return <PageView page={page} />
}
