import type { Metadata } from 'next'
import React from 'react'

import { home } from '@/content/pages/home'
import { PageView } from '@/site/components/PageView'
import { buildMetadata } from '@/site/seo'

// Home page "/". Every other URL is served by [...path]/page.tsx.
export const metadata: Metadata = buildMetadata(home)

export default function HomePage() {
  return <PageView page={home} />
}
