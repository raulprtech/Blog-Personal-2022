import { getSiteSettings } from '@/lib/siteSettings'

export default async function handler(req, res) {
  const settings = await getSiteSettings()

  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
  res.redirect(307, settings.socialBannerImage || '/static/images/twitter-card.png')
}
