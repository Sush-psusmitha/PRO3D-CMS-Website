import type { Block } from 'payload'
import { imageRef, linkItem } from './fields'

export const BlogDetail: Block = {
  slug: 'blogDetail',
  interfaceName: 'BlogDetailBlock',
  labels: {
    singular: 'Blog Detail Article',
    plural: 'Blog Detail Articles',
  },
  fields: [
    imageRef('heroBg', 'Hero Background Image', true),
    imageRef('bannerImage', 'Banner Image', true),
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'text',
    },
    {
      name: 'author',
      type: 'group',
      fields: [
        { name: 'name', type: 'text', required: true },
        imageRef('avatar', 'Author Avatar', false),
        { name: 'bio', type: 'textarea', required: true },
        {
          name: 'social',
          type: 'array',
          fields: [
            { name: 'icon', type: 'text', required: true },
            { name: 'href', type: 'text', required: true },
            { name: 'label', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'publishDate',
      type: 'text',
      required: true,
    },
    {
      name: 'updatedDate',
      type: 'text',
    },
    {
      name: 'readTime',
      type: 'text',
    },
    {
      name: 'leadParagraph',
      type: 'textarea',
      required: true,
    },
    {
      name: 'secondaryParagraph',
      type: 'textarea',
    },
    {
      name: 'sections',
      type: 'array',
      required: true,
      fields: [
        { name: 'id', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        {
          name: 'paragraphs',
          type: 'text',
          hasMany: true,
        },
        {
          name: 'challenges',
          type: 'array',
          fields: [
            { name: 'id', type: 'text', required: true },
            { name: 'number', type: 'number', required: true },
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea', required: true },
            {
              name: 'solutionBullets',
              type: 'text',
              hasMany: true,
            },
          ],
        },
        {
          name: 'tools',
          type: 'array',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'role', type: 'text', required: true },
            { name: 'description', type: 'textarea', required: true },
            {
              name: 'bullets',
              type: 'text',
              hasMany: true,
            },
            { name: 'note', type: 'text' },
          ],
        },
        {
          name: 'points',
          type: 'text',
          hasMany: true,
        },
        {
          name: 'closingParagraphs',
          type: 'text',
          hasMany: true,
        },
      ],
    },
    {
      name: 'toc',
      type: 'array',
      required: true,
      fields: [
        { name: 'id', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
        { name: 'isSub', type: 'checkbox', defaultValue: false },
        { name: 'isActive', type: 'checkbox', defaultValue: false },
      ],
    },
    {
      name: 'recentPosts',
      type: 'array',
      required: true,
      fields: [
        { name: 'category', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
        { name: 'hasArrow', type: 'checkbox', defaultValue: false },
      ],
    },
    {
      name: 'sidebarPromo',
      type: 'group',
      fields: [
        { name: 'badge', type: 'text', required: true },
        imageRef('bgImage', 'Background Image', true),
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        linkItem('button', 'CTA Button', true),
      ],
    },
  ],
}
