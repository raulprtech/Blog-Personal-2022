const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01'
const token = process.env.SANITY_API_READ_TOKEN

export const isSanityConfigured = Boolean(projectId && dataset)

export async function sanityFetch(query, params = {}) {
  if (!isSanityConfigured) return null

  const url = new URL(`https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`)
  url.searchParams.set('query', query)
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(`$${key}`, JSON.stringify(value))
  })

  const response = await fetch(url.toString(), {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })

  if (!response.ok) {
    throw new Error(`Sanity request failed: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  return data.result
}

export function imageUrl(asset) {
  if (!asset || !asset._ref || !projectId) return null

  const [, id, dimensions, format] = asset._ref.match(/^image-(.*)-(\d+x\d+)-(\w+)$/) || []
  if (!id || !dimensions || !format) return null

  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`
}
