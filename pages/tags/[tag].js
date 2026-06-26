import { TagSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import generateRss from '@/lib/generate-rss'
import { getAllNoteTags, getAllNotesFrontMatter } from '@/lib/notes'
import kebabCase from '@/lib/utils/kebabCase'
import fs from 'fs'
import path from 'path'
import LayoutWrapper from '@/components/LayoutWrapper'

const root = process.cwd()

export async function getStaticPaths() {
  const tags = await getAllNoteTags('es')

  return {
    paths: Object.keys(tags).map((tag) => ({
      params: {
        tag,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params, lang = 'es' }) {
  const allPosts = await getAllNotesFrontMatter(lang)
  const filteredPosts = allPosts.filter(
    (post) => post.draft !== true && post.tags.map((t) => kebabCase(t)).includes(params.tag)
  )

  // rss
  if (filteredPosts.length > 0) {
    const rss = generateRss(filteredPosts, `tags/${params.tag}/feed.xml`)
    const rssPath = path.join(root, 'public', 'tags', params.tag)
    fs.mkdirSync(rssPath, { recursive: true })
    fs.writeFileSync(path.join(rssPath, 'feed.xml'), rss)
  }

  // getAllTags for tag section
  const tags = await getAllNoteTags(lang)

  return { props: { posts: filteredPosts, tag: params.tag, tags: tags, lang } }
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
