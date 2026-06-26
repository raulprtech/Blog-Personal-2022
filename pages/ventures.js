import LayoutWrapper from '@/components/LayoutWrapper'
import { PageSEO } from '@/components/SEO'
import EditablePageHeader from '@/components/EditablePageHeader'
import VentureCard from '@/components/VentureCard'
import siteMetadata from '@/data/siteMetadata'
import { getPageContent, getVentures } from '@/lib/content'

export async function getStaticProps({ lang = 'es' } = {}) {
  const [venturesData, pageContent] = await Promise.all([
    getVentures(lang),
    getPageContent('ventures', lang),
  ])

  return {
    props: { venturesData, pageContent, lang },
    revalidate: 60,
  }
}

export default function Ventures({ venturesData, pageContent, lang = 'es' }) {
  return (
    <LayoutWrapper lang={lang}>
      <PageSEO
        title={pageContent?.seoTitle || `Emprendimientos - ${siteMetadata.author}`}
        description={pageContent?.seoDescription}
      />
      <section className="pb-16 pt-8">
        <EditablePageHeader content={pageContent} />

        <div className="grid gap-6 py-12 md:grid-cols-2">
          {venturesData.map((venture) => (
            <VentureCard key={venture.title} venture={venture} />
          ))}
        </div>
      </section>
    </LayoutWrapper>
  )
}
