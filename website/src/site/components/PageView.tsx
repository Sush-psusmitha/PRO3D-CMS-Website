import React from 'react'

import { RenderBlocks } from '@/site/blocks/RenderBlocks'
import { buildJsonLd } from '@/site/seo'
import type { SitePage } from '@/site/types'

/** Renders one page: its structured data + its blocks. Used by every route. */
export function PageView({ page }: { page: SitePage }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(page)) }} />
      <RenderBlocks blocks={page.layout} />
    </>
  )
}
