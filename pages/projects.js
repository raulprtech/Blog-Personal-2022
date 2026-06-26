import siteMetadata from '@/data/siteMetadata'
import { getPageContent, getProjects } from '@/lib/content'
import { PageSEO } from '@/components/SEO'
import LayoutWrapper from '@/components/LayoutWrapper'
import ProjectCard from '@/components/ProjectCard'
import EditablePageHeader from '@/components/EditablePageHeader'

export async function getStaticProps({ lang = 'es' } = {}) {
  const [projectsData, pageContent] = await Promise.all([
    getProjects(lang),
    getPageContent('projects', lang),
  ])
  return {
    props: { projectsData, pageContent, lang },
    revalidate: 60,
  }
}

export default function Projects({ projectsData, pageContent, lang = 'es' }) {
  return (
    <LayoutWrapper lang={lang}>
      <PageSEO
        title={
          pageContent?.seoTitle || `Proyectos - ${siteMetadata.author} - ${siteMetadata.nickname}`
        }
        description={pageContent?.seoDescription}
      />
      <section className="pb-16 pt-8">
        <EditablePageHeader content={pageContent} />

        <div className="grid gap-6 py-12 md:grid-cols-2">
          {projectsData.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>
    </LayoutWrapper>
  )
}
