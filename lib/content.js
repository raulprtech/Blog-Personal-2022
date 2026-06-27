import credentialsData from '@/data/credentialsData'
import pageContent from '@/data/pageContent'
import papersData from '@/data/papersData'
import projectsData from '@/data/projectsData'
import resourcesData from '@/data/resourcesData'
import venturesData from '@/data/venturesData'
import trajectoryData from '@/data/trajectoryData'
import updatesData from '@/data/updatesData'
import { imageUrl, sanityFetch } from '@/lib/sanity'

const linkedPaperFields = `
  title,
  href,
  venue,
  year,
  status,
  english
`

const linkedProjectFields = `
  title,
  href,
  category,
  status,
  english
`

const linkedResearchFields = `
  title,
  href,
  linkLabel,
  english
`

const linkedVentureFields = `
  title,
  href,
  category,
  status,
  english
`

const linkedCredentialFields = `
  title,
  issuer,
  href,
  credentialCategory,
  english
`

const linkedResourceFields = `
  title,
  href,
  type,
  source,
  english
`

const linkedTrajectoryFields = `
  title,
  organization,
  period,
  category,
  href,
  english
`

const linkedCollaboratorFields = `
  name,
  role,
  affiliation,
  href,
  english
`

const credentialFields = `
  title,
  issuer,
  summary,
  href,
  credentialCategory,
  date,
  skills,
  featured,
  orderRank,
  imageAlt,
  relatedProjects[]->{ ${linkedProjectFields} },
  relatedResearchItems[]->{ ${linkedResearchFields} },
  relatedPapers[]->{ ${linkedPaperFields} },
  relatedResources[]->{ ${linkedResourceFields} },
  relatedTrajectoryItems[]->{ ${linkedTrajectoryFields} },
  "imageAsset": image.asset,
  english
`

const updateFields = `
  title,
  date,
  type,
  eyebrow,
  summary,
  href,
  accent,
  featured,
  researchItems[]->{ ${linkedResearchFields} },
  projects[]->{ ${linkedProjectFields} },
  papers[]->{ ${linkedPaperFields} },
  credentials[]->{ ${linkedCredentialFields} },
  resources[]->{ ${linkedResourceFields} },
  trajectoryItems[]->{ ${linkedTrajectoryFields} },
  ventures[]->{ ${linkedVentureFields} },
  "imageAsset": image.asset,
  english
`

const projectFields = `
  title,
  description,
  href,
  category,
  status,
  role,
  tags,
  collaborators[]->{ ${linkedCollaboratorFields} },
  researchItems[]->{ ${linkedResearchFields} },
  papers[]->{ ${linkedPaperFields} },
  ventures[]->{ ${linkedVentureFields} },
  credentials[]->{ ${linkedCredentialFields} },
  resources[]->{ ${linkedResourceFields} },
  trajectoryItems[]->{ ${linkedTrajectoryFields} },
  "imageAsset": image.asset,
  english
`

const resourceFields = `
  title,
  type,
  source,
  summary,
  href,
  tags,
  researchItems[]->{ ${linkedResearchFields} },
  projects[]->{ ${linkedProjectFields} },
  papers[]->{ ${linkedPaperFields} },
  credentials[]->{ ${linkedCredentialFields} },
  trajectoryItems[]->{ ${linkedTrajectoryFields} },
  ventures[]->{ ${linkedVentureFields} },
  "imageAsset": image.asset,
  english
`

const trajectoryFields = `
  period,
  title,
  organization,
  category,
  summary,
  href,
  featured,
  researchItems[]->{ ${linkedResearchFields} },
  projects[]->{ ${linkedProjectFields} },
  papers[]->{ ${linkedPaperFields} },
  credentials[]->{ ${linkedCredentialFields} },
  resources[]->{ ${linkedResourceFields} },
  ventures[]->{ ${linkedVentureFields} },
  english
`

