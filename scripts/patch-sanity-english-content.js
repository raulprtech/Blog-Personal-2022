const fs = require('fs')
const path = require('path')

const patchesFile = process.argv[2] || 'studio/import/english-content-patches.json'
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'a668buu6'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01'
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN

if (!token) {
  console.error('Missing SANITY_API_WRITE_TOKEN or SANITY_AUTH_TOKEN.')
  console.error('Set it locally before running this script. Do not commit it.')
  process.exit(1)
}

const absoluteFile = path.resolve(process.cwd(), patchesFile)
const patches = JSON.parse(fs.readFileSync(absoluteFile, 'utf8'))

async function mutate(batch) {
  const endpoint = `https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}`
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mutations: batch.map((patch) => ({
        patch: {
          id: patch._id,
          ...(patch.set ? { set: patch.set } : {}),
          ...(patch.unset ? { unset: patch.unset } : {}),
          ...(patch.setIfMissing ? { setIfMissing: patch.setIfMissing } : {}),
        },
      })),
    }),
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Sanity mutation failed: ${response.status} ${text}`)
  }

  return response.json()
}

;(async () => {
  const batchSize = 20
  for (let index = 0; index < patches.length; index += batchSize) {
    const batch = patches.slice(index, index + batchSize)
    await mutate(batch)
    console.log(`Patched ${Math.min(index + batchSize, patches.length)} / ${patches.length}`)
  }
})().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
