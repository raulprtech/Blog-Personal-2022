import Blog, { getStaticProps as getSpanishStaticProps } from '../../blog/[...slug]'
import { getNoteSlugs } from '@/lib/notes'

export async function getStaticPaths() {
  const slugs = await getNoteSlugs('en')
  return {
    paths: slugs.map((slug) => ({ params: { slug: slug.split('/') } })),
    fallback: 'blocking',
  }
}

export async function getStaticProps(context) {
  return getSpanishStaticProps({ ...context, lang: 'en' })
}

export default Blog
