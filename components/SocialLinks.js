import Image from 'next/image'
import { useRouter } from 'next/router'
import SocialIcon from '@/components/social-icons'

function SocialLink({ link, size = 6 }) {
  const router = useRouter()
  if (!link?.href) return null
  const contactHref = router.asPath.startsWith('/en') ? '/en/contact' : '/contact'
  const href = link.kind === 'mail' || link.href.startsWith('mailto:') ? contactHref : link.href
  const isExternal = /^https?:\/\//.test(href)

  if (link.image) {
    const imageSize = Number(size) * 4
    return (
      <a
        className="inline-flex items-center justify-center opacity-80 transition hover:opacity-100"
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        href={href}
      >
        <span className="sr-only">{link.label || link.kind}</span>
        <Image
          src={link.image}
          alt={link.imageAlt || link.label || link.kind || 'Social link'}
          width={imageSize}
          height={imageSize}
          className="object-contain"
          style={{ height: imageSize, width: imageSize }}
        />
      </a>
    )
  }

  return <SocialIcon kind={link.kind} href={href} size={size} />
}

export default function SocialLinks({ links = [], size = 6, className = 'flex space-x-4' }) {
  return (
    <div className={className}>
      {links.map((link) => (
        <SocialLink key={`${link.kind}-${link.href}`} link={link} size={size} />
      ))}
    </div>
  )
}
