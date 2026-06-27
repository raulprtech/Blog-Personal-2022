import { englishField, portableTextField, stringArrayField, textField } from './localization'
const simpleText = (name, title, type = 'string') => ({ name, title, type })

export default {
  name: 'note',
  title: 'Note',
  type: 'document',
  fields: [
    simpleText('title', 'Title'),
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    },
    simpleText('summary', 'Summary', 'text'),
    { name: 'date', title: 'Date', type: 'date' },
    {
      name: 'image',
      title: 'Cover image',
      type: 'image',
      options: { hotspot: true },
    },
    simpleText('imageAlt', 'Image alt text'),
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [simpleText('href', 'URL')],
              },
            ],
          },
        },
        {
          name: 'imageBlock',
          title: 'Image',
          type: 'image',
          options: { hotspot: true },
          fields: [simpleText('alt', 'Alt text'), simpleText('caption', 'Caption')],
        },
        {
          name: 'codeBlock',
          title: 'Code block',
          type: 'object',
          fields: [simpleText('language', 'Language'), simpleText('code', 'Code', 'text')],
        },
      ],
    },
    simpleText('canonicalUrl', 'Canonical URL'),
    {
      name: 'authors',
      title: 'Authors / collaborators',
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
    { name: 'featured', title: 'Featured', type: 'boolean', initialValue: false },
    { name: 'orderRank', title: 'Order', type: 'number', initialValue: 100 },
    englishField([
      textField('title', 'Title'),
      textField('summary', 'Summary', 'text'),
      stringArrayField('tags', 'Tags'),
      portableTextField(),
      textField('canonicalUrl', 'Canonical URL'),
    ]),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'summary',
      media: 'image',
    },
  },
}
