import Head from 'next/head'
import LayoutWrapper from '@/components/LayoutWrapper'
import { PageSEO } from '@/components/SEO'
import EditablePageHeader from '@/components/EditablePageHeader'
import TalkCard from '@/components/TalkCard'
import siteMetadata from '@/data/siteMetadata'
import { getPageContent, getTalks } from '@/lib/content'

export async function getStaticProps({ lang = 'es' } = {}) {
  const [talksData, pageContent] = await Promise.all([
    getTalks(lang),
    getPageContent('talks', lang),
  ])

  return {
    props: { talksData, pageContent, lang },
    revalidate: 60,
  }
}

export default function Talks({ talksData, pageContent, lang = 'es' }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: pageContent?.title || 'Talks',
    itemListElement: talksData.map((talk, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Event',
        name: talk.title,
        description: talk.summary,
        startDate: talk.date,
        eventAttendanceMode: talk.location?.toLowerCase().includes('online')
          ? 'https://schema.org/OnlineEventAttendanceMode'
          : undefined,
        location: talk.location,
        url: talk.href || talk.videoHref || talk.slidesHref || undefined,
        organizer: talk.organization
          ? { '@type': 'Organization', name: talk.organization }
          : undefined,
      },
    })),
  }

  return (
    <LayoutWrapper lang={lang}>
      <PageSEO
        title={pageContent?.seoTitle || `Charlas y talleres - ${siteMetadata.author}`}
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
          {talksData.map((talk) => (
            <TalkCard key={`${talk.date}-${talk.title}`} talk={talk} />
          ))}
        </div>
      </section>
    </LayoutWrapper>
  )
}
