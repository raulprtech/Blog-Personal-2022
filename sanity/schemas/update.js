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
