import Projects, { getStaticProps as getSpanishStaticProps } from '../projects'

export async function getStaticProps(context) {
  return getSpanishStaticProps({ ...context, lang: 'en' })
}

export default Projects
