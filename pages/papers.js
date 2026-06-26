import Head from 'next/head'
import LayoutWrapper from '@/components/LayoutWrapper'
import { PageSEO } from '@/components/SEO'
import EditablePageHeader from '@/components/EditablePageHeader'
import PaperCard from '@/components/PaperCard'
import siteMetadata from '@/data/siteMetadata'
import { getPageContent, getPapers } from '@/lib/content'

export async function getStaticProps({ lang = 'es' } = {}) {
  const [papersData, pageContent] = await Promise.all([
    getPapers(lang),
    getPageContent('papers', lang),
  ])

  return {
    props: { papersData, pageContent, lang },
    revalidate: 60,
  }
}

export default function Papers({ papersData, pageContent, lang = 'es' }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: pageContent?.title || 'Papers',
    itemListElement: papersData.map((paper, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'ScholarlyArticle',
        name: paper.title,
        description: paper.summary,
        datePublished: paper.year ? String(paper.year) : undefined,
        url: paper.href || paper.doi || undefined,
        sameAs: paper.doi || undefined,
        author: Array.isArray(paper.authors)
          ? paper.authors.map((author) => ({ '@type': 'Person', name: author.name }))
          : undefined,
      },
    })),
  }

  return (
    <LayoutWrapper lang={lang}>
      <PageSEO
        title={pageContent?.seoTitle || `Papers - ${siteMetadata.author}`}
        description={pageContent?.seoDescription}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData, null, 2) }}
        />
      </Head>
      <section className="pb-16 pt-8">
        <EditablePageHeader content={pageContent} />

        <div className="grid gap-6 py-12 md:grid-cols-2">
          {papersData.map((paper) => (
            <PaperCard key={paper.title} paper={paper} />
          ))}
        </div>
      </section>
    </LayoutWrapper>
  )
}
