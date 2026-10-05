import { createHandler, staticRoutes, bothLanguages, validSlug } from '@/lib/revalidation.cjs'
import { getAllNotesFrontMatter } from '@/lib/notes'
import { getProjectSlugs } from '@/lib/content'
import kebabCase from '@/lib/utils/kebabCase'

export const config = { api: { bodyParser: false } }

export default createHandler(async (body) => {
  const [notes, englishNotes, projects] = await Promise.all([
    getAllNotesFrontMatter('es'),
    getAllNotesFrontMatter('en'),
    getProjectSlugs(),
  ])
  const paths = staticRoutes.flatMap(bothLanguages)
  paths.push('/resume', '/services', '/404')
  projects.forEach((slug) => paths.push(...bothLanguages(`/projects/${slug}`)))
  for (const [prefix, posts] of [
    ['', notes],
    ['/en', englishNotes],
  ]) {
    posts.forEach((post) => {
      if (validSlug(post.slug)) paths.push(`${prefix}/blog/${post.slug}`)
      ;(post.tags || []).forEach((tag) => paths.push(`${prefix}/tags/${kebabCase(tag)}`))
    })
    // Include the former final page when deletion reduces the page count.
    for (let page = 1; page <= Math.ceil(posts.length / 5) + 1; page++)
      paths.push(`${prefix}/blog/page/${page}`)
  }
  if (['note', 'project'].includes(body._type)) {
    for (const value of [body.slug, body.previousSlug]) {
      const slug = value?.current ?? value
      if (slug)
        paths.push(...bothLanguages(`/${body._type === 'note' ? 'blog' : 'projects'}/${slug}`))
    }
  }
  ;[...(body.tags || []), ...(body.previousTags || [])].forEach((tag) =>
    paths.push(...bothLanguages(`/tags/${kebabCase(tag)}`))
  )
  ;[...(body.englishTags || []), ...(body.previousEnglishTags || [])].forEach((tag) =>
    paths.push(`/en/tags/${kebabCase(tag)}`)
  )
  return paths
})
