import { getSiteSettings } from '@/lib/siteSettings'

export default async function handler(req, res) {
  const settings = await getSiteSettings()

  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
  res.status(200).json({
    name: settings.title,
    short_name: settings.headerTitle || settings.title,
    icons: [
      {
        src: '/api/site-icon/192',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/api/site-icon/512',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    theme_color: settings.themeColor || '#000000',
    background_color: settings.themeColor || '#000000',
    display: 'standalone',
  })
}
