import Image from '@/components/Image'
import formatDate from '@/lib/utils/formatDate'
import { CardLink, ContentBadge, Eyebrow, RelatedConnections } from '@/components/ContentMeta'

const UpdateCard = ({ update, large = false }) => {
  return (
    <article className="group h-full overflow-hidden rounded-md border border-gray-200 bg-white transition duration-300 hover:border-gray-400 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-600">
      {update.image && (
        <div className="relative aspect-[16/9] overflow-hidden border-b border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900">
          <Image
            src={update.image}
            alt={update.title}
            width={960}
            height={540}
            className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.02]"
          />
          <div
            className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${
              update.accent || 'from-primary-700 to-secondary-400'
            }`}
          />
        </div>
      )}
      <div className={`${large ? 'p-7 md:p-8' : 'p-6'}`}>
        <div className="mb-7 flex items-center justify-between gap-4">
          <Eyebrow>{update.eyebrow}</Eyebrow>
          <time className="text-xs text-gray-500 dark:text-gray-400" dateTime={update.date}>
            {formatDate(update.date)}
          </time>
        </div>
        <div className="space-y-4">
          <ContentBadge>{update.type}</ContentBadge>
          <h2
            className={`font-extrabold tracking-tight text-gray-950 dark:text-gray-50 ${
              large ? 'text-3xl md:text-5xl' : 'text-2xl'
            }`}
          >
            {update.title}
          </h2>
          <p
            className={`${
              large ? 'text-lg' : 'text-base'
            } leading-8 text-gray-600 dark:text-gray-300`}
          >
            {update.summary}
          </p>
        </div>
        <div className="mt-6">
          <RelatedConnections
            groups={[
              { title: 'Líneas de investigación', items: update.researchItems },
              { title: 'Proyectos', items: update.projects },
              { title: 'Papers', items: update.papers },
              { title: 'Educación y credenciales', items: update.credentials },
              { title: 'Recursos', items: update.resources },
              { title: 'Trayectoria', items: update.trajectoryItems },
              { title: 'Emprendimientos', items: update.ventures },
            ]}
          />
        </div>
        {update.href && (
          <div className="mt-8">
            <CardLink href={update.href}>Ver contexto</CardLink>
          </div>
        )}
      </div>
    </article>
  )
}

export default UpdateCard
