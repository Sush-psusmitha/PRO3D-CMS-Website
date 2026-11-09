import type { Block } from 'payload'
import { imageRef, linkItem } from './fields'

export const LatestBlogs: Block = {
  slug: 'latestBlogs',
  interfaceName: 'LatestBlogsBlock',
  labels: {
    singular: 'Latest Blogs',
    plural: 'Latest Blogs Sections',
  },
  fields: [
    linkItem('eyebrow', 'Eyebrow', true),
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    linkItem('button', 'Button', true),
    {
      name: 'posts',
      type: 'array',
      required: true,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
        imageRef('image', 'Post Image', true),
        { name: 'author', type: 'text', required: true },
        { name: 'date', type: 'text', required: true },
      ],
    },
  ],
}

