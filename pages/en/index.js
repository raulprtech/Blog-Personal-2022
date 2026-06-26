import Home, { getStaticProps as getSpanishStaticProps } from '../index'

export async function getStaticProps(context) {
  return getSpanishStaticProps({ ...context, lang: 'en' })
}

export default Home
