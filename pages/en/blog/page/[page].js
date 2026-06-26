import PostPage, {
  getStaticPaths as getSpanishStaticPaths,
  getStaticProps as getSpanishStaticProps,
} from '../../../blog/page/[page]'

export async function getStaticPaths() {
  return getSpanishStaticPaths()
}

export async function getStaticProps(context) {
  return getSpanishStaticProps({ ...context, lang: 'en' })
}

export default PostPage
