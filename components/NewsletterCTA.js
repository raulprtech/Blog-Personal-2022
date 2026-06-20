import Link from 'next/link'
import Image from '@/components/Image'

const NewsletterCTA = () => {
  return (
    <section className="py-12">
      <div className="overflow-hidden rounded-md border border-gray-800 bg-gray-950 text-white">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[260px] border-b border-gray-800 bg-black lg:border-b-0 lg:border-r">
            <Image
              src="/static/images/fp32/fp32-code.png"
              alt="FP32 newsletter"
              width={1200}
              height={630}
              className="h-full w-full object-cover object-center opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/20" />
          </div>
          <div className="p-8 md:p-10 lg:p-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-300">FP32</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
              Una bitacora tecnica para pensar mejor la IA.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-gray-300 md:text-lg">
              Ensayos, papers, notas de investigacion y aprendizajes sobre deep learning, IA medica,
              sistemas eficientes y herramientas para investigadores aumentados.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="https://fp32.io/"
                className="inline-flex items-center justify-center rounded-md bg-cyan-300 px-5 py-3 text-sm font-bold text-gray-950 transition hover:bg-cyan-200"
              >
                Suscribirme a FP32
              </Link>
              <Link
                href="/updates"
                className="inline-flex items-center justify-center rounded-md border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-200"
              >
                Ver updates
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsletterCTA
