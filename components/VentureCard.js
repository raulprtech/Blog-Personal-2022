import Image from '@/components/Image'
import {
  CardLink,
  CollaboratorLine,
  ContentBadge,
  ContentTags,
  RelatedConnections,
} from '@/components/ContentMeta'

const VentureCard = ({ venture }) => {
  return (
    <article className="group h-full overflow-hidden rounded-md border border-gray-200 bg-white transition duration-300 hover:border-gray-400 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-600">
      {venture.image && (
        <div className="relative aspect-[16/9] overflow-hidden border-b border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900">
          <Image
            src={venture.image}
            alt={venture.imageAlt || venture.title}
            width={960}
            height={540}
            className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.02]"
          />
        </div>
      )}
      <div className="p-6 md:p-7">
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <ContentBadge tone="accent">{venture.category}</ContentBadge>
          <ContentBadge tone="muted">{venture.status}</ContentBadge>
        </div>
        <h3 className="text-2xl font-black tracking-tight text-gray-950 dark:text-white">
          {venture.title}
        </h3>
        <p className="mt-4 leading-8 text-gray-600 dark:text-gray-300">{venture.description}</p>
        {venture.role && (
          <p className="mt-5 text-sm font-semibold text-gray-700 dark:text-gray-200">
            Rol:{' '}
            <span className="font-medium text-gray-500 dark:text-gray-400">{venture.role}</span>
          </p>
        )}
        {venture.collaborators && (
          <div className="mt-4">
            <CollaboratorLine collaborators={venture.collaborators} />
          </div>
        )}
        {venture.tags && (
          <div className="mt-6">
            <ContentTags tags={venture.tags} />
          </div>
        )}
        <div className="mt-6">
          <RelatedConnections
            groups={[
              { title: 'Líneas de investigación', items: venture.researchItems },
              { title: 'Papers', items: venture.papers },
              { title: 'Proyectos', items: venture.projects },
              { title: 'Educación y credenciales', items: venture.credentials },
              { title: 'Recursos', items: venture.resources },
              { title: 'Trayectoria', items: venture.trajectoryItems },
            ]}
          />
        </div>
        {venture.href && (
          <div className="mt-7">
            <CardLink href={venture.href}>Ver iniciativa</CardLink>
          </div>
        )}
      </div>
    </article>
  )
}

export default VentureCard
