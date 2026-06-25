const fs = require('fs')
const globby = require('globby')
const matter = require('gray-matter')
const prettier = require('prettier')
const siteMetadata = require('../data/siteMetadata')

async function getSanityNotePages() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'a668buu6'
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01'

  try {
    const url = new URL(`https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`)
    url.searchParams.set(
      'query',
      '*[_type == "note" && defined(slug.current) && !(_id in path("drafts.**"))]{"slug": slug.current}'
    )
    const response = await fetch(url.toString())
    if (!response.ok) return []
    const data = await response.json()
    return Array.isArray(data.result) ? data.result.map((note) => `data/blog/${note.slug}.md`) : []
  } catch (error) {
    return []
  }
}

;(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js')
  const pages = await globby([
    'pages/*.js',
    'pages/*.tsx',
    'data/blog/**/*.mdx',
    'data/blog/**/*.md',
    'public/tags/**/*.xml',
    '!pages/_*.js',
    '!pages/_*.tsx',
    '!pages/api',
  ])

  const sanityNotePages = await getSanityNotePages()
  const allPages = Array.from(new Set([...pages, ...sanityNotePages]))

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${allPages
              .map((page) => {
                // Exclude drafts from the sitemap
                if (page.search('.md') >= 1 && fs.existsSync(page)) {
                  const source = fs.readFileSync(page, 'utf8')
                  const fm = matter(source)
                  if (fm.data.draft) {
                    return
                  }
                  if (fm.data.canonicalUrl) {
                    return
                  }
                }
                const path = page
                  .replace('pages/', '/')
                  .replace('data/blog', '/blog')
                  .replace('public/', '/')
                  .replace('.js', '')
                  .replace('.tsx', '')
                  .replace('.mdx', '')
                  .replace('.md', '')
                  .replace('/feed.xml', '')
                const route = path === '/index' ? '' : path

                if (page.search('pages/404.') > -1 || page.search(`pages/blog/[...slug].`) > -1) {
                  return
                }
                return `
                        <url>
                            <loc>${siteMetadata.siteUrl}${route}</loc>
                        </url>
                    `
              })
              .join('')}
        </urlset>
    `

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  })

  // eslint-disable-next-line no-sync
  fs.writeFileSync('public/sitemap.xml', formatted)
})()
