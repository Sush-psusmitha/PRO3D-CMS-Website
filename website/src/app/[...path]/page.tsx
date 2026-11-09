import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import { PageView } from '@/site/components/PageView'
import { buildMetadata } from '@/site/seo'
import { cmsApi } from '@/api/cms'

type Props = { params: Promise<{ path: string[] }> }

// Allow newly created pages from the Admin portal to render dynamically on demand
export const dynamicParams = true

export async function generateStaticParams() {
  const paths = await cmsApi.getAllPaths()
  return paths.map((path) => ({ path: path.split('/') }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { path } = await params
  const page = await cmsApi.getPageByPath(path.join('/'))
  return page ? buildMetadata(page) : {}
}

export default async function CatchAllPage({ params }: Props) {
  const { path } = await params
  const page = await cmsApi.getPageByPath(path.join('/'))
  if (!page) notFound()
  return <PageView page={page} />
}
