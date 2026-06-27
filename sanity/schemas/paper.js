import { englishField, stringArrayField, textField } from './localization'
const simpleText = (name, title, type = 'string') => ({ name, title, type })

export default {
  name: 'paper',
  title: 'Paper',
  type: 'document',
  fields: [
    simpleText('title', 'Title'),
    simpleText('summary', 'Summary', 'text'),
    simpleText('venue', 'Venue'),
    { name: 'year', title: 'Year', type: 'number' },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: ['Published', 'Preprint', 'Under review', 'Draft'].map((value) => ({
          title: value,
          value,
        })),
      },
    },
    simpleText('href', 'Paper URL'),
    simpleText('codeHref', 'Code URL'),
    simpleText('doi', 'DOI'),
    {
      name: 'image',
      title: 'Cover image',
      type: 'image',
      options: { hotspot: true },
    },
    simpleText('imageAlt', 'Image alt text'),
    {
      name: 'authors',
      title: 'Collaborators / authors',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'collaborator' }] }],
    },
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
      name: 'ventures',
      title: 'Related ventures',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'venture' }] }],
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
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    },
    { name: 'featured', title: 'Featured', type: 'boolean', initialValue: false },
    { name: 'orderRank', title: 'Order', type: 'number', initialValue: 100 },
    englishField([
      textField('title', 'Title'),
      textField('summary', 'Summary', 'text'),
      textField('venue', 'Venue'),
      textField('status', 'Status'),
      textField('imageAlt', 'Image alt text'),
      stringArrayField('tags', 'Tags'),
    ]),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'venue',
      media: 'image',
    },
  },
}
