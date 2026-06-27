import { englishField, textField } from './localization'
const simpleText = (name, title, type = 'string') => ({ name, title, type })

const imageFields = [
  {
    name: 'image',
    title: 'Image',
    type: 'image',
    options: { hotspot: true },
  },
  simpleText('imageAlt', 'Image alt text'),
]

export default {
  name: 'pageContent',
  title: 'Page content',
  type: 'document',
  fields: [
    simpleText('slug', 'Slug'),
    simpleText('seoTitle', 'SEO title'),
    simpleText('seoDescription', 'SEO description', 'text'),
    simpleText('eyebrow', 'Eyebrow'),
    simpleText('title', 'Title'),
    simpleText('description', 'Description', 'text'),
    ...imageFields,
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
    },
    simpleText('featuredEyebrow', 'Featured section eyebrow'),
    {
      name: 'announcementBanner',
      title: 'Announcement banner',
      type: 'object',
      fields: [
        { name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: false },
        simpleText('title', 'Title'),
        simpleText('href', 'Link or path'),
        simpleText('bgColor', 'Background color key'),
        simpleText('emoji', 'Emoji'),
        ...imageFields,
      ],
    },
    {
      name: 'hero',
      title: 'Home hero',
      type: 'object',
      fields: [
        simpleText('eyebrow', 'Eyebrow'),
        simpleText('title', 'Title'),
        simpleText('description', 'Description', 'text'),
        simpleText('primaryCtaLabel', 'Primary CTA label'),
        simpleText('primaryCtaHref', 'Primary CTA href'),
        simpleText('secondaryCtaLabel', 'Secondary CTA label'),
        simpleText('secondaryCtaHref', 'Secondary CTA href'),
        {
          name: 'focusAreas',
          title: 'Focus areas',
          type: 'array',
          of: [{ type: 'string' }],
        },
        simpleText('visualEyebrow', 'Visual eyebrow'),
        simpleText('visualTitle', 'Visual title'),
        {
          name: 'visualImage',
          title: 'Visual image',
          type: 'image',
          options: { hotspot: true },
        },
        simpleText('visualImageAlt', 'Visual image alt text'),
        {
          name: 'stats',
          title: 'Stats',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [simpleText('value', 'Value'), simpleText('label', 'Label')],
            },
          ],
        },
      ],
    },
    {
      name: 'newsletterCta',
      title: 'Newsletter CTA',
      type: 'object',
      fields: [
        { name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true },
        simpleText('eyebrow', 'Eyebrow'),
        simpleText('title', 'Title'),
        simpleText('description', 'Description', 'text'),
        simpleText('primaryCtaLabel', 'Primary CTA label'),
        simpleText('primaryCtaHref', 'Primary CTA href'),
        simpleText('secondaryCtaLabel', 'Secondary CTA label'),
        simpleText('secondaryCtaHref', 'Secondary CTA href'),
        ...imageFields,
      ],
    },
    {
      name: 'sections',
      title: 'Home sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            simpleText('key', 'Key'),
            simpleText('eyebrow', 'Eyebrow'),
            simpleText('title', 'Title'),
            simpleText('description', 'Description', 'text'),
            simpleText('hrefLabel', 'Link label'),
            ...imageFields,
          ],
        },
      ],
    },
    {
      name: 'cards',
      title: 'Legacy cards fallback',
      type: 'array',
      hidden: true,
      of: [
        {
          type: 'object',
          fields: [
            simpleText('name', 'Name'),
            simpleText('description', 'Description', 'text'),
            ...imageFields,
          ],
        },
      ],
    },
    {
      name: 'summaryStats',
      title: 'Summary stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [simpleText('value', 'Value'), simpleText('label', 'Label')],
        },
      ],
    },
    {
      name: 'bodySections',
      title: 'Body sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            simpleText('eyebrow', 'Eyebrow'),
            simpleText('heading', 'Heading'),
            simpleText('text', 'Text (Markdown)', 'text'),
            simpleText('href', 'Link or path'),
            simpleText('linkLabel', 'Link label'),
          ],
        },
      ],
    },
    {
      name: 'skillGroups',
      title: 'About skill groups',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            simpleText('title', 'Title'),
            simpleText('description', 'Description', 'text'),
            {
              name: 'skills',
              title: 'Skills',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    simpleText('name', 'Name'),
                    simpleText('iconKind', 'Icon kind'),
                    {
                      name: 'icon',
                      title: 'Custom icon',
                      type: 'image',
                      options: { hotspot: true },
                    },
                    simpleText('imageAlt', 'Custom icon alt text'),
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'linkPage',
      title: 'Link page (/me)',
      type: 'object',
      fields: [
        simpleText('handle', 'Handle'),
        simpleText('bio', 'Bio', 'text'),
        {
          name: 'avatar',
          title: 'Avatar',
          type: 'image',
          options: { hotspot: true },
        },
        simpleText('imageAlt', 'Avatar alt text'),
        {
          name: 'socialLinks',
          title: 'Social links for /me',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                simpleText('kind', 'Icon kind'),
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
            },
          ],
        },
        {
          name: 'links',
          title: 'Link buttons',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                simpleText('title', 'Title'),
                simpleText('href', 'URL or path'),
                simpleText('description', 'Description', 'text'),
                simpleText('emoji', 'Icon / short marker'),
                simpleText('bgColor', 'Color key'),
                { name: 'featured', title: 'Featured', type: 'boolean', initialValue: false },
                ...imageFields,
              ],
            },
          ],
        },
      ],
    },
    simpleText('occupation', 'Occupation'),
    {
      name: 'profileCard',
      title: 'About profile card',
      type: 'object',
      fields: [
        ...imageFields,
        simpleText('affiliation', 'Affiliation'),
        simpleText('cvNote', 'CV note (Markdown)', 'text'),
      ],
    },
    englishField([
      textField('seoTitle', 'SEO title'),
      textField('seoDescription', 'SEO description', 'text'),
      textField('eyebrow', 'Eyebrow'),
      textField('title', 'Title'),
      textField('description', 'Description', 'text'),
      textField('featuredEyebrow', 'Featured section eyebrow'),
      {
        name: 'skillGroups',
        title: 'About skill groups',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              textField('title', 'Title'),
              textField('description', 'Description', 'text'),
              {
                name: 'skills',
                title: 'Skills',
                type: 'array',
                of: [
                  {
                    type: 'object',
                    fields: [
                      textField('name', 'Name'),
                      textField('imageAlt', 'Custom icon alt text'),
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'linkPage',
        title: 'Link page (/me)',
        type: 'object',
        fields: [
          textField('handle', 'Handle'),
          textField('bio', 'Bio', 'text'),
          textField('imageAlt', 'Avatar alt text'),
          {
            name: 'socialLinks',
            title: 'Social links for /me',
            type: 'array',
            of: [
              {
                type: 'object',
                fields: [
                  textField('label', 'Label'),
                  textField('imageAlt', 'Custom icon alt text'),
                ],
              },
            ],
          },
          {
            name: 'links',
            title: 'Link buttons',
            type: 'array',
            of: [
              {
                type: 'object',
                fields: [
                  textField('title', 'Title'),
                  textField('description', 'Description', 'text'),
                  textField('emoji', 'Icon / short marker'),
                ],
              },
            ],
          },
        ],
      },
      textField('occupation', 'Occupation'),
      {
        name: 'profileCard',
        title: 'About profile card',
        type: 'object',
        fields: [
          textField('imageAlt', 'Image alt text'),
          textField('affiliation', 'Affiliation'),
          textField('cvNote', 'CV note (Markdown)', 'text'),
        ],
      },
      {
        name: 'hero',
        title: 'Home hero',
        type: 'object',
        fields: [
          textField('eyebrow', 'Eyebrow'),
          textField('title', 'Title'),
          textField('description', 'Description', 'text'),
          textField('primaryCtaLabel', 'Primary CTA label'),
          textField('secondaryCtaLabel', 'Secondary CTA label'),
          { name: 'focusAreas', title: 'Focus areas', type: 'array', of: [{ type: 'string' }] },
          textField('visualEyebrow', 'Visual eyebrow'),
          textField('visualTitle', 'Visual title'),
          {
            name: 'stats',
            title: 'Stats',
            type: 'array',
            of: [
              {
                type: 'object',
                fields: [textField('value', 'Value'), textField('label', 'Label')],
              },
            ],
          },
        ],
      },
      {
        name: 'sections',
        title: 'Home sections',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              textField('key', 'Key'),
              textField('eyebrow', 'Eyebrow'),
              textField('title', 'Title'),
              textField('description', 'Description', 'text'),
              textField('hrefLabel', 'Link label'),
            ],
          },
        ],
      },
      {
        name: 'bodySections',
        title: 'Body sections',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              textField('eyebrow', 'Eyebrow'),
              textField('heading', 'Heading'),
              textField('text', 'Text (Markdown)', 'text'),
              textField('linkLabel', 'Link label'),
            ],
          },
        ],
      },
    ]),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug',
    },
    prepare({ title, slug }) {
      return {
        title: title || slug || 'Page content',
        subtitle: slug ? `/${slug}` : 'Editable page copy',
      }
    },
  },
}
