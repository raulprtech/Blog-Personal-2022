import fallbackSiteSettings from '@/data/siteSettings'
import { fileUrl, imageUrl, sanityFetch } from '@/lib/sanity'

const siteSettingsFields = `
  title,
  author,
  headerTitle,
  logoAlt,
  themeColor,
  maskIconColor,
  cvLabel,
  cvHref,
  footerCredit,
  navigationLinks[]{
    label,
    labelEn,
    href,
    visible
  },
  socialLinks[]{
    kind,
    label,
    href,
    imageAlt,
    "imageAsset": image.asset
  },
  "logoImageAsset": logoImage.asset,
  "faviconImageAsset": faviconImage.asset,
  "appleTouchIconImageAsset": appleTouchIconImage.asset,
  "socialBannerImageAsset": socialBannerImage.asset,
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
  if (!settings) return { ...fallbackSiteSettings, navigationLinks: [] }
  const logoImage = imageUrl(settings.logoImageAsset) || fallbackSiteSettings.logoImage
  const faviconImage = imageUrl(settings.faviconImageAsset) || fallbackSiteSettings.faviconImage
  const appleTouchIconImage =
    imageUrl(settings.appleTouchIconImageAsset) || fallbackSiteSettings.appleTouchIconImage
  const socialBannerImage =
    imageUrl(settings.socialBannerImageAsset) || fallbackSiteSettings.socialBannerImage
  const cvFile = fileUrl(settings.cvFileAsset)
  const clean = { ...settings }
  delete clean.logoImageAsset
  delete clean.faviconImageAsset
  delete clean.appleTouchIconImageAsset
  delete clean.socialBannerImageAsset
  delete clean.cvFileAsset

  return {
    ...fallbackSiteSettings,
    ...clean,
    logoImage,
    faviconImage,
    appleTouchIconImage,
    socialBannerImage,
    cvHref: cvFile || clean.cvHref || fallbackSiteSettings.cvHref,
    navigationLinks: Array.isArray(clean.navigationLinks) ? clean.navigationLinks : [],
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
    return { ...fallbackSiteSettings, navigationLinks: [] }
  }
}

export { fallbackSiteSettings }
