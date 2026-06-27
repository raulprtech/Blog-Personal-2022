import Talks, { getStaticProps as getSpanishStaticProps } from '../talks'

export async function getStaticProps(context) {
  return getSpanishStaticProps({ ...context, lang: 'en' })
}

export default Talks
