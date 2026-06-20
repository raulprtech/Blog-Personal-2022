import Link from 'next/link'
import Image from '@/components/Image'

const ResourceCard = ({ resource, compact = false }) => {
  const content = (
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
        <div className="mb-5 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400">
          <span>{resource.type}</span>
          {resource.source && (
            <>
              <span aria-hidden="true">/</span>
              <span>{resource.source}</span>
            </>
          )}
        </div>
        <h3 className="text-2xl font-black tracking-tight text-gray-950 dark:text-white">
          {resource.title}
        </h3>
        <p className="mt-4 leading-8 text-gray-600 dark:text-gray-300">{resource.summary}</p>
        {resource.tags && (
          <div className="mt-6 flex flex-wrap gap-2">
            {resource.tags.map((tag) => (
              <span
                key={tag}
                className="border border-gray-200 px-2.5 py-1 font-mono text-[11px] text-gray-600 dark:border-gray-800 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {resource.href && (
          <p className="mt-7 text-sm font-semibold text-primary-700 transition group-hover:text-primary-800 dark:text-secondary-400">
            Abrir recurso <span aria-hidden="true">-&gt;</span>
          </p>
        )}
      </div>
    </article>
  )

  if (!resource.href) return content

  return (
    <Link href={resource.href} aria-label={resource.title} className="block h-full">
      {content}
    </Link>
  )
}

export default ResourceCard
