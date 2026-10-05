const { isValidSignature, SIGNATURE_HEADER_NAME } = require('@sanity/webhook')

const contentTypes = new Set([
  'pageContent',
  'siteSettings',
  'credential',
  'note',
  'update',
  'project',
  'researchItem',
  'paper',
  'venture',
  'collaborator',
  'resource',
  'talk',
  'trajectoryItem',
])
const staticRoutes = [
  '/',
  '/about',
  '/blog',
  '/contact',
  '/education',
  '/me',
  '/papers',
  '/projects',
  '/research',
  '/resources',
  '/tags',
  '/talks',
  '/trajectory',
  '/updates',
  '/ventures',
]
const validSlug = (value) =>
  typeof value === 'string' &&
  value.length <= 240 &&
  /^[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_-]+)*$/.test(value)
const bothLanguages = (route) => [route, route === '/' ? '/en' : `/en${route}`]

function validatePayload(body) {
  if (!body || Array.isArray(body) || !contentTypes.has(body._type)) return false
  for (const key of ['slug', 'previousSlug']) {
    const value = body[key]?.current ?? body[key]
    if (value != null && !validSlug(value)) return false
  }
  return ['tags', 'previousTags', 'englishTags', 'previousEnglishTags'].every(
    (key) =>
      body[key] == null ||
      (Array.isArray(body[key]) &&
        body[key].length <= 100 &&
        body[key].every((tag) => typeof tag === 'string' && tag.length <= 200))
  )
}

async function readBody(req) {
  const chunks = []
  let size = 0
  for await (const chunk of req) {
    const bytes = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
    size += bytes.length
    if (size > 32768) throw new Error('Body too large')
    chunks.push(bytes)
  }
  return Buffer.concat(chunks).toString('utf8')
}

function createHandler(getPaths) {
  return async (req, res) => {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST')
      return res.status(405).json({ message: 'Method not allowed' })
    }
    const secret = process.env.SANITY_REVALIDATE_SECRET
    if (!secret?.trim()) return res.status(503).json({ message: 'Webhook unavailable' })
    const signature = req.headers[SIGNATURE_HEADER_NAME]
    if (typeof signature !== 'string') return res.status(401).json({ message: 'Invalid signature' })
    let raw
    try {
      raw = await readBody(req)
    } catch {
      return res.status(413).json({ message: 'Invalid body' })
    }
    if (!(await isValidSignature(raw, signature, secret)))
      return res.status(401).json({ message: 'Invalid signature' })
    let body
    try {
      body = JSON.parse(raw)
    } catch {
      return res.status(400).json({ message: 'Invalid body' })
    }
    if (!validatePayload(body)) return res.status(400).json({ message: 'Invalid body' })
    try {
      const paths = [...new Set(await getPaths(body))]
      for (let i = 0; i < paths.length; i += 4) {
        await Promise.all(paths.slice(i, i + 4).map((path) => res.revalidate(path)))
      }
      return res.json({ revalidated: true })
    } catch {
      return res.status(500).json({ message: 'Revalidation failed' })
    }
  }
}

module.exports = { createHandler, validatePayload, staticRoutes, bothLanguages, validSlug }
