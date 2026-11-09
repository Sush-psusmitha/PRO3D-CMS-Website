import type { Block } from 'payload'
import { imageRef, linkItem } from './fields'

export const Hero: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: {
    singular: 'Hero Section',
    plural: 'Hero Sections',
  },
  fields: [
    imageRef('background', 'Background Image', true),
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Main headline (supports inline HTML like <br>)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Subheadline / lead description (supports <strong>, <em>)',
      },
    },
    linkItem('primaryButton', 'Primary Button', true),
    linkItem('secondaryButton', 'Secondary Button (Optional)', false),
  ],
}

