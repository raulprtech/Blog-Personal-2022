import Head from 'next/head'
import Link from 'next/link'
import Image from '@/components/Image'
import LayoutWrapper from '@/components/LayoutWrapper'
import { PageSEO } from '@/components/SEO'
import EditablePageHeader from '@/components/EditablePageHeader'
import CredentialCard from '@/components/CredentialCard'
import { ContentBadge, RelatedConnections } from '@/components/ContentMeta'
import siteMetadata from '@/data/siteMetadata'
import { getCredentials, getPageContent, getTrajectory } from '@/lib/content'

const isAcademicEducation = (item) => {
  const category = item.category?.toLocaleLowerCase('es')
  return item.showOnEducationPage || category === 'education' || category === 'educación'
}

function AcademicCard({ item, lang }) {
  return (
    <article className="h-full rounded-md border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950 md:p-7">
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <ContentBadge tone="accent">
          {lang === 'en' ? 'Academic education' : 'Formación académica'}
        </ContentBadge>
        <ContentBadge tone="muted">{item.period}</ContentBadge>
      </div>
      <h2 className="text-2xl font-black tracking-tight text-gray-950 dark:text-white">
        {item.title}
      </h2>
      {item.organization && (
        <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-primary-700 dark:text-secondary-400">
          {item.organization}
        </p>
      )}
      {item.summary && (
        <p className="mt-4 leading-8 text-gray-600 dark:text-gray-300">{item.summary}</p>
      )}
      <div className="mt-6">
        <RelatedConnections
          groups={[
            {
              title: lang === 'en' ? 'Research lines' : 'Líneas de investigación',
              items: item.researchItems,
            },
            { title: lang === 'en' ? 'Projects' : 'Proyectos', items: item.projects },
            { title: 'Papers', items: item.papers },
            { title: lang === 'en' ? 'Credentials' : 'Credenciales', items: item.credentials },
            { title: lang === 'en' ? 'Resources' : 'Recursos', items: item.resources },
            { title: lang === 'en' ? 'Ventures' : 'Emprendimientos', items: item.ventures },
            {
              title: lang === 'en' ? 'Talks and workshops' : 'Charlas y talleres',
              items: item.talks,
            },
          ]}
        />
      </div>
      {item.href && (
        <Link
          href={item.href}
          className="mt-7 inline-flex text-sm font-semibold text-primary-700 transition hover:text-primary-800 dark:text-secondary-400"
        >
          {lang === 'en' ? 'View details' : 'Ver detalles'} <span aria-hidden="true">-&gt;</span>
        </Link>
      )}
    </article>
  )
}

export async function getStaticProps({ lang = 'es' } = {}) {
  const [credentialsData, trajectoryData, pageContent] = await Promise.all([
    getCredentials(lang),
    getTrajectory(lang),
    getPageContent('credentials', lang),
  ])
  return {
    props: {
      credentialsData,
      academicEducation: trajectoryData.filter(isAcademicEducation),
      pageContent,
      lang,
    },
    revalidate: 60,
  }
}

export default function Education({
  credentialsData,
  academicEducation,
  pageContent,
  lang = 'es',
}) {
  const educationProfiles = pageContent?.educationProfiles || []
  const structuredItems = [
    ...academicEducation.map((item) => ({
      '@type': 'EducationalOccupationalCredential',
      name: item.title,
      description: item.summary,
      url: item.href,
      recognizedBy: item.organization
        ? { '@type': 'EducationalOrganization', name: item.organization }
        : undefined,
    })),
    ...credentialsData.map((item) => ({
      '@type': 'EducationalOccupationalCredential',
      name: item.title,
      description: item.summary,
      credentialCategory: item.credentialCategory || 'Course certificate',
      url: item.href,
      recognizedBy: item.issuer ? { '@type': 'Organization', name: item.issuer } : undefined,
    })),
  ]
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: pageContent?.title || (lang === 'en' ? 'Education' : 'Educación'),
    itemListElement: structuredItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item,
    })),
  }

  return (
    <LayoutWrapper lang={lang}>
      <PageSEO
        title={
          pageContent?.seoTitle ||
          [lang === 'en' ? 'Education' : 'Educación', siteMetadata.author].join(' - ')
        }
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
          <section className="border-b border-gray-200 py-10 dark:border-gray-800">
            <h2 className="text-xs font-black uppercase text-primary-700 dark:text-secondary-300">
              {pageContent?.educationProfilesTitle ||
                (lang === 'en' ? 'Learning profiles' : 'Perfiles educativos')}
            </h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {educationProfiles.map((profile) => (
                <a
                  key={[profile.provider, profile.href].join('-')}
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
          </section>
        )}
        {academicEducation.length > 0 && (
          <section className="border-b border-gray-200 py-12 dark:border-gray-800">
            <h2 className="text-2xl font-black tracking-tight text-gray-950 dark:text-white">
              {pageContent?.academicEducationTitle ||
                (lang === 'en' ? 'Academic education' : 'Formación académica')}
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {academicEducation.map((item) => (
                <AcademicCard key={[item.period, item.title].join('-')} item={item} lang={lang} />
              ))}
            </div>
          </section>
        )}
        {credentialsData.length > 0 && (
          <section className="py-12">
            <h2 className="text-2xl font-black tracking-tight text-gray-950 dark:text-white">
              {pageContent?.credentialsTitle ||
                (lang === 'en' ? 'Certificates and courses' : 'Certificados y cursos')}
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {credentialsData.map((credential) => (
                <CredentialCard key={credential.title} credential={credential} />
              ))}
            </div>
          </section>
        )}
      </section>
    </LayoutWrapper>
  )
}
