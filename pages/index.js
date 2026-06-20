import Link from 'next/link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import Hero from '@/components/Hero'
import LayoutWrapper from '@/components/LayoutWrapper'
import Banner from '@/components/Banner'
import mainBanner from '@/data/mainBanner'
import projectsData from '@/data/projectsData'
import updatesData from '@/data/updatesData'
import UpdateCard from '@/components/UpdateCard'
import ProjectCard from '@/components/ProjectCard'
import NewsletterCTA from '@/components/NewsletterCTA'
import ResourceCard from '@/components/ResourceCard'
import resourcesData from '@/data/resourcesData'

export async function getStaticProps() {
  return { props: { updates: updatesData } }
}

export default function Home({ updates }) {
  return (
    <>
      <Banner
        title={mainBanner.title}
        link={mainBanner.link}
        bgColor={mainBanner.bgColor}
        image={mainBanner.image}
        emoji={mainBanner.emoji}
      />
      <LayoutWrapper bgImage="">
        <PageSEO
          title={`${siteMetadata.title} - ${siteMetadata.author} - ${siteMetadata.nickname}`}
          description={`${siteMetadata.description}`}
        />
        <Hero />
        <section className="py-12">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary-700 dark:text-secondary-400">
                Carrera y actividad reciente
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-950 dark:text-white md:text-5xl">
                Updates
              </h2>
            </div>
            <Link
              href="/updates"
              className="hidden text-sm font-semibold text-primary-700 hover:text-primary-800 dark:text-secondary-400 md:block"
            >
              Ver todos -&gt;
            </Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {updates.slice(0, 3).map((update, index) => (
              <UpdateCard key={update.title} update={update} large={index === 0} />
            ))}
          </div>
        </section>

        <NewsletterCTA />

        <section className="py-12">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary-700 dark:text-secondary-400">
                Biblioteca t&eacute;cnica
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-950 dark:text-white md:text-5xl">
                Recursos
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-gray-600 dark:text-gray-300">
                Lecturas, repositorios y referencias que alimentan mi investigaci&oacute;n, mi
                escritura y mi trabajo de programaci&oacute;n.
              </p>
            </div>
            <Link
              href="/resources"
              className="hidden text-sm font-semibold text-primary-700 hover:text-primary-800 dark:text-secondary-400 md:block"
            >
              Ver recursos -&gt;
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {resourcesData.map((resource) => (
              <ResourceCard key={resource.title} resource={resource} compact />
            ))}
          </div>
        </section>

        <section className="py-12">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary-700 dark:text-secondary-400">
                Trabajo seleccionado
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-950 dark:text-white md:text-5xl">
                Proyectos
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-gray-600 dark:text-gray-300">
                Experimentos, repositorios y piezas t&eacute;cnicas que conectan software, hardware
                e IA aplicada.
              </p>
            </div>
            <Link
              href="/projects"
              className="hidden text-sm font-semibold text-primary-700 hover:text-primary-800 dark:text-secondary-400 md:block"
            >
              Ver proyectos -&gt;
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {projectsData.slice(0, 4).map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>
      </LayoutWrapper>
    </>
  )
}
