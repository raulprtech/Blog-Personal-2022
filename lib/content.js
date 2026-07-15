import credentialsData from '@/data/credentialsData'
import pageContent from '@/data/pageContent'
import papersData from '@/data/papersData'
import projectsData from '@/data/projectsData'
import resourcesData from '@/data/resourcesData'
import venturesData from '@/data/venturesData'
import trajectoryData from '@/data/trajectoryData'
import talksData from '@/data/talksData'
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

const linkedTalkFields = `
  title,
  href,
  type,
  event,
  date,
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
  showInTimeline,
  timelineDate,
  timelineLabel,
  timelineCategory,
  timelineSummary,
  imageAlt,
  relatedProjects[]->{ ${linkedProjectFields} },
  relatedResearchItems[]->{ ${linkedResearchFields} },
  relatedPapers[]->{ ${linkedPaperFields} },
  relatedResources[]->{ ${linkedResourceFields} },
  relatedTrajectoryItems[]->{ ${linkedTrajectoryFields} },
  talks[]->{ ${linkedTalkFields} },
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
  talks[]->{ ${linkedTalkFields} },
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
  showInTimeline,
  timelineDate,
  timelineLabel,
  timelineCategory,
  timelineSummary,
  collaborators[]->{ ${linkedCollaboratorFields} },
  researchItems[]->{ ${linkedResearchFields} },
  papers[]->{ ${linkedPaperFields} },
  ventures[]->{ ${linkedVentureFields} },
  credentials[]->{ ${linkedCredentialFields} },
  resources[]->{ ${linkedResourceFields} },
  trajectoryItems[]->{ ${linkedTrajectoryFields} },
  talks[]->{ ${linkedTalkFields} },
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
  talks[]->{ ${linkedTalkFields} },
  "imageAsset": image.asset,
  english
`

const trajectoryFields = `
  period,
  startDate,
  title,
  organization,
  category,
  summary,
  href,
  featured,
  showInTimeline,
  showOnEducationPage,
  researchItems[]->{ ${linkedResearchFields} },
  projects[]->{ ${linkedProjectFields} },
  papers[]->{ ${linkedPaperFields} },
  credentials[]->{ ${linkedCredentialFields} },
  resources[]->{ ${linkedResourceFields} },
  ventures[]->{ ${linkedVentureFields} },
  talks[]->{ ${linkedTalkFields} },
  english
`

const researchItemFields = `
  _id,
  title,
  description,
  href,
  linkLabel,
  orderRank,
  showInTimeline,
  timelineDate,
  timelineLabel,
  timelineCategory,
  timelineSummary,
  imageAlt,
  collaborators[]->{ ${linkedCollaboratorFields} },
  papers[]->{ ${linkedPaperFields} },
  projects[]->{ ${linkedProjectFields} },
  ventures[]->{ ${linkedVentureFields} },
  credentials[]->{ ${linkedCredentialFields} },
  resources[]->{ ${linkedResourceFields} },
  trajectoryItems[]->{ ${linkedTrajectoryFields} },
  talks[]->{ ${linkedTalkFields} },
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
  showInTimeline,
  timelineDate,
  timelineLabel,
  timelineCategory,
  timelineSummary,
  imageAlt,
  authors[]->{ ${linkedCollaboratorFields} },
  researchItems[]->{ ${linkedResearchFields} },
  projects[]->{ ${linkedProjectFields} },
  ventures[]->{ ${linkedVentureFields} },
  credentials[]->{ ${linkedCredentialFields} },
  resources[]->{ ${linkedResourceFields} },
  trajectoryItems[]->{ ${linkedTrajectoryFields} },
  talks[]->{ ${linkedTalkFields} },
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
  showInTimeline,
  timelineDate,
  timelineLabel,
  timelineCategory,
  timelineSummary,
  imageAlt,
  collaborators[]->{ ${linkedCollaboratorFields} },
  researchItems[]->{ ${linkedResearchFields} },
  papers[]->{ ${linkedPaperFields} },
  projects[]->{ ${linkedProjectFields} },
  credentials[]->{ ${linkedCredentialFields} },
  resources[]->{ ${linkedResourceFields} },
  trajectoryItems[]->{ ${linkedTrajectoryFields} },
  talks[]->{ ${linkedTalkFields} },
  "imageAsset": image.asset,
  english
`

