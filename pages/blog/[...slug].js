import fs from 'fs'
import PageTitle from '@/components/PageTitle'
import generateRss from '@/lib/generate-rss'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getFileBySlug } from '@/lib/mdx'
import { getAllNotesFrontMatter, getNoteBySlug, getNoteSlugs } from '@/lib/notes'
import LayoutWrapper from '@/components/LayoutWrapper'
import SanityNoteLayout from '@/layouts/SanityNoteLayout'

const DEFAULT_LAYOUT = 'PostLayout'

export async function getStaticPaths() {
  const slugs = await getNoteSlugs()
  return {
    paths: slugs.map((slug) => ({
      params: {
        slug: slug.split('/'),
      },
    })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const slug = params.slug.join('/')
  const allPosts = await getAllNotesFrontMatter()
  const postIndex = allPosts.findIndex((post) => post.slug === slug)
  const prev = allPosts[postIndex + 1] || null
  const next = allPosts[postIndex - 1] || null
  const result = await getNoteBySlug(slug)

  if (!result) return { notFound: true }

  if (result.kind === 'sanity') {
    return { props: { source: 'sanity', note: result.note, prev, next }, revalidate: 60 }
  }

  const post = result.post
  const authorList = post.frontMatter.authors || ['default']
  const authorPromise = authorList.map(async (author) => {
    const authorResults = await getFileBySlug('authors', [author])
    return authorResults.frontMatter
  })
  const authorDetails = await Promise.all(authorPromise)

  if (allPosts.length > 0) {
    const rss = generateRss(allPosts)
    fs.writeFileSync('./public/feed.xml', rss)
  }

  return { props: { source: 'mdx', post, authorDetails, prev, next }, revalidate: 60 }
}

export default function Blog({ source, note, post, authorDetails, prev, next }) {
  if (source === 'sanity') {
    return (
      <LayoutWrapper>
        <SanityNoteLayout note={note} prev={prev} next={next} />
      </LayoutWrapper>
    )
  }

  const { mdxSource, toc, frontMatter } = post

  return (
    <LayoutWrapper>
      {frontMatter.draft !== true ? (
        <MDXLayoutRenderer
          layout={frontMatter.layout || DEFAULT_LAYOUT}
          toc={toc}
          mdxSource={mdxSource}
          frontMatter={frontMatter}
          authorDetails={authorDetails}
          prev={prev}
          next={next}
        />
      ) : (
        <div className="mt-24 text-center">
          <PageTitle>En construccion</PageTitle>
        </div>
      )}
    </LayoutWrapper>
  )
}
