import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { getImageKit } from '../utilities/imagekit'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  folders: true,
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        if (req.file?.data && process.env.IMAGEKIT_PRIVATE_KEY) {
          try {
            const ik = getImageKit()
            if (ik) {
              const uploadRes = await ik.upload({
                file: req.file.data,
                fileName: req.file.name || 'upload',
                folder: '/pro3d',
                useUniqueFileName: true,
              })
              data.imagekitUrl = uploadRes.url
              data.imagekitFileId = uploadRes.fileId
              data.url = uploadRes.url
            }
          } catch (err) {
            req.payload.logger.error(`Error uploading to ImageKit: ${err}`)
          }
        }
        return data
      },
    ],
    afterRead: [
      ({ doc }) => {
        if (doc?.imagekitUrl) {
          doc.url = doc.imagekitUrl
          doc.thumbnailURL = `${doc.imagekitUrl}?tr=w-300,h-300,fo-auto`
          if (doc.sizes) {
            doc.sizes.thumbnail = { ...doc.sizes?.thumbnail, url: `${doc.imagekitUrl}?tr=w-300` }
            doc.sizes.square = { ...doc.sizes?.square, url: `${doc.imagekitUrl}?tr=w-500,h-500,fo-auto` }
            doc.sizes.small = { ...doc.sizes?.small, url: `${doc.imagekitUrl}?tr=w-600` }
            doc.sizes.medium = { ...doc.sizes?.medium, url: `${doc.imagekitUrl}?tr=w-900` }
            doc.sizes.large = { ...doc.sizes?.large, url: `${doc.imagekitUrl}?tr=w-1400` }
            doc.sizes.xlarge = { ...doc.sizes?.xlarge, url: `${doc.imagekitUrl}?tr=w-1920` }
            doc.sizes.og = { ...doc.sizes?.og, url: `${doc.imagekitUrl}?tr=w-1200,h-630,fo-auto` }
          }
        }
        return doc
      },
    ],
    afterDelete: [
      async ({ doc, req }) => {
        if (doc?.imagekitFileId && process.env.IMAGEKIT_PRIVATE_KEY) {
          try {
            const ik = getImageKit()
            if (ik) {
              await ik.deleteFile(doc.imagekitFileId as string)
              req.payload.logger.info(`Deleted file ${doc.imagekitFileId} from ImageKit`)
            }
          } catch (err) {
            req.payload.logger.error(`Error deleting from ImageKit: ${err}`)
          }
        }
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
    {
      name: 'imagekitUrl',
      type: 'text',
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'CDN URL on ImageKit',
      },
    },
    {
      name: 'imagekitFileId',
      type: 'text',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
  ],
  upload: {
    staticDir: path.resolve(dirname, '../../public/media'),
    adminThumbnail: ({ doc }) => {
      if (typeof doc?.imagekitUrl === 'string') {
        return `${doc.imagekitUrl}?tr=w-300,h-300,fo-auto`
      }
      return null
    },
    handlers: [
      (req, { doc }) => {
        const d = doc as Record<string, unknown>
        if (typeof d?.imagekitUrl === 'string') {
          return Response.redirect(d.imagekitUrl, 302)
        }
        return null as unknown as Response
      },
    ],
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
}
