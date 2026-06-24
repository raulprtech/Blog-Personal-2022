import LayoutWrapper from '@/components/LayoutWrapper'
import { PageSEO } from '@/components/SEO'
import EditablePageHeader from '@/components/EditablePageHeader'
import PaperCard from '@/components/PaperCard'
import siteMetadata from '@/data/siteMetadata'
import { getPageContent, getPapers } from '@/lib/content'

export async function getStaticProps() {
  const [papersData, pageContent] = await Promise.all([getPapers(), getPageContent('papers')])

  return {
    props: { papersData, pageContent },
    revalidate: 60,
  }
}

export default function Papers({ papersData, pageContent }) {
  return (
    <LayoutWrapper>
      <PageSEO
        title={pageContent?.seoTitle || `Papers - ${siteMetadata.author}`}
        description={pageContent?.seoDescription}
      />
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
