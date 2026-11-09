import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import { PageView } from '@/site/components/PageView'
import { buildMetadata } from '@/site/seo'
import { getPageFromCMS } from '@/utilities/getPageFromCMS'

// Home page "/". Every other URL is served by [...path]/page.tsx.
export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageFromCMS('')
  return page ? buildMetadata(page) : {}
}

export default async function HomePage() {
  const page = await getPageFromCMS('')
  if (!page) notFound()
  return <PageView page={page} />
}
