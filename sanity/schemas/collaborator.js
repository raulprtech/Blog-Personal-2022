import { englishField, textField } from './localization'
const simpleText = (name, title, type = 'string') => ({ name, title, type })

export default {
  name: 'collaborator',
  title: 'Collaborator',
  type: 'document',
  fields: [
    simpleText('name', 'Name'),
    simpleText('role', 'Role'),
    simpleText('affiliation', 'Affiliation'),
    simpleText('bio', 'Short bio', 'text'),
    simpleText('href', 'Profile URL'),
    {
      name: 'image',
      title: 'Photo or avatar',
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
    englishField([
      textField('name', 'Name'),
      textField('role', 'Role'),
      textField('affiliation', 'Affiliation'),
      textField('bio', 'Short bio', 'text'),
      textField('imageAlt', 'Image alt text'),
    ]),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'affiliation',
      media: 'image',
    },
  },
}
