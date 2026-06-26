import { englishField, stringArrayField, textField } from './localization'
export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() },
    { name: 'description', title: 'Description', type: 'text', rows: 4 },
    { name: 'href', title: 'Link or path', type: 'string' },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
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
    { name: 'orderRank', title: 'Order rank', type: 'number' },
    englishField([
      textField('title', 'Title'),
      textField('description', 'Description', 'text'),
      textField('category', 'Category'),
      textField('status', 'Status'),
      textField('role', 'Role'),
      stringArrayField('tags', 'Tags'),
    ]),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'image' },
  },
}
