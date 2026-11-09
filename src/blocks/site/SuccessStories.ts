import type { Block } from 'payload'
import { imageRef, linkItem } from './fields'

export const SuccessStories: Block = {
  slug: 'successStories',
  interfaceName: 'SuccessStoriesBlock',
  labels: {
    singular: 'Success Stories',
    plural: 'Success Stories',
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

