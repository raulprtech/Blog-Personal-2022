import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSEO } from '@/components/SEO'
import LayoutWrapper from '@/components/LayoutWrapper'
import { getAllNoteTags, getAllNotesFrontMatter } from '@/lib/notes'
import { getPageContent } from '@/lib/content'

export const POSTS_PER_PAGE = 5

export async function getStaticProps({ lang = 'es' } = {}) {
  const [posts, tags, pageContent] = await Promise.all([
    getAllNotesFrontMatter(lang),
    getAllNoteTags(lang),
    getPageContent('blog', lang),
  ])
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return {
    props: { initialDisplayPosts, posts, pagination, tags, pageContent, lang },
    revalidate: 60,
  }
}

export default function Blog({
  posts,
  initialDisplayPosts,
  pagination,
  tags,
  pageContent,
  lang = 'es',
}) {
  return (
    <LayoutWrapper lang={lang}>
      <PageSEO
        title={pageContent?.seoTitle || `Notas de investigacion - ${siteMetadata.author}`}
        description={pageContent?.seoDescription || pageContent?.description}
      />
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title={pageContent?.title || 'Notas de investigacion'}
        eyebrow={pageContent?.eyebrow || 'Bitacora de investigacion'}
        description={pageContent?.description}
        tags={tags}
        lang={lang}
      />
    </LayoutWrapper>
  )
}
