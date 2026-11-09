import type { Block } from 'payload'
import { imageRef, linkItem } from './fields'

export const IndustriesWhyChoose: Block = {
  slug: 'industriesWhyChoose',
  interfaceName: 'IndustriesWhyChooseBlock',
  labels: {
    singular: 'Industries Why Choose',
    plural: 'Industries Why Choose Sections',
  },
  fields: [
    imageRef('background', 'Background Image', true),
    linkItem('eyebrow', 'Eyebrow', true),
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    linkItem('button', 'CTA Button', true),
    {
      name: 'cards',
      type: 'array',
      required: true,
      fields: [
        { name: 'icon', type: 'text', required: true, admin: { description: 'FontAwesome icon class' } },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
  ],
}

