import Trajectory, { getStaticProps as getSpanishStaticProps } from '../trajectory'

export async function getStaticProps(context) {
  return getSpanishStaticProps({ ...context, lang: 'en' })
}

export default Trajectory
