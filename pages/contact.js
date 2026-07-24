import Head from 'next/head'
import EditablePageHeader from '@/components/EditablePageHeader'
import LayoutWrapper from '@/components/LayoutWrapper'
import MarkdownText from '@/components/MarkdownText'
import { PageSEO } from '@/components/SEO'
import SocialLinks from '@/components/SocialLinks'
import siteMetadata from '@/data/siteMetadata'
import { getPageContent } from '@/lib/content'
import { getSiteSettings } from '@/lib/siteSettings'

const contactCopy = {
  es: {
    eyebrow: 'Contacto directo',
    title: 'Las mejores conversaciones empiezan con contexto.',
    description:
      'Para propuestas profesionales, incluye el problema, el alcance, el equipo y el resultado que tienes en mente. Respondo personalmente desde mi correo habitual.',
    availability: 'Canales profesionales',
  },
  en: {
    eyebrow: 'Direct contact',
    title: 'The best conversations begin with context.',
    description:
      'For professional inquiries, include the problem, scope, team and outcome you have in mind. I reply personally from my regular inbox.',
    availability: 'Professional channels',
  },
}

export async function getStaticProps({ lang = 'es' } = {}) {
  const [pageContent, siteSettings] = await Promise.all([
    getPageContent('contact', lang),
    getSiteSettings(),
  ])

  return {
    props: { pageContent, siteSettings, lang },
    revalidate: 60,
  }
}

export default function Contact({ pageContent, siteSettings, lang = 'es' }) {
  const copy = contactCopy[lang] || contactCopy.es
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: pageContent?.title,
    description: pageContent?.seoDescription || pageContent?.description,
    url: `${siteMetadata.siteUrl}${lang === 'en' ? '/en/contact' : '/contact'}`,
    about: { '@id': `${siteMetadata.siteUrl}/#person` },
  }

  return (
    <LayoutWrapper lang={lang}>
      <PageSEO title={pageContent?.seoTitle} description={pageContent?.seoDescription} />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <section className="pb-16 pt-8">
        <EditablePageHeader content={pageContent} />

        <div className="grid gap-12 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="grid gap-px overflow-hidden rounded-md border border-gray-200 bg-gray-200 dark:border-gray-800 dark:bg-gray-800 sm:grid-cols-2">
            {(pageContent?.bodySections || []).map((item) => (
              <article key={item.heading} className="bg-white p-6 dark:bg-gray-950">
                {item.eyebrow && (
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary-700 dark:text-secondary-400">
                    {item.eyebrow}
                  </p>
                )}
                <h2 className="mt-3 text-xl font-black tracking-tight text-gray-950 dark:text-white">
                  {item.heading}
                </h2>
                <MarkdownText
                  className="mt-3 space-y-3"
                  paragraphClassName="leading-7 text-gray-600 dark:text-gray-300"
                >
                  {item.text}
                </MarkdownText>
              </article>
            ))}
          </div>

          <aside className="border-y border-gray-200 py-8 dark:border-gray-800 lg:sticky lg:top-28">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-700 dark:text-secondary-400">
              {copy.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-950 dark:text-white">
              {copy.title}
            </h2>
            <p className="mt-4 leading-8 text-gray-600 dark:text-gray-300">{copy.description}</p>
            <p className="mt-8 text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
              {copy.availability}
            </p>
            <SocialLinks
              links={siteSettings?.socialLinks}
              size="7"
              className="mt-5 flex flex-wrap items-center gap-5"
            />
          </aside>
        </div>
      </section>
    </LayoutWrapper>
  )
}
