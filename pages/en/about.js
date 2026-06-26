import About, { getStaticProps as getSpanishStaticProps } from '../about'

export async function getStaticProps(context) {
  return getSpanishStaticProps({ ...context, lang: 'en' })
}

export default About
