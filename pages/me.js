import Link from 'next/link'
import Image from '@/components/Image'
import LayoutWrapper from '@/components/LayoutWrapper'
import SocialLinks from '@/components/SocialLinks'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import fallbackSiteSettings from '@/data/siteSettings'
import { getPageContent } from '@/lib/content'
import { getSiteSettings } from '@/lib/siteSettings'

const colorStyles = {
  blue: 'border-cyan-200 bg-cyan-50 text-cyan-950 hover:border-cyan-400 dark:border-cyan-900 dark:bg-cyan-950 dark:text-cyan-100',
  cyan: 'border-secondary-300 bg-secondary-50 text-gray-950 hover:border-secondary-400 dark:border-secondary-700 dark:bg-secondary-950 dark:text-secondary-100',
  green:
    'border-emerald-200 bg-emerald-50 text-emerald-950 hover:border-emerald-400 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-100',
  red: 'border-red-200 bg-red-50 text-red-950 hover:border-red-400 dark:border-red-900 dark:bg-red-950 dark:text-red-100',
  orange:
    'border-orange-200 bg-orange-50 text-orange-950 hover:border-orange-400 dark:border-orange-900 dark:bg-orange-950 dark:text-orange-100',
  dark: 'border-gray-900 bg-gray-950 text-white hover:border-primary-600 dark:border-gray-700 dark:bg-white dark:text-gray-950',
  default:
    'border-gray-200 bg-white text-gray-950 hover:border-gray-400 dark:border-gray-800 dark:bg-gray-950 dark:text-white dark:hover:border-gray-600',
}

function LinkButton({ item }) {
  if (!item?.title || !item?.href) return null

  const isExternal = item.href.startsWith('http')
  const colorClass = colorStyles[item.bgColor] || colorStyles.default

  return (
    <Link
      href={item.href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
      className={`group grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-md border p-4 text-left transition ${colorClass}`}
    >
      {item.image ? (
        <Image
          src={item.image}
          alt={item.imageAlt || item.title}
          width={96}
          height={96}
          className="h-12 w-12 rounded-md object-cover"
        />
      ) : (
        <span className="flex h-12 w-12 items-center justify-center rounded-md border border-current/15 bg-white/50 text-sm font-black dark:bg-black/10">
          {item.emoji || item.title.slice(0, 2).toUpperCase()}
        </span>
      )}
      <span>
        <span className="block text-sm font-black tracking-tight sm:text-base">{item.title}</span>
        {item.description && (
          <span className="mt-1 block text-xs leading-5 opacity-75 sm:text-sm">
            {item.description}
          </span>
        )}
      </span>
      <span aria-hidden="true" className="text-lg transition group-hover:translate-x-0.5">
        -&gt;
      </span>
    </Link>
  )
}

export async function getStaticProps({ lang = 'es' } = {}) {
  const [pageContent, siteSettings] = await Promise.all([
    getPageContent('me', lang),
    getSiteSettings(),
  ])

  return {
    props: { pageContent, siteSettings, lang },
    revalidate: 60,
  }
}

export default function Me({ pageContent, siteSettings, lang = 'es' }) {
  const linkPage = pageContent?.linkPage || {}
  const settings = siteSettings || fallbackSiteSettings
  const displayName = pageContent?.title || settings.author || siteMetadata.author
  const handle = linkPage.handle || siteMetadata.nickname
  const avatar = linkPage.avatar || '/static/images/avatar_nblue.png'
  const socialLinks = linkPage.socialLinks?.length ? linkPage.socialLinks : settings.socialLinks
  const links = linkPage.links || []

  return (
    <LayoutWrapper header={false} lang={lang}>
      <PageSEO
        title={pageContent?.seoTitle || `Links - ${displayName} - ${handle}`}
        description={pageContent?.seoDescription || `Enlaces principales de ${displayName}`}
      />
      <main className="mx-auto min-h-screen max-w-xl px-4 py-8 sm:py-12">
        <section className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-8 text-center dark:border-gray-800 dark:bg-gray-900/60">
            <Image
              src={avatar}
              alt={linkPage.imageAlt || displayName}
              width={320}
              height={320}
              className="mx-auto h-32 w-32 rounded-full border border-gray-200 object-cover dark:border-gray-700"
            />
            <h1 className="mt-5 text-2xl font-black tracking-tight text-gray-950 dark:text-white">
              {displayName}
            </h1>
            {handle && (
              <p className="mt-1 text-sm font-semibold text-gray-500 dark:text-gray-400">
                {handle}
              </p>
            )}
            {(linkPage.bio || pageContent?.description) && (
              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-gray-600 dark:text-gray-300">
                {linkPage.bio || pageContent.description}
              </p>
            )}
            <SocialLinks
              links={socialLinks}
              size="6"
              className="mt-6 flex flex-wrap justify-center gap-4"
            />
          </div>

          <div className="space-y-3 p-4 sm:p-5">
            {links.map((item, index) => (
              <LinkButton key={`${item.href}-${item.title}-${index}`} item={item} />
            ))}
          </div>
        </section>
      </main>
    </LayoutWrapper>
  )
}
