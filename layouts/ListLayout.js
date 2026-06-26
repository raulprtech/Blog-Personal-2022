import Link from '@/components/Link'
import { useState } from 'react'
import Pagination from '@/components/Pagination'
import formatDate from '@/lib/utils/formatDate'
import kebabCase from '@/lib/utils/kebabCase'
import { ContentBadge, Eyebrow } from '@/components/ContentMeta'
import { localizedPath } from '@/lib/i18n'

function SearchIcon() {
  return (
    <svg
      className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  )
}

function LinkedTag({ tag, lang }) {
  return (
    <Link href={localizedPath(`/tags/${kebabCase(tag)}`, lang)}>
      <ContentBadge tone="muted">{tag}</ContentBadge>
    </Link>
  )
}

function PostCard({ post, lang }) {
  const { slug, date, title, summary, tags = [] } = post
  const readLabel = lang === 'en' ? 'Read note' : 'Leer nota'

  return (
    <article className="group h-full rounded-md border border-gray-200 bg-white p-6 transition duration-300 hover:border-gray-400 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-600 md:p-7">
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <ContentBadge tone="accent">{formatDate(date)}</ContentBadge>
        {tags.slice(0, 2).map((tag) => (
          <LinkedTag key={tag} tag={tag} lang={lang} />
        ))}
      </div>
      <h2 className="text-2xl font-black tracking-tight text-gray-950 dark:text-white">
        <Link
          href={localizedPath(`/blog/${slug}`, lang)}
          className="transition group-hover:text-primary-700 dark:group-hover:text-secondary-300"
        >
          {title}
        </Link>
      </h2>
      <p className="mt-4 leading-8 text-gray-600 dark:text-gray-300">{summary}</p>
      <Link
        href={localizedPath(`/blog/${slug}`, lang)}
        className="mt-6 inline-flex text-sm font-semibold text-primary-700 transition hover:text-primary-800 dark:text-secondary-400"
      >
        {readLabel} <span aria-hidden="true">-&gt;</span>
      </Link>
    </article>
  )
}

export default function ListLayout({
  posts,
  title,
  description,
  eyebrow = 'Notas',
  initialDisplayPosts = [],
  pagination,
  tags,
  lang = 'es',
}) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  const sortedTags = tags != undefined ? Object.keys(tags).sort((a, b) => tags[b] - tags[a]) : []
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts
  const searchLabel = lang === 'en' ? 'Search notes' : 'Buscar notas'

  return (
    <section className="pb-16 pt-8">
      <div className="grid gap-8 border-b border-gray-200 pb-10 dark:border-gray-800 lg:grid-cols-[1fr_360px] lg:items-end">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-gray-950 dark:text-white md:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
              {description}
            </p>
          )}
        </div>
        <div className="relative">
          <input
            aria-label={searchLabel}
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={searchLabel}
            className="block w-full rounded-md border border-gray-300 bg-white px-4 py-3 pr-11 text-gray-900 transition focus:border-primary-700 focus:ring-primary-700 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-100"
          />
          <SearchIcon />
        </div>
      </div>

      {sortedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 border-b border-gray-200 py-6 dark:border-gray-800">
          {sortedTags.slice(0, 18).map((tag) => (
            <LinkedTag key={tag} tag={tag} lang={lang} />
          ))}
        </div>
      )}

      <div className="grid gap-6 py-12 md:grid-cols-2">
        {!filteredBlogPosts.length && (
          <p className="text-gray-500 dark:text-gray-400">
            {lang === 'en' ? 'No results found.' : 'No se encontraron resultados.'}
          </p>
        )}
        {displayPosts.map((post) => (
          <PostCard key={post.slug} post={post} lang={lang} />
        ))}
      </div>

      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          lang={lang}
        />
      )}
    </section>
  )
}
