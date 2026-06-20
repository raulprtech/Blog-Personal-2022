import siteMetadata from '@/data/siteMetadata'
import { getProjects } from '@/lib/content'
import { PageSEO } from '@/components/SEO'
import LayoutWrapper from '@/components/LayoutWrapper'
import ProjectCard from '@/components/ProjectCard'

export async function getStaticProps() {
  return {
    props: { projectsData: await getProjects() },
    revalidate: 60,
  }
}

export default function Projects({ projectsData }) {
  return (
    <LayoutWrapper>
      <PageSEO
        title={`Proyectos - ${siteMetadata.author} - ${siteMetadata.nickname}`}
        description={`Proyectos tecnicos de ${siteMetadata.author} en IA, hardware-aware ML, FPGA, web y productos educativos.`}
      />
      <section className="pb-16 pt-8">
        <div className="grid gap-10 border-b border-gray-200 pb-12 dark:border-gray-800 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-primary-700 dark:text-secondary-400">
              Portfolio tecnico
            </p>
            <h1 className="text-4xl font-black tracking-tight text-gray-950 dark:text-white md:text-6xl">
              Proyectos que conectan investigacion, producto y sistemas.
            </h1>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
            Una seleccion de trabajo en aceleracion hardware, IA medica, productos educativos y
            escritura tecnica. La estructura esta pensada para migrar cada proyecto a Sanity con
            imagen, estado, rol, tags y enlaces.
          </p>
        </div>

        <div className="grid gap-6 py-12 md:grid-cols-2">
          {projectsData.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>
    </LayoutWrapper>
  )
}
