import type { Block } from 'payload'
import { linkItem } from './fields'

export const TechStack: Block = {
  slug: 'techStack',
  interfaceName: 'TechStackBlock',
  labels: {
    singular: 'Tech Stack Section',
    plural: 'Tech Stack Sections',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      required: true,
    },
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
      name: 'rows',
      type: 'array',
      required: true,
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'items',
          type: 'text',
          hasMany: true,
          required: true,
        },
      ],
    },
  ],
}

