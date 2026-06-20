import LayoutWrapper from '@/components/LayoutWrapper'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getPageContent } from '@/lib/content'

export async function getStaticProps() {
  return {
    props: { pageContent: await getPageContent('research') },
    revalidate: 60,
  }
}

export default function Research({ pageContent }) {
  const cards = pageContent?.cards || []

  return (
    <LayoutWrapper>
      <PageSEO
        title={pageContent?.seoTitle || `Investigacion - ${siteMetadata.author}`}
        description={pageContent?.seoDescription}
      />
      <section className="pb-16 pt-8">
        <div className="max-w-4xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-primary-700 dark:text-secondary-400">
            {pageContent?.eyebrow}
          </p>
          <h1 className="text-4xl font-black tracking-tight text-gray-950 dark:text-white md:text-6xl">
            {pageContent?.title}
          </h1>
          <p className="mt-8 text-xl leading-9 text-gray-600 dark:text-gray-300">
            {pageContent?.description}
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {cards.map((line) => (
            <article
              key={line.name}
              className="rounded-md border border-gray-200 bg-white p-6 transition hover:border-gray-400 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-600"
            >
              <h2 className="text-2xl font-bold text-gray-950 dark:text-white">{line.name}</h2>
              <p className="mt-4 leading-8 text-gray-600 dark:text-gray-300">{line.description}</p>
            </article>
          ))}
        </div>
      </section>
    </LayoutWrapper>
  )
}
