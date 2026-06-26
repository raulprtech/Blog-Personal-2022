import Ventures, { getStaticProps as getSpanishStaticProps } from '../ventures'

export async function getStaticProps(context) {
  return getSpanishStaticProps({ ...context, lang: 'en' })
}

export default Ventures
