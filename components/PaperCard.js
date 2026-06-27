import Image from '@/components/Image'
import {
  CardLink,
  CollaboratorLine,
  ContentBadge,
  ContentTags,
  RelatedConnections,
} from '@/components/ContentMeta'

const PaperCard = ({ paper }) => {
  return (
    <article className="group h-full overflow-hidden rounded-md border border-gray-200 bg-white transition duration-300 hover:border-gray-400 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-600">
      {paper.image && (
        <div className="relative aspect-[16/9] overflow-hidden border-b border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900">
          <Image
            src={paper.image}
            alt={paper.imageAlt || paper.title}
            width={960}
            height={540}
            className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.02]"
          />
        </div>
      )}
      <div className="p-6 md:p-7">
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <ContentBadge tone="accent">{paper.status}</ContentBadge>
          <ContentBadge tone="muted">{paper.venue}</ContentBadge>
          <ContentBadge tone="muted">{paper.year}</ContentBadge>
        </div>
        <h3 className="text-2xl font-black tracking-tight text-gray-950 dark:text-white">
          {paper.title}
        </h3>
        {paper.authors && (
          <div className="mt-3">
            <CollaboratorLine collaborators={paper.authors} />
          </div>
        )}
        <p className="mt-4 leading-8 text-gray-600 dark:text-gray-300">{paper.summary}</p>
        {paper.tags && (
          <div className="mt-6">
            <ContentTags tags={paper.tags} />
          </div>
        )}
        <div className="mt-6">
          <RelatedConnections
            groups={[
              { title: 'Líneas de investigación', items: paper.researchItems },
              { title: 'Proyectos', items: paper.projects },
              { title: 'Emprendimientos', items: paper.ventures },
              { title: 'Educación y credenciales', items: paper.credentials },
              { title: 'Recursos', items: paper.resources },
              { title: 'Trayectoria', items: paper.trajectoryItems },
            ]}
          />
        </div>
        <div className="mt-7 flex flex-wrap gap-4">
          <CardLink href={paper.href}>Abrir paper</CardLink>
          <CardLink href={paper.codeHref}>Ver codigo</CardLink>
        </div>
      </div>
    </article>
  )
}

export default PaperCard
