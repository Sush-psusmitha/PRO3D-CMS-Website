import type { Block } from 'payload'
import { imageRef, linkItem } from './fields'

export const Verticals: Block = {
  slug: 'verticals',
  interfaceName: 'VerticalsBlock',
  labels: {
    singular: 'Industry Verticals',
    plural: 'Industry Verticals',
  },
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'dark',
      options: [
        { label: 'Dark', value: 'dark' },
        { label: 'Light', value: 'light' },
      ],
    },
    linkItem('eyebrow', 'Eyebrow', true),
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    imageRef('background', 'Background (Optional)', false),
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        { name: 'label', type: 'text', required: true },
        imageRef('image', 'Industry Image', true),
        { name: 'href', type: 'text' },
      ],
    },
  ],
}

