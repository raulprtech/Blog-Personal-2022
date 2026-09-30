import { localizedPath } from '@/lib/i18n'

export function projectLinks(project, lang = 'es') {
  const slug = typeof project.slug === 'string' ? project.slug : project.slug?.current
  const pageHref =
    project.pageEnabled === true && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug || '')
      ? localizedPath(`/projects/${slug}`, lang)
      : null

  return {
    ...project,
    slug: slug || null,
    externalHref: project.href || null,
    pageHref,
    href: pageHref || project.href || null,
  }
}
