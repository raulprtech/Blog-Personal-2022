import Head from 'next/head'
import Image from '@/components/Image'
import LayoutWrapper from '@/components/LayoutWrapper'
import { PageSEO } from '@/components/SEO'
import EditablePageHeader from '@/components/EditablePageHeader'
import CredentialCard from '@/components/CredentialCard'
import siteMetadata from '@/data/siteMetadata'
import { getCredentials, getPageContent } from '@/lib/content'

export async function getStaticProps({ lang = 'es' } = {}) {
  const [credentialsData, pageContent] = await Promise.all([
    getCredentials(lang),
    getPageContent('credentials', lang),
  ])

  return {
    props: { credentialsData, pageContent, lang },
    revalidate: 60,
  }
}

export default function Credentials({ credentialsData, pageContent, lang = 'es' }) {
  const educationProfiles = pageContent?.educationProfiles || []
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: pageContent?.title || 'Credentials',
    itemListElement: credentialsData.map((credential, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'EducationalOccupationalCredential',
        name: credential.title,
        description: credential.summary,
        credentialCategory: credential.credentialCategory || 'Course certificate',
        url: credential.href,
        recognizedBy: credential.issuer
          ? { '@type': 'Organization', name: credential.issuer }
          : undefined,
      },
    })),
  }

  return (
    <LayoutWrapper lang={lang}>
      <PageSEO
        title={pageContent?.seoTitle || `Constancias - ${siteMetadata.author}`}
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

        {educationProfiles.length > 0 && (
          <div className="border-b border-gray-200 py-10 dark:border-gray-800">
            <p className="text-xs font-black uppercase text-primary-700 dark:text-secondary-300">
              {pageContent?.educationProfilesTitle ||
                (lang === 'en' ? 'Learning profiles' : 'Perfiles educativos')}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {educationProfiles.map((profile) => (
                <a
                  key={`${profile.provider}-${profile.href}`}
                  href={profile.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex min-h-[3.5rem] items-center gap-3 rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-950 transition hover:border-primary-600 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:hover:border-secondary-400 dark:hover:bg-gray-900"
                  title={profile.description}
                >
                  {profile.image && (
                    <Image
                      src={profile.image}
                      alt={profile.imageAlt || profile.provider}
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-sm object-contain"
                    />
                  )}
                  <span>
                    <span className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400">
                      {profile.provider}
                    </span>
                    <span className="block text-sm font-black">{profile.label}</span>
                  </span>
                  <span aria-hidden="true" className="ml-1 transition group-hover:translate-x-0.5">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="grid gap-6 py-12 md:grid-cols-2">
          {credentialsData.map((credential) => (
            <CredentialCard key={credential.title} credential={credential} />
          ))}
        </div>
      </section>
    </LayoutWrapper>
  )
}
