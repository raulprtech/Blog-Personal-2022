import { withSiteSettings } from '@/lib/withSiteSettings'
import { TagSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { getAllNoteTags, getAllNotesFrontMatter } from '@/lib/notes'
import kebabCase from '@/lib/utils/kebabCase'
import LayoutWrapper from '@/components/LayoutWrapper'

export async function getStaticPaths() {
  const tags = await getAllNoteTags('es')

  return {
    paths: Object.keys(tags).map((tag) => ({
      params: {
        tag,
      },
    })),
    fallback: 'blocking',
  }
}

async function getPageStaticProps({ params, lang = 'es' }) {
  const allPosts = await getAllNotesFrontMatter(lang)
  const filteredPosts = allPosts.filter(
    (post) => post.draft !== true && post.tags.map((t) => kebabCase(t)).includes(params.tag)
  )

  if (!filteredPosts.length) return { notFound: true, revalidate: 60 }

  // getAllTags for tag section
  const tags = await getAllNoteTags(lang)

  return { props: { posts: filteredPosts, tag: params.tag, tags: tags, lang }, revalidate: 60 }
}

export default function Tag({ posts, tag, tags, lang = 'es' }) {
  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  return (
    <LayoutWrapper lang={lang}>
      <TagSEO
        title={`${tag} - ${siteMetadata.author} - ${siteMetadata.nickname}`}
        description={`Articulos sobre ${tag} - ${siteMetadata.author}`}
      />
      <ListLayout posts={posts} title={title} tags={tags} lang={lang} />
    </LayoutWrapper>
  )
}

export const getStaticProps = withSiteSettings(getPageStaticProps)
