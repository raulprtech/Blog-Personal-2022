import Image from 'next/image'
import Link from 'next/link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import Hero from '@/components/Hero'
import LayoutWrapper from '@/components/LayoutWrapper'
import Banner from '@/components/Banner'
import UpdateCard from '@/components/UpdateCard'
import ProjectCard from '@/components/ProjectCard'
import NewsletterCTA from '@/components/NewsletterCTA'
import ResourceCard from '@/components/ResourceCard'
import { Eyebrow } from '@/components/ContentMeta'
import { getHomeContent } from '@/lib/content'
import { getAllFilesFrontMatter } from '@/lib/mdx'

function SectionHeading({ section, href }) {
  return (
    <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_320px] lg:items-end">
      <div>
        <Eyebrow>{section.eyebrow}</Eyebrow>
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

function BlogNoteCard({ post }) {
  return (
    <article className="h-full rounded-md border border-gray-200 bg-white p-6 transition hover:border-gray-400 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-600">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-700 dark:text-secondary-400">
        {post.date}
      </p>
      <h3 className="mt-4 text-2xl font-black tracking-tight text-gray-950 dark:text-white">
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h3>
      <p className="mt-4 leading-8 text-gray-600 dark:text-gray-300">{post.summary}</p>
      {post.tags && (
        <div className="mt-5 flex flex-wrap gap-2">
          {post.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-600 dark:border-gray-700 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}

export async function getStaticProps() {
  const [homeContent, blogPosts] = await Promise.all([
    getHomeContent(),
    getAllFilesFrontMatter('blog'),
  ])

  return {
    props: {
      ...homeContent,
      blogPosts: blogPosts.slice(0, 3),
    },
    revalidate: 60,
  }
}

export default function Home({ updates, projects, resources, blogPosts, pageContent }) {
  const sections = pageContent?.sections || {}
  const updatesSection = sections.updates || {}
  const resourcesSection = sections.resources || {}
  const blogSection = sections.blog || {}
  const projectsSection = sections.projects || {}

  return (
    <>
      {pageContent?.announcementBanner?.enabled && (
        <Banner
          title={pageContent.announcementBanner.title}
          link={pageContent.announcementBanner.href}
          bgColor={pageContent.announcementBanner.bgColor}
          image={pageContent.announcementBanner.image}
          emoji={pageContent.announcementBanner.emoji}
        />
      )}
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

        <NewsletterCTA content={pageContent?.newsletterCta} />

        <section className="py-12">
          <SectionHeading section={blogSection} href="/blog" />
          <div className="grid gap-6 md:grid-cols-3">
            {(blogPosts || []).map((post) => (
              <BlogNoteCard key={post.slug} post={post} />
            ))}
          </div>
        </section>

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
