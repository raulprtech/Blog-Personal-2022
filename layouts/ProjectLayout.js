import { BlogSEO } from '@/components/SEO'
import ArticleShell from '@/components/ArticleShell'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import siteMetadata from '@/data/siteMetadata'
import { localizedPath } from '@/lib/i18n'

export default function ProjectLayout({
  frontMatter,
  authorDetails,
  next,
  prev,
  children,
  lang = 'es',
}) {
  const { slug, date, title, summary, tags, repository, demo } = frontMatter
  const actions = [
    repository && {
      label: lang === 'en' ? 'View repository' : 'Ver repositorio',
      href: repository,
    },
    demo && { label: lang === 'en' ? 'View demo' : 'Ver demo', href: demo },
  ].filter(Boolean)

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
        kindLabel={lang === 'en' ? 'Tutorial' : 'Tutorial'}
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
