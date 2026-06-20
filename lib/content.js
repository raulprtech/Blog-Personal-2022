import projectsData from '@/data/projectsData'
import resourcesData from '@/data/resourcesData'
import trajectoryData from '@/data/trajectoryData'
import updatesData from '@/data/updatesData'
import { imageUrl, sanityFetch } from '@/lib/sanity'

const updateFields = `
  title,
  date,
  type,
  eyebrow,
  summary,
  href,
  accent,
  featured,
  "imageAsset": image.asset
`

const projectFields = `
  title,
  description,
  href,
  category,
  status,
  role,
  tags,
  "imageAsset": image.asset
`

const resourceFields = `
  title,
  type,
  source,
  summary,
  href,
  tags,
  "imageAsset": image.asset
`

const trajectoryFields = `
  period,
  title,
  organization,
  category,
  summary,
  href,
  featured
`

function withImage(item, fallbackKey = 'image') {
  if (!item) return item
  const image = imageUrl(item.imageAsset) || item[fallbackKey] || item.imgSrc || null
  const clean = { ...item }
  delete clean.imageAsset
  if (fallbackKey === 'imgSrc') return { ...clean, imgSrc: image }
  return { ...clean, image }
}

async function getSanityContent(query, fallback, mapper = (item) => item) {
  try {
    const result = await sanityFetch(query)
    if (!result || !Array.isArray(result) || result.length === 0) return fallback
    return result.map(mapper)
  } catch (error) {
    console.warn(error.message)
    return fallback
  }
}

export function getLocalHomeContent() {
  return {
    updates: updatesData,
    projects: projectsData,
    resources: resourcesData,
  }
}

export async function getUpdates() {
  return getSanityContent(
    `*[_type == "update"] | order(date desc) { ${updateFields} }`,
    updatesData,
    (item) => withImage(item)
  )
}

export async function getProjects() {
  return getSanityContent(
    `*[_type == "project"] | order(orderRank asc, _createdAt desc) { ${projectFields} }`,
    projectsData,
    (item) => withImage(item, 'imgSrc')
  )
}

export async function getResources() {
  return getSanityContent(
    `*[_type == "resource"] | order(orderRank asc, _createdAt desc) { ${resourceFields} }`,
    resourcesData,
    (item) => withImage(item)
  )
}

export async function getTrajectory() {
  return getSanityContent(
    `*[_type == "trajectoryItem"] | order(startDate desc, _createdAt desc) { ${trajectoryFields} }`,
    trajectoryData
  )
}

export async function getHomeContent() {
  const [updates, projects, resources] = await Promise.all([
    getUpdates(),
    getProjects(),
    getResources(),
  ])

  return { updates, projects, resources }
}
