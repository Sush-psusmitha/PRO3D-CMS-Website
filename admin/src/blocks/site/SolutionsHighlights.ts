import type { Block } from 'payload'
import { imageRef, linkItem } from './fields'

export const SolutionsHighlights: Block = {
  slug: 'solutionsHighlights',
  interfaceName: 'SolutionsHighlightsBlock',
  labels: {
    singular: 'Solutions Highlights',
    plural: 'Solutions Highlights Sections',
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
    linkItem('button', 'CTA Button', true),
    imageRef('image', 'Featured Image', true),
  ],
}

