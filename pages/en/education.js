import Education, { getStaticProps as getSpanishStaticProps } from '../education'

export async function getStaticProps(context) {
  return getSpanishStaticProps({ ...context, lang: 'en' })
}

export default Education
