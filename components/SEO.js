import Head from 'next/head'
import { useRouter } from 'next/router'
import siteMetadata from '@/data/siteMetadata'
import { getPathWithoutLang, localizedPath } from '@/lib/i18n'

const alumniOf = [
  {
    '@type': 'EducationalOrganization',
    name: 'Centro de Investigaci\u00f3n y de Estudios Avanzados del Instituto Polit\u00e9cnico Nacional',
    alternateName: 'Cinvestav',
    url: 'https://www.cinvestav.mx/',
  },
  {
    '@type': 'EducationalOrganization',
    name: 'Tecnol\u00f3gico Nacional de M\u00e9xico Campus Lerma',
    alternateName: 'Instituto Tecnol\u00f3gico de Lerma',
    url: 'https://lerma.tecnm.mx/',
  },
  {
    '@type': 'EducationalOrganization',
    name: 'CECyTEC Plantel Campeche',
    alternateName: 'Colegio de Estudios Cient\u00edficos y Tecnol\u00f3gicos',
    url: 'https://www.cecytcampeche.edu.mx/',
  },
]

const hasCredential = [
  {
    '@type': 'EducationalOccupationalCredential',
    name: 'Cursos y constancias destacadas de Platzi',
    credentialCategory: 'Professional certificate',
    recognizedBy: {
      '@type': 'Organization',
      name: 'Platzi',
      url: 'https://platzi.com/',
    },
    url: 'https://platzi.com/p/raulprtech/',
  },
]

const sameAs = [
  siteMetadata.github,
  siteMetadata.linkedin,
  siteMetadata.twitter,
  siteMetadata.youtube,
  siteMetadata.instagram,
  siteMetadata.devto,
  siteMetadata.medium,
  siteMetadata.researchgate,
  siteMetadata.platzi,
].filter(Boolean)

const personStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${siteMetadata.siteUrl}/#person`,
  name: siteMetadata.author,
  url: siteMetadata.siteUrl,
  sameAs,
  alumniOf,
  hasCredential,
}

const personAuthor = (name = siteMetadata.author) => ({
  '@type': 'Person',
  name,
  sameAs,
  alumniOf,
  hasCredential,
})

const toAbsoluteUrl = (url) => {
  if (!url) return `${siteMetadata.siteUrl}/api/site-image`
  if (/^https?:\/\//.test(url)) return url
  return `${siteMetadata.siteUrl}${url}`
}

const CommonSEO = ({ title, description, ogType, ogImage, twImage, canonicalUrl }) => {
  const router = useRouter()
  const cleanPath = (router.asPath || '/').split('#')[0].split('?')[0]
  const basePath = getPathWithoutLang(cleanPath)
  const isEnglish = cleanPath === '/en' || cleanPath.startsWith('/en/')
  const locale = isEnglish ? 'en_US' : 'es_MX'
  const alternateLocale = isEnglish ? 'es_MX' : 'en_US'
  const canonicalHref =
    canonicalUrl || `${siteMetadata.siteUrl}${localizedPath(basePath, isEnglish ? 'en' : 'es')}`
  const spanishHref = `${siteMetadata.siteUrl}${localizedPath(basePath, 'es')}`
  const englishHref = `${siteMetadata.siteUrl}${localizedPath(basePath, 'en')}`
  const breadcrumbSegments = basePath.split('/').filter(Boolean)
  const webSiteStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteMetadata.siteUrl}/#website`,
    name: siteMetadata.title,
    url: siteMetadata.siteUrl,
    inLanguage: ['es-MX', 'en'],
    author: {
      '@id': `${siteMetadata.siteUrl}/#person`,
    },
  }

  const webPageStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': canonicalHref,
    url: canonicalHref,
    name: title,
    description,
    inLanguage: isEnglish ? 'en' : 'es-MX',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${siteMetadata.siteUrl}/#website`,
      name: siteMetadata.title,
      url: siteMetadata.siteUrl,
    },
    author: {
      '@id': `${siteMetadata.siteUrl}/#person`,
    },
  }

  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isEnglish ? 'Home' : 'Inicio',
        item: `${siteMetadata.siteUrl}${localizedPath('/', isEnglish ? 'en' : 'es')}`,
      },
      ...breadcrumbSegments.map((segment, index) => {
        const route = `/${breadcrumbSegments.slice(0, index + 1).join('/')}`
        return {
          '@type': 'ListItem',
          position: index + 2,
          name: segment.replace(/-/g, ' '),
          item: `${siteMetadata.siteUrl}${localizedPath(route, isEnglish ? 'en' : 'es')}`,
        }
      }),
    ],
  }

  return (
    <Head>
      <title>{title}</title>
      <meta
        name="robots"
        content="follow, index, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />
      <meta
        name="googlebot"
        content="follow, index, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />
      <meta name="description" content={description} />
      <meta property="og:url" content={canonicalHref} />
      <meta property="og:locale" content={locale} />
      <meta property="og:locale:alternate" content={alternateLocale} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteMetadata.title} />
      <meta property="og:description" content={description} />
      <meta property="og:title" content={title} />
      {ogImage.constructor.name === 'Array' ? (
        ogImage.map(({ url }) => <meta property="og:image" content={url} key={url} />)
      ) : (
        <meta property="og:image" content={ogImage} key={ogImage} />
      )}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={siteMetadata.twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={twImage} />
      <link rel="canonical" href={canonicalHref} />
      <link rel="alternate" hrefLang="es-MX" href={spanishHref} />
      <link rel="alternate" hrefLang="en" href={englishHref} />
      <link rel="alternate" hrefLang="x-default" href={spanishHref} />
      <link rel="alternate" type="text/markdown" href={`${siteMetadata.siteUrl}/llms.txt`} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webSiteStructuredData, null, 2),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageStructuredData, null, 2),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData, null, 2),
        }}
      />
    </Head>
  )
}

