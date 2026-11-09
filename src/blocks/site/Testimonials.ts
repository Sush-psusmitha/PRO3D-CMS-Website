import type { Block } from 'payload'
import { imageRef, linkItem } from './fields'

export const Testimonials: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  labels: {
    singular: 'Testimonials Section',
    plural: 'Testimonials Sections',
  },
  fields: [
    linkItem('eyebrow', 'Eyebrow', true),
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    linkItem('button', 'Button', true),
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        { name: 'role', type: 'text', required: true },
        { name: 'company', type: 'text', required: true },
        { name: 'quote', type: 'textarea', required: true },
        imageRef('avatar', 'Client Avatar', true),
        { name: 'rating', type: 'number', defaultValue: 5, required: true },
      ],
    },
  ],
}

