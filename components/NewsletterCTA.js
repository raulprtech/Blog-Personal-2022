import Link from 'next/link'
import Image from '@/components/Image'

const fallbackContent = {
  enabled: true,
  eyebrow: 'FP32',
  title: 'Una bitacora tecnica para pensar mejor la IA.',
  description:
    'Ensayos, papers, notas de investigacion y aprendizajes sobre deep learning, IA medica, sistemas eficientes y herramientas para investigadores aumentados.',
  primaryCtaLabel: 'Suscribirme a FP32',
  primaryCtaHref: 'https://fp32.io/',
  secondaryCtaLabel: 'Ver updates',
  secondaryCtaHref: '/updates',
  image: '/static/images/fp32/fp32-code.png',
  imageAlt: 'FP32 newsletter',
}

const NewsletterCTA = ({ content }) => {
  const cta = { ...fallbackContent, ...content }

  if (cta.enabled === false) return null

  return (
    <section className="py-12">
      <div className="overflow-hidden rounded-md border border-gray-800 bg-gray-950 text-white">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          {cta.image && (
            <div className="relative min-h-[260px] border-b border-gray-800 bg-black lg:border-b-0 lg:border-r">
              <Image
                src={cta.image}
                alt={cta.imageAlt || cta.title}
                width={1200}
                height={630}
                sizes="(min-width: 1024px) 52vw, 100vw"
                quality={72}
                loading="lazy"
                className="h-full w-full object-cover object-center opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/20" />
            </div>
          )}
          <div className="p-8 md:p-10 lg:p-12">
            {cta.eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-widest text-cyan-300">
                {cta.eyebrow}
              </p>
            )}
            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">{cta.title}</h2>
            {cta.description && (
              <p className="mt-5 max-w-2xl text-base leading-8 text-gray-300 md:text-lg">
                {cta.description}
              </p>
            )}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {cta.primaryCtaHref && cta.primaryCtaLabel && (
                <Link
                  href={cta.primaryCtaHref}
                  className="inline-flex items-center justify-center rounded-md bg-cyan-300 px-5 py-3 text-sm font-bold text-gray-950 transition hover:bg-cyan-200"
                >
                  {cta.primaryCtaLabel}
                </Link>
              )}
              {cta.secondaryCtaHref && cta.secondaryCtaLabel && (
                <Link
                  href={cta.secondaryCtaHref}
                  className="inline-flex items-center justify-center rounded-md border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-200"
                >
                  {cta.secondaryCtaLabel}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsletterCTA
