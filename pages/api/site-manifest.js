import { getSiteSettings } from '@/lib/siteSettings'

export default async function handler(req, res) {
  const settings = await getSiteSettings()

  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
  res.status(200).json({
    name: settings.title,
    short_name: settings.headerTitle || settings.title,
    icons: [
      {
        src: '/api/site-icon?kind=favicon32',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/api/site-icon?kind=apple',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    theme_color: settings.themeColor || '#000000',
    background_color: settings.themeColor || '#000000',
    display: 'standalone',
  })
}
