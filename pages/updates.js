import LayoutWrapper from '@/components/LayoutWrapper'
import { PageSEO } from '@/components/SEO'
import UpdateCard from '@/components/UpdateCard'
import EditablePageHeader from '@/components/EditablePageHeader'
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
        <EditablePageHeader content={pageContent} />

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
