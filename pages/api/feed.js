import { getAllNotesFrontMatter } from '@/lib/notes'
import generateRss from '@/lib/generate-rss'
import kebabCase from '@/lib/utils/kebabCase'

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') return res.status(405).end()
  const lang = req.query.lang === 'en' ? 'en' : 'es'
  const tag = typeof req.query.tag === 'string' ? req.query.tag : ''
  try {
    let posts = await getAllNotesFrontMatter(lang)
    if (tag)
      posts = posts.filter((post) => (post.tags || []).some((value) => kebabCase(value) === tag))
    const page = `${lang === 'en' ? 'en/' : ''}${tag ? `tags/${tag}/` : ''}feed.xml`
    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8')
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=60, stale-while-revalidate=300, stale-if-error=86400'
    )
    return res.status(200).send(generateRss(posts, page, lang))
  } catch {
    return res.status(503).end('Feed temporarily unavailable')
  }
}
