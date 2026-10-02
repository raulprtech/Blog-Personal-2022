import { getSiteSettings } from '@/lib/siteSettings'
import sharp from 'sharp'
import fallbacks from '@/lib/siteIconFallbacks.json'
import { createIco } from '@/lib/siteIcons'

const SIZES = {
  16: 16,
  32: 32,
  48: 48,
  96: 96,
  150: 150,
  180: 180,
  192: 192,
  512: 512,
}

export default async function handler(req, res) {
  const settings = await getSiteSettings()
  const requestedKind = String(req.query.kind || '48')
  const size = SIZES[requestedKind] || SIZES[48]
  let png = Buffer.from(fallbacks[size], 'base64')
  const source = settings.logoImage

  if (source?.startsWith('https://cdn.sanity.io/images/')) {
    try {
      const url = new URL(source)
      url.searchParams.set('w', String(size))
      url.searchParams.set('h', String(size))
      url.searchParams.set('fit', 'max')
      url.searchParams.set('fm', 'png')
      const response = await fetch(url, { signal: AbortSignal.timeout(10000) })
      if (response.ok) {
        png = await sharp(Buffer.from(await response.arrayBuffer()))
          .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .png()
          .toBuffer()
      }
    } catch {
      // Keep the saved logo available when the image CDN cannot be reached.
    }
  }

  const ico = req.query.format === 'ico'
  const image = ico ? createIco(png, size) : png
  res.setHeader('Content-Type', ico ? 'image/x-icon' : 'image/png')
  res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=60, stale-while-revalidate=300')
  res.status(200).send(image)
}
