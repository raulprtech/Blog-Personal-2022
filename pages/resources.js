import LayoutWrapper from '@/components/LayoutWrapper'
import { PageSEO } from '@/components/SEO'
import ResourceCard from '@/components/ResourceCard'
import siteMetadata from '@/data/siteMetadata'
import resourcesData from '@/data/resourcesData'

const categories = ['papers', 'repos', 'blogs', 'books', 'talks', 'datasets']

export default function Resources() {
  return (
    <LayoutWrapper>
      <PageSEO
        title={`Recursos - ${siteMetadata.author}`}
        description="Biblioteca t\u00e9cnica y recursos curados de Raul Pacheco Rodriguez sobre IA, sistemas, investigaci\u00f3n y programaci\u00f3n."
      />
      <section className="pb-16 pt-8">
        <div className="grid gap-10 border-b border-gray-200 pb-12 dark:border-gray-800 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-primary-700 dark:text-secondary-400">
              Biblioteca t&eacute;cnica
            </p>
            <h1 className="text-4xl font-black tracking-tight text-gray-950 dark:text-white md:text-6xl">
              Lecturas, herramientas y referencias para construir mejor.
            </h1>
          </div>
          <div>
            <p className="max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
              Una p&aacute;gina viva para recursos de investigaci&oacute;n, programaci&oacute;n y
              escritura t&eacute;cnica. La idea es que pueda crecer como un &iacute;ndice curado:
              &uacute;til para mi flujo de trabajo y &uacute;til para quien quiera seguir las mismas
              rutas de aprendizaje.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {categories.map((category) => (
                <span
                  key={category}
                  className="border border-gray-200 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-gray-600 dark:border-gray-800 dark:text-gray-300"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 py-12 md:grid-cols-3">
          {resourcesData.map((resource) => (
            <ResourceCard key={resource.title} resource={resource} />
          ))}
        </div>

        <section className="rounded-md border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950 md:p-8">
          <p className="font-mono text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400">
            planned schema
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {['title', 'type', 'source', 'href', 'tags', 'image'].map((field) => (
              <div key={field} className="border-t border-gray-200 pt-4 dark:border-gray-800">
                <p className="font-mono text-sm text-gray-950 dark:text-white">{field}</p>
                <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                  Campo listo para migrar a Sanity o Supabase cuando conectemos el CMS.
                </p>
              </div>
            ))}
          </div>
        </section>
      </section>
    </LayoutWrapper>
  )
}
