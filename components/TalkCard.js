import Image from '@/components/Image'
import formatDate from '@/lib/utils/formatDate'
import {
  CardLink,
  CollaboratorLine,
  ContentBadge,
  ContentTags,
  RelatedConnections,
} from '@/components/ContentMeta'

const TalkCard = ({ talk }) => {
  return (
    <article className="group h-full overflow-hidden rounded-md border border-gray-200 bg-white transition duration-300 hover:border-gray-400 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-600">
      {talk.image && (
        <div className="relative aspect-[16/9] overflow-hidden border-b border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900">
          <Image
            src={talk.image}
            alt={talk.imageAlt || talk.title}
            width={960}
            height={540}
            className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.02]"
          />
        </div>
      )}
      <div className="p-6 md:p-7">
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <ContentBadge tone="accent">{talk.type}</ContentBadge>
          {talk.status && <ContentBadge tone="muted">{talk.status}</ContentBadge>}
          {talk.date && <ContentBadge tone="muted">{formatDate(talk.date)}</ContentBadge>}
        </div>
        <h3 className="text-2xl font-black tracking-tight text-gray-950 dark:text-white">
          {talk.title}
        </h3>
        <p className="mt-3 text-sm font-semibold uppercase tracking-widest text-primary-700 dark:text-secondary-400">
          {[talk.event, talk.organization, talk.location].filter(Boolean).join(' / ')}
        </p>
        <p className="mt-4 leading-8 text-gray-600 dark:text-gray-300">{talk.summary}</p>
        {talk.collaborators && (
          <div className="mt-4">
            <CollaboratorLine collaborators={talk.collaborators} />
          </div>
        )}
        {talk.tags && (
          <div className="mt-6">
            <ContentTags tags={talk.tags} />
          </div>
        )}
        <div className="mt-6">
          <RelatedConnections
            groups={[
              { title: 'Líneas de investigación', items: talk.researchItems },
              { title: 'Proyectos', items: talk.projects },
              { title: 'Papers', items: talk.papers },
              { title: 'Educación y credenciales', items: talk.credentials },
              { title: 'Recursos', items: talk.resources },
              { title: 'Trayectoria', items: talk.trajectoryItems },
              { title: 'Emprendimientos', items: talk.ventures },
            ]}
          />
        </div>
        <div className="mt-7 flex flex-wrap gap-4">
          <CardLink href={talk.href}>Ver contexto</CardLink>
          <CardLink href={talk.slidesHref}>Slides</CardLink>
          <CardLink href={talk.videoHref}>Video</CardLink>
          <CardLink href={talk.repoHref}>Repositorio</CardLink>
        </div>
      </div>
    </article>
  )
}

export default TalkCard
