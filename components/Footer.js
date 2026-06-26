import Link from 'next/link'
import siteMetadata from '@/data/siteMetadata'
import fallbackSiteSettings from '@/data/siteSettings'
import SocialLinks from '@/components/SocialLinks'
import { localizedPath } from '@/lib/i18n'

export default function Footer({ siteSettings = fallbackSiteSettings, lang = 'es' }) {
  const socialLinks = siteSettings.socialLinks || fallbackSiteSettings.socialLinks
  const title = siteSettings.title || siteMetadata.title
  const author = siteSettings.author || siteMetadata.author
  const footerCredit = siteSettings.footerCredit || fallbackSiteSettings.footerCredit

  return (
    <footer>
      <div className=" mt-8 flex flex-col items-center">
        <SocialLinks links={socialLinks} size="6" className="mb-3 flex space-x-4" />
        <div className="m-2 mb-6 flex space-x-2 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
          <Link href={localizedPath('/', lang)}>{title}</Link>
          <div>{` • `}</div>
          <div>{footerCredit}</div>
          <div>{author}</div>
          <div>{` © ${new Date().getFullYear()}`}</div>
        </div>
      </div>
    </footer>
  )
}
