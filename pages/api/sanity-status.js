import { isSanityConfigured, sanityFetch } from '@/lib/sanity'

export default async function handler(req, res) {
  try {
    const [publishedSiteSettings, draftSiteSettings, publishedPageContent, draftPageContent] =
      await Promise.all([
        sanityFetch('count(*[_type == "siteSettings" && !(_id in path("drafts.**"))])'),
        sanityFetch('count(*[_type == "siteSettings" && _id in path("drafts.**")])'),
        sanityFetch('count(*[_type == "pageContent" && !(_id in path("drafts.**"))])'),
        sanityFetch('count(*[_type == "pageContent" && _id in path("drafts.**")])'),
      ])

    res.setHeader('Cache-Control', 'no-store, max-age=0')
    res.status(200).json({
      configured: isSanityConfigured,
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'a668buu6',
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      hasReadToken: Boolean(process.env.SANITY_API_READ_TOKEN),
      published: {
        siteSettings: publishedSiteSettings,
        pageContent: publishedPageContent,
      },
      drafts: {
        siteSettings: draftSiteSettings,
        pageContent: draftPageContent,
      },
    })
  } catch (error) {
    res.status(500).json({
      configured: isSanityConfigured,
      hasReadToken: Boolean(process.env.SANITY_API_READ_TOKEN),
      message: error.message,
    })
  }
}
