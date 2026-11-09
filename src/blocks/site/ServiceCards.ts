import type { Block } from 'payload'
import { imageRef, linkItem } from './fields'

export const ServiceCards: Block = {
  slug: 'serviceCards',
  interfaceName: 'ServiceCardsBlock',
  labels: {
    singular: 'Service Cards',
    plural: 'Service Cards Sections',
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
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'href', type: 'text', required: true },
        imageRef('image', 'Card Image', true),
      ],
    },
  ],
}

