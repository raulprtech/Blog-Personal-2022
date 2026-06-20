const simpleText = (name, title, type = 'string') => ({ name, title, type })

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
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
    },
    simpleText('featuredEyebrow', 'Featured section eyebrow'),
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
        simpleText('tertiaryCtaLabel', 'Tertiary CTA label'),
        simpleText('tertiaryCtaHref', 'Tertiary CTA href'),
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
          ],
        },
      ],
    },
    {
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [simpleText('name', 'Name'), simpleText('description', 'Description', 'text')],
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
    simpleText('occupation', 'Occupation'),
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
