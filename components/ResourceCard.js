import Image from '@/components/Image'
import { CardLink, ContentBadge, ContentTags, RelatedConnections } from '@/components/ContentMeta'

const ResourceCard = ({ resource, compact = false }) => {
  return (
    <article className="group grid h-full overflow-hidden rounded-md border border-gray-200 bg-white transition duration-300 hover:border-gray-400 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-600">
      {resource.image && (
        <div className="relative aspect-[16/9] overflow-hidden border-b border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900">
          <Image
            src={resource.image}
            alt={resource.title}
            width={960}
            height={540}
            className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.02]"
          />
        </div>
      )}
      <div className={compact ? 'p-5' : 'p-6 md:p-7'}>
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <ContentBadge tone="accent">{resource.type}</ContentBadge>
          <ContentBadge tone="muted">{resource.source}</ContentBadge>
        </div>
        <h3 className="text-2xl font-black tracking-tight text-gray-950 dark:text-white">
          {resource.title}
        </h3>
        <p className="mt-4 leading-8 text-gray-600 dark:text-gray-300">{resource.summary}</p>
        {resource.tags && (
          <div className="mt-6">
            <ContentTags tags={resource.tags} />
          </div>
        )}
        <div className="mt-6">
          <RelatedConnections
            groups={[
              { title: 'Líneas de investigación', items: resource.researchItems },
              { title: 'Proyectos', items: resource.projects },
              { title: 'Papers', items: resource.papers },
              { title: 'Educación y credenciales', items: resource.credentials },
              { title: 'Trayectoria', items: resource.trajectoryItems },
              { title: 'Emprendimientos', items: resource.ventures },
              { title: 'Charlas y talleres', items: resource.talks },
            ]}
          />
        </div>
        {resource.href && (
          <div className="mt-7">
            <CardLink href={resource.href}>Abrir recurso</CardLink>
          </div>
        )}
      </div>
    </article>
  )
}

export default ResourceCard
