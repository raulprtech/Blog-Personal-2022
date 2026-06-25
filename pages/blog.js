import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSEO } from '@/components/SEO'
import LayoutWrapper from '@/components/LayoutWrapper'

import { getAllTags } from '@/lib/tags'

export const POSTS_PER_PAGE = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  const tags = await getAllTags('blog')

  return { props: { initialDisplayPosts, posts, pagination, tags } }
}

export default function Blog({ posts, initialDisplayPosts, pagination, tags }) {
  return (
    <LayoutWrapper>
      <PageSEO
        title={`Notas de investigaci?n - ${siteMetadata.author} - p${pagination.currentPage}`}
        description={`${siteMetadata.description} - página ${pagination.currentPage}`}
      />
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="Notas de investigaci?n"
        tags={tags}
      />
    </LayoutWrapper>
  )
}
