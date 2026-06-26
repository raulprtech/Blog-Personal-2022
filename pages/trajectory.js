import Link from 'next/link'
import LayoutWrapper from '@/components/LayoutWrapper'
import { PageSEO } from '@/components/SEO'
import EditablePageHeader from '@/components/EditablePageHeader'
import siteMetadata from '@/data/siteMetadata'
import { getPageContent, getTrajectory } from '@/lib/content'

const categoryStyles = {
  Education:
    'border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-900 dark:bg-cyan-950 dark:text-cyan-300',
  Work: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300',
  Project:
    'border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900 dark:bg-violet-950 dark:text-violet-300',
  Research:
    'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300',
  Editorial:
    'border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-900 dark:bg-cyan-950 dark:text-cyan-300',
  Product:
    'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-300',
  Teaching:
    'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300',
}

const categories = ['Research', 'Education', 'Project', 'Work', 'Editorial', 'Product', 'Teaching']

function Milestone({ item }) {
  return (
    <article className="relative grid gap-4 border-b border-gray-200 py-8 last:border-b-0 dark:border-gray-800 md:grid-cols-[180px_1fr]">
      <div>
        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">{item.period}</p>
        <span
          className={`mt-3 inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
            categoryStyles[item.category] || categoryStyles.Teaching
          }`}
        >
          {item.category}
        </span>
      </div>
      <div>
        <h2 className="text-2xl font-black tracking-tight text-gray-950 dark:text-white">
          {item.title}
        </h2>
        <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-primary-700 dark:text-secondary-400">
          {item.organization}
        </p>
        <p className="mt-4 max-w-3xl leading-8 text-gray-600 dark:text-gray-300">{item.summary}</p>
        {item.href && (
          <Link
            href={item.href}
            className="mt-5 inline-flex text-sm font-semibold text-primary-700 hover:text-primary-800 dark:text-secondary-400"
          >
            Ver contexto <span aria-hidden="true">-&gt;</span>
          </Link>
        )}
      </div>
    </article>
  )
}

export async function getStaticProps({ lang = 'es' } = {}) {
  const [trajectoryData, pageContent] = await Promise.all([
    getTrajectory(lang),
    getPageContent('trajectory', lang),
  ])
  return {
    props: { trajectoryData, pageContent, lang },
    revalidate: 60,
  }
}

export default function Trajectory({ trajectoryData, pageContent, lang = 'es' }) {
  const featured = trajectoryData.filter((item) => item.featured)
  const summaryStats = pageContent?.summaryStats || []

  return (
    <LayoutWrapper lang={lang}>
      <PageSEO
        title={
          pageContent?.seoTitle || `Trayectoria - ${siteMetadata.author} - ${siteMetadata.nickname}`
        }
        description={pageContent?.seoDescription}
      />
      <section className="pb-16 pt-8">
        <EditablePageHeader content={pageContent} />

        <div className="grid gap-4 py-10 md:grid-cols-2 lg:grid-cols-4">
          {summaryStats.map((stat) => (
            <div
              key={`${stat.value}-${stat.label}`}
              className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950"
            >
              <p className="text-3xl font-black text-gray-950 dark:text-white">{stat.value}</p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((category) => (
            <span
              key={category}
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${categoryStyles[category]}`}
            >
              {category}
            </span>
          ))}
        </div>

        <div className="rounded-lg border border-gray-200 bg-white px-6 dark:border-gray-800 dark:bg-gray-950 md:px-8">
          {trajectoryData.map((item) => (
            <Milestone key={`${item.period}-${item.title}`} item={item} />
          ))}
        </div>

        <section className="mt-12 rounded-lg border border-gray-200 bg-gray-950 p-8 text-white dark:border-gray-800">
          <p className="text-xs font-semibold uppercase tracking-widest text-cyan-300">
            {pageContent?.featuredEyebrow}
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {featured.slice(0, 4).map((item) => (
              <div key={item.title}>
                <p className="text-sm font-semibold text-cyan-200">{item.period}</p>
                <h2 className="mt-2 text-xl font-black">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-gray-300">{item.summary}</p>
              </div>
            ))}
          </div>
        </section>
      </section>
    </LayoutWrapper>
  )
}
