import type { Block } from 'payload'
import { imageRef, linkItem } from './fields'

export const ServiceSuccessStories: Block = {
  slug: 'serviceSuccessStories',
  interfaceName: 'ServiceSuccessStoriesBlock',
  labels: {
    singular: 'Service Success Stories',
    plural: 'Service Success Stories Sections',
  },
  fields: [
    linkItem('eyebrow', 'Eyebrow', true),
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'stories',
      type: 'array',
      required: true,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
        imageRef('image', 'Story Image', true),
        {
          name: 'tags',
          type: 'text',
          hasMany: true,
          required: true,
        },
      ],
    },
  ],
}

