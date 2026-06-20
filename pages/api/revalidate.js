const pathsByType = {
  pageContent: ['/', '/about', '/updates', '/projects', '/resources', '/research', '/trajectory'],
  siteSettings: ['/', '/about', '/updates', '/projects', '/resources', '/research', '/trajectory'],
  update: ['/', '/updates'],
  project: ['/', '/projects'],
  resource: ['/', '/resources'],
  trajectoryItem: ['/trajectory'],
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (secret && req.query.secret !== secret) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    const type = req.body?._type
    const slug = req.body?.slug?.current || req.body?.slug
    const paths = new Set(pathsByType[type] || ['/'])

    if (type === 'pageContent' && slug) {
      paths.add(slug === 'home' ? '/' : `/${slug}`)
    }

    await Promise.all(Array.from(paths).map((path) => res.revalidate(path)))

    return res.json({ revalidated: true, type, paths: Array.from(paths) })
  } catch (error) {
    return res.status(500).json({ message: 'Error revalidating', error: error.message })
  }
}
