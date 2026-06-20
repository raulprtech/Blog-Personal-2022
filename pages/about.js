import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getFileBySlug } from '@/lib/mdx'
import { getPageContent } from '@/lib/content'

const DEFAULT_LAYOUT = 'AuthorLayout'

import LayoutWrapper from '@/components/LayoutWrapper'

export async function getStaticProps() {
  const [authorDetails, pageContent] = await Promise.all([
    getFileBySlug('authors', ['default']),
    getPageContent('about'),
  ])
  return { props: { authorDetails, pageContent }, revalidate: 60 }
}

export default function About({ authorDetails, pageContent }) {
  const { mdxSource, frontMatter } = authorDetails

  return (
    <LayoutWrapper>
      <MDXLayoutRenderer
        layout={frontMatter.layout || DEFAULT_LAYOUT}
        mdxSource={mdxSource}
        frontMatter={frontMatter}
        pageContent={pageContent}
      />
    </LayoutWrapper>
  )
}
