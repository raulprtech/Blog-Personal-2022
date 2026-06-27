const pathsByType = {
  pageContent: [
    '/',
    '/about',
    '/updates',
    '/projects',
    '/resources',
    '/research',
    '/trajectory',
    '/papers',
    '/credentials',
    '/ventures',
  ],
  siteSettings: [
    '/',
    '/about',
    '/updates',
    '/projects',
    '/resources',
    '/research',
    '/trajectory',
    '/papers',
    '/ventures',
    '/credentials',
  ],
  credential: [
    '/credentials',
    '/about',
    '/papers',
    '/research',
    '/projects',
    '/resources',
    '/trajectory',
    '/ventures',
  ],
  note: ['/', '/blog', '/tags', '/research', '/projects', '/papers', '/resources', '/trajectory'],
  update: ['/', '/updates', '/research', '/projects', '/papers', '/resources', '/trajectory'],
  project: [
    '/',
    '/projects',
    '/research',
    '/papers',
    '/ventures',
    '/credentials',
    '/resources',
    '/trajectory',
  ],
  researchItem: [
    '/research',
    '/papers',
    '/projects',
    '/ventures',
    '/credentials',
    '/resources',
    '/trajectory',
  ],
  paper: [
    '/papers',
    '/research',
    '/projects',
    '/ventures',
    '/credentials',
    '/resources',
    '/trajectory',
  ],
  venture: [
    '/ventures',
    '/research',
    '/projects',
    '/papers',
    '/credentials',
    '/resources',
    '/trajectory',
  ],
  collaborator: ['/papers', '/research', '/projects', '/ventures'],
  resource: [
    '/',
    '/resources',
    '/research',
    '/projects',
    '/papers',
    '/credentials',
    '/trajectory',
    '/ventures',
  ],
  trajectoryItem: [
    '/trajectory',
    '/research',
    '/projects',
    '/papers',
    '/credentials',
    '/resources',
    '/ventures',
  ],
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

    if (type === 'note' && slug) {
      paths.add(`/blog/${slug}`)
    }

    await Promise.all(Array.from(paths).map((path) => res.revalidate(path)))

    return res.json({ revalidated: true, type, paths: Array.from(paths) })
  } catch (error) {
    return res.status(500).json({ message: 'Error revalidating', error: error.message })
  }
}
