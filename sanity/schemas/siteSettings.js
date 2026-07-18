const simpleText = (name, title, type = 'string') => ({ name, title, type })

const languageOptions = [
  { title: 'Spanish', value: 'es' },
  { title: 'English', value: 'en' },
]

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
  'pinterest',
  'feedly',
  'telegram',
  'researchgate',
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
      name: 'defaultLanguage',
      title: 'Default language',
      type: 'string',
      options: { list: languageOptions },
      initialValue: 'es',
    },
    {
      name: 'enabledLanguages',
      title: 'Enabled languages',
      type: 'array',
      of: [{ type: 'string', options: { list: languageOptions } }],
      initialValue: ['es', 'en'],
    },
    {
      name: 'logoImage',
      title: 'Site logo image',
      type: 'image',
      options: { hotspot: true },
      description:
        'Primary logo for the header, browser tabs, installed app icons and search engines. Square PNG recommended.',
    },
    simpleText('logoAlt', 'Logo alt text'),
    {
      name: 'faviconImage',
      title: 'Legacy favicon fallback',
      type: 'image',
      options: { hotspot: true },
      description: 'Optional fallback used only when the primary site logo is empty.',
    },
    {
      name: 'appleTouchIconImage',
      title: 'Legacy Apple icon fallback',
      type: 'image',
      options: { hotspot: true },
      description: 'Optional fallback used only when the primary site logo is empty.',
    },
    {
      name: 'socialBannerImage',
      title: 'Social/search preview image',
      type: 'image',
      options: { hotspot: true },
      description: 'Default image used when pages are shared or indexed as previews.',
    },
    simpleText('themeColor', 'Browser theme color'),
    simpleText('maskIconColor', 'Mask icon color'),
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
      name: 'navigationLinks',
      title: 'Header navigation',
      type: 'array',
      description: 'Main navigation links. The order here controls the order in the header.',
      of: [
        {
          type: 'object',
          fields: [
            simpleText('label', 'Label in Spanish'),
            simpleText('labelEn', 'Label in English'),
            simpleText('href', 'URL or path'),
            {
              name: 'visible',
              title: 'Visible',
              type: 'boolean',
              initialValue: true,
            },
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
