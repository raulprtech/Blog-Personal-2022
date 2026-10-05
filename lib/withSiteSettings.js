import { getSiteSettings } from './siteSettings'

export function withSiteSettings(getPageProps) {
  return async (context) => {
    let result
    try {
      result = await getPageProps(context)
    } catch (error) {
      if (error.code === 'PAGE_NOT_PUBLISHED') return { notFound: true, revalidate: 60 }
      throw error
    }
    if (!result.props) return result
    return {
      ...result,
      props: {
        ...result.props,
        siteSettings: result.props.siteSettings || (await getSiteSettings()),
      },
    }
  }
}
