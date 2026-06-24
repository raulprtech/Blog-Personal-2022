const simpleText = (name, title, type = 'string') => ({ name, title, type })

export default {
  name: 'venture',
  title: 'Venture',
  type: 'document',
  fields: [
    simpleText('title', 'Title'),
    simpleText('description', 'Description', 'text'),
    simpleText('href', 'Website or path'),
    simpleText('category', 'Category'),
    simpleText('status', 'Status'),
    simpleText('role', 'Role'),
    {
      name: 'image',
      title: 'Image or logo',
      type: 'image',
      options: { hotspot: true },
    },
    simpleText('imageAlt', 'Image alt text'),
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
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    },
    { name: 'featured', title: 'Featured', type: 'boolean', initialValue: false },
    { name: 'orderRank', title: 'Order', type: 'number', initialValue: 100 },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
  },
}
