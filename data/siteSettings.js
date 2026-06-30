import siteMetadata from './siteMetadata'

const siteSettings = {
  title: siteMetadata.title,
  author: siteMetadata.author,
  headerTitle: siteMetadata.headerTitle,
  logoImage: null,
  logoAlt: siteMetadata.headerTitle,
  faviconImage: '/static/favicons/favicon-32x32.png',
  appleTouchIconImage: '/static/favicons/apple-touch-icon.png',
  socialBannerImage: siteMetadata.socialBanner,
  themeColor: '#000000',
  maskIconColor: '#5bbad5',
  cvLabel: 'Descargar CV',
  cvHref: '/static/CV/CV.pdf',
  footerCredit: 'Hecho con amor por',
  navigationLinks: [
    { href: '/updates', label: 'Updates', labelEn: 'Updates', visible: false },
    { href: '/research', label: 'Investigación', labelEn: 'Research', visible: true },
    { href: '/blog', label: 'Notas', labelEn: 'Notes', visible: true },
    { href: '/projects', label: 'Proyectos', labelEn: 'Projects', visible: true },
    { href: '/about', label: 'Acerca', labelEn: 'About', visible: true },
  ],
  socialLinks: [
    { kind: 'mail', label: 'Email', href: `mailto:${siteMetadata.email}` },
    { kind: 'linkedin', label: 'LinkedIn', href: siteMetadata.linkedin },
    { kind: 'github', label: 'GitHub', href: siteMetadata.github },
    { kind: 'twitter', label: 'X / Twitter', href: siteMetadata.twitter },
    { kind: 'youtube', label: 'YouTube', href: siteMetadata.youtube },
    { kind: 'rss', label: 'RSS', href: siteMetadata.rss },
  ],
}

export default siteSettings
