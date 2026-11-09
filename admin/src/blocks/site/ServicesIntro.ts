import type { Block } from 'payload'
import { imageFields, imageRef } from './fields'

export const ServicesIntro: Block = {
  slug: 'servicesIntro',
  interfaceName: 'ServicesIntroBlock',
  labels: {
    singular: 'Services Intro',
    plural: 'Services Intro Sections',
  },
  fields: [
    imageRef('image', 'Hero/Intro Image', true),
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
      name: 'paragraphs',
      type: 'text',
      hasMany: true,
      required: true,
    },
    {
      name: 'stats',
      type: 'array',
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'suffix', type: 'text', required: true },
        { name: 'unit', type: 'text' },
        { name: 'label', type: 'text', required: true },
      ],
    },
    {
      name: 'contentLogos',
      type: 'array',
      fields: imageFields,
      admin: {
        description: 'Industry pages client logo marquee inside text column',
      },
    },
    {
      name: 'missionVision',
      type: 'group',
      fields: [
        { name: 'mission', type: 'textarea' },
        { name: 'vision', type: 'textarea' },
      ],
      admin: {
        description: 'About page mission and vision cards',
      },
    },
    {
      name: 'clientLogos',
      type: 'array',
      fields: imageFields,
      admin: {
        description: 'Client logo marquee at the bottom of the section',
      },
    },
  ],
}
