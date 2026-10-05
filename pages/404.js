import Link from 'next/link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import LayoutWrapper from '@/components/LayoutWrapper'
import { withSiteSettings } from '@/lib/withSiteSettings'

export const getStaticProps = withSiteSettings(async () => ({ props: {}, revalidate: 60 }))

export default function FourZeroFour() {
  return (
    <LayoutWrapper>
      <PageSEO title={`Page Not Found - ${siteMetadata.author} - ${siteMetadata.nickname}`} />
      <div className="flex flex-col items-start justify-start md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6">
        <div className="space-x-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-6xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:border-r-2 md:px-6 md:text-8xl md:leading-14">
            404
          </h1>
        </div>
        <div className="max-w-md">
          <h2 className="mb-4 inline-flex text-xl font-bold leading-normal md:text-2xl">Upss</h2>
          <p className="mb-4 text-lg font-bold leading-normal md:text-xl">
            Parece que la pagina que buscas no existe
          </p>
          <p className="mb-8">Pero puedes volver la pagina principal aqui 👇</p>
          <Link href="/">
            <button className="focus:shadow-outline-blue inline rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none dark:hover:bg-blue-500">
              Volver al Inicio
            </button>
          </Link>
        </div>
      </div>
    </LayoutWrapper>
  )
}
