import Image from 'next/image'
import Link from 'next/link'
import siteMetadata from '@/data/siteMetadata'

const focusAreas = ['Hardware-aware AI', 'Anti-leakage evaluation', 'Clinical-Core']

export default function Presentation() {
  return (
    <section className="relative overflow-hidden py-12 md:py-20">
      <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="max-w-3xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-primary-700 dark:text-secondary-400">
            Raul Pacheco Rodriguez
          </p>
          <h1 className="text-5xl font-black leading-tight tracking-tight text-gray-950 dark:text-white md:text-7xl">
            Efficient AI for systems that need evidence.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300 md:text-xl md:leading-9">
            {siteMetadata.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/research"
              className="inline-flex items-center justify-center rounded-md bg-gray-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-700 dark:bg-white dark:text-gray-950 dark:hover:bg-secondary-300"
            >
              Ver investigacion
            </Link>
            <Link
              href="/updates"
              className="inline-flex items-center justify-center rounded-md border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-900 transition hover:border-primary-700 hover:text-primary-700 dark:border-gray-700 dark:text-gray-100 dark:hover:border-secondary-400 dark:hover:text-secondary-400"
            >
              Ver updates
            </Link>
            <Link
              href="/static/CV/CV.pdf"
              className="inline-flex items-center justify-center rounded-md border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-900 transition hover:border-primary-700 hover:text-primary-700 dark:border-gray-700 dark:text-gray-100 dark:hover:border-secondary-400 dark:hover:text-secondary-400"
            >
              Ver CV
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {focusAreas.map((area) => (
              <span
                key={area}
                className="rounded-full border border-gray-200 px-4 py-2 text-xs font-medium text-gray-600 dark:border-gray-800 dark:text-gray-300"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-6 top-8 hidden h-24 w-24 border-l border-t border-primary-300 dark:border-secondary-500 md:block" />
          <div className="absolute -bottom-6 -right-6 hidden h-24 w-24 border-b border-r border-primary-300 dark:border-secondary-500 md:block" />
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-950">
            <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-900">
              <Image
                src="/static/images/circuito.png"
                alt="Research hardware visual"
                fill
                priority
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-gray-950/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-widest text-cyan-200">
                  Research direction
                </p>
                <p className="mt-3 text-2xl font-black leading-tight">
                  Machine learning, quantization, RTL and reproducible medical AI.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 divide-x divide-gray-200 dark:divide-gray-800">
              <div className="p-4">
                <p className="text-2xl font-black text-gray-950 dark:text-white">2026</p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Doctoral sprint</p>
              </div>
              <div className="p-4">
                <p className="text-2xl font-black text-gray-950 dark:text-white">FP32</p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Editorial lab</p>
              </div>
              <div className="p-4">
                <p className="text-2xl font-black text-gray-950 dark:text-white">HW</p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Aware AI</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
