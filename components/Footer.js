import Image from 'next/image'
import Link from 'next/link'
import siteMetadata from '@/data/siteMetadata'
import fallbackSiteSettings from '@/data/siteSettings'
import SocialIcon from '@/components/social-icons'

function FooterSocialLink({ link }) {
  if (!link?.href) return null

  if (link.image) {
    return (
      <a
        className="inline-flex h-6 w-6 items-center justify-center opacity-80 transition hover:opacity-100"
        target="_blank"
        rel="noopener noreferrer"
        href={link.href}
      >
        <span className="sr-only">{link.label || link.kind}</span>
        <Image
          src={link.image}
          alt={link.imageAlt || link.label || link.kind || 'Social link'}
          width={24}
          height={24}
          className="h-6 w-6 object-contain"
        />
      </a>
    )
  }

  return <SocialIcon kind={link.kind} href={link.href} size="6" />
}

export default function Footer({ siteSettings = fallbackSiteSettings }) {
  const socialLinks = siteSettings.socialLinks || fallbackSiteSettings.socialLinks
  const title = siteSettings.title || siteMetadata.title
  const author = siteSettings.author || siteMetadata.author
  const footerCredit = siteSettings.footerCredit || fallbackSiteSettings.footerCredit

  return (
    <footer>
      <div className=" mt-8 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          {socialLinks.map((link) => (
            <FooterSocialLink key={`${link.kind}-${link.href}`} link={link} />
          ))}
        </div>
        <div className="m-2 mb-6 flex space-x-2 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
          <Link href="/">{title}</Link>
          <div>{` • `}</div>
          <div>{footerCredit}</div>
          <div>{author}</div>
          <div>{` © ${new Date().getFullYear()}`}</div>
        </div>
      </div>
    </footer>
  )
}
