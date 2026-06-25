import Link from 'next/link'
import SocialLinks from '@/components/SocialLinks'
import Image from '@/components/Image'
import { PageSEO } from '@/components/SEO'
import Quote from '@/components/Quotes/quote'
import siteMetadata from '@/data/siteMetadata'
import fallbackSiteSettings from '@/data/siteSettings'

const defaultContent = {
  seoDescription:
    'Perfil profesional, trayectoria, investigacion, proyectos y escritura tecnica de Raul Pacheco Rodriguez.',
  eyebrow: 'Acerca de',
  title: 'Investigacion, sistemas y escritura tecnica.',
  description:
    'Un resumen de mi perfil profesional: que construyo, que investigo y como conecto electronica, software, IA eficiente y divulgacion tecnica.',
  occupation: 'Ingeniero electronico e investigador en IA eficiente',
}

function AboutBody({ sections, children }) {
  if (!sections?.length) return children

  return (
    <div className="not-prose space-y-8">
      {sections.map((section) => (
        <section key={`${section.heading}-${section.text?.slice(0, 24)}`}>
          {section.eyebrow && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary-700 dark:text-secondary-400">
              {section.eyebrow}
            </p>
          )}
          {section.heading && (
            <h2 className="text-2xl font-black tracking-tight text-gray-950 dark:text-white">
              {section.heading}
            </h2>
          )}
          {section.text && (
            <p className="mt-4 leading-8 text-gray-600 dark:text-gray-300">{section.text}</p>
          )}
          {section.href && section.linkLabel && (
            <Link
              href={section.href}
              className="mt-4 inline-flex text-sm font-semibold text-primary-700 hover:text-primary-800 dark:text-secondary-400"
            >
              {section.linkLabel} <span aria-hidden="true">-&gt;</span>
            </Link>
          )}
        </section>
      ))}
    </div>
  )
}

export default function AuthorLayout({ children, frontMatter, pageContent, siteSettings }) {
  const { nickname, avatar, company, CV } = frontMatter
  const displayName = siteSettings?.author || siteMetadata.author
  const content = { ...defaultContent, ...(pageContent || {}) }
  const settings = siteSettings || fallbackSiteSettings
  const cvHref = settings.cvHref || CV
  const cvLabel = settings.cvLabel || 'Descargar CV'
  const socialLinks = settings.socialLinks || fallbackSiteSettings.socialLinks

  return (
    <>
      <PageSEO
        title={content.seoTitle || `Quien es ${displayName} - @${nickname}`}
        description={content.seoDescription}
      />
      <section className="divide-y divide-gray-200 dark:divide-gray-800">
        <div className="grid gap-10 pb-10 pt-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-primary-700 dark:text-secondary-400">
              {content.eyebrow}
            </p>
            <h1 className="text-4xl font-black tracking-tight text-gray-950 dark:text-white md:text-6xl">
              {content.title}
            </h1>
          </div>
          <div>
            <p className="max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
              {content.description}
            </p>
            {content.image && (
              <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900">
                <Image
                  src={content.image}
                  alt={content.imageAlt || content.title || 'About visual'}
                  width="1200"
                  height="675"
                  className="aspect-video w-full object-cover object-center"
                />
              </div>
            )}
          </div>
        </div>
        <article className="items-start space-y-8 xl:grid xl:grid-cols-3 xl:gap-x-10 xl:space-y-0">
          <aside className="pt-8">
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
              <div className="flex flex-col items-center">
                <Image
                  src={avatar}
                  alt="Raul Alberto Pacheco Rodriguez"
                  width="800"
                  height="800"
                  className="h-48 w-48 rounded-full border border-gray-200 object-cover dark:border-gray-800"
                />
                <h2 className="pb-2 pt-4 text-center text-2xl font-bold leading-8 tracking-tight text-gray-950 dark:text-white">
                  {displayName}
                </h2>
                <h3 className="text-center text-gray-500 dark:text-gray-400">
                  {content.occupation}
                </h3>
                <h4 className="text-center text-gray-500 dark:text-gray-400">{company}</h4>
                <SocialLinks links={socialLinks} size="6" className="flex space-x-3 pt-6" />
              </div>

              <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-800">
                <Link
                  href={cvHref}
                  className="group flex items-center justify-between rounded-md border border-gray-300 bg-gray-950 px-4 py-3 text-sm font-semibold text-white transition hover:border-primary-700 hover:bg-primary-700 dark:border-gray-700 dark:bg-white dark:text-gray-950 dark:hover:bg-secondary-300"
                >
                  <span>{cvLabel}</span>
                  <span aria-hidden="true" className="ml-4 transition group-hover:translate-x-0.5">
                    -&gt;
                  </span>
                </Link>
                <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
                  Version breve para revisar trayectoria, proyectos y contacto profesional.
                </p>
              </div>
            </div>
            <div className="mt-8">
              <Quote />
            </div>
          </aside>
          <div className="prose max-w-none pb-8 pt-8 dark:prose-dark xl:col-span-2">
            <AboutBody sections={content.bodySections}>{children}</AboutBody>
          </div>
        </article>
      </section>
    </>
  )
}
