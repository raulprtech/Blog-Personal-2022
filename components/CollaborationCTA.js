import Link from 'next/link'
import { useRouter } from 'next/router'
import { ContentTags } from '@/components/ContentMeta'

export default function CollaborationCTA({ content, className = 'my-12' }) {
  const router = useRouter()
  if (!content?.title) return null

  const href =
    router.asPath.startsWith('/en') && content.href?.startsWith('/')
      ? `/en${content.href}`
      : content.href

  return (
    <section className={`${className} border-y border-gray-200 py-10 dark:border-gray-800`}>
      {content.eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary-700 dark:text-secondary-400">
          {content.eyebrow}
        </p>
      )}
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <h2 className="max-w-3xl text-3xl font-black tracking-tight text-gray-950 dark:text-white md:text-4xl">
            {content.title}
          </h2>
          {content.description && (
            <p className="mt-4 max-w-3xl leading-8 text-gray-600 dark:text-gray-300">
              {content.description}
            </p>
          )}
          <div className="mt-6">
            <ContentTags tags={content.areas} />
          </div>
        </div>
        {href && content.linkLabel && (
          <Link
            href={href}
            className="group inline-flex items-center justify-center rounded-md bg-gray-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-700 dark:bg-white dark:text-gray-950 dark:hover:bg-secondary-300"
          >
            {content.linkLabel}
            <span aria-hidden="true" className="ml-3 transition group-hover:translate-x-0.5">
              -&gt;
            </span>
          </Link>
        )}
      </div>
    </section>
  )
}
