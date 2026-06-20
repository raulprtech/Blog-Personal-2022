import { getSiteSettings } from '@/lib/siteSettings'

export default async function handler(req, res) {
  const settings = await getSiteSettings()
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300')
  res.status(200).json(settings)
}
