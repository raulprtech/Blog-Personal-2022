import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { POSTS_PER_PAGE } from '../../blog'
import LayoutWrapper from '@/components/LayoutWrapper'
import { getAllNoteTags, getAllNotesFrontMatter } from '@/lib/notes'
import { getPageContent } from '@/lib/content'

export async function getStaticPaths() {
  const totalPosts = await getAllNotesFrontMatter('es')
  const totalPages = Math.ceil(totalPosts.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const lang = context.lang || 'es'
  const {
    params: { page },
  } = context
  const [posts, tags, pageContent] = await Promise.all([
    getAllNotesFrontMatter(lang),
    getAllNoteTags(lang),
    getPageContent('blog', lang),
  ])
  const pageNumber = parseInt(page)
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return {
    props: {
      posts,
      initialDisplayPosts,
      pagination,
      tags,
      pageContent,
      lang,
    },
    revalidate: 60,
  }
}

export default function PostPage({
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
