import type { Block } from 'payload'
import { imageRef, linkItem } from './fields'

export const Highlights: Block = {
  slug: 'highlights',
  interfaceName: 'HighlightsBlock',
  labels: {
    singular: 'Highlights Section',
    plural: 'Highlights Sections',
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
      name: 'cards',
      type: 'array',
      required: true,
      fields: [
        imageRef('icon', 'Card Icon', true),
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
  ],
}

