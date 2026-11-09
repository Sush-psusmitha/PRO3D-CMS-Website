import { getPayload } from 'payload'
import config from '@/payload.config'
import type { SitePage } from '@/site/types'
import { getPage as getStaticPage } from '@/content/pages'

/**
 * Fetches a page from Payload CMS by its exact URL path.
 * Checks across collections: Subservices, Services, CaseStudies, and Company Pages.
 * If not found in the CMS, gracefully falls back to static content mockups.
 */
export async function getPageFromCMS(queryPath: string): Promise<SitePage | null> {
  try {
    const payload = await getPayload({ config })

    // Determine collections priority based on URL pattern
    let collectionsToCheck: Array<'subservices' | 'services' | 'case-studies' | 'pages'> = ['pages']

    if (queryPath.startsWith('case-studies/')) {
      collectionsToCheck = ['case-studies', 'pages']
    } else if (queryPath.includes('/')) {
      collectionsToCheck = ['subservices', 'pages']
    } else if (queryPath.endsWith('.html') && queryPath !== 'about.html' && queryPath !== 'solutions.html') {
      collectionsToCheck = ['services', 'pages']
    } else {
      collectionsToCheck = ['pages', 'services']
    }

    for (const col of collectionsToCheck) {
      const result = await payload.find({
        collection: col,
        where: { path: { equals: queryPath } },
        limit: 1,
        draft: false,
      })

      if (result.docs.length > 0) {
        const doc = result.docs[0] as any
        const metaImage = doc.meta?.image
        let imageUrl: string | undefined

        if (typeof metaImage === 'string') {
          imageUrl = metaImage
        } else if (metaImage && typeof metaImage === 'object' && 'url' in metaImage) {
          imageUrl = metaImage.url
        }

        return {
          path: doc.path ?? queryPath,
          meta: {
            title: doc.meta?.title || doc.title,
            description: doc.meta?.description || '',
            keywords: doc.meta?.keywords,
            image: imageUrl,
          },
          layout: (doc.layout || []) as any,
        }
      }
    }
  } catch (err) {
    console.warn(`[getPageFromCMS] Error querying path "${queryPath}", falling back to static file:`, err)
  }

  return getStaticPage(queryPath) ?? null
}
