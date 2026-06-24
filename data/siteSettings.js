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
