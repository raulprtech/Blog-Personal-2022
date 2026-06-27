import { englishField, stringArrayField, textField } from './localization'
const simpleText = (name, title, type = 'string') => ({ name, title, type })

const refArray = (name, title, type) => ({
  name,
  title,
  type: 'array',
  of: [{ type: 'reference', to: [{ type }] }],
})

const timelineFields = [
  {
    name: 'showInTimeline',
    title: 'Show in trajectory timeline',
    type: 'boolean',
    initialValue: true,
  },
  simpleText('timelineDate', 'Timeline date', 'date'),
  simpleText('timelineLabel', 'Timeline label'),
  simpleText('timelineCategory', 'Timeline category'),
  simpleText('timelineSummary', 'Timeline summary', 'text'),
]

export default {
  name: 'talk',
  title: 'Talk / public activity',
  type: 'document',
  fields: [
    simpleText('title', 'Title'),
    simpleText('type', 'Type'),
    simpleText('date', 'Date', 'date'),
    simpleText('event', 'Event'),
    simpleText('organization', 'Organization'),
    simpleText('location', 'Location / modality'),
    simpleText('summary', 'Summary', 'text'),
    simpleText('href', 'Context URL or path'),
    simpleText('slidesHref', 'Slides URL'),
    simpleText('videoHref', 'Video URL'),
    simpleText('repoHref', 'Repository URL'),
    simpleText('status', 'Status'),
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    },
    simpleText('imageAlt', 'Image alt text'),
    { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] },
    refArray('collaborators', 'Collaborators', 'collaborator'),
    refArray('researchItems', 'Related research lines', 'researchItem'),
    refArray('projects', 'Related projects', 'project'),
    refArray('papers', 'Related papers', 'paper'),
    refArray('credentials', 'Related credentials / education', 'credential'),
    refArray('resources', 'Related resources', 'resource'),
    refArray('trajectoryItems', 'Related trajectory / education items', 'trajectoryItem'),
    refArray('ventures', 'Related ventures', 'venture'),
    { name: 'featured', title: 'Featured', type: 'boolean', initialValue: false },
    { name: 'orderRank', title: 'Order', type: 'number', initialValue: 100 },
    ...timelineFields,
    englishField([
      textField('title', 'Title'),
      textField('type', 'Type'),
      textField('event', 'Event'),
      textField('organization', 'Organization'),
      textField('location', 'Location / modality'),
      textField('summary', 'Summary', 'text'),
      textField('status', 'Status'),
      textField('imageAlt', 'Image alt text'),
      stringArrayField('tags', 'Tags'),
      textField('timelineLabel', 'Timeline label'),
      textField('timelineCategory', 'Timeline category'),
      textField('timelineSummary', 'Timeline summary', 'text'),
    ]),
  ],
  preview: {
    select: { title: 'title', subtitle: 'event', media: 'image' },
  },
}
