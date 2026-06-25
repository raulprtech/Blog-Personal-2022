import Link from 'next/link'
import { BlogSEO } from '@/components/SEO'
import Image from '@/components/Image'
import SanityPortableText from '@/components/SanityPortableText'
import { ContentBadge, ContentTags, RelatedLinks } from '@/components/ContentMeta'
import siteMetadata from '@/data/siteMetadata'

const postDateTemplate = { year: 'numeric', month: 'long', day: 'numeric' }

function AuthorLine({ authors }) {
  if (!Array.isArray(authors) || authors.length === 0) return null

  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      {authors.map((author) => (
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
            Por{' '}
            {author.href ? (
              <Link href={author.href} className="font-semibold text-gray-800 dark:text-gray-100">
                {author.name}
              </Link>
            ) : (
              <span className="font-semibold text-gray-800 dark:text-gray-100">{author.name}</span>
            )}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function SanityNoteLayout({ note, prev, next }) {
  const dateLabel = note.date
    ? new Date(note.date).toLocaleDateString(siteMetadata.locale, postDateTemplate)
    : null

  return (
    <>
      <BlogSEO
        url={`${siteMetadata.siteUrl}/blog/${note.slug}`}
        title={note.title}
        summary={note.summary}
        date={note.date}
        tags={note.tags}
        images={note.image ? [note.image] : undefined}
      />
      <article className="pb-16 pt-8">
        <header className="grid gap-10 border-b border-gray-200 pb-10 dark:border-gray-800 lg:grid-cols-[1fr_360px] lg:items-end">
          <div>
            <div className="mb-5 flex flex-wrap gap-2">
              <ContentBadge tone="accent">Nota</ContentBadge>
              {dateLabel && <ContentBadge tone="muted">{dateLabel}</ContentBadge>}
            </div>
            <h1 className="text-4xl font-black tracking-tight text-gray-950 dark:text-white md:text-6xl">
              {note.title}
            </h1>
            {note.summary && (
              <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-300">
                {note.summary}
              </p>
            )}
            <AuthorLine authors={note.authors} />
          </div>
          {note.image && (
            <div className="overflow-hidden rounded-md border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900">
              <Image
                src={note.image}
                alt={note.imageAlt || note.title}
                width="960"
                height="540"
                className="aspect-[16/10] w-full object-cover object-center"
              />
            </div>
          )}
        </header>

        <div className="grid gap-10 pt-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="prose max-w-none dark:prose-dark">
            <SanityPortableText value={note.body} />
          </div>
          <aside className="space-y-8">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
                Tags
              </p>
              <ContentTags tags={note.tags} />
            </div>
            <RelatedLinks title="Lineas de investigacion" items={note.researchItems} />
            <RelatedLinks title="Proyectos" items={note.projects} />
            <RelatedLinks title="Papers" items={note.papers} />
            {note.canonicalUrl && (
              <Link
                href={note.canonicalUrl}
                className="inline-flex text-sm font-semibold text-primary-700 hover:text-primary-800 dark:text-secondary-400"
              >
                Ver version canonica <span aria-hidden="true">-&gt;</span>
              </Link>
            )}
          </aside>
        </div>

        {(prev || next) && (
          <footer className="mt-12 grid gap-4 border-t border-gray-200 pt-8 dark:border-gray-800 md:grid-cols-2">
            {prev && (
              <Link
                href={`/blog/${prev.slug}`}
                className="rounded-md border border-gray-200 p-4 text-sm font-semibold text-gray-700 hover:border-primary-400 dark:border-gray-800 dark:text-gray-200"
              >
                <span className="block text-xs uppercase tracking-widest text-gray-400">
                  Anterior
                </span>
                {prev.title}
              </Link>
            )}
            {next && (
              <Link
                href={`/blog/${next.slug}`}
                className="rounded-md border border-gray-200 p-4 text-sm font-semibold text-gray-700 hover:border-primary-400 dark:border-gray-800 dark:text-gray-200 md:text-right"
              >
                <span className="block text-xs uppercase tracking-widest text-gray-400">
                  Siguiente
                </span>
                {next.title}
              </Link>
            )}
          </footer>
        )}
      </article>
    </>
  )
}
