import { englishField, stringArrayField, textField } from './localization'
const simpleText = (name, title, type = 'string') => ({ name, title, type })

export default {
  name: 'credential',
  title: 'Credential',
  type: 'document',
  fields: [
    simpleText('title', 'Title'),
    simpleText('issuer', 'Issuer'),
    simpleText('summary', 'Summary', 'text'),
    simpleText('href', 'Credential URL'),
    simpleText('credentialCategory', 'Category'),
    simpleText('date', 'Date', 'date'),
    {
      name: 'image',
      title: 'Credential image',
      type: 'image',
      options: { hotspot: true },
    },
    simpleText('imageAlt', 'Image alt text'),
    {
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'relatedProjects',
      title: 'Related projects',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
    },
    {
      name: 'relatedResearchItems',
      title: 'Related research lines',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'researchItem' }] }],
    },
    { name: 'featured', title: 'Featured', type: 'boolean', initialValue: true },
    { name: 'orderRank', title: 'Order', type: 'number', initialValue: 100 },
    englishField([
      textField('title', 'Title'),
      textField('issuer', 'Issuer'),
      textField('summary', 'Summary', 'text'),
      textField('credentialCategory', 'Category'),
      textField('imageAlt', 'Image alt text'),
      stringArrayField('skills', 'Skills'),
    ]),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'issuer',
      media: 'image',
    },
  },
}
