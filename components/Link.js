 
import Link from 'next/link'
import { safeHref } from '@/lib/security.cjs'

const CustomLink = ({ href: value, children, ...props }) => {
  const href = safeHref(value)
  if (!href) return <span {...props}>{children}</span>
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')

  if (isInternalLink) {
    return (
      <Link {...props} href={href}>
        {children}
      </Link>
    )
  }

  if (isAnchorLink) {
    return (
      <a {...props} href={href}>
        {children}
      </a>
    )
  }

  return (
    <a {...props} target="_blank" rel="noopener noreferrer" href={href}>
      {children}
    </a>
  )
}

export default CustomLink
