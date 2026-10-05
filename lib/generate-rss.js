import { escape } from '@/lib/utils/htmlEscaper'

import siteMetadata from '@/data/siteMetadata'

const generateRssItem = (post, lang = 'es') => `
  <item>
    <guid>${escape(`${siteMetadata.siteUrl}${lang === 'en' ? '/en' : ''}/blog/${post.slug}`)}</guid>
    <title>${escape(post.title)}</title>
    <link>${escape(`${siteMetadata.siteUrl}${lang === 'en' ? '/en' : ''}/blog/${post.slug}`)}</link>
    ${post.summary ? `<description>${escape(post.summary)}</description>` : ''}
    ${
      post.date && Number.isFinite(Date.parse(post.date))
        ? `<pubDate>${new Date(post.date).toUTCString()}</pubDate>`
        : ''
    }
    ${(post.tags || []).map((t) => `<category>${escape(t)}</category>`).join('')}
  </item>
`

const generateRss = (posts, page = 'feed.xml', lang = 'es') => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${escape(siteMetadata.title)}</title>
      <link>${siteMetadata.siteUrl}${lang === 'en' ? '/en' : ''}/blog</link>
      <description>${escape(siteMetadata.description)}</description>
      <language>${lang}</language>
      <atom:link href="${escape(
        `${siteMetadata.siteUrl}/${page}`
      )}" rel="self" type="application/rss+xml"/>
      ${posts
        .filter((post) => post.draft !== true)
        .map((post) => generateRssItem(post, lang))
        .join('')}
    </channel>
  </rss>
`
export default generateRss
