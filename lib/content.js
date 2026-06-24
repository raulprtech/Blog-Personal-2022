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

const researchItemFields = `
  title,
  description,
  href,
  linkLabel,
  orderRank,
  imageAlt,
  "imageAsset": image.asset
`

const pageContentFields = `
  slug,
  seoTitle,
  seoDescription,
  eyebrow,
  title,
  description,
  imageAlt,
  "imageAsset": image.asset,
  categories,
  featuredEyebrow,
  newsletterCta{
    enabled,
    eyebrow,
    title,
    description,
    primaryCtaLabel,
    primaryCtaHref,
    secondaryCtaLabel,
    secondaryCtaHref,
    imageAlt,
    "imageAsset": image.asset
  },
  sections[]{
    key,
    eyebrow,
    title,
    description,
    hrefLabel,
    imageAlt,
    "imageAsset": image.asset
  },
  cards[]{
    name,
    description,
    imageAlt,
    "imageAsset": image.asset
  },
  bodySections,
  summaryStats,
  announcementBanner{
    enabled,
    title,
    href,
    bgColor,
    emoji,
    imageAlt,
    "imageAsset": image.asset
  },
  hero{
    eyebrow,
    title,
    description,
    primaryCtaLabel,
    primaryCtaHref,
    secondaryCtaLabel,
    secondaryCtaHref,
    focusAreas,
    visualEyebrow,
    visualTitle,
    visualImageAlt,
    stats,
    "visualImageAsset": visualImage.asset
  }
`

function removeUndefined(value) {
  if (Array.isArray(value)) return value.map(removeUndefined)
  if (!value || typeof value !== 'object') return value

  return Object.entries(value).reduce((acc, [key, item]) => {
    if (typeof item !== 'undefined') acc[key] = removeUndefined(item)
    return acc
  }, {})
}

function normalizeImageFields(item, fallback = {}) {
  if (!item) return fallback
  const image = imageUrl(item.imageAsset) || item.image || fallback.image || null
  const clean = { ...fallback, ...item }
  delete clean.imageAsset
  return image ? { ...clean, image } : clean
}

function normalizeSections(sections, fallbackSections = {}) {
  if (!Array.isArray(sections)) return sections || fallbackSections || {}
  return sections.reduce((acc, section) => {
    if (!section || !section.key) return acc
    const { key, ...rest } = normalizeImageFields(section, fallbackSections[section.key])
    acc[key] = rest
    return acc
  }, {})
}

function normalizeCards(cards, fallbackCards = []) {
  if (!Array.isArray(cards)) return fallbackCards
  return cards.map((card, index) => normalizeImageFields(card, fallbackCards[index]))
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

  const normalized = {
    ...fallback,
    ...normalizeImageFields(content, fallback),
    cards: normalizeCards(content.cards, fallback?.cards),
    announcementBanner: normalizeImageFields(
      content.announcementBanner,
      fallback?.announcementBanner
    ),
    newsletterCta: normalizeImageFields(content.newsletterCta, fallback?.newsletterCta),
    sections: {
      ...(fallback?.sections || {}),
      ...normalizeSections(content.sections, fallback?.sections),
    },
  }

  if (hero) normalized.hero = hero

  return removeUndefined(normalized)
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
    return removeUndefined(normalizePageContent(result, fallback))
  } catch (error) {
    console.warn(error.message)
    return removeUndefined(fallback)
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

export async function getResearchItems() {
  const fallback = pageContent.research?.cards || []
  return getSanityContent(
    `*[_type == "researchItem" && !(_id in path("drafts.**"))] | order(orderRank asc, _createdAt asc) { ${researchItemFields} }`,
    fallback,
    (item) => {
      const normalized = withImage(item)
      return {
        ...normalized,
        name: normalized.title || normalized.name,
      }
    }
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
