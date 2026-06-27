import { englishField, textField } from './localization'
export default {
  name: 'update',
  title: 'Update',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() },
    { name: 'date', title: 'Date', type: 'date', validation: (Rule) => Rule.required() },
    { name: 'type', title: 'Type', type: 'string' },
    { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
    { name: 'summary', title: 'Summary', type: 'text', rows: 4 },
    { name: 'href', title: 'Link or path', type: 'string' },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    { name: 'accent', title: 'Tailwind accent gradient', type: 'string' },
    { name: 'featured', title: 'Featured', type: 'boolean', initialValue: false },
    {
      name: 'researchItems',
      title: 'Related research lines',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'researchItem' }] }],
    },
    {
      name: 'projects',
      title: 'Related projects',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
    },
    {
      name: 'papers',
      title: 'Related papers',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'paper' }] }],
    },
    {
      name: 'credentials',
      title: 'Related credentials / education',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'credential' }] }],
    },
    {
      name: 'resources',
      title: 'Related resources',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'resource' }] }],
    },
    {
      name: 'trajectoryItems',
      title: 'Related trajectory / education items',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'trajectoryItem' }] }],
    },
    {
      name: 'ventures',
      title: 'Related ventures',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'venture' }] }],
    },
    {
      name: 'talks',
      title: 'Related talks / public activity',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'talk' }] }],
    },
    englishField([
      textField('title', 'Title'),
      textField('type', 'Type'),
      textField('eyebrow', 'Eyebrow'),
      textField('summary', 'Summary', 'text'),
    ]),
  ],
  preview: {
    select: { title: 'title', subtitle: 'eyebrow', media: 'image' },
  },
}
