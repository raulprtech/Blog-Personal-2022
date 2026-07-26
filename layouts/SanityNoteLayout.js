import { BlogSEO } from '@/components/SEO'
import ArticleShell from '@/components/ArticleShell'
import SanityPortableText from '@/components/SanityPortableText'
import { RelatedConnections } from '@/components/ContentMeta'
import siteMetadata from '@/data/siteMetadata'
import { localizedPath } from '@/lib/i18n'

export default function SanityNoteLayout({ note, prev, next, lang = 'es' }) {
  const actions = note.canonicalUrl
    ? [
        {
          label: lang === 'en' ? 'View canonical version' : 'Ver versión canónica',
          href: note.canonicalUrl,
        },
      ]
    : []

  return (
    <>
      <BlogSEO
        url={`${siteMetadata.siteUrl}${localizedPath(`/blog/${note.slug}`, lang)}`}
        title={note.title}
        summary={note.summary}
        date={note.date}
        tags={note.tags}
        images={note.image ? [note.image] : undefined}
      />
      <ArticleShell
        title={note.title}
        summary={note.summary}
        date={note.date}
        tags={note.tags}
        authors={note.authors}
        image={note.image}
        imageAlt={note.imageAlt}
        kindLabel={lang === 'en' ? 'Note' : 'Nota'}
        actions={actions}
        sidebar={
          <RelatedConnections
            groups={[
              {
                title: lang === 'en' ? 'Research lines' : 'Líneas de investigación',
                items: note.researchItems,
              },
              { title: lang === 'en' ? 'Projects' : 'Proyectos', items: note.projects },
              { title: 'Papers', items: note.papers },
              {
                title: lang === 'en' ? 'Education and credentials' : 'Educación y credenciales',
                items: note.credentials,
              },
              { title: lang === 'en' ? 'Resources' : 'Recursos', items: note.resources },
              {
                title: lang === 'en' ? 'Trajectory' : 'Trayectoria',
                items: note.trajectoryItems,
              },
              { title: lang === 'en' ? 'Ventures' : 'Emprendimientos', items: note.ventures },
              {
                title: lang === 'en' ? 'Talks and workshops' : 'Charlas y talleres',
                items: note.talks,
              },
            ]}
          />
        }
        prev={prev}
        next={next}
        lang={lang}
      >
        <SanityPortableText value={note.body} />
      </ArticleShell>
    </>
  )
}
