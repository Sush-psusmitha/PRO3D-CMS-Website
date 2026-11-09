import type { Block } from 'payload'
import { imageRef, linkItem } from './fields'

export const WhyChoose: Block = {
  slug: 'whyChoose',
  interfaceName: 'WhyChooseBlock',
  labels: {
    singular: 'Why Choose Section',
    plural: 'Why Choose Sections',
  },
  fields: [
    imageRef('background', 'Background Image', true),
    imageRef('image', 'Featured Image', true),
    {
      name: 'video',
      type: 'group',
      fields: [
        { name: 'src', type: 'text' },
        { name: 'poster', type: 'text' },
      ],
    },
    linkItem('eyebrow', 'Eyebrow', true),
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'features',
      type: 'array',
      required: true,
      fields: [
        { name: 'icon', type: 'text', required: true, admin: { description: 'FontAwesome icon class, e.g. fa-award' } },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
    linkItem('button', 'CTA Button', true),
  ],
}

