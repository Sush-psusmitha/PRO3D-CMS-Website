import type { Block } from 'payload'
import { imageRef, linkItem } from './fields'

export const CtaHome: Block = {
  slug: 'ctaHome',
  interfaceName: 'CtaHomeBlock',
  labels: {
    singular: 'Home CTA Section',
    plural: 'Home CTA Sections',
  },
  fields: [
    imageRef('background', 'Background Image', true),
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
    linkItem('button', 'CTA Button', true),
    {
      name: 'card',
      type: 'group',
      fields: [
        imageRef('image', 'Card Image', true),
        { name: 'eyebrow', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
  ],
}

