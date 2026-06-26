import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllNoteTags } from '@/lib/notes'
import kebabCase from '@/lib/utils/kebabCase'
import LayoutWrapper from '@/components/LayoutWrapper'
import { localizedPath } from '@/lib/i18n'

export async function getStaticProps({ lang = 'es' } = {}) {
  const tags = await getAllNoteTags(lang)

  return { props: { tags, lang } }
}

export default function Tags({ tags, lang = 'es' }) {
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])
  return (
    <LayoutWrapper lang={lang}>
      <section>
        <PageSEO
          title={`Tags - ${siteMetadata.author}`}
          description={`Variedad de articulos sobre tecnologia escritos por ${siteMetadata.author}`}
        />
        <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-6 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
          <div className="space-x-2 pb-6 md:space-y-5">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-secondary-400 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
              Tags
            </h1>
          </div>
          <div className="flex max-w-xl flex-wrap">
            {Object.keys(tags).length === 0 && 'No se encontraron Tags.'}
            {sortedTags.map((t) => {
              return (
                <div key={t} className="mr-2 capitalize">
                  <Tag
                    text={t}
                    link={localizedPath(`/tags/${kebabCase(t)}`, lang)}
                  >{` (${tags[t]})`}</Tag>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </LayoutWrapper>
  )
}
