import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import siteMetadata from '@/data/siteMetadata'
import fallbackSiteSettings from '@/data/siteSettings'
import Logo from '@/data/logo.svg'
import Link from 'next/link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import { alternateLanguagePath, localizedPath } from '@/lib/i18n'

function getNavigationLabel(link, lang) {
  if (lang === 'en') return link.labelEn || link.titleEn || link.label || link.title
  return link.label || link.title
}

function LanguageSwitch({ lang, currentPath }) {
  const options = [
    { lang: 'es', label: 'ES' },
    { lang: 'en', label: 'EN' },
  ]

  return (
    <div className="ml-2 hidden items-center rounded-full border border-gray-200 bg-white/70 p-1 text-xs font-bold dark:border-gray-800 dark:bg-gray-950/70 sm:flex">
      {options.map((option) => (
        <Link
          key={option.lang}
          href={alternateLanguagePath(currentPath, option.lang)}
          className={`rounded-full px-2 py-1 transition ${
            lang === option.lang
              ? 'bg-gray-950 text-white dark:bg-white dark:text-gray-950'
              : 'text-gray-500 hover:text-gray-950 dark:text-gray-400 dark:hover:text-white'
          }`}
          aria-label={option.lang === 'en' ? 'View site in English' : 'Ver sitio en español'}
        >
          {option.label}
        </Link>
      ))}
    </div>
  )
}

const LayoutWrapper = ({ children, bgImage, header = true, lang = 'es' }) => {
  const [siteSettings, setSiteSettings] = useState(fallbackSiteSettings)
  const router = useRouter()
  const currentPath = router?.asPath || '/'

  useEffect(() => {
    let active = true
    fetch('/api/site-settings')
      .then((response) => (response.ok ? response.json() : null))
      .then((settings) => {
        if (active && settings) setSiteSettings(settings)
      })
      .catch(() => {})

    return () => {
      active = false
    }
  }, [])

  const headerTitle = siteSettings.headerTitle || siteMetadata.headerTitle
  const logoAlt = siteSettings.logoAlt || headerTitle
  const navigationLinks = (
    siteSettings.navigationLinks ||
    fallbackSiteSettings.navigationLinks ||
    []
  ).filter((link) => link && link.href && link.visible !== false)

  return (
    <SectionContainer bgImage={bgImage}>
      <div className="flex h-screen flex-col justify-between">
        {header && (
          <header className="flex items-center justify-between py-10">
            <div>
              <Link href={localizedPath('/', lang)} aria-label={headerTitle}>
                <div className="flex items-center justify-between">
                  <div className="mr-3">
                    {siteSettings.logoImage ? (
                      <Image
                        src={siteSettings.logoImage}
                        alt={logoAlt}
                        width={44}
                        height={44}
                        className="h-11 w-auto object-contain"
                        priority
                      />
                    ) : (
                      <Logo />
                    )}
                  </div>
                  {typeof headerTitle === 'string' ? (
                    <div className="hidden h-6 text-2xl font-semibold sm:block">{headerTitle}</div>
                  ) : (
                    headerTitle
                  )}
                </div>
              </Link>
            </div>
            <div className="flex items-center text-base leading-5">
              <div className="hidden sm:block">
                {navigationLinks.map((link) => {
                  const title = getNavigationLabel(link, lang)
                  return (
                    <Link
                      key={`${link.href}-${title}`}
                      href={localizedPath(link.href, lang)}
                      className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
                      aria-label={title}
                    >
                      {title}
                    </Link>
                  )
                })}
              </div>
              <LanguageSwitch lang={lang} currentPath={currentPath} />
              <ThemeSwitch />
              <MobileNav lang={lang} currentPath={currentPath} navigationLinks={navigationLinks} />
            </div>
          </header>
        )}
        <main className="mb-auto">{children}</main>
        <Footer siteSettings={siteSettings} lang={lang} />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
