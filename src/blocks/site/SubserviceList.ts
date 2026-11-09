import type { Block } from 'payload'
import { imageRef, linkItem } from './fields'

export const SubserviceList: Block = {
  slug: 'subserviceList',
  interfaceName: 'SubserviceListBlock',
  labels: {
    singular: 'Subservice List',
    plural: 'Subservice Lists',
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
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'text', type: 'textarea', required: true },
        imageRef('image', 'Main Image', true),
        imageRef('thumb', 'Thumbnail', true),
      ],
    },
    linkItem('button', 'Button', true),
  ],
}

