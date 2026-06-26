import Credentials, { getStaticProps as getSpanishStaticProps } from '../credentials'

export async function getStaticProps(context) {
  return getSpanishStaticProps({ ...context, lang: 'en' })
}

export default Credentials
