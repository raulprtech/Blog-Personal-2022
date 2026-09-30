import ProjectPage, {
  getStaticPaths,
  getStaticProps as getSpanishStaticProps,
} from '../../projects/[slug]'

export { getStaticPaths }

export async function getStaticProps(context) {
  return getSpanishStaticProps({ ...context, lang: 'en' })
}

export default ProjectPage
