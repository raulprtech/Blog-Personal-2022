import Image from 'next/image'
import Link from 'next/link'
import siteMetadata from '@/data/siteMetadata'

const defaultContent = {
  eyebrow: siteMetadata.author,
  title: 'Efficient AI for systems that need evidence.',
  description: siteMetadata.description,
  primaryCtaLabel: 'Ver investigacion',
  primaryCtaHref: '/research',
  secondaryCtaLabel: 'Ver updates',
  secondaryCtaHref: '/updates',
  focusAreas: ['Hardware-aware AI', 'Anti-leakage evaluation', 'Clinical-Core'],
  visualEyebrow: 'Research direction',
  visualTitle: 'Machine learning, quantization, RTL and reproducible medical AI.',
  visualImage: '/static/images/circuito.png',
  visualImageAlt: 'Research visual',
  stats: [
    { value: '2026', label: 'Doctoral sprint' },
    { value: 'FP32', label: 'Editorial lab' },
    { value: 'HW', label: 'Aware AI' },
  ],
}

export default function Presentation({ content }) {
  const hero = { ...defaultContent, ...(content || {}) }
  const focusAreas = hero.focusAreas || defaultContent.focusAreas
  const stats = hero.stats || defaultContent.stats

  return (
    <section className="relative overflow-hidden py-12 md:py-20">
      <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="max-w-3xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-primary-700 dark:text-secondary-400">
            {hero.eyebrow}
          </p>
          <h1 className="text-5xl font-black leading-tight tracking-tight text-gray-950 dark:text-white md:text-7xl">
            {hero.title}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300 md:text-xl md:leading-9">
            {hero.description}
          </p>

          <div className="mt-8 grid gap-3 sm:max-w-xl sm:grid-cols-2">
            <Link
              href={hero.primaryCtaHref}
              className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-gray-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-700 dark:bg-white dark:text-gray-950 dark:hover:bg-secondary-300"
            >
              {hero.primaryCtaLabel}
            </Link>
            <Link
              href={hero.secondaryCtaHref}
              className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-900 transition hover:border-primary-700 hover:text-primary-700 dark:border-gray-700 dark:text-gray-100 dark:hover:border-secondary-400 dark:hover:text-secondary-400"
            >
              {hero.secondaryCtaLabel}
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
                src={hero.visualImage}
                alt={hero.visualImageAlt || hero.visualTitle || 'Research visual'}
                fill
                priority
                sizes="(min-width: 1024px) 46vw, 100vw"
                quality={82}
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-gray-950/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-widest text-cyan-200">
                  {hero.visualEyebrow}
                </p>
                <p className="mt-3 text-2xl font-black leading-tight">{hero.visualTitle}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 divide-x divide-gray-200 dark:divide-gray-800">
              {stats.map((stat) => (
                <div key={`${stat.value}-${stat.label}`} className="p-4">
                  <p className="text-2xl font-black text-gray-950 dark:text-white">{stat.value}</p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
