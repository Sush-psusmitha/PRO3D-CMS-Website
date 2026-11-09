import type { Block } from 'payload'
import { linkItem } from './fields'

export const Faq: Block = {
  slug: 'faq',
  interfaceName: 'FaqBlock',
  labels: {
    singular: 'FAQ Section',
    plural: 'FAQ Sections',
  },
  fields: [
    linkItem('eyebrow', 'Eyebrow', true),
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
  ],
}

