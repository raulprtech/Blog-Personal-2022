import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getFileBySlug } from '@/lib/mdx'
import { getPageContent } from '@/lib/content'
import { getSiteSettings } from '@/lib/siteSettings'

const DEFAULT_LAYOUT = 'AuthorLayout'

import LayoutWrapper from '@/components/LayoutWrapper'

export async function getStaticProps({ lang = 'es' } = {}) {
  const [authorDetails, pageContent, siteSettings] = await Promise.all([
    getFileBySlug('authors', ['default']),
    getPageContent('about', lang),
    getSiteSettings(),
  ])
  return { props: { authorDetails, pageContent, siteSettings, lang }, revalidate: 60 }
}

export default function About({ authorDetails, pageContent, siteSettings, lang = 'es' }) {
  const { mdxSource, frontMatter } = authorDetails

  return (
    <LayoutWrapper lang={lang}>
      <MDXLayoutRenderer
        layout={frontMatter.layout || DEFAULT_LAYOUT}
        mdxSource={mdxSource}
        frontMatter={frontMatter}
        pageContent={pageContent}
        siteSettings={siteSettings}
      />
    </LayoutWrapper>
  )
}