export const PageSEO = ({ title, description }) => {
  const ogImageUrl = siteMetadata.siteUrl + '/api/site-image'
  const twImageUrl = siteMetadata.siteUrl + '/api/site-image'
  return (
    <>
      <CommonSEO
        title={title}
        description={description}
        ogType="website"
        ogImage={ogImageUrl}
        twImage={twImageUrl}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personStructuredData, null, 2),
          }}
        />
      </Head>
    </>
  )
}

export const TagSEO = ({ title, description }) => {
  const ogImageUrl = siteMetadata.siteUrl + '/api/site-image'
  const twImageUrl = siteMetadata.siteUrl + '/api/site-image'
  const router = useRouter()
  return (
    <>
      <CommonSEO
        title={title}
        description={description}
        ogType="website"
        ogImage={ogImageUrl}
        twImage={twImageUrl}
      />
      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${description} - RSS feed`}
          href={`${siteMetadata.siteUrl}${router.asPath}/feed.xml`}
        />
      </Head>
    </>
  )
}

export const BlogSEO = ({
  authorDetails,
  title,
  summary,
  date,
  lastmod,
  url,
  images = [],
  canonicalUrl,
}) => {
  const router = useRouter()
  const publishedAt = new Date(date).toISOString()
  const modifiedAt = new Date(lastmod || date).toISOString()
  let imagesArr =
    images.length === 0 ? ['/api/site-image'] : typeof images === 'string' ? [images] : images

  const featuredImages = imagesArr.map((img) => {
    return {
      '@type': 'ImageObject',
      url: toAbsoluteUrl(img),
    }
  })

  let authorList
  if (authorDetails) {
    authorList = authorDetails.map((author) => {
      return personAuthor(author.name)
    })
  } else {
    authorList = personAuthor()
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: title,
    image: featuredImages,
    datePublished: publishedAt,
    dateModified: modifiedAt,
    author: authorList,
    publisher: {
      '@type': 'Organization',
      name: siteMetadata.author,
      logo: {
        '@type': 'ImageObject',
        url: toAbsoluteUrl(siteMetadata.siteLogo),
      },
    },
    description: summary,
  }

  const twImageUrl = featuredImages[0].url

  return (
    <>
      <CommonSEO
        title={title}
        description={summary}
        ogType="article"
        ogImage={featuredImages}
        twImage={twImageUrl}
        canonicalUrl={canonicalUrl}
      />
      <Head>
        {date && <meta property="article:published_time" content={publishedAt} />}
        {lastmod && <meta property="article:modified_time" content={modifiedAt} />}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData, null, 2),
          }}
        />
      </Head>
    </>
  )
}
