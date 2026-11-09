import type { Block } from 'payload'
import { imageRef, linkItem } from './fields'

export const PortfolioCarousel: Block = {
  slug: 'portfolioCarousel',
  interfaceName: 'PortfolioCarouselBlock',
  labels: {
    singular: 'Portfolio Carousel',
    plural: 'Portfolio Carousels',
  },
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'dark',
      options: [
        { label: 'Dark', value: 'dark' },
        { label: 'Light', value: 'light' },
      ],
    },
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
    imageRef('background', 'Background (Optional)', false),
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
        imageRef('image', 'Portfolio Image', true),
      ],
    },
  ],
}

