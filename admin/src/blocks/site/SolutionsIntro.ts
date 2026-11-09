import type { Block } from 'payload'
import { imageRef } from './fields'

export const SolutionsIntro: Block = {
  slug: 'solutionsIntro',
  interfaceName: 'SolutionsIntroBlock',
  labels: {
    singular: 'Solutions Intro',
    plural: 'Solutions Intro Sections',
  },
  fields: [
    imageRef('image', 'Hero Image', true),
    {
      name: 'breadcrumb',
      type: 'array',
      required: true,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text' },
      ],
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'features',
      type: 'text',
      hasMany: true,
      required: true,
    },
    {
      name: 'stats',
      type: 'array',
      required: true,
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
  ],
}

