import Link from 'next/link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import Hero from '@/components/Hero'
import LayoutWrapper from '@/components/LayoutWrapper'
import Banner from '@/components/Banner'
import mainBanner from '@/data/mainBanner'
import UpdateCard from '@/components/UpdateCard'
import ProjectCard from '@/components/ProjectCard'
import NewsletterCTA from '@/components/NewsletterCTA'
import ResourceCard from '@/components/ResourceCard'
import { getHomeContent } from '@/lib/content'

export async function getStaticProps() {
  return {
    props: await getHomeContent(),
    revalidate: 60,
  }
}

export default function Home({ updates, projects, resources, pageContent }) {
  const sections = pageContent?.sections || {}
  const updatesSection = sections.updates || {}
  const resourcesSection = sections.resources || {}
  const projectsSection = sections.projects || {}

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
          title={
            pageContent?.seoTitle ||
            `${siteMetadata.title} - ${siteMetadata.author} - ${siteMetadata.nickname}`
          }
          description={pageContent?.seoDescription || siteMetadata.description}
        />
        <Hero content={pageContent?.hero} />
        <section className="py-12">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary-700 dark:text-secondary-400">
                {updatesSection.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-950 dark:text-white md:text-5xl">
                {updatesSection.title}
              </h2>
              {updatesSection.description && (
                <p className="mt-4 max-w-2xl text-base leading-8 text-gray-600 dark:text-gray-300">
                  {updatesSection.description}
                </p>
              )}
            </div>
            <Link
              href="/updates"
              className="hidden text-sm font-semibold text-primary-700 hover:text-primary-800 dark:text-secondary-400 md:block"
            >
              {updatesSection.hrefLabel} -&gt;
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
                {resourcesSection.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-950 dark:text-white md:text-5xl">
                {resourcesSection.title}
              </h2>
              {resourcesSection.description && (
                <p className="mt-4 max-w-2xl text-base leading-8 text-gray-600 dark:text-gray-300">
                  {resourcesSection.description}
                </p>
              )}
            </div>
            <Link
              href="/resources"
              className="hidden text-sm font-semibold text-primary-700 hover:text-primary-800 dark:text-secondary-400 md:block"
            >
              {resourcesSection.hrefLabel} -&gt;
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {resources.map((resource) => (
              <ResourceCard key={resource.title} resource={resource} compact />
            ))}
          </div>
        </section>

        <section className="py-12">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary-700 dark:text-secondary-400">
                {projectsSection.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-950 dark:text-white md:text-5xl">
                {projectsSection.title}
              </h2>
              {projectsSection.description && (
                <p className="mt-4 max-w-2xl text-base leading-8 text-gray-600 dark:text-gray-300">
                  {projectsSection.description}
                </p>
              )}
            </div>
            <Link
              href="/projects"
              className="hidden text-sm font-semibold text-primary-700 hover:text-primary-800 dark:text-secondary-400 md:block"
            >
              {projectsSection.hrefLabel} -&gt;
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {projects.slice(0, 4).map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>
      </LayoutWrapper>
    </>
  )
}
