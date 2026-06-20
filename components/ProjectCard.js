import Link from 'next/link'
import Image from '@/components/Image'

const ProjectCard = ({ project }) => {
  return (
    <article className="group h-full overflow-hidden rounded-md border border-gray-200 bg-white transition duration-300 hover:border-gray-400 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-600">
      {project.imgSrc && (
        <div className="relative aspect-[16/10] overflow-hidden border-b border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900">
          <Image
            src={project.imgSrc}
            alt={project.title}
            width={960}
            height={600}
            className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.02]"
          />
        </div>
      )}
      <div className="p-6">
        <div className="mb-5 flex flex-wrap items-center gap-2">
          {project.category && (
            <span className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700 dark:border-cyan-900 dark:bg-cyan-950 dark:text-cyan-300">
              {project.category}
            </span>
          )}
          {project.status && (
            <span className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
              {project.status}
            </span>
          )}
        </div>
        <h3 className="text-2xl font-black tracking-tight text-gray-950 dark:text-white">
          {project.title}
        </h3>
        <p className="mt-4 leading-8 text-gray-600 dark:text-gray-300">{project.description}</p>
        {project.role && (
          <p className="mt-5 text-sm font-semibold text-gray-700 dark:text-gray-200">
            Rol:{' '}
            <span className="font-medium text-gray-500 dark:text-gray-400">{project.role}</span>
          </p>
        )}
        {project.tags && (
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-900 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {project.href && (
          <Link
            href={project.href}
            className="mt-7 inline-flex text-sm font-semibold text-primary-700 hover:text-primary-800 dark:text-secondary-400"
          >
            Ver proyecto <span aria-hidden="true">-&gt;</span>
          </Link>
        )}
      </div>
    </article>
  )
}

export default ProjectCard
