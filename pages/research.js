import Image from 'next/image'
import LayoutWrapper from '@/components/LayoutWrapper'
import { PageSEO } from '@/components/SEO'
import EditablePageHeader from '@/components/EditablePageHeader'
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
        <EditablePageHeader content={pageContent} />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {cards.map((line) => (
            <article
              key={line.name}
              className="overflow-hidden rounded-md border border-gray-200 bg-white transition hover:border-gray-400 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-600"
            >
              {line.image && (
                <div className="relative aspect-[16/9] border-b border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900">
                  <Image
                    src={line.image}
                    alt={line.imageAlt || line.name}
                    fill
                    className="object-cover object-center"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-950 dark:text-white">{line.name}</h2>
                <p className="mt-4 leading-8 text-gray-600 dark:text-gray-300">
                  {line.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </LayoutWrapper>
  )
}
