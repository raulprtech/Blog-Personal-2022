import Link from 'next/link'
import Image from '@/components/Image'

function spanKey(child, index) {
  return child._key || `${child.text || 'span'}-${index}`
}

function renderTextChild(child, markDefs, index) {
  let content = child.text || ''

  if (child.marks?.includes('strong')) content = <strong>{content}</strong>
  if (child.marks?.includes('em')) content = <em>{content}</em>
  if (child.marks?.includes('code')) content = <code>{content}</code>

  const linkMark = child.marks
    ?.map((mark) =>
      markDefs?.find((definition) => definition._key === mark && definition._type === 'link')
    )
    .find(Boolean)

  if (linkMark?.href) {
    content = (
      <Link href={linkMark.href} className="font-semibold text-primary-700 dark:text-secondary-400">
        {content}
      </Link>
    )
  }

  return <span key={spanKey(child, index)}>{content}</span>
}

function Block({ block }) {
  const children = (block.children || []).map((child, index) =>
    renderTextChild(child, block.markDefs, index)
  )

  if (block.listItem) return <li>{children}</li>

  const style = block.style || 'normal'
  if (style === 'h2') return <h2>{children}</h2>
  if (style === 'h3') return <h3>{children}</h3>
  if (style === 'h4') return <h4>{children}</h4>
  if (style === 'blockquote') return <blockquote>{children}</blockquote>

  return <p>{children}</p>
}

function groupedBlocks(blocks) {
  const result = []
  let currentList = null

  blocks.forEach((block) => {
    if (block._type === 'block' && block.listItem) {
      const listType = block.listItem === 'number' ? 'ol' : 'ul'
      if (!currentList || currentList.type !== listType) {
        currentList = { type: listType, items: [] }
        result.push(currentList)
      }
      currentList.items.push(block)
      return
    }

    currentList = null
    result.push(block)
  })

  return result
}

export default function SanityPortableText({ value }) {
  if (!Array.isArray(value) || value.length === 0) return null

  return (
    <>
      {groupedBlocks(value).map((block, index) => {
        const key = block._key || `${block._type || block.type}-${index}`

        if (block.type === 'ul') {
          return (
            <ul key={key}>
              {block.items.map((item) => (
                <Block key={item._key} block={item} />
              ))}
            </ul>
          )
        }

        if (block.type === 'ol') {
          return (
            <ol key={key}>
              {block.items.map((item) => (
                <Block key={item._key} block={item} />
              ))}
            </ol>
          )
        }

        if (block._type === 'imageBlock' && block.image) {
          return (
            <figure key={key}>
              <Image
                src={block.image}
                alt={block.alt || block.caption || 'Note image'}
                width="1200"
                height="675"
                className="rounded-md border border-gray-200 dark:border-gray-800"
              />
              {block.caption && <figcaption>{block.caption}</figcaption>}
            </figure>
          )
        }

        if (block._type === 'codeBlock') {
          return (
            <pre key={key}>
              <code>{block.code}</code>
            </pre>
          )
        }

        if (block._type === 'block') return <Block key={key} block={block} />

        return null
      })}
    </>
  )
}
