import type { Block } from 'payload'
import { imageRef } from './fields'

export const MapsystemsIntro: Block = {
  slug: 'mapsystemsIntro',
  interfaceName: 'MapsystemsIntroBlock',
  labels: {
    singular: 'Mapsystems Intro',
    plural: 'Mapsystems Intro Sections',
  },
  fields: [
    imageRef('image', 'Featured Image', true),
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
      name: 'points',
      type: 'array',
      required: true,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
  ],
}

