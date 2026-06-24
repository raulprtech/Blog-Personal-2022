import Image from 'next/image'
import SocialIcon from '@/components/social-icons'

function SocialLink({ link, size = 6 }) {
  if (!link?.href) return null

  if (link.image) {
    const imageSize = Number(size) * 4
    return (
      <a
        className="inline-flex items-center justify-center opacity-80 transition hover:opacity-100"
        target="_blank"
        rel="noopener noreferrer"
        href={link.href}
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

  return <SocialIcon kind={link.kind} href={link.href} size={size} />
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
