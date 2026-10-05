import { getAllNotesFrontMatter } from '@/lib/notes'
import { getProjectSlugs } from '@/lib/content'
import { staticRoutes, bothLanguages } from '@/lib/revalidation.cjs'
import { escape } from '@/lib/utils/htmlEscaper'
import siteMetadata from '@/data/siteMetadata'
import kebabCase from '@/lib/utils/kebabCase'

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') return res.status(405).end()
  try {
    const [spanish, english, projects] = await Promise.all([
      getAllNotesFrontMatter('es'),
      getAllNotesFrontMatter('en'),
      getProjectSlugs(),
    ])
    const routes = new Set(staticRoutes.flatMap(bothLanguages))
    projects.forEach((slug) =>
      bothLanguages(`/projects/${slug}`).forEach((route) => routes.add(route))
    )
    for (const [prefix, posts] of [
      ['', spanish],
      ['/en', english],
    ]) {
      posts
        .filter((post) => !post.canonicalUrl)
        .forEach((post) => {
          routes.add(`${prefix}/blog/${post.slug}`)
          ;(post.tags || []).forEach((tag) => routes.add(`${prefix}/tags/${kebabCase(tag)}`))
        })
    }
    const url = (route) => escape(`${siteMetadata.siteUrl}${route}`)
    const entries = [...routes]
      .map((route) => {
        const base = route.replace(/^\/en(?=\/|$)/, '') || '/'
        const en = base === '/' ? '/en' : `/en${base}`
        const alternates =
          routes.has(base) && routes.has(en)
            ? `<xhtml:link rel="alternate" hreflang="es-MX" href="${url(
                base
              )}"/><xhtml:link rel="alternate" hreflang="en" href="${url(
                en
              )}"/><xhtml:link rel="alternate" hreflang="x-default" href="${url(base)}"/>`
            : ''
        return `<url><loc>${url(route)}</loc>${alternates}</url>`
      })
      .join('')
    res.setHeader('Content-Type', 'application/xml; charset=utf-8')
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=60, stale-while-revalidate=300, stale-if-error=86400'
    )
    return res
      .status(200)
      .send(
        `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries}</urlset>`
      )
  } catch {
    return res.status(503).end('Sitemap temporarily unavailable')
  }
}