const researchItemFields = `
  _id,
  title,
  description,
  href,
  linkLabel,
  orderRank,
  imageAlt,
  collaborators[]->{ ${linkedCollaboratorFields} },
  papers[]->{ ${linkedPaperFields} },
  projects[]->{ ${linkedProjectFields} },
  ventures[]->{ ${linkedVentureFields} },
  credentials[]->{ ${linkedCredentialFields} },
  resources[]->{ ${linkedResourceFields} },
  trajectoryItems[]->{ ${linkedTrajectoryFields} },
  "imageAsset": image.asset,
  english
`

const paperFields = `
  title,
  summary,
  venue,
  year,
  status,
  href,
  codeHref,
  doi,
  tags,
  featured,
  orderRank,
  imageAlt,
  authors[]->{ ${linkedCollaboratorFields} },
  researchItems[]->{ ${linkedResearchFields} },
  projects[]->{ ${linkedProjectFields} },
  ventures[]->{ ${linkedVentureFields} },
  credentials[]->{ ${linkedCredentialFields} },
  resources[]->{ ${linkedResourceFields} },
  trajectoryItems[]->{ ${linkedTrajectoryFields} },
  "imageAsset": image.asset,
  english
`

const ventureFields = `
  title,
  description,
  href,
  category,
  status,
  role,
  tags,
  featured,
  orderRank,
  imageAlt,
  collaborators[]->{ ${linkedCollaboratorFields} },
  researchItems[]->{ ${linkedResearchFields} },
  papers[]->{ ${linkedPaperFields} },
  projects[]->{ ${linkedProjectFields} },
  credentials[]->{ ${linkedCredentialFields} },
  resources[]->{ ${linkedResourceFields} },
  trajectoryItems[]->{ ${linkedTrajectoryFields} },
  "imageAsset": image.asset,
  english
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
  profileCard{
    imageAlt,
    affiliation,
    cvNote,
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
  },
  english
`

function hasLocalizedValue(value) {
  if (Array.isArray(value)) return value.length > 0
  if (value && typeof value === 'object') return Object.keys(value).length > 0
  return typeof value !== 'undefined' && value !== null && value !== ''
}

function mergeLocalized(base, localized) {
  if (!localized || typeof localized !== 'object') return base

  return Object.entries(localized).reduce(
    (acc, [key, value]) => {
      if (!hasLocalizedValue(value)) return acc

      if (
        value &&
        typeof value === 'object' &&
        !Array.isArray(value) &&
        acc[key] &&
        typeof acc[key] === 'object' &&
        !Array.isArray(acc[key])
      ) {
        acc[key] = mergeLocalized(acc[key], value)
        return acc
      }

      acc[key] = value
      return acc
    },
    { ...base }
  )
}

function applyLocalized(value, lang = 'es') {
  if (Array.isArray(value)) return value.map((item) => applyLocalized(item, lang))
  if (!value || typeof value !== 'object') return value

  const { english, ...rest } = value
  const localized = lang === 'en' ? mergeLocalized(rest, english) : rest

  return Object.entries(localized).reduce((acc, [key, item]) => {
    acc[key] = applyLocalized(item, lang)
    return acc
  }, {})
}
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

