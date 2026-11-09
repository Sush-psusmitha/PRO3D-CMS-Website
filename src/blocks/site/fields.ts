import type { Field, GroupField } from 'payload'

export const imageFields: Field[] = [
  { name: 'src', type: 'text', required: true },
  { name: 'alt', type: 'text', defaultValue: '' },
  { name: 'width', type: 'number' },
  { name: 'height', type: 'number' },
]

export const imageRef = (name = 'image', label?: string, required = false): GroupField => ({
  name,
  label: label || (name.charAt(0).toUpperCase() + name.slice(1)),
  type: 'group',
  fields: [
    { name: 'src', type: 'text', required },
    { name: 'alt', type: 'text', defaultValue: '' },
    { name: 'width', type: 'number' },
    { name: 'height', type: 'number' },
  ],
})

export const linkFields: Field[] = [
  { name: 'label', type: 'text', required: true },
  { name: 'href', type: 'text', required: true },
]

export const linkItem = (name = 'button', label?: string, required = false): GroupField => ({
  name,
  label: label || (name.charAt(0).toUpperCase() + name.slice(1)),
  type: 'group',
  fields: [
    { name: 'label', type: 'text', required },
    { name: 'href', type: 'text', required },
  ],
})

