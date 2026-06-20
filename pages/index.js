import Image from 'next/image'
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

function SectionHeading({ section, href }) {
  return (
    <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_320px] lg:items-end">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-primary-700 dark:text-secondary-400">
          {section.eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-950 dark:text-white md:text-5xl">
          {section.title}
        </h2>
        {section.description && (
          <p className="mt-4 max-w-2xl text-base leading-8 text-gray-600 dark:text-gray-300">
            {section.description}
          </p>
        )}
        <Link
          href={href}
          className="mt-5 inline-flex text-sm font-semibold text-primary-700 hover:text-primary-800 dark:text-secondary-400 md:hidden"
        >
          {section.hrefLabel} -&gt;
        </Link>
      </div>
      <div className="flex justify-start lg:justify-end">
        {section.image ? (
          <div className="w-full lg:max-w-xs">
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900">
              <div className="relative aspect-[4/3]">
                <Image
                  src={section.image}
                  alt={section.imageAlt || section.title || 'Section visual'}
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
            <Link
              href={href}
              className="mt-4 hidden text-sm font-semibold text-primary-700 hover:text-primary-800 dark:text-secondary-400 md:inline-flex"
            >
              {section.hrefLabel} -&gt;
            </Link>
          </div>
        ) : (
          <Link
            href={href}
            className="hidden text-sm font-semibold text-primary-700 hover:text-primary-800 dark:text-secondary-400 md:block"
          >
            {section.hrefLabel} -&gt;
          </Link>
        )}
      </div>
    </div>
  )
}

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
          <SectionHeading section={updatesSection} href="/updates" />
          <div className="grid gap-6 lg:grid-cols-3">
            {updates.slice(0, 3).map((update, index) => (
              <UpdateCard key={update.title} update={update} large={index === 0} />
            ))}
          </div>
        </section>

        <NewsletterCTA />

        <section className="py-12">
          <SectionHeading section={resourcesSection} href="/resources" />
          <div className="grid gap-6 md:grid-cols-3">
            {resources.map((resource) => (
              <ResourceCard key={resource.title} resource={resource} compact />
            ))}
          </div>
        </section>

        <section className="py-12">
          <SectionHeading section={projectsSection} href="/projects" />
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
