const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const siteMetadata = require('../data/siteMetadata')
const { createIco } = require('../lib/siteIcons')

const root = path.resolve(__dirname, '..')
const files = {
  16: 'favicon-16x16.png',
  32: 'favicon-32x32.png',
  48: 'favicon-48x48.png',
  96: 'android-chrome-96x96.png',
  150: 'mstile-150x150.png',
  180: 'apple-touch-icon.png',
  192: 'android-chrome-192x192.png',
  512: 'android-chrome-512x512.png',
}

async function getLogo() {
  for (const name of ['.env.production.local', '.env.local', '.env.production', '.env']) {
    const filename = path.join(root, name)
    if (fs.existsSync(filename)) process.loadEnvFile(filename)
  }

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'a668buu6'
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01'
  const token = process.env.SANITY_API_READ_TOKEN

  try {
    const url = new URL(`https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`)
    url.searchParams.set(
      'query',
      '*[_type == "siteSettings" && _id == "site-settings"][0]{"logo": logoImage.asset->url}'
    )
    const response = await fetch(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      signal: AbortSignal.timeout(10000),
    })
    if (!response.ok) throw new Error('Logo settings unavailable')
    const { result } = await response.json()
    if (result?.logo?.startsWith('https://cdn.sanity.io/images/')) {
      const image = await fetch(result.logo, { signal: AbortSignal.timeout(10000) })
      if (!image.ok) throw new Error('Logo image unavailable')
      return Buffer.from(await image.arrayBuffer())
    }
  } catch {
    console.warn('Using the saved site logo to generate icons.')
  }

  return fs.readFileSync(path.join(root, 'public', siteMetadata.siteLogo))
}

;(async () => {
  const source = await getLogo()
  const directory = path.join(root, 'public/static/favicons')
  fs.mkdirSync(directory, { recursive: true })
  const fallbacks = {}

  for (const [size, filename] of Object.entries(files)) {
    const png = await sharp(source)
      .resize(Number(size), Number(size), {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer()
    fs.writeFileSync(path.join(directory, filename), png)
    fallbacks[size] = png.toString('base64')
  }

  fs.writeFileSync(
    path.join(directory, 'favicon.ico'),
    createIco(Buffer.from(fallbacks[48], 'base64'))
  )
  fs.writeFileSync(
    path.join(root, 'public', siteMetadata.siteLogo),
    await sharp(source).png().toBuffer()
  )
  fs.writeFileSync(
    path.join(root, 'lib/siteIconFallbacks.json'),
    `${JSON.stringify(fallbacks, null, 2)}\n`
  )
  console.log('Generated all site icons from the current logo.')
})().catch((error) => {
  console.error('Could not generate site icons:', error.message)
  process.exitCode = 1
})
