const simpleText = (name, title, type = 'string') => ({ name, title, type })

export default {
  name: 'researchItem',
  title: 'Research item',
  type: 'document',
  fields: [
    simpleText('title', 'Title'),
    simpleText('description', 'Description', 'text'),
    simpleText('href', 'Link URL'),
    simpleText('linkLabel', 'Link label'),
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    },
    simpleText('imageAlt', 'Image alt text'),
    {
      name: 'orderRank',
      title: 'Order',
      type: 'number',
      initialValue: 100,
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'image',
    },
  },
}
