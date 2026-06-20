import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getFileBySlug } from '@/lib/mdx'
import { getPageContent } from '@/lib/content'
import { getSiteSettings } from '@/lib/siteSettings'

const DEFAULT_LAYOUT = 'AuthorLayout'

import LayoutWrapper from '@/components/LayoutWrapper'

export async function getStaticProps() {
  const [authorDetails, pageContent, siteSettings] = await Promise.all([
    getFileBySlug('authors', ['default']),
    getPageContent('about'),
    getSiteSettings(),
  ])
  return { props: { authorDetails, pageContent, siteSettings }, revalidate: 60 }
}

export default function About({ authorDetails, pageContent, siteSettings }) {
  const { mdxSource, frontMatter } = authorDetails

  return (
    <LayoutWrapper>
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
