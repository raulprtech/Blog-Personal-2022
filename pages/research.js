import Image from 'next/image'
import LayoutWrapper from '@/components/LayoutWrapper'
import { PageSEO } from '@/components/SEO'
import EditablePageHeader from '@/components/EditablePageHeader'
import siteMetadata from '@/data/siteMetadata'
import { CardLink, CollaboratorLine, RelatedConnections } from '@/components/ContentMeta'
import { getPageContent, getResearchItems } from '@/lib/content'

export async function getStaticProps({ lang = 'es' } = {}) {
  const [pageContent, researchItems] = await Promise.all([
    getPageContent('research', lang),
    getResearchItems(lang),
  ])

  return {
    props: { pageContent, researchItems, lang },
    revalidate: 60,
  }
}

export default function Research({ pageContent, researchItems, lang = 'es' }) {
  const cards = researchItems || pageContent?.cards || []

  return (
    <LayoutWrapper lang={lang}>
      <PageSEO
        title={pageContent?.seoTitle || `Investigacion - ${siteMetadata.author}`}
        description={pageContent?.seoDescription}
      />
      <section className="pb-16 pt-8">
        <EditablePageHeader content={pageContent} />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {cards.map((line) => (
            <article
              key={line._id || line.name || line.title}
              className="overflow-hidden rounded-md border border-gray-200 bg-white transition hover:border-gray-400 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-600"
            >
              {line.image && (
                <div className="relative aspect-[16/9] border-b border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900">
                  <Image
                    src={line.image}
                    alt={line.imageAlt || line.name || line.title}
                    fill
                    className="object-cover object-center"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-2xl font-black tracking-tight text-gray-950 dark:text-white">
                  {line.name || line.title}
                </h2>
                <p className="mt-4 leading-8 text-gray-600 dark:text-gray-300">
                  {line.description}
                </p>
                {line.collaborators && (
                  <div className="mt-4">
                    <CollaboratorLine collaborators={line.collaborators} />
                  </div>
                )}
                <div className="mt-6">
                  <RelatedConnections
                    groups={[
                      { title: 'Papers', items: line.papers },
                      { title: 'Proyectos', items: line.projects },
                      { title: 'Emprendimientos', items: line.ventures },
                      { title: 'Educación y credenciales', items: line.credentials },
                      { title: 'Recursos', items: line.resources },
                      { title: 'Trayectoria', items: line.trajectoryItems },
                    ]}
                  />
                </div>
                {line.href && (
                  <div className="mt-5">
                    <CardLink href={line.href}>{line.linkLabel || 'Ver contexto'}</CardLink>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </LayoutWrapper>
  )
}
