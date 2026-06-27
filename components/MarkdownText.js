import Link from 'next/link'

const INLINE_PATTERN = /(\[[^\]]+\]\([^\s)]+\)|`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/

function safeHref(href) {
  if (!href) return '#'
  const trimmed = href.trim()
  if (/^(javascript|data):/i.test(trimmed)) return '#'
  return trimmed
}

function renderToken(token, key) {
  if (token.startsWith('[')) {
    const match = token.match(/^\[([^\]]+)\]\(([^\s)]+)\)$/)
    if (match) {
      const href = safeHref(match[2])
      const className =
        'font-semibold text-primary-700 hover:text-primary-800 dark:text-secondary-400'
      if (href.startsWith('/')) {
        return (
          <Link key={key} href={href} className={className}>
            {match[1]}
          </Link>
        )
      }
      return (
        <a key={key} href={href} className={className} target="_blank" rel="noopener noreferrer">
          {match[1]}
        </a>
      )
    }
  }

  if (token.startsWith('`') && token.endsWith('`')) {
    return (
      <code key={key} className="rounded bg-gray-100 px-1 py-0.5 text-[0.9em] dark:bg-gray-800">
        {token.slice(1, -1)}
      </code>
    )
  }

  if (token.startsWith('**') && token.endsWith('**')) {
    return <strong key={key}>{token.slice(2, -2)}</strong>
  }

  if (token.startsWith('*') && token.endsWith('*')) {
    return <em key={key}>{token.slice(1, -1)}</em>
  }

  return token
}

function renderInline(text) {
  return String(text)
    .split(INLINE_PATTERN)
    .filter(Boolean)
    .map((part, index) => renderToken(part, `${part}-${index}`))
}

function getListItems(block, pattern) {
  const lines = block.split('\n').map((line) => line.trim())
  if (!lines.every((line) => pattern.test(line))) return null
  return lines.map((line) => line.replace(pattern, '').trim())
}

function renderBlock(block, index, paragraphClassName) {
  const unorderedItems = getListItems(block, /^[-*]\s+/)
  if (unorderedItems) {
    return (
      <ul key={`ul-${index}`} className="ml-5 list-disc space-y-2 text-gray-600 dark:text-gray-300">
        {unorderedItems.map((item, itemIndex) => (
          <li key={`${item.slice(0, 24)}-${itemIndex}`}>{renderInline(item)}</li>
        ))}
      </ul>
    )
  }

  const orderedItems = getListItems(block, /^\d+[.)]\s+/)
  if (orderedItems) {
    return (
      <ol
        key={`ol-${index}`}
        className="ml-5 list-decimal space-y-2 text-gray-600 dark:text-gray-300"
      >
        {orderedItems.map((item, itemIndex) => (
          <li key={`${item.slice(0, 24)}-${itemIndex}`}>{renderInline(item)}</li>
        ))}
      </ol>
    )
  }

  return (
    <p key={`${block.slice(0, 24)}-${index}`} className={paragraphClassName}>
      {renderInline(block.replace(/\n/g, ' '))}
    </p>
  )
}

export default function MarkdownText({
  children,
  className = '',
  paragraphClassName = '',
  inline = false,
}) {
  if (!children) return null

  if (inline) return <span className={className}>{renderInline(children)}</span>

  const blocks = String(children)
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)

  if (!blocks.length) return null

  return (
    <div className={className}>
      {blocks.map((block, index) => renderBlock(block, index, paragraphClassName))}
    </div>
  )
}
