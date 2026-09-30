import Image from '@/components/Image'
import Link from 'next/link'
import {
  CardLink,
  CollaboratorLine,
  ContentBadge,
  ContentTags,
  RelatedConnections,
} from '@/components/ContentMeta'

const ProjectCard = ({ project, lang = 'es' }) => {
  return (
    <article className="group h-full overflow-hidden rounded-md border border-gray-200 bg-white transition duration-300 hover:border-gray-400 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-600">
      {project.imgSrc && (
        <div className="relative aspect-[16/10] overflow-hidden border-b border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900">
          <Image
            src={project.imgSrc}
            alt={project.imageAlt || project.title}
            width={960}
            height={600}
            className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.02]"
          />
        </div>
      )}
      <div className="p-6">
        <div className="mb-5 flex flex-wrap items-center gap-2">
          {project.category && <ContentBadge tone="accent">{project.category}</ContentBadge>}
          {project.status && <ContentBadge tone="muted">{project.status}</ContentBadge>}
        </div>
        <h3 className="text-2xl font-black tracking-tight text-gray-950 dark:text-white">
          {project.pageHref ? <Link href={project.pageHref}>{project.title}</Link> : project.title}
        </h3>
        <p className="mt-4 leading-8 text-gray-600 dark:text-gray-300">{project.description}</p>
        {project.role && (
          <p className="mt-5 text-sm font-semibold text-gray-700 dark:text-gray-200">
            {lang === 'en' ? 'Role' : 'Rol'}:{' '}
            <span className="font-medium text-gray-500 dark:text-gray-400">{project.role}</span>
          </p>
        )}
        {project.collaborators && (
          <div className="mt-4">
            <CollaboratorLine collaborators={project.collaborators} />
          </div>
        )}
        {project.tags && (
          <div className="mt-5">
            <ContentTags tags={project.tags} />
          </div>
        )}
        <div className="mt-6">
          <RelatedConnections
            groups={[
              { title: 'Líneas de investigación', items: project.researchItems },
              { title: 'Papers', items: project.papers },
              { title: 'Emprendimientos', items: project.ventures },
              { title: 'Educación y credenciales', items: project.credentials },
              { title: 'Recursos', items: project.resources },
              { title: 'Trayectoria', items: project.trajectoryItems },
              { title: 'Charlas y talleres', items: project.talks },
            ]}
          />
        </div>
        {project.href && (
          <div className="mt-7">
            <div className="flex flex-wrap gap-5">
              <CardLink href={project.href}>
                {lang === 'en' ? 'View project' : 'Ver proyecto'}
              </CardLink>
              {project.pageHref && project.externalHref && (
                <CardLink href={project.externalHref}>
                  {lang === 'en' ? 'Project website' : 'Sitio del proyecto'}
                </CardLink>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}

export default ProjectCard
