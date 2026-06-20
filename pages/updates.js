import LayoutWrapper from '@/components/LayoutWrapper'
import { PageSEO } from '@/components/SEO'
import UpdateCard from '@/components/UpdateCard'
import siteMetadata from '@/data/siteMetadata'
import { getPageContent, getUpdates } from '@/lib/content'

export async function getStaticProps() {
  const [updatesData, pageContent] = await Promise.all([getUpdates(), getPageContent('updates')])
  return {
    props: { updatesData, pageContent },
    revalidate: 60,
  }
}

export default function Updates({ updatesData, pageContent }) {
  const [featuredUpdate, ...updates] = updatesData

  return (
    <LayoutWrapper>
      <PageSEO
        title={pageContent?.seoTitle || `Updates - ${siteMetadata.author}`}
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
          <p className="max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
            {pageContent?.description}
          </p>
        </div>

        <div className="grid gap-6 py-12 lg:grid-cols-[1.1fr_0.9fr]">
          {featuredUpdate && <UpdateCard update={featuredUpdate} large />}
          <div className="grid gap-6">
            {updates.slice(0, 2).map((update) => (
              <UpdateCard key={update.title} update={update} />
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {updates.slice(2).map((update) => (
            <UpdateCard key={update.title} update={update} />
          ))}
        </div>
      </section>
    </LayoutWrapper>
  )
}
