import { getSiteSettings } from '@/lib/siteSettings'

const SIZES = {
  16: 16,
  32: 32,
  48: 48,
  180: 180,
  192: 192,
  512: 512,
}

const FALLBACKS = {
  16: '/static/favicons/favicon-16x16.png',
  32: '/static/favicons/favicon-32x32.png',
  48: '/static/favicons/favicon-32x32.png',
  180: '/static/favicons/apple-touch-icon.png',
  192: '/static/favicons/apple-touch-icon.png',
  512: '/static/favicons/apple-touch-icon.png',
}

function getSizedImage(image, size) {
  if (!image || !image.startsWith('https://cdn.sanity.io/images/')) return image

  const url = new URL(image)
  url.searchParams.set('w', String(size))
  url.searchParams.set('h', String(size))
  url.searchParams.set('fit', 'crop')
  url.searchParams.set('fm', 'png')
  return url.toString()
}

export default async function handler(req, res) {
  const settings = await getSiteSettings()
  const requestedKind = String(req.query.kind || '48')
  const size = SIZES[requestedKind] || SIZES[48]
  const fallback = FALLBACKS[requestedKind] || FALLBACKS[48]
  const source =
    settings.logoImage || settings.faviconImage || settings.appleTouchIconImage || fallback
  const image = getSizedImage(source, size) || fallback

  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
  res.redirect(307, image)
}
