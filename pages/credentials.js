import Head from 'next/head'
import Link from 'next/link'
import LayoutWrapper from '@/components/LayoutWrapper'
import { PageSEO } from '@/components/SEO'
import EditablePageHeader from '@/components/EditablePageHeader'
import CredentialCard from '@/components/CredentialCard'
import siteMetadata from '@/data/siteMetadata'
import { getCredentials, getPageContent } from '@/lib/content'

const platziProfileUrl = 'https://platzi.com/p/raulprtech/'

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
        <EditablePageHeader content={pageContent}>
          <div className="mt-7">
            <Link
              href={platziProfileUrl}
              className="inline-flex items-center justify-center rounded-md bg-gray-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-700 dark:bg-white dark:text-gray-950 dark:hover:bg-secondary-300"
            >
              {lang === 'en' ? 'View full Platzi profile' : 'Ver perfil completo en Platzi'}
            </Link>
          </div>
        </EditablePageHeader>

        <div className="grid gap-6 py-12 md:grid-cols-2">
          {credentialsData.map((credential) => (
            <CredentialCard key={credential.title} credential={credential} />
          ))}
        </div>
      </section>
    </LayoutWrapper>
  )
}
