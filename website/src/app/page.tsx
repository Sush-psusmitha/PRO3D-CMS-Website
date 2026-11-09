import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import { PageView } from '@/site/components/PageView'
import { buildMetadata } from '@/site/seo'
import { cmsApi } from '@/api/cms'

export async function generateMetadata(): Promise<Metadata> {
  const page = await cmsApi.getPageByPath('')
  return page ? buildMetadata(page) : {}
}

export default async function HomePage() {
  const page = await cmsApi.getPageByPath('')
  if (!page) notFound()
  return <PageView page={page} />
}
