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
    '/education',
    '/ventures',
    '/talks',
    '/me',
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
    '/education',
    '/talks',
    '/me',
  ],
  credential: [
    '/education',
    '/about',
    '/papers',
    '/research',
    '/projects',
    '/resources',
    '/trajectory',
    '/ventures',
    '/talks',
  ],
  note: [
    '/',
    '/blog',
    '/tags',
    '/research',
    '/projects',
    '/papers',
    '/resources',
    '/trajectory',
    '/talks',
  ],
  update: [
    '/',
    '/updates',
    '/research',
    '/projects',
    '/papers',
    '/resources',
    '/trajectory',
    '/talks',
  ],
  project: [
    '/',
    '/projects',
    '/research',
    '/papers',
    '/ventures',
    '/education',
    '/resources',
    '/trajectory',
    '/talks',
  ],
  researchItem: [
    '/research',
    '/papers',
    '/projects',
    '/ventures',
    '/education',
    '/resources',
    '/trajectory',
    '/talks',
  ],
  paper: [
    '/papers',
    '/research',
    '/projects',
    '/ventures',
    '/education',
    '/resources',
    '/trajectory',
    '/talks',
  ],
  venture: [
    '/ventures',
    '/research',
    '/projects',
    '/papers',
    '/education',
    '/resources',
    '/trajectory',
    '/talks',
  ],
  collaborator: ['/papers', '/research', '/projects', '/ventures'],
  resource: [
    '/',
    '/resources',
    '/research',
    '/projects',
    '/papers',
    '/education',
    '/trajectory',
    '/ventures',
    '/talks',
  ],
  talk: [
    '/',
    '/talks',
    '/trajectory',
    '/research',
    '/projects',
    '/papers',
    '/education',
    '/resources',
    '/ventures',
    '/blog',
  ],
  trajectoryItem: [
    '/trajectory',
    '/research',
    '/projects',
    '/papers',
    '/education',
    '/resources',
    '/ventures',
    '/talks',
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
      if (slug === 'credentials') paths.add('/education')
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
