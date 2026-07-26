import { BlogSEO } from '@/components/SEO'
import ArticleShell from '@/components/ArticleShell'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import siteMetadata from '@/data/siteMetadata'
import { localizedPath } from '@/lib/i18n'

export default function PostLayout({
  frontMatter,
  authorDetails,
  next,
  prev,
  children,
  lang = 'es',
}) {
  const { slug, date, title, summary, tags, thread } = frontMatter
  const actions = thread
    ? [{ label: lang === 'en' ? 'View discussion' : 'Ver conversación', href: thread }]
    : []

  return (
    <>
      <BlogSEO
        url={`${siteMetadata.siteUrl}${localizedPath(`/blog/${slug}`, lang)}`}
        authorDetails={authorDetails}
        {...frontMatter}
      />
      <ScrollTopAndComment />
      <ArticleShell
        title={title}
        summary={summary}
        date={date}
        tags={tags}
        authors={authorDetails}
        kindLabel={lang === 'en' ? 'Article' : 'Artículo'}
        actions={actions}
        prev={prev}
        next={next}
        lang={lang}
      >
        {children}
      </ArticleShell>
    </>
  )
}
