import pageContent from '@/data/pageContent'
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

const pageContentFields = `
  slug,
  seoTitle,
  seoDescription,
  eyebrow,
  title,
  description,
  categories,
  featuredEyebrow,
  sections,
  cards,
  summaryStats,
  hero{
    eyebrow,
    title,
    description,
    primaryCtaLabel,
    primaryCtaHref,
    secondaryCtaLabel,
    secondaryCtaHref,
    tertiaryCtaLabel,
    tertiaryCtaHref,
    focusAreas,
    visualEyebrow,
    visualTitle,
    stats,
    "visualImageAsset": visualImage.asset
  }
`

function normalizeSections(sections) {
  if (!Array.isArray(sections)) return sections || {}
  return sections.reduce((acc, section) => {
    if (!section || !section.key) return acc
    const { key, ...rest } = section
    acc[key] = rest
    return acc
  }, {})
}

function normalizePageContent(content, fallback) {
  if (!content) return fallback
  const hero = content.hero
    ? {
        ...content.hero,
        visualImage: imageUrl(content.hero.visualImageAsset) || fallback?.hero?.visualImage,
      }
    : fallback?.hero

  if (hero) delete hero.visualImageAsset

  return {
    ...fallback,
    ...content,
    hero,
    sections: {
      ...(fallback?.sections || {}),
      ...normalizeSections(content.sections),
    },
  }
}

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
    pageContent: pageContent.home,
  }
}

export async function getPageContent(slug) {
  const fallback = pageContent[slug] || {}
  try {
    const result = await sanityFetch(
      `*[_type == "pageContent" && slug == $slug && !(_id in path("drafts.**"))][0] { ${pageContentFields} }`,
      { slug }
    )
    return normalizePageContent(result, fallback)
  } catch (error) {
    console.warn(error.message)
    return fallback
  }
}

export async function getUpdates() {
  return getSanityContent(
    `*[_type == "update" && !(_id in path("drafts.**"))] | order(date desc) { ${updateFields} }`,
    updatesData,
    (item) => withImage(item)
  )
}

export async function getProjects() {
  return getSanityContent(
    `*[_type == "project" && !(_id in path("drafts.**"))] | order(orderRank asc, _createdAt desc) { ${projectFields} }`,
    projectsData,
    (item) => withImage(item, 'imgSrc')
  )
}

export async function getResources() {
  return getSanityContent(
    `*[_type == "resource" && !(_id in path("drafts.**"))] | order(orderRank asc, _createdAt desc) { ${resourceFields} }`,
    resourcesData,
    (item) => withImage(item)
  )
}

export async function getTrajectory() {
  return getSanityContent(
    `*[_type == "trajectoryItem" && !(_id in path("drafts.**"))] | order(startDate desc, _createdAt desc) { ${trajectoryFields} }`,
    trajectoryData
  )
}

export async function getHomeContent() {
  const [updates, projects, resources, homeContent] = await Promise.all([
    getUpdates(),
    getProjects(),
    getResources(),
    getPageContent('home'),
  ])

  return { updates, projects, resources, pageContent: homeContent }
}
