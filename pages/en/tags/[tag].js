import Tag, {
  getStaticPaths as getSpanishStaticPaths,
  getStaticProps as getSpanishStaticProps,
} from '../../tags/[tag]'

export async function getStaticPaths() {
  return getSpanishStaticPaths()
}

export async function getStaticProps(context) {
  return getSpanishStaticProps({ ...context, lang: 'en' })
}

export default Tag
