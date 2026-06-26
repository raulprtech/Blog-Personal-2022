import Blog, { getStaticProps as getSpanishStaticProps } from '../blog'

export async function getStaticProps(context) {
  return getSpanishStaticProps({ ...context, lang: 'en' })
}

export default Blog
