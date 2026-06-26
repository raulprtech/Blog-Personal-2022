import Updates, { getStaticProps as getSpanishStaticProps } from '../updates'

export async function getStaticProps(context) {
  return getSpanishStaticProps({ ...context, lang: 'en' })
}

export default Updates
