import { englishField, stringArrayField, textField } from './localization'
export default {
  name: 'resource',
  title: 'Resource',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() },
    { name: 'type', title: 'Type', type: 'string' },
    { name: 'source', title: 'Source', type: 'string' },
    { name: 'summary', title: 'Summary', type: 'text', rows: 4 },
    { name: 'href', title: 'Link or path', type: 'string' },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'orderRank', title: 'Order rank', type: 'number' },
    englishField([
      textField('title', 'Title'),
      textField('type', 'Type'),
      textField('source', 'Source'),
      textField('summary', 'Summary', 'text'),
      stringArrayField('tags', 'Tags'),
    ]),
  ],
  preview: {
    select: { title: 'title', subtitle: 'source', media: 'image' },
  },
}
