import Image from '@/components/Image'
import Link from 'next/link'
import formatDate from '@/lib/utils/formatDate'

const UpdateCard = ({ update, large = false }) => {
  const content = (
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
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
            {update.eyebrow}
          </p>
          <time className="text-xs text-gray-500 dark:text-gray-400" dateTime={update.date}>
            {formatDate(update.date)}
          </time>
        </div>
        <div className="space-y-4">
          <span className="inline-flex rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600 dark:border-gray-700 dark:text-gray-300">
            {update.type}
          </span>
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
        {update.href && (
          <p className="mt-8 text-sm font-semibold text-primary-700 transition group-hover:text-primary-800 dark:text-secondary-400">
            Ver contexto <span aria-hidden="true">-&gt;</span>
          </p>
        )}
      </div>
    </article>
  )

  if (!update.href) return content

  return (
    <Link href={update.href} aria-label={update.title} className="block h-full">
      {content}
    </Link>
  )
}

export default UpdateCard
