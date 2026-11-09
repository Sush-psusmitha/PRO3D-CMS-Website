import type { Block } from 'payload'
import { imageRef, linkItem } from './fields'

export const ServicesGrid: Block = {
  slug: 'servicesGrid',
  interfaceName: 'ServicesGridBlock',
  labels: {
    singular: 'Services Grid',
    plural: 'Services Grids',
  },
  fields: [
    linkItem('eyebrow', 'Eyebrow', true),
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'cards',
      type: 'array',
      required: true,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'href', type: 'text', required: true },
        imageRef('image', 'Card Image', true),
        {
          name: 'theme',
          type: 'select',
          defaultValue: 'dark',
          options: [
            { label: 'Dark', value: 'dark' },
            { label: 'Light', value: 'light' },
          ],
        },
        {
          name: 'contentPosition',
          type: 'select',
          defaultValue: 'bottom',
          options: [
            { label: 'Top', value: 'top' },
            { label: 'Bottom', value: 'bottom' },
          ],
        },
      ],
    },
  ],
}

