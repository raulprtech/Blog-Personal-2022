import Link from 'next/link'
import ArticleShell from '@/components/ArticleShell'
import LayoutWrapper from '@/components/LayoutWrapper'
import SanityPortableText from '@/components/SanityPortableText'
import { CollaboratorLine, RelatedConnections } from '@/components/ContentMeta'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getProjectBySlug, getProjectSlugs } from '@/lib/content'
import { localizedPath } from '@/lib/i18n'

export async function getStaticPaths() {
  const slugs = await getProjectSlugs()
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params, lang = 'es' }) {
  const project = await getProjectBySlug(params.slug, lang)
  if (!project) return { notFound: true, revalidate: 60 }
  return { props: { project, lang }, revalidate: 60 }
}

export default function ProjectPage({ project, lang = 'es' }) {
  const actions = [
    ...(project.externalHref
      ? [
          {
            label: lang === 'en' ? 'Project website' : 'Sitio del proyecto',
            href: project.externalHref,
          },
        ]
      : []),
    ...project.links.filter((link) => link?.label && link?.href),
  ]

  return (
    <LayoutWrapper lang={lang}>
      <PageSEO
        title={project.seoTitle || `${project.title} - ${siteMetadata.author}`}
        description={project.seoDescription || project.description}
      />
      <div className="pt-8">
        <Link
          href={localizedPath('/projects', lang)}
          className="text-sm font-semibold text-primary-700 dark:text-secondary-400"
        >
          {lang === 'en' ? 'Back to projects' : 'Volver a proyectos'}
        </Link>
      </div>
      <ArticleShell
        title={project.title}
        summary={project.description}
        tags={project.tags}
        image={project.imgSrc}
        imageAlt={project.imageAlt}
        kindLabel={project.category || (lang === 'en' ? 'Project' : 'Proyecto')}
        actions={actions}
        lang={lang}
        sidebar={
          <>
            {(project.status || project.role) && (
              <dl className="space-y-5 text-sm">
                {project.status && (
                  <div>
                    <dt className="font-semibold text-gray-700 dark:text-gray-200">
                      {lang === 'en' ? 'Status' : 'Estado'}
                    </dt>
                    <dd className="mt-1 text-gray-500 dark:text-gray-400">{project.status}</dd>
                  </div>
                )}
                {project.role && (
                  <div>
                    <dt className="font-semibold text-gray-700 dark:text-gray-200">
                      {lang === 'en' ? 'Role' : 'Rol'}
                    </dt>
                    <dd className="mt-1 text-gray-500 dark:text-gray-400">{project.role}</dd>
                  </div>
                )}
              </dl>
            )}
            <CollaboratorLine collaborators={project.collaborators} />
            <RelatedConnections
              groups={[
                {
                  title: lang === 'en' ? 'Research lines' : 'Líneas de investigación',
                  items: project.researchItems,
                },
                { title: 'Papers', items: project.papers },
                { title: lang === 'en' ? 'Ventures' : 'Emprendimientos', items: project.ventures },
                {
                  title: lang === 'en' ? 'Education and credentials' : 'Educación y credenciales',
                  items: project.credentials,
                },
                { title: lang === 'en' ? 'Resources' : 'Recursos', items: project.resources },
                {
                  title: lang === 'en' ? 'Trajectory' : 'Trayectoria',
                  items: project.trajectoryItems,
                },
                {
                  title: lang === 'en' ? 'Talks and workshops' : 'Charlas y talleres',
                  items: project.talks,
                },
              ]}
            />
          </>
        }
      >
        <SanityPortableText value={project.body} />
      </ArticleShell>
    </LayoutWrapper>
  )
}
