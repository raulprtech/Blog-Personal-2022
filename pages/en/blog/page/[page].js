import PostPage, { getStaticProps as getSpanishStaticProps } from '../../../blog/page/[page]'
import { getAllNotesFrontMatter } from '@/lib/notes'
import { POSTS_PER_PAGE } from '../../../blog'

export async function getStaticPaths() {
  const totalPosts = await getAllNotesFrontMatter('en')
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
  return getSpanishStaticProps({ ...context, lang: 'en' })
}

export default PostPage
