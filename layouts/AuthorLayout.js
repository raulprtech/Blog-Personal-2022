import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import { PageSEO } from '@/components/SEO'
import Quote from '@/components/Quotes/quote'
import Button from '@/components/Button'
import siteMetadata from '@/data/siteMetadata'

const defaultContent = {
  seoDescription:
    'Perfil profesional, trayectoria, investigacion, proyectos y escritura tecnica de Raul Pacheco Rodriguez.',
  eyebrow: 'Acerca de',
  title: 'Investigacion, sistemas y escritura tecnica.',
  description:
    'Un resumen de mi perfil profesional: que construyo, que investigo y como conecto electronica, software, IA eficiente y divulgacion tecnica.',
  occupation: 'Ingeniero electronico e investigador en IA eficiente',
}

export default function AuthorLayout({ children, frontMatter, pageContent }) {
  const { nickname, avatar, company, email, twitter, linkedin, github, platzi, CV } = frontMatter
  const displayName = siteMetadata.author
  const content = { ...defaultContent, ...(pageContent || {}) }

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
          <aside className="flex flex-col items-center pt-8">
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
            <h3 className="text-center text-gray-500 dark:text-gray-400">{content.occupation}</h3>
            <h4 className="text-center text-gray-500 dark:text-gray-400">{company}</h4>
            <div className="flex space-x-3 pt-6">
              <SocialIcon kind="mail" href={`mailto:${email}`} />
              <SocialIcon kind="github" href={github} />
              <SocialIcon kind="linkedin" href={linkedin} />
              <SocialIcon kind="twitter" href={twitter} />
              <SocialIcon kind="platzi" href={platzi} />
            </div>
            <div className="grid grid-cols-1 gap-3 pb-10 pt-10">
              <Button link={CV} text="Descargar CV">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6 -rotate-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
              </Button>
            </div>
            <Quote />
          </aside>
          <div className="prose max-w-none pb-8 pt-8 dark:prose-dark xl:col-span-2">{children}</div>
        </article>
      </section>
    </>
  )
}
