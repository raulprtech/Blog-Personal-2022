import Papers, { getStaticProps as getSpanishStaticProps } from '../papers'

export async function getStaticProps(context) {
  return getSpanishStaticProps({ ...context, lang: 'en' })
}

export default Papers