const talkFields = `
  title,
  type,
  date,
  event,
  organization,
  location,
  summary,
  href,
  slidesHref,
  videoHref,
  repoHref,
  status,
  tags,
  featured,
  orderRank,
  showInTimeline,
  timelineDate,
  timelineLabel,
  timelineCategory,
  timelineSummary,
  imageAlt,
  collaborators[]->{ ${linkedCollaboratorFields} },
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
  archiveLinksTitle,
  archiveLinks[]{
    label,
    href,
    description
  },
  academicEducationTitle,
  credentialsTitle,
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
  skillGroups[]{
    title,
    description,
    skills[]{
      name,
      iconKind,
      imageAlt,
      "iconAsset": icon.asset
    }
  },
  linkPage{
    handle,
    bio,
    imageAlt,
    socialLinks[]{
      kind,
      label,
      href,
      imageAlt,
      "imageAsset": image.asset
    },
    links[]{
      title,
      href,
      description,
      emoji,
      bgColor,
      featured,
      imageAlt,
      "imageAsset": image.asset
    },
    "avatarAsset": avatar.asset
  },
  bodySections,
  educationProfilesTitle,
  educationProfiles[]{
    provider,
    label,
    href,
    description,
    imageAlt,
    "imageAsset": image.asset
  },
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

function normalizeSkillGroups(groups, fallbackGroups = []) {
  if (!Array.isArray(groups)) return fallbackGroups
  return groups.map((group, groupIndex) => ({
    ...(fallbackGroups[groupIndex] || {}),
    ...group,
    skills: Array.isArray(group.skills)
      ? group.skills.map((skill) => {
          const icon = imageUrl(skill.iconAsset) || skill.icon || null
          const clean = { ...skill }
          delete clean.iconAsset
          return icon ? { ...clean, icon } : clean
        })
      : fallbackGroups[groupIndex]?.skills || [],
  }))
}

function normalizeSocialLinks(links, fallbackLinks = []) {
  if (!Array.isArray(links)) return fallbackLinks
  return links.map((link) => {
    const image = imageUrl(link.imageAsset) || link.image || null
    const clean = { ...link }
    delete clean.imageAsset
    return image ? { ...clean, image } : clean
  })
}

function normalizeLinkItems(links, fallbackLinks = []) {
  if (!Array.isArray(links)) return fallbackLinks
  return links.map((link, index) => normalizeImageFields(link, fallbackLinks[index]))
}

function normalizeLinkPage(linkPage, fallbackLinkPage = {}) {
  if (!linkPage) return fallbackLinkPage

  const avatar =
    imageUrl(linkPage.avatarAsset) || linkPage.avatar || fallbackLinkPage?.avatar || null
  const clean = { ...fallbackLinkPage, ...linkPage }
  delete clean.avatarAsset

  return {
    ...clean,
    avatar,
    socialLinks: normalizeSocialLinks(clean.socialLinks, fallbackLinkPage?.socialLinks),
    links: normalizeLinkItems(clean.links, fallbackLinkPage?.links),
  }
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
    skillGroups: normalizeSkillGroups(content.skillGroups, fallback?.skillGroups),
    linkPage: normalizeLinkPage(content.linkPage, fallback?.linkPage),
    educationProfiles: normalizeLinkItems(content.educationProfiles, fallback?.educationProfiles),
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
    if (english.skillGroups) localized.skillGroups = english.skillGroups
    if (english.linkPage)
      localized.linkPage = mergeLocalized(localized.linkPage || {}, english.linkPage)
    if (english.educationProfiles)
      localized.educationProfiles = localized.educationProfiles.map((profile, index) =>
        mergeLocalized(profile, english.educationProfiles[index])
      )
    if (english.archiveLinks)
      localized.archiveLinks = localized.archiveLinks.map((link, index) =>
        mergeLocalized(link, english.archiveLinks[index])
      )

    return removeUndefined(localized)
  }

  return removeUndefined(normalized)
}

function toTimelineItem(item, sourceType, defaults = {}) {
  const date = item.timelineDate || item.date || item.year || item.startDate || null
  const period = item.period || (date ? String(date).slice(0, 4) : defaults.period)

  return removeUndefined({
    ...item,
    sourceType,
    period,
    title: item.timelineLabel || item.title,
    organization:
      item.organization || item.event || item.venue || item.issuer || defaults.organization,
    category: item.timelineCategory || defaults.category || item.category || item.type,
    summary: item.timelineSummary || item.summary || item.description,
    href: item.href || defaults.href,
    timelineDate: date,
  })
}

function sortTimelineItems(items) {
  return [...items].sort((a, b) => {
    const aDate = a.timelineDate || a.startDate || a.date || a.period || ''
    const bDate = b.timelineDate || b.startDate || b.date || b.period || ''
    return String(bDate).localeCompare(String(aDate))
  })
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

export async function getTalks(lang = 'es') {
  return getSanityContent(
    `*[_type == "talk" && !(_id in path("drafts.**"))] | order(featured desc, date desc, orderRank asc, _createdAt desc) { ${talkFields} }`,
    talksData,
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

export async function getTimelineItems(lang = 'es') {
  const [trajectory, talks, projects, papers, ventures, researchItems, credentials] =
    await Promise.all([
      getTrajectory(lang),
      getTalks(lang),
      getProjects(lang),
      getPapers(lang),
      getVentures(lang),
      getResearchItems(lang),
      getCredentials(lang),
    ])

  return sortTimelineItems([
    ...trajectory
      .filter((item) => item.showInTimeline !== false)
      .map((item) => toTimelineItem(item, 'trajectory', { category: item.category })),
    ...talks
      .filter((item) => item.showInTimeline !== false)
      .map((item) => toTimelineItem(item, 'talk', { category: 'Talk' })),
    ...projects
      .filter((item) => item.showInTimeline)
      .map((item) => toTimelineItem(item, 'project', { category: 'Project' })),
    ...papers
      .filter((item) => item.showInTimeline)
      .map((item) => toTimelineItem(item, 'paper', { category: 'Research' })),
    ...ventures
      .filter((item) => item.showInTimeline)
      .map((item) => toTimelineItem(item, 'venture', { category: 'Product' })),
    ...researchItems
      .filter((item) => item.showInTimeline)
      .map((item) =>
        toTimelineItem(item, 'researchItem', {
          category: 'Research',
          organization: lang === 'en' ? 'Research line' : 'Línea de investigación',
        })
      ),
    ...credentials
      .filter((item) => item.showInTimeline)
      .map((item) =>
        toTimelineItem(item, 'credential', {
          category: 'Education',
          organization: item.issuer,
        })
      ),
  ])
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
