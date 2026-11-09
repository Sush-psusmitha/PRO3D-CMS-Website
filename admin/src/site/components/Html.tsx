import React from 'react'

import type { InlineHtml } from '@/site/types'

type Props = {
  as?: React.ElementType
  html: InlineHtml
} & Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'dangerouslySetInnerHTML'>

/**
 * Renders short trusted inline markup (<strong>, <br>, <span class>) from our own
 * content files. Replaced by the Lexical rich-text renderer once content comes
 * from the CMS, so editor input is never injected as raw HTML.
 */
export function Html({ as: Tag = 'span', html, ...rest }: Props) {
  return <Tag {...rest} dangerouslySetInnerHTML={{ __html: html }} />
}
