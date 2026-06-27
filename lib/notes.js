import {
  getAllFilesFrontMatter,
  getFileBySlug,
  getFiles,
  formatSlug,
  dateSortDesc,
} from '@/lib/mdx'
import { imageUrl, sanityFetch } from '@/lib/sanity'
import kebabCase from '@/lib/utils/kebabCase'

const linkedCollaboratorFields = `
  name,
  role,
  affiliation,
  href,
  "avatarAsset": image.asset,
  english
`

const linkedResearchFields = `
  title,
  href,
  linkLabel,
  english
`

const linkedProjectFields = `
  title,
  href,
  category,
  status,
  english
`

const linkedPaperFields = `
  title,
  href,
  venue,
  year,
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

const linkedVentureFields = `
  title,
  href,
  category,
  status,
  english
`

const noteListFields = `
  _id,
  title,
  "slug": slug.current,
  summary,
  date,
  tags,
  featured,
  orderRank,
  canonicalUrl,
  imageAlt,
  "imageAsset": image.asset,
  english
`

const noteDetailFields = `
  ${noteListFields},
  body[]{
    ...,
    _type == "imageBlock" => {
      ...,
      "imageAsset": asset
    }
  },
  authors[]->{ ${linkedCollaboratorFields} },
  researchItems[]->{ ${linkedResearchFields} },
  projects[]->{ ${linkedProjectFields} },
  papers[]->{ ${linkedPaperFields} },
  credentials[]->{ ${linkedCredentialFields} },
  resources[]->{ ${linkedResourceFields} },
  trajectoryItems[]->{ ${linkedTrajectoryFields} },
  ventures[]->{ ${linkedVentureFields} }
`

function hasLocalizedValue(value) {
  if (Array.isArray(value)) return value.length > 0
  if (value && typeof value === 'object') return Object.keys(value).length > 0
  return typeof value !== 'undefined' && value !== null && value !== ''
}

function hasEnglishContent(english) {
  if (!english || typeof english !== 'object') return false
  return Object.values(english).some(hasLocalizedValue)
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

function normalizeAuthor(author, lang = 'es') {
  if (!author) return author
  const avatar = imageUrl(author.avatarAsset) || author.avatar || null
  const clean = applyLocalized({ ...author, avatar }, lang)
  delete clean.avatarAsset
  return clean
}

function normalizeBodyBlock(block) {
  if (!block) return block
  if (block._type !== 'imageBlock') return block

  const image = imageUrl(block.imageAsset) || null
  const clean = { ...block, image }
  delete clean.imageAsset
  return clean
}

function normalizeNote(note, lang = 'es') {
  if (!note) return note
  const image = imageUrl(note.imageAsset) || note.image || null
  const clean = applyLocalized({ ...note, slug: note.slug || '' }, lang)
  delete clean.imageAsset

  return {
    ...clean,
    image,
    tags: Array.isArray(clean.tags) ? clean.tags : [],
    date: clean.date ? new Date(clean.date).toISOString() : null,
    authors: Array.isArray(clean.authors)
      ? clean.authors.map((author) => normalizeAuthor(author, lang))
      : [],
    body: Array.isArray(clean.body) ? clean.body.map(normalizeBodyBlock) : [],
    source: 'sanity',
  }
}

async function getSanityNotes(lang = 'es') {
  try {
    const notes = await sanityFetch(
      `*[_type == "note" && defined(slug.current) && !(_id in path("drafts.**"))] | order(featured desc, orderRank asc, date desc, _createdAt desc) { ${noteListFields} }`
    )

    return Array.isArray(notes)
      ? notes
          .filter((note) => lang !== 'en' || hasEnglishContent(note.english))
          .map((note) => normalizeNote(note, lang))
          .filter((note) => note.slug)
      : []
  } catch (error) {
    console.warn(error.message)
    return []
  }
}

async function getSanityNoteBySlug(slug, lang = 'es') {
  try {
    const note = await sanityFetch(
      `*[_type == "note" && slug.current == $slug && !(_id in path("drafts.**"))][0] { ${noteDetailFields} }`,
      { slug }
    )

    if (lang === 'en' && !hasEnglishContent(note?.english)) return null

    return normalizeNote(note, lang)
  } catch (error) {
    console.warn(error.message)
    return null
  }
}

async function getLocalNotes() {
  const notes = await getAllFilesFrontMatter('blog')
  return notes.map((note) => ({ ...note, source: 'mdx' }))
}

export async function getAllNotesFrontMatter(lang = 'es') {
  const [sanityNotes, localNotes] = await Promise.all([
    getSanityNotes(lang),
    lang === 'en' ? [] : getLocalNotes(),
  ])
  const seen = new Set()
  const merged = []

  sanityNotes.forEach((note) => {
    seen.add(note.slug)
    merged.push(note)
  })

  localNotes.forEach((note) => {
    if (!seen.has(note.slug)) merged.push(note)
  })

  return merged.sort((a, b) => dateSortDesc(a.date, b.date))
}

export async function getAllNoteTags(lang = 'es') {
  const notes = await getAllNotesFrontMatter(lang)
  return notes.reduce((tagCount, note) => {
    if (note.draft === true || !Array.isArray(note.tags)) return tagCount

    note.tags.forEach((tag) => {
      const formattedTag = kebabCase(tag)
      tagCount[formattedTag] = (tagCount[formattedTag] || 0) + 1
    })

    return tagCount
  }, {})
}

export async function getNoteSlugs(lang = 'es') {
  const sanityNotes = await getSanityNotes(lang)
  const sanitySlugs = sanityNotes.map((note) => note.slug)
  if (lang === 'en') return sanitySlugs

  const localSlugs = getFiles('blog').map((file) => formatSlug(file))
  return Array.from(new Set([...sanitySlugs, ...localSlugs]))
}

export async function getNoteBySlug(slug, lang = 'es') {
  const sanityNote = await getSanityNoteBySlug(slug, lang)
  if (sanityNote) return { kind: 'sanity', note: sanityNote }

  if (lang === 'en') return null

  try {
    const post = await getFileBySlug('blog', slug)
    return { kind: 'mdx', post }
  } catch (error) {
    return null
  }
}
