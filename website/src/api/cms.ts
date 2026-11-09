import type { SitePage } from '@/site/types'
import { getPage as getStaticPage, pages as staticPages } from '@/content/pages'

const CMS_URL = process.env.NEXT_PUBLIC_CMS_API_URL || 'http://localhost:3001'

interface PayloadResponse<T = any> {
  docs: T[]
  totalDocs: number
}

/**
 * REST API client that connects the website frontend to the admin CMS backend.
 * Performs CRUD read and write operations over HTTP.
 */
export const cmsApi = {
  /**
   * Fetches a page document by its exact URL path (e.g. "3d-modeling.html", "3d-modeling/product.html", or "").
   * Queries Services, Subservices, Case Studies, and Company Pages collections.
   */
  async getPageByPath(queryPath: string): Promise<SitePage | null> {
    const encodedPath = encodeURIComponent(queryPath)

    // Determine target collections by path pattern
    let collections: string[] = ['pages']
    if (queryPath.startsWith('case-studies/')) {
      collections = ['case-studies', 'pages']
    } else if (queryPath.includes('/')) {
      collections = ['subservices', 'pages']
    } else if (queryPath.endsWith('.html') && queryPath !== 'about.html' && queryPath !== 'solutions.html') {
      collections = ['services', 'pages']
    } else {
      collections = ['pages', 'services']
    }

    for (const col of collections) {
      try {
        const url = `${CMS_URL}/api/${col}?where[path][equals]=${encodedPath}&draft=false&limit=1`
        const res = await fetch(url, {
          next: { revalidate: 60, tags: [col, queryPath || 'home'] },
          headers: { 'Content-Type': 'application/json' },
        })

        if (res.ok) {
          const data: PayloadResponse = await res.json()
          if (data.docs && data.docs.length > 0) {
            const doc = data.docs[0]
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
        // Silently continue to next collection or fallback
      }
    }

    // Graceful fallback to static data if CMS is unreachable or page not in CMS
    return getStaticPage(queryPath) ?? null
  },

  /**
   * Retrieves all live URL paths across all collections for static generation (SSG).
   */
  async getAllPaths(): Promise<string[]> {
    const collections = ['pages', 'services', 'subservices', 'case-studies']
    const allPaths: string[] = []

    for (const col of collections) {
      try {
        const res = await fetch(`${CMS_URL}/api/${col}?limit=1000&select[path]=true`, {
          next: { revalidate: 300, tags: ['routes'] },
        })
        if (res.ok) {
          const data: PayloadResponse = await res.json()
          data.docs.forEach((doc) => {
            if (doc.path) allPaths.push(doc.path)
          })
        }
      } catch {
        // Silently continue
      }
    }

    if (allPaths.length > 0) {
      return Array.from(new Set(allPaths))
    }

    return staticPages.filter((p) => p.path).map((p) => p.path)
  },

  /**
   * Submit lead / contact / quote form to CMS form-submissions endpoint.
   */
  async submitForm(formSlug: string, submissionData: Record<string, any>) {
    try {
      const res = await fetch(`${CMS_URL}/api/form-submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: formSlug,
          submissionData: Object.entries(submissionData).map(([field, value]) => ({
            field,
            value: String(value),
          })),
        }),
      })
      return res.ok
    } catch {
      return false
    }
  },
}

