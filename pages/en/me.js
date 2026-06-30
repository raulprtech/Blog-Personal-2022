import Me, { getStaticProps as getSpanishStaticProps } from '../me'

export async function getStaticProps(context) {
  return getSpanishStaticProps({ ...context, lang: 'en' })
}

export default Me
