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
  "avatarAsset": image.asset
`

const linkedResearchFields = `
  title,
  href,
  linkLabel
`

const linkedProjectFields = `
  title,
  href,
  category,
  status
`

const linkedPaperFields = `
  title,
  href,
  venue,
  year,
  status
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
  "imageAsset": image.asset
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
  papers[]->{ ${linkedPaperFields} }
`

function normalizeAuthor(author) {
  if (!author) return author
  const avatar = imageUrl(author.avatarAsset) || author.avatar || null
  const clean = { ...author, avatar }
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

function normalizeNote(note) {
  if (!note) return note
  const image = imageUrl(note.imageAsset) || note.image || null
  const clean = { ...note, slug: note.slug || '' }
  delete clean.imageAsset

  return {
    ...clean,
    image,
    tags: Array.isArray(clean.tags) ? clean.tags : [],
    date: clean.date ? new Date(clean.date).toISOString() : null,
    authors: Array.isArray(clean.authors) ? clean.authors.map(normalizeAuthor) : [],
    body: Array.isArray(clean.body) ? clean.body.map(normalizeBodyBlock) : [],
    source: 'sanity',
  }
}

async function getSanityNotes() {
  try {
    const notes = await sanityFetch(
      `*[_type == "note" && defined(slug.current) && !(_id in path("drafts.**"))] | order(featured desc, orderRank asc, date desc, _createdAt desc) { ${noteListFields} }`
    )

    return Array.isArray(notes) ? notes.map(normalizeNote).filter((note) => note.slug) : []
  } catch (error) {
    console.warn(error.message)
    return []
  }
}

async function getSanityNoteBySlug(slug) {
  try {
    const note = await sanityFetch(
      `*[_type == "note" && slug.current == $slug && !(_id in path("drafts.**"))][0] { ${noteDetailFields} }`,
      { slug }
    )

    return normalizeNote(note)
  } catch (error) {
    console.warn(error.message)
    return null
  }
}

async function getLocalNotes() {
  const notes = await getAllFilesFrontMatter('blog')
  return notes.map((note) => ({ ...note, source: 'mdx' }))
}

export async function getAllNotesFrontMatter() {
  const [sanityNotes, localNotes] = await Promise.all([getSanityNotes(), getLocalNotes()])
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

export async function getAllNoteTags() {
  const notes = await getAllNotesFrontMatter()
  return notes.reduce((tagCount, note) => {
    if (note.draft === true || !Array.isArray(note.tags)) return tagCount

    note.tags.forEach((tag) => {
      const formattedTag = kebabCase(tag)
      tagCount[formattedTag] = (tagCount[formattedTag] || 0) + 1
    })

    return tagCount
  }, {})
}

export async function getNoteSlugs() {
  const sanityNotes = await getSanityNotes()
  const sanitySlugs = sanityNotes.map((note) => note.slug)
  const localSlugs = getFiles('blog').map((file) => formatSlug(file))
  return Array.from(new Set([...sanitySlugs, ...localSlugs]))
}

export async function getNoteBySlug(slug) {
  const sanityNote = await getSanityNoteBySlug(slug)
  if (sanityNote) return { kind: 'sanity', note: sanityNote }

  try {
    const post = await getFileBySlug('blog', slug)
    return { kind: 'mdx', post }
  } catch (error) {
    return null
  }
}
