import type { Block } from 'payload'
import { imageRef, linkItem } from './fields'

export const OurApproach: Block = {
  slug: 'ourApproach',
  interfaceName: 'OurApproachBlock',
  labels: {
    singular: 'Our Approach Section',
    plural: 'Our Approach Sections',
  },
  fields: [
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
    imageRef('image', 'Featured Image', true),
    linkItem('button', 'CTA Button', true),
    {
      name: 'phases',
      type: 'array',
      required: true,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'duration', type: 'text', required: true },
        { name: 'deliverable', type: 'text', required: true },
      ],
    },
  ],
}

