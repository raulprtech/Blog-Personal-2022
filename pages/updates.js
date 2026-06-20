import LayoutWrapper from '@/components/LayoutWrapper'
import { PageSEO } from '@/components/SEO'
import UpdateCard from '@/components/UpdateCard'
import siteMetadata from '@/data/siteMetadata'
import updatesData from '@/data/updatesData'

export default function Updates() {
  const [featuredUpdate, ...updates] = updatesData

  return (
    <LayoutWrapper>
      <PageSEO
        title={`Updates - ${siteMetadata.author}`}
        description="Notas breves sobre publicaciones, charlas, proyectos, docencia y avances profesionales de Raul Pacheco Rodriguez."
      />
      <section className="pb-16 pt-8">
        <div className="grid gap-10 border-b border-gray-200 pb-12 dark:border-gray-800 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-primary-700 dark:text-secondary-400">
              Updates profesionales
            </p>
            <h1 className="text-4xl font-black tracking-tight text-gray-950 dark:text-white md:text-6xl">
              Lo nuevo, sin convertirlo todo en blog.
            </h1>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
            Conferencias, publicaciones, proyectos, libros, software y notas de carrera. Esta
            seccion esta pensada para actualizaciones cortas y editables, con una estructura
            preparada para migrar a Sanity.
          </p>
        </div>

        <div className="grid gap-6 py-12 lg:grid-cols-[1.1fr_0.9fr]">
          {featuredUpdate && <UpdateCard update={featuredUpdate} large />}
          <div className="grid gap-6">
            {updates.slice(0, 2).map((update) => (
              <UpdateCard key={update.title} update={update} />
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {updates.slice(2).map((update) => (
            <UpdateCard key={update.title} update={update} />
          ))}
        </div>
      </section>
    </LayoutWrapper>
  )
}
