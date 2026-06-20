import fallbackSiteSettings from '@/data/siteSettings'
import { fileUrl, imageUrl, sanityFetch } from '@/lib/sanity'

const siteSettingsFields = `
  title,
  author,
  headerTitle,
  logoAlt,
  cvLabel,
  cvHref,
  footerCredit,
  socialLinks[]{
    kind,
    label,
    href,
    imageAlt,
    "imageAsset": image.asset
  },
  "logoImageAsset": logoImage.asset,
  "cvFileAsset": cvFile.asset
`

function normalizeSocialLink(link) {
  if (!link) return link
  const image = imageUrl(link.imageAsset) || link.image || null
  const clean = { ...link }
  delete clean.imageAsset
  return image ? { ...clean, image } : clean
}

function normalizeSiteSettings(settings) {
  if (!settings) return fallbackSiteSettings
  const logoImage = imageUrl(settings.logoImageAsset) || fallbackSiteSettings.logoImage
  const cvFile = fileUrl(settings.cvFileAsset)
  const clean = { ...settings }
  delete clean.logoImageAsset
  delete clean.cvFileAsset

  return {
    ...fallbackSiteSettings,
    ...clean,
    logoImage,
    cvHref: cvFile || clean.cvHref || fallbackSiteSettings.cvHref,
    socialLinks: Array.isArray(clean.socialLinks)
      ? clean.socialLinks.map(normalizeSocialLink)
      : fallbackSiteSettings.socialLinks,
  }
}

export async function getSiteSettings() {
  try {
    const result = await sanityFetch(
      `*[_type == "siteSettings" && _id == "site-settings"][0] { ${siteSettingsFields} }`
    )
    return normalizeSiteSettings(result)
  } catch (error) {
    console.warn(error.message)
    return fallbackSiteSettings
  }
}

export { fallbackSiteSettings }
