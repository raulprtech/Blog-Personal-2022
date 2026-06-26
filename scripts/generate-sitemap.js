const fs = require('fs')
const globby = require('globby')
const matter = require('gray-matter')
const prettier = require('prettier')
const siteMetadata = require('../data/siteMetadata')

const staticAlternateRoutes = new Set([
  '',
  '/about',
  '/blog',
  '/credentials',
  '/papers',
  '/projects',
  '/research',
  '/resources',
  '/tags',
  '/trajectory',
  '/updates',
  '/ventures',
])

const toEnglishRoute = (route) => (route === '' ? '/en' : `/en${route}`)
const stripEnglishRoute = (route) => route.replace(/^\/en(?=\/|$)/, '') || ''

function hasEnglishValue(value) {
  if (Array.isArray(value)) return value.length > 0
  if (value && typeof value === 'object') return Object.keys(value).length > 0
  return typeof value !== 'undefined' && value !== null && value !== ''
}

function hasEnglishContent(english) {
  if (!english || typeof english !== 'object') return false
  return Object.values(english).some(hasEnglishValue)
}

async function getSanityNotePages() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'a668buu6'
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01'

  try {
    const url = new URL(`https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`)
    url.searchParams.set(
      'query',
      '*[_type == "note" && defined(slug.current) && !(_id in path("drafts.**"))]{"slug": slug.current, english}'
    )
    const response = await fetch(url.toString())
    if (!response.ok) return []
    const data = await response.json()
    return Array.isArray(data.result)
      ? data.result.map((note) => ({
          route: `/blog/${note.slug}`,
          hasEnglish: hasEnglishContent(note.english),
        }))
      : []
  } catch (error) {
    return []
  }
}

function normalizePagePath(page) {
  return page.replace(/\\/g, '/')
}

function routeFromPage(page) {
  const normalizedPage = normalizePagePath(page)
  const path = normalizedPage
    .replace('pages/', '/')
    .replace('data/blog', '/blog')
    .replace('public/', '/')
    .replace(/.js$/, '')
    .replace(/.tsx$/, '')
    .replace(/.mdx$/, '')
    .replace(/.md$/, '')
    .replace('/feed.xml', '')

  return path === '/index' ? '' : path.replace('/index', '')
}

function shouldSkipPage(page) {
  const normalizedPage = normalizePagePath(page)
  return (
    normalizedPage.includes('pages/404.') ||
    normalizedPage.includes('pages/api/') ||
    normalizedPage.includes('pages/blog/[...slug].') ||
    normalizedPage.includes('pages/blog/page/[page].') ||
    normalizedPage.includes('pages/tags/[tag].') ||
    normalizedPage.includes('pages/en/blog/[...slug].') ||
    normalizedPage.includes('pages/en/blog/page/[page].') ||
    normalizedPage.includes('pages/en/tags/[tag].') ||
    normalizedPage.includes('pages/_')
  )
}

function getFrontMatter(page) {
  if (page.search('.md') < 1 || !fs.existsSync(page)) return null
  const source = fs.readFileSync(page, 'utf8')
  return matter(source).data
}

function buildUrl(route, alternates = true) {
  const baseRoute = stripEnglishRoute(route)
  const hasAlternates = alternates && staticAlternateRoutes.has(baseRoute)

  return `
    <url>
      <loc>${siteMetadata.siteUrl}${route}</loc>
      ${
        hasAlternates
          ? `
      <xhtml:link rel="alternate" hreflang="es-MX" href="${siteMetadata.siteUrl}${baseRoute}" />
      <xhtml:link rel="alternate" hreflang="en" href="${siteMetadata.siteUrl}${toEnglishRoute(
              baseRoute
            )}" />
      <xhtml:link rel="alternate" hreflang="x-default" href="${siteMetadata.siteUrl}${baseRoute}" />
      `
          : ''
      }
    </url>
  `
}

;(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js')
  const pages = await globby([
    'pages/**/*.js',
    'pages/**/*.tsx',
    'data/blog/**/*.mdx',
    'data/blog/**/*.md',
    'public/tags/**/*.xml',
    '!pages/api/**',
    '!pages/_*.js',
    '!pages/_*.tsx',
  ])

  const routes = []

  pages.forEach((page) => {
    if (shouldSkipPage(page)) return

    const frontMatter = getFrontMatter(page)
    if (frontMatter?.draft || frontMatter?.canonicalUrl) return

    routes.push({ route: routeFromPage(page), alternates: true })
  })

  const sanityNotes = await getSanityNotePages()
  sanityNotes.forEach((note) => {
    routes.push({ route: note.route, alternates: note.hasEnglish })
    if (note.hasEnglish) routes.push({ route: toEnglishRoute(note.route), alternates: true })
  })

  const seen = new Set()
  const uniqueRoutes = routes.filter(({ route }) => {
    if (seen.has(route)) return false
    seen.add(route)
    return true
  })

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
      ${uniqueRoutes.map(({ route, alternates }) => buildUrl(route, alternates)).join('')}
    </urlset>
  `

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  })

  // eslint-disable-next-line no-sync
  fs.writeFileSync('public/sitemap.xml', formatted)
})()
