import { englishField, textField } from './localization'
export default {
  name: 'trajectoryItem',
  title: 'Trajectory item',
  type: 'document',
  fields: [
    {
      name: 'period',
      title: 'Period label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    { name: 'startDate', title: 'Start date', type: 'date' },
    { name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() },
    { name: 'organization', title: 'Organization', type: 'string' },
    { name: 'category', title: 'Category', type: 'string' },
    { name: 'summary', title: 'Summary', type: 'text', rows: 4 },
    { name: 'href', title: 'Link or path', type: 'string' },
    { name: 'featured', title: 'Featured', type: 'boolean', initialValue: false },
    englishField([
      textField('period', 'Period label'),
      textField('title', 'Title'),
      textField('organization', 'Organization'),
      textField('category', 'Category'),
      textField('summary', 'Summary', 'text'),
    ]),
  ],
  preview: {
    select: { title: 'title', subtitle: 'period' },
  },
}
