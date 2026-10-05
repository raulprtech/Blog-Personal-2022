import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import LayoutWrapper from '@/components/LayoutWrapper'
import { withSiteSettings } from '@/lib/withSiteSettings'

export const getStaticProps = withSiteSettings(async () => ({ props: {}, revalidate: 60 }))
import Image from 'next/image'

export default function trajectory() {
  return (
    <LayoutWrapper
      bgImage={'https://cdn.pixabay.com/photo/2021/12/09/19/01/globe-6858907_1280.jpg'}
    >
      <PageSEO
        title={`Servicios - ${siteMetadata.author} - ${siteMetadata.nickname}`}
        description={`Servicios de Desarrollo Web e Inteligencia Artificial ${siteMetadata.author}`}
      />
      <section className="bg-blueGray-50  relative">
        <div className="min-h-screen-75 relative flex content-center items-center justify-center pb-32 pt-16">
          <div className="absolute top-0 h-full w-full bg-cover bg-center">
            <span id="blackOverlay" className="absolute h-full w-full"></span>
          </div>
          <div className="container relative mx-auto">
            <div className="flex flex-wrap items-center">
              <div className="ml-auto mr-auto w-full px-4 text-center">
                <div className="pr-12">
                  <h1 className=" text-7xl font-extrabold text-secondary-400">
                    Tu historia inicia hoy
                  </h1>
                  <p className="mt-8 rounded-xl bg-gray-100 bg-opacity-70 p-1 text-xl font-bold text-gray-900">
                    Es momento de usar la tecnologia a tu favor y subirte a la ola digital. Tu
                    negocio te lo agradecera.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="h-70-px pointer-events-none absolute bottom-0 left-0 right-0 top-auto w-full overflow-hidden">
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>
        <section className="bg-blueGray-200 -mt-24 pb-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <div className="w-full px-4 pt-6 text-center md:w-4/12 lg:pt-12">
                <div className="relative mb-8 flex w-full min-w-0 flex-col break-words rounded-lg bg-white bg-opacity-70 shadow-lg">
                  <div className="flex-auto px-4 py-5">
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-400 p-3 text-center text-white shadow-lg">
                      <i className="">🧗‍♂️</i>
                    </div>
                    <h6 className="text-xl font-bold text-gray-900">Diseño escalable</h6>
                    <p className="mb-4 mt-2 font-medium text-gray-900">
                      Tu sitio web está diseñado para crecer con tu negocio; te capacitamos para
                      agregar nuevos productos y actualizar tu información fácilmente.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full px-4 text-center md:w-4/12">
                <div className="relative mb-8 flex w-full min-w-0 flex-col break-words rounded-lg bg-white bg-opacity-70 shadow-lg">
                  <div className="flex-auto px-4 py-5">
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary-400 p-3 text-center text-white shadow-lg">
                      <i className="fas fa-retweet">💵</i>
                    </div>
                    <h6 className="text-xl font-semibold text-gray-900">
                      Precios accesibles y transparentes
                    </h6>
                    <p className="mb-4 mt-2 font-medium text-gray-900">
                      La única opción que tiene sentido es crear sitios web que generen resultados a
                      un precio justo, competitivo y transparente.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full px-4 pt-6 text-center md:w-4/12">
                <div className="relative mb-8 flex w-full min-w-0 flex-col break-words rounded-lg bg-white bg-opacity-70 shadow-lg">
                  <div className="flex-auto px-4 py-5">
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-400 p-3 text-center text-white shadow-lg">
                      <i className="fas fa-fingerprint">🤗</i>
                    </div>
                    <h6 className="text-xl font-semibold text-gray-900">
                      Proceso fácil y amigable
                    </h6>
                    <p className="mb-4 mt-2 font-medium text-gray-900">
                      Menos tiempo en juntas innecesarias y más tiempo dedicado a la investigación,
                      análisis y estrategia para producir el sitio web capaz de crecer tu negocio.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      <section className="py-14">
        <h1 className="mt-8 text-center text-5xl font-bold text-secondary-400">Servicios</h1>

        <div className="md:flex md:justify-center md:space-x-8 md:px-14">
          <div className="bg-whit mx-auto mt-16 w-72 transform rounded-xl bg-white px-4 py-4 shadow-lg transition duration-500 hover:scale-110 hover:shadow-xl md:mx-0">
            <div className="w-sm">
              <Image
                src="/static/images/internet.png"
                alt="Raul Alberto Pacheco Rodriguez"
                width="720"
                height="600"
                className="h-120 w-240 rounded-lg object-cover object-center "
              />
              <div className="mt-4 text-center text-green-600">
                <h1 className="text-xl font-bold">Communications</h1>
                <p className="mt-4 text-gray-600">
                  Pretium lectus quam id leo in vitae turpis. Mattis pellentesque id nibh tortor id.
                </p>
                <button className="mb-4 mt-8 rounded-full bg-green-600 px-14 py-2 tracking-widest text-white transition duration-200 hover:bg-green-500">
                  MORE
                </button>
              </div>
            </div>
          </div>

          <div className="bg-whit mx-auto mt-16 w-72 transform rounded-xl bg-white px-4 py-4 shadow-lg transition duration-500 hover:scale-110 hover:shadow-xl md:mx-0">
            <div className="w-sm">
              <Image
                src="/static/images/internet.png"
                alt="Raul Alberto Pacheco Rodriguez"
                width="720"
                height="600"
                className="h-120 w-240 rounded-lg object-cover object-center "
              />
              <div className="mt-4 text-center text-green-600">
                <h1 className="text-xl font-bold">Inspired Design</h1>
                <p className="mt-4 text-gray-600">
                  Nunc consequat interdum varius sit amet mattis vulputate enim nulla. Risus
                  feugiat.
                </p>
                <button className="mb-4 mt-8 rounded-full bg-green-600 px-14 py-2 tracking-widest text-white transition duration-200 hover:bg-green-500">
                  MORE
                </button>
              </div>
            </div>
          </div>

          <div className="bg-whit mx-auto mt-16 w-72 transform rounded-xl bg-white px-4 py-4 shadow-lg transition duration-500 hover:scale-110 hover:shadow-xl md:mx-0">
            <div className="w-sm">
              <Image
                src="/static/images/internet.png"
                alt="Raul Alberto Pacheco Rodriguez"
                width="720"
                height="600"
                className="h-120 w-240 rounded-lg object-cover object-center "
              />
              <div className="mt-4 text-center text-green-600">
                <h1 className="text-xl font-bold">Happy Customers</h1>
                <p className="mt-4 text-gray-600">
                  Nisl purus in mollis nunc sed id semper. Rhoncus aenean vel elit scelerisque
                  mauris.
                </p>
                <button className="mb-4 mt-8 rounded-full bg-green-600 px-14 py-2 tracking-widest text-white transition duration-200 hover:bg-green-500">
                  MORE
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LayoutWrapper>
  )
}
