import { getSiteSettings } from '@/lib/siteSettings'

const FALLBACKS = {
  favicon16: '/static/favicons/favicon-16x16.png',
  favicon32: '/static/favicons/favicon-32x32.png',
  apple: '/static/favicons/apple-touch-icon.png',
  mask: '/static/favicons/favicon-32x32.png',
}

export default async function handler(req, res) {
  const settings = await getSiteSettings()
  const kind = req.query.kind || 'favicon32'
  const fallback = FALLBACKS[kind] || FALLBACKS.favicon32
  const image =
    kind === 'apple' ? settings.appleTouchIconImage || settings.faviconImage : settings.faviconImage

  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
  res.redirect(307, image || fallback)
}
