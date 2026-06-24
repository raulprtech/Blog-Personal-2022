import Link from 'next/link'

export function Eyebrow({ children }) {
  if (!children) return null

  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
      {children}
    </p>
  )
}

export function ContentBadge({ children, tone = 'neutral' }) {
  if (!children) return null

  const tones = {
    accent:
      'border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-900 dark:bg-cyan-950 dark:text-cyan-300',
    neutral:
      'border-gray-200 bg-white text-gray-600 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300',
    muted:
      'border-gray-200 bg-gray-50 text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400',
  }

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${tones[tone]}`}
    >
      {children}
    </span>
  )
}

export function ContentTags({ tags }) {
  if (!Array.isArray(tags) || tags.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <ContentBadge key={tag} tone="muted">
          {tag}
        </ContentBadge>
      ))}
    </div>
  )
}

export function CardLink({ href, children = 'Ver contexto' }) {
  if (!href) return null

  return (
    <Link
      href={href}
      className="inline-flex text-sm font-semibold text-primary-700 transition hover:text-primary-800 dark:text-secondary-400"
    >
      {children} <span aria-hidden="true">-&gt;</span>
    </Link>
  )
}
