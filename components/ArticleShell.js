import Link from 'next/link'
import Image from '@/components/Image'
import { ContentBadge, ContentTags } from '@/components/ContentMeta'
import { localizedPath } from '@/lib/i18n'
import formatDate from '@/lib/utils/formatDate'

function AuthorLine({ authors, lang = 'es' }) {
  if (!Array.isArray(authors) || authors.length === 0) return null

  return (
    <div className="mt-6 flex flex-wrap items-center gap-5">
      {authors.map((author) => {
        const href = author.href || author.twitter
        return (
          <div
            key={author.name}
            className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400"
          >
            {author.avatar && (
              <Image
                src={author.avatar}
                width="40"
                height="40"
                alt={author.name}
                className="h-10 w-10 rounded-full border border-gray-200 object-cover dark:border-gray-800"
              />
            )}
            <span>
              {lang === 'en' ? 'By' : 'Por'}{' '}
              {href ? (
                <Link href={href} className="font-semibold text-gray-800 dark:text-gray-100">
                  {author.name}
                </Link>
              ) : (
                <span className="font-semibold text-gray-800 dark:text-gray-100">
                  {author.name}
                </span>
              )}
            </span>
          </div>
        )
      })}
    </div>
  )
}

function ArticleNavigation({ prev, next, lang = 'es' }) {
  if (!prev && !next) return null

  return (
    <footer className="mt-12 grid gap-4 border-t border-gray-200 pt-8 dark:border-gray-800 md:grid-cols-2">
      {prev && (
        <Link
          href={localizedPath(`/blog/${prev.slug}`, lang)}
          className="rounded-md border border-gray-200 p-4 text-sm font-semibold text-gray-700 transition hover:border-primary-400 dark:border-gray-800 dark:text-gray-200"
        >
          <span className="block text-xs uppercase tracking-widest text-gray-400">
            {lang === 'en' ? 'Previous' : 'Anterior'}
          </span>
          {prev.title}
        </Link>
      )}
      {next && (
        <Link
          href={localizedPath(`/blog/${next.slug}`, lang)}
          className="rounded-md border border-gray-200 p-4 text-sm font-semibold text-gray-700 transition hover:border-primary-400 dark:border-gray-800 dark:text-gray-200 md:text-right"
        >
          <span className="block text-xs uppercase tracking-widest text-gray-400">
            {lang === 'en' ? 'Next' : 'Siguiente'}
          </span>
          {next.title}
        </Link>
      )}
    </footer>
  )
}

export default function ArticleShell({
  title,
  summary,
  date,
  tags = [],
  authors = [],
  image,
  imageAlt,
  kindLabel,
  actions = [],
  sidebar,
  prev,
  next,
  lang = 'es',
  children,
}) {
  const dateLabel = date ? formatDate(date, lang) : null
  const safeTags = Array.isArray(tags) ? tags : []
  const safeActions = Array.isArray(actions) ? actions : []
  const hasSidebar = safeTags.length > 0 || safeActions.length > 0 || Boolean(sidebar)

  return (
    <article className="pb-16 pt-8">
      <header
        className={`border-b border-gray-200 pb-10 dark:border-gray-800 ${
          image ? 'grid gap-10 lg:grid-cols-[1fr_360px] lg:items-end' : ''
        }`}
      >
        <div>
          <div className="mb-5 flex flex-wrap gap-2">
            {kindLabel && <ContentBadge tone="accent">{kindLabel}</ContentBadge>}
            {dateLabel && <ContentBadge tone="muted">{dateLabel}</ContentBadge>}
          </div>
          <h1 className="max-w-4xl text-4xl font-black tracking-tight text-gray-950 dark:text-white md:text-6xl">
            {title}
          </h1>
          {summary && (
            <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-300">
              {summary}
            </p>
          )}
          <AuthorLine authors={authors} lang={lang} />
        </div>
        {image && (
          <div className="overflow-hidden rounded-md border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900">
            <Image
              src={image}
              alt={imageAlt || title}
              width="960"
              height="540"
              className="aspect-[16/10] w-full object-cover object-center"
            />
          </div>
        )}
      </header>

      <div
        className={`grid gap-10 pt-10 ${hasSidebar ? 'lg:grid-cols-[minmax(0,1fr)_280px]' : ''}`}
      >
        <div className="prose max-w-none dark:prose-dark">{children}</div>
        {hasSidebar && (
          <aside className="space-y-8">
            {safeTags.length > 0 && (
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
                  Tags
                </p>
                <ContentTags tags={safeTags} />
              </div>
            )}
            {sidebar}
            {safeActions.length > 0 && (
              <div className="grid gap-3 border-t border-gray-200 pt-6 dark:border-gray-800">
                {safeActions.map((action) => (
                  <Link
                    key={`${action.label}-${action.href}`}
                    href={action.href}
                    className="inline-flex text-sm font-semibold text-primary-700 transition hover:text-primary-800 dark:text-secondary-400"
                  >
                    {action.label} <span aria-hidden="true">-&gt;</span>
                  </Link>
                ))}
              </div>
            )}
          </aside>
        )}
      </div>

      <ArticleNavigation prev={prev} next={next} lang={lang} />
    </article>
  )
}
