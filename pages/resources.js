import LayoutWrapper from '@/components/LayoutWrapper'
import { PageSEO } from '@/components/SEO'
import ResourceCard from '@/components/ResourceCard'
import EditablePageHeader from '@/components/EditablePageHeader'
import siteMetadata from '@/data/siteMetadata'
import { getPageContent, getResources } from '@/lib/content'

const fallbackCategories = ['papers', 'repos', 'blogs', 'books', 'talks', 'datasets']

export async function getStaticProps() {
  const [resourcesData, pageContent] = await Promise.all([
    getResources(),
    getPageContent('resources'),
  ])
  return {
    props: { resourcesData, pageContent },
    revalidate: 60,
  }
}

export default function Resources({ resourcesData, pageContent }) {
  const categories = pageContent?.categories || fallbackCategories

  return (
    <LayoutWrapper>
      <PageSEO
        title={pageContent?.seoTitle || `Recursos - ${siteMetadata.author}`}
        description={pageContent?.seoDescription}
      />
      <section className="pb-16 pt-8">
        <EditablePageHeader content={pageContent}>
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((category) => (
              <span
                key={category}
                className="border border-gray-200 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-gray-600 dark:border-gray-800 dark:text-gray-300"
              >
                {category}
              </span>
            ))}
          </div>
        </EditablePageHeader>

        <div className="grid gap-6 py-12 md:grid-cols-3">
          {resourcesData.map((resource) => (
            <ResourceCard key={resource.title} resource={resource} />
          ))}
        </div>
      </section>
    </LayoutWrapper>
  )
}
