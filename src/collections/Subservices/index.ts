import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { siteBlocks } from '../../blocks/site'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Subservices: CollectionConfig<'subservices'> = {
  slug: 'subservices',
  labels: {
    singular: 'Subservice',
    plural: 'Subservices',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    group: 'Services Catalog',
    useAsTitle: 'title',
    defaultColumns: ['title', 'parentService', 'path', 'updatedAt', '_status'],
    description: 'Subservices that belong under a parent pillar (e.g. /3d-modeling/product.html)',
  },
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        // Automatically construct the path from parentService + slug if needed
        if (data && data.parentService && data.slug) {
          try {
            const parent = await req.payload.findByID({
              collection: 'services',
              id: typeof data.parentService === 'object' ? data.parentService.id : data.parentService,
            })
            if (parent && parent.slug) {
              const cleanSlug = data.slug.endsWith('.html') ? data.slug : `${data.slug}.html`
              data.path = `${parent.slug}/${cleanSlug}`
            }
          } catch {
            // keep existing data.path
          }
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Subservice Name',
    },
    {
      name: 'parentService',
      type: 'relationship',
      relationTo: 'services',
      required: true,
      label: 'Parent Primary Service',
      admin: {
        description: 'Select the primary service pillar this subservice belongs to (e.g. 3D Modeling)',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      label: 'Subservice File/Slug',
      admin: {
        position: 'sidebar',
        description: 'e.g. "product.html" or "furniture.html"',
      },
    },
    {
      name: 'path',
      type: 'text',
      unique: true,
      index: true,
      label: 'Full Live URL Path',
      admin: {
        position: 'sidebar',
        description: 'Auto-constructed from parent service (e.g. "3d-modeling/product.html")',
      },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'Short Overview',
    },
    {
      name: 'icon',
      type: 'text',
      label: 'FontAwesome Icon Class',
      admin: {
        description: 'e.g. "fa-couch" or "fa-cube"',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Page Layout',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: siteBlocks,
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({ hasGenerateFn: true }),
            MetaImageField({ relationTo: 'media' }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}

