import Tag, { getStaticProps as getSpanishStaticProps } from '../../tags/[tag]'
import { getAllNoteTags } from '@/lib/notes'

export async function getStaticPaths() {
  const tags = await getAllNoteTags('en')

  return {
    paths: Object.keys(tags).map((tag) => ({ params: { tag } })),
    fallback: false,
  }
}

export async function getStaticProps(context) {
  return getSpanishStaticProps({ ...context, lang: 'en' })
}

export default Tag
