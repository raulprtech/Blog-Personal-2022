import { useEffect, useState } from 'react'
import Image from 'next/image'
import siteMetadata from '@/data/siteMetadata'
import fallbackSiteSettings from '@/data/siteSettings'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from 'next/link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'

const LayoutWrapper = ({ children, bgImage, header = true }) => {
  const [siteSettings, setSiteSettings] = useState(fallbackSiteSettings)

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

  return (
    <SectionContainer bgImage={bgImage}>
      <div className="flex h-screen flex-col justify-between">
        {header && (
          <header className="flex items-center justify-between py-10">
            <div>
              <Link href="/" aria-label={headerTitle}>
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
                {headerNavLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
                    aria-label={link.title}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
              <ThemeSwitch />
              <MobileNav />
            </div>
          </header>
        )}
        <main className="mb-auto">{children}</main>
        <Footer siteSettings={siteSettings} />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
