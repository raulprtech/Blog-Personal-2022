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
    { name: 'orderRank', title: 'Order rank', type: 'number' },
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'image' },
  },
}
