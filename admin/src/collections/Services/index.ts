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

export const Services: CollectionConfig<'services'> = {
  slug: 'services',
  labels: {
    singular: 'Primary Service',
    plural: 'Primary Services',
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
    defaultColumns: ['title', 'path', 'updatedAt', '_status'],
    description: 'The 12 primary service pillar pages (e.g. 3D Modeling, 3D Rendering, Floor Plan Design)',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Service Name',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      label: 'Service Slug',
      admin: {
        position: 'sidebar',
        description: 'Base slug without .html (e.g. "3d-modeling" or "3d-rendering")',
      },
    },
    {
      name: 'path',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'Live URL Path',
      admin: {
        position: 'sidebar',
        description: 'Exact live URL (e.g. "3d-modeling.html")',
      },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'Short Overview',
      admin: {
        description: 'Brief description shown in mega menus and cards',
      },
    },
    {
      name: 'icon',
      type: 'text',
      label: 'FontAwesome Icon Class',
      admin: {
        description: 'e.g. "fa-cube" or "fa-building"',
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