function normalizePageContent(content, fallback, lang = 'es') {
  if (!content) return applyLocalized(fallback, lang)
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
    profileCard: normalizeImageFields(content.profileCard, fallback?.profileCard),
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

  if (lang === 'en' && content.english) {
    const english = content.english
    const localized = mergeLocalized(normalized, english)

    if (english.hero) localized.hero = mergeLocalized(localized.hero || {}, english.hero)
    if (english.sections) {
      localized.sections = {
        ...(localized.sections || {}),
        ...normalizeSections(english.sections, localized.sections),
      }
    }
    if (english.bodySections) localized.bodySections = english.bodySections
    if (english.profileCard)
      localized.profileCard = mergeLocalized(localized.profileCard || {}, english.profileCard)

    return removeUndefined(localized)
  }

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

async function getSanityContent(query, fallback, mapper = (item) => item, lang = 'es') {
  try {
    const result = await sanityFetch(query)
    if (!result || !Array.isArray(result) || result.length === 0)
      return applyLocalized(fallback, lang)
    return result.map((item) => applyLocalized(mapper(item), lang))
  } catch (error) {
    console.warn(error.message)
    return applyLocalized(fallback, lang)
  }
}

export function getLocalHomeContent(lang = 'es') {
  return {
    updates: applyLocalized(updatesData, lang),
    projects: applyLocalized(projectsData, lang),
    resources: applyLocalized(resourcesData, lang),
    pageContent: applyLocalized(pageContent.home, lang),
  }
}

export async function getPageContent(slug, lang = 'es') {
  const fallback = pageContent[slug] || {}
  try {
    const result = await sanityFetch(
      `*[_type == "pageContent" && slug == $slug && !(_id in path("drafts.**"))][0] { ${pageContentFields} }`,
      { slug }
    )
    return removeUndefined(normalizePageContent(result, fallback, lang))
  } catch (error) {
    console.warn(error.message)
    return removeUndefined(applyLocalized(fallback, lang))
  }
}

export async function getCredentials(lang = 'es') {
  return getSanityContent(
    `*[_type == "credential" && !(_id in path("drafts.**"))] | order(featured desc, orderRank asc, date desc, _createdAt desc) { ${credentialFields} }`,
    credentialsData,
    (item) => withImage(item),
    lang
  )
}

export async function getUpdates(lang = 'es') {
  return getSanityContent(
    `*[_type == "update" && !(_id in path("drafts.**"))] | order(date desc) { ${updateFields} }`,
    updatesData,
    (item) => withImage(item),
    lang
  )
}

export async function getProjects(lang = 'es') {
  return getSanityContent(
    `*[_type == "project" && !(_id in path("drafts.**"))] | order(orderRank asc, _createdAt desc) { ${projectFields} }`,
    projectsData,
    (item) => withImage(item, 'imgSrc'),
    lang
  )
}

export async function getResources(lang = 'es') {
  return getSanityContent(
    `*[_type == "resource" && !(_id in path("drafts.**"))] | order(orderRank asc, _createdAt desc) { ${resourceFields} }`,
    resourcesData,
    (item) => withImage(item),
    lang
  )
}

export async function getResearchItems(lang = 'es') {
  const fallback = applyLocalized(pageContent.research?.cards || [], lang)
  try {
    const result = await sanityFetch(
      `*[_type == "researchItem" && !(_id in path("drafts.**"))] | order(orderRank asc, _createdAt asc) { ${researchItemFields} }`
    )

    if (!Array.isArray(result)) return fallback

    return result.map((item) => {
      const normalized = applyLocalized(withImage(item), lang)
      return {
        ...normalized,
        name: normalized.title || normalized.name,
      }
    })
  } catch (error) {
    console.warn(error.message)
    return fallback
  }
}

export async function getPapers(lang = 'es') {
  return getSanityContent(
    `*[_type == "paper" && !(_id in path("drafts.**"))] | order(featured desc, orderRank asc, year desc, _createdAt desc) { ${paperFields} }`,
    papersData,
    (item) => withImage(item),
    lang
  )
}

export async function getVentures(lang = 'es') {
  return getSanityContent(
    `*[_type == "venture" && !(_id in path("drafts.**"))] | order(featured desc, orderRank asc, _createdAt desc) { ${ventureFields} }`,
    venturesData,
    (item) => withImage(item),
    lang
  )
}

export async function getTrajectory(lang = 'es') {
  return getSanityContent(
    `*[_type == "trajectoryItem" && !(_id in path("drafts.**"))] | order(startDate desc, _createdAt desc) { ${trajectoryFields} }`,
    trajectoryData,
    (item) => item,
    lang
  )
}

export async function getHomeContent(lang = 'es') {
  const [updates, projects, resources, homeContent] = await Promise.all([
    getUpdates(lang),
    getProjects(lang),
    getResources(lang),
    getPageContent('home', lang),
  ])

  return { updates, projects, resources, pageContent: homeContent }
}
