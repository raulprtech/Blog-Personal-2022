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

export function CollaboratorLine({ collaborators }) {
  if (!Array.isArray(collaborators) || collaborators.length === 0) return null

  return (
    <p className="text-sm leading-7 text-gray-500 dark:text-gray-400">
      Con{' '}
      {collaborators.map((collaborator, index) => (
        <span key={collaborator.name || collaborator.href || index}>
          {collaborator.href ? (
            <Link
              href={collaborator.href}
              className="font-semibold text-gray-700 hover:text-primary-700 dark:text-gray-200 dark:hover:text-secondary-400"
            >
              {collaborator.name}
            </Link>
          ) : (
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              {collaborator.name}
            </span>
          )}
          {index < collaborators.length - 1 ? ', ' : ''}
        </span>
      ))}
    </p>
  )
}

export function RelatedLinks({ title = 'Relacionado', items }) {
  if (!Array.isArray(items) || items.length === 0) return null

  return (
    <div>
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
        {title}
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => {
          const label = item.title || item.name
          const key = item._id || item.href || label || index
          const className =
            'rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600 transition dark:border-gray-700 dark:text-gray-300'

          if (!item.href) {
            return (
              <span key={key} className={className}>
                {label}
              </span>
            )
          }

          return (
            <Link
              key={key}
              href={item.href}
              className={`${className} hover:border-primary-400 hover:text-primary-700 dark:hover:border-secondary-400 dark:hover:text-secondary-300`}
            >
              {label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
