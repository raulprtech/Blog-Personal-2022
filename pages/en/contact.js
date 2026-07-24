import Contact, { getStaticProps as getSpanishStaticProps } from '../contact'

export async function getStaticProps(context) {
  return getSpanishStaticProps({ ...context, lang: 'en' })
}

export default Contact
