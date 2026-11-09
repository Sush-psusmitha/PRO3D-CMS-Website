import type { Block } from 'payload'
import { imageRef } from './fields'

export const ServicesContact: Block = {
  slug: 'servicesContact',
  interfaceName: 'ServicesContactBlock',
  labels: {
    singular: 'Services Contact Section',
    plural: 'Services Contact Sections',
  },
  fields: [
    imageRef('background', 'Background Image', true),
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
      name: 'cardIntro',
      type: 'textarea',
      required: true,
    },
    {
      name: 'countryCodes',
      type: 'array',
      required: true,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
      ],
    },
    {
      name: 'services',
      type: 'text',
      hasMany: true,
      required: true,
      admin: {
        description: 'Services checkboxes available on the form',
      },
    },
  ],
}

