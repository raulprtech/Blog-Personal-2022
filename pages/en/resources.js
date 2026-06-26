import Resources, { getStaticProps as getSpanishStaticProps } from '../resources'

export async function getStaticProps(context) {
  return getSpanishStaticProps({ ...context, lang: 'en' })
}

export default Resources
