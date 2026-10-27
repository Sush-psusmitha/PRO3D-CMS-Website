import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import { getPage, pages } from '@/content/pages'
import { PageView } from '@/site/components/PageView'
import { buildMetadata } from '@/site/seo'

// Catch-all route: serves every page except home, using the live URLs.
// /3d-modeling/product.html  ->  params.path = ['3d-modeling', 'product.html']

type Props = { params: Promise<{ path: string[] }> }

// Only the pages in the list exist; any other URL is a 404
export const dynamicParams = false

// Pre-build every page as static HTML at build time
export function generateStaticParams() {
  return pages.filter((page) => page.path).map((page) => ({ path: page.path.split('/') }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { path } = await params
  const page = getPage(path.join('/'))
  return page ? buildMetadata(page) : {}
}

export default async function CatchAllPage({ params }: Props) {
  const { path } = await params
  const page = getPage(path.join('/'))
  if (!page) notFound()
  return <PageView page={page} />
}
