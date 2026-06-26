import Tags, { getStaticProps as getSpanishStaticProps } from '../tags'

export async function getStaticProps(context) {
  return getSpanishStaticProps({ ...context, lang: 'en' })
}

export default Tags
