import { getSiteSettings } from '@/lib/siteSettings'

export default async function handler(req, res) {
  const settings = await getSiteSettings()
  res.setHeader('Cache-Control', 'no-store, max-age=0')
  res.status(200).json(settings)
}
