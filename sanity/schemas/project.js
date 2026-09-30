import { englishField, portableTextField, stringArrayField, textField } from './localization'
export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() },
    { name: 'description', title: 'Description', type: 'text', rows: 4 },
    {
      name: 'href',
      title: 'External website or existing link',
      type: 'string',
      description: 'Optional. Kept as a separate link when the project has its own page.',
    },
    {
      name: 'pageEnabled',
      title: 'Publish a project page on this site',
      type: 'boolean',
      initialValue: false,
      description: 'Creates /projects/your-slug when this project is published.',
    },
    {
      name: 'slug',
      title: 'Project page URL',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      description: 'Generate a unique slug with lowercase letters, numbers and hyphens.',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (!context.document?.pageEnabled) return true
          if (!value?.current) return 'Generate the URL before publishing the project page.'
          return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.current)
            ? true
            : 'Use lowercase letters, numbers and hyphens only.'
        }),
    },
    portableTextField('body', 'Project page content'),
    {
      name: 'links',
      title: 'Project page buttons',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'projectLink',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'href',
              title: 'URL or site path',
              type: 'string',
              validation: (Rule) =>
                Rule.required().uri({ allowRelative: true, scheme: ['http', 'https'] }),
            },
          ],
        },
      ],
    },
    { name: 'seoTitle', title: 'Page SEO title', type: 'string' },
    { name: 'seoDescription', title: 'Page SEO description', type: 'text', rows: 3 },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    { name: 'imageAlt', title: 'Image alt text', type: 'string' },
    { name: 'category', title: 'Category', type: 'string' },
    { name: 'status', title: 'Status', type: 'string' },
    { name: 'role', title: 'Role', type: 'string' },
    { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] },
    {
      name: 'collaborators',
      title: 'Collaborators',
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
      name: 'papers',
      title: 'Related papers',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'paper' }] }],
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
    { name: 'orderRank', title: 'Order rank', type: 'number' },
    {
      name: 'showInTimeline',
      title: 'Show in trajectory timeline',
      type: 'boolean',
      initialValue: false,
    },
    { name: 'timelineDate', title: 'Timeline date', type: 'date' },
    { name: 'timelineLabel', title: 'Timeline label', type: 'string' },
    { name: 'timelineCategory', title: 'Timeline category', type: 'string' },
    { name: 'timelineSummary', title: 'Timeline summary', type: 'text' },
    {
      name: 'talks',
      title: 'Related talks / public activity',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'talk' }] }],
    },
    englishField([
      textField('title', 'Title'),
      textField('description', 'Description', 'text'),
      textField('category', 'Category'),
      textField('status', 'Status'),
      textField('role', 'Role'),
      stringArrayField('tags', 'Tags'),
      portableTextField('body', 'Project page content'),
      textField('seoTitle', 'Page SEO title'),
      textField('seoDescription', 'Page SEO description', 'text'),
      textField('imageAlt', 'Image alt text'),
    ]),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'image' },
  },
}
