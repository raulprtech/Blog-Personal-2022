import LayoutWrapper from '@/components/LayoutWrapper'
import { PageSEO } from '@/components/SEO'
import ResourceCard from '@/components/ResourceCard'
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
        <div className="grid gap-10 border-b border-gray-200 pb-12 dark:border-gray-800 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-primary-700 dark:text-secondary-400">
              {pageContent?.eyebrow}
            </p>
            <h1 className="text-4xl font-black tracking-tight text-gray-950 dark:text-white md:text-6xl">
              {pageContent?.title}
            </h1>
          </div>
          <div>
            <p className="max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
              {pageContent?.description}
            </p>
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
          </div>
        </div>

        <div className="grid gap-6 py-12 md:grid-cols-3">
          {resourcesData.map((resource) => (
            <ResourceCard key={resource.title} resource={resource} />
          ))}
        </div>
      </section>
    </LayoutWrapper>
  )
}
