export const textField = (name, title, type = 'string') => ({ name, title, type })

export const stringArrayField = (name, title) => ({
  name,
  title,
  type: 'array',
  of: [{ type: 'string' }],
})

export const englishField = (fields, title = 'English version') => ({
  name: 'english',
  title,
  type: 'object',
  options: { collapsible: true, collapsed: true },
  description: 'Optional English copy. Spanish remains the default public language for now.',
  fields,
})

export const portableTextField = (name = 'body', title = 'Body') => ({
  name,
  title,
  type: 'array',
  of: [
    {
      type: 'block',
      marks: {
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [textField('href', 'URL')],
          },
        ],
      },
    },
    {
      name: 'imageBlock',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [textField('alt', 'Alt text'), textField('caption', 'Caption')],
    },
    {
      name: 'codeBlock',
      title: 'Code block',
      type: 'object',
      fields: [textField('language', 'Language'), textField('code', 'Code', 'text')],
    },
  ],
})
