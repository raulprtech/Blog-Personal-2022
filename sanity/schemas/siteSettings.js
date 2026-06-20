const simpleText = (name, title, type = 'string') => ({ name, title, type })

const socialKinds = [
  'mail',
  'linkedin',
  'github',
  'twitter',
  'youtube',
  'rss',
  'instagram',
  'facebook',
  'whatsapp',
  'platzi',
  'pinterest',
  'feedly',
  'telegram',
]

export default {
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    simpleText('title', 'Site title'),
    simpleText('author', 'Author'),
    simpleText('headerTitle', 'Header title'),
    {
      name: 'logoImage',
      title: 'Header logo image',
      type: 'image',
      options: { hotspot: true },
    },
    simpleText('logoAlt', 'Logo alt text'),
    simpleText('cvLabel', 'CV button label'),
    simpleText('cvHref', 'CV fallback URL'),
    {
      name: 'cvFile',
      title: 'CV file',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    },
    simpleText('footerCredit', 'Footer credit text'),
    {
      name: 'socialLinks',
      title: 'Footer social links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'kind',
              title: 'Icon kind',
              type: 'string',
              options: {
                list: socialKinds.map((kind) => ({ title: kind, value: kind })),
              },
            },
            simpleText('label', 'Label'),
            simpleText('href', 'URL'),
            {
              name: 'image',
              title: 'Custom icon image',
              type: 'image',
              options: { hotspot: true },
            },
            simpleText('imageAlt', 'Custom icon alt text'),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'href',
            },
          },
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Site settings',
        subtitle: 'Header, footer, socials and CV',
      }
    },
  },
}
