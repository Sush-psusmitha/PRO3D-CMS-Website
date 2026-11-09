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

export const CaseStudies: CollectionConfig<'case-studies'> = {
  slug: 'case-studies',
  labels: {
    singular: 'Case Study',
    plural: 'Case Studies',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    group: 'Portfolio & Case Studies',
    useAsTitle: 'title',
    defaultColumns: ['title', 'client', 'industry', 'path', 'updatedAt', '_status'],
    description: 'The 23 case study project breakdowns',
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data && data.slug) {
          const clean = data.slug.endsWith('.html') ? data.slug : `${data.slug}.html`
          data.path = clean.startsWith('case-studies/') ? clean : `case-studies/${clean}`
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
      label: 'Project / Case Study Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      label: 'Slug / File Name',
      admin: {
        position: 'sidebar',
        description: 'e.g. "3d-furniture-design.html"',
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
        description: 'e.g. "case-studies/3d-furniture-design.html"',
      },
    },
    {
      name: 'client',
      type: 'text',
      label: 'Client Name / Brand',
    },
    {
      name: 'industry',
      type: 'text',
      label: 'Industry Sector',
      admin: {
        description: 'e.g. Furniture, Architecture, Fashion, eCommerce',
      },
    },
    {
      name: 'relatedServices',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      label: 'Related Services',
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

