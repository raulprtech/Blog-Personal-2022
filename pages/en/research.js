import Research, { getStaticProps as getSpanishStaticProps } from '../research'

export async function getStaticProps(context) {
  return getSpanishStaticProps({ ...context, lang: 'en' })
}

export default Research
