const fs = require('fs')
const path = require('path')
const { loadEnvConfig } = require('@next/env')

loadEnvConfig(process.cwd())

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

async function mutate(patch) {
  const endpoint = `https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}`
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mutations: [
        {
          patch: {
            id: patch._id,
            ...(patch.set ? { set: patch.set } : {}),
            ...(patch.unset ? { unset: patch.unset } : {}),
            ...(patch.setIfMissing ? { setIfMissing: patch.setIfMissing } : {}),
          },
        },
      ],
    }),
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Sanity mutation failed: ${response.status} ${text}`)
  }

  return response.json()
}

function isMissingDocumentError(error) {
  return /documentNotFoundError|document with the ID/i.test(error.message)
}

;(async () => {
  let patched = 0
  let skipped = 0

  for (const patch of patches) {
    try {
      await mutate(patch)
      patched += 1
      console.log(`Patched ${patch._id}`)
    } catch (error) {
      if (isMissingDocumentError(error)) {
        skipped += 1
        console.warn(`Skipped missing document ${patch._id}`)
        continue
      }
      throw error
    }
  }

  console.log(`Done. Patched ${patched} / ${patches.length}. Skipped ${skipped}.`)
})().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
