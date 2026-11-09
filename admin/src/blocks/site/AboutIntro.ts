import type { Block } from 'payload'
import { imageFields, imageRef, linkItem } from './fields'

export const AboutIntro: Block = {
  slug: 'aboutIntro',
  interfaceName: 'AboutIntroBlock',
  labels: {
    singular: 'About Intro',
    plural: 'About Intro Sections',
  },
  fields: [
    linkItem('eyebrow', 'Eyebrow Link', true),
    {
      name: 'headline',
      type: 'textarea',
      required: true,
    },
    linkItem('button', 'CTA Button', true),
    {
      name: 'intro',
      type: 'group',
      fields: [
        imageRef('icon', 'Intro Icon', true),
        {
          name: 'text',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'suffix', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
    {
      name: 'media',
      type: 'array',
      fields: [
        imageRef('image', 'Card Image', true),
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
    {
      name: 'clientLogos',
      type: 'array',
      fields: imageFields,
    },
  ],
}

