import Head from 'next/head'
import { useRouter } from 'next/router'
import EditablePageHeader from '@/components/EditablePageHeader'
import LayoutWrapper from '@/components/LayoutWrapper'
import MarkdownText from '@/components/MarkdownText'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getPageContent } from '@/lib/content'

const formCopy = {
  es: {
    eyebrow: 'Propuesta profesional',
    title: 'Cuéntame qué quieres construir o investigar.',
    description:
      'Las propuestas con contexto, alcance y un resultado esperado son más fáciles de evaluar. No necesitas tener todas las respuestas para iniciar la conversación.',
    name: 'Nombre',
    email: 'Tu correo profesional o institucional',
    organization: 'Organización o grupo',
    opportunity: 'Tipo de oportunidad',
    opportunityPlaceholder: 'Selecciona una opción',
    options: [
      'Colaboración científica',
      'Oportunidad de investigación',
      'Conferencia o taller',
      'Docencia especializada',
      'Consultoría técnica selectiva',
      'Otra propuesta',
    ],
    url: 'Enlace relevante',
    message: 'Contexto y objetivo',
    messagePlaceholder:
      'Describe el problema, el equipo, el horizonte de tiempo y la contribución que tienes en mente.',
    submit: 'Enviar propuesta',
    privacy: 'Tu información se utilizará únicamente para revisar y responder esta propuesta.',
    successTitle: 'Propuesta recibida.',
    successText: 'Gracias por compartir el contexto. Revisaré el mensaje antes de responder.',
  },
  en: {
    eyebrow: 'Professional inquiry',
    title: 'Tell me what you want to build or investigate.',
    description:
      'Proposals with context, scope and an expected outcome are easier to evaluate. You do not need to have every answer before starting the conversation.',
    name: 'Name',
    email: 'Your professional or institutional email',
    organization: 'Organization or group',
    opportunity: 'Opportunity type',
    opportunityPlaceholder: 'Select an option',
    options: [
      'Scientific collaboration',
      'Research opportunity',
      'Conference or workshop',
      'Specialized teaching',
      'Selective technical consulting',
      'Another proposal',
    ],
    url: 'Relevant link',
    message: 'Context and objective',
    messagePlaceholder:
      'Describe the problem, team, time horizon and contribution you have in mind.',
    submit: 'Send proposal',
    privacy: 'Your information will only be used to review and respond to this proposal.',
    successTitle: 'Proposal received.',
    successText: 'Thank you for sharing the context. I will review the message before replying.',
  },
}

export async function getStaticProps({ lang = 'es' } = {}) {
  return {
    props: {
      pageContent: await getPageContent('contact', lang),
      lang,
    },
    revalidate: 60,
  }
}

export default function Contact({ pageContent, lang = 'es' }) {
  const router = useRouter()
  const copy = formCopy[lang] || formCopy.es
  const action = lang === 'en' ? '/en/contact?sent=1' : '/contact?sent=1'
  const submitted = router.query.sent === '1'
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: pageContent?.title,
    description: pageContent?.seoDescription || pageContent?.description,
    url: `${siteMetadata.siteUrl}${lang === 'en' ? '/en/contact' : '/contact'}`,
    about: { '@id': `${siteMetadata.siteUrl}/#person` },
  }

  return (
    <LayoutWrapper lang={lang}>
      <PageSEO title={pageContent?.seoTitle} description={pageContent?.seoDescription} />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <section className="pb-16 pt-8">
        <EditablePageHeader content={pageContent} />

        <div className="grid gap-12 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="grid gap-px overflow-hidden rounded-md border border-gray-200 bg-gray-200 dark:border-gray-800 dark:bg-gray-800 sm:grid-cols-2 lg:grid-cols-1">
            {(pageContent?.bodySections || []).map((item) => (
              <article key={item.heading} className="bg-white p-6 dark:bg-gray-950">
                {item.eyebrow && (
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary-700 dark:text-secondary-400">
                    {item.eyebrow}
                  </p>
                )}
                <h2 className="mt-3 text-xl font-black tracking-tight text-gray-950 dark:text-white">
                  {item.heading}
                </h2>
                <MarkdownText
                  className="mt-3 space-y-3"
                  paragraphClassName="leading-7 text-gray-600 dark:text-gray-300"
                >
                  {item.text}
                </MarkdownText>
              </article>
            ))}
          </div>

          <div className="rounded-md border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-950 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-700 dark:text-secondary-400">
              {copy.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-950 dark:text-white">
              {submitted ? copy.successTitle : copy.title}
            </h2>
            <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">
              {submitted ? copy.successText : copy.description}
            </p>

            {!submitted && (
              <form
                name="professional-inquiry"
                method="POST"
                action={action}
                data-netlify="true"
                data-netlify-honeypot="website"
                className="mt-8 grid gap-5"
              >
                <input type="hidden" name="form-name" value="professional-inquiry" />
                <p className="hidden">
                  <label>
                    Do not fill this out: <input name="website" />
                  </label>
                </p>
                <label className="grid gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {copy.name}
                  <input
                    required
                    name="name"
                    autoComplete="name"
                    className="rounded-md border-gray-300 bg-white text-gray-950 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {copy.email}
                  <input
                    required
                    type="email"
                    name="reply_email"
                    autoComplete="email"
                    className="rounded-md border-gray-300 bg-white text-gray-950 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {copy.organization}
                  <input
                    name="organization"
                    autoComplete="organization"
                    className="rounded-md border-gray-300 bg-white text-gray-950 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {copy.opportunity}
                  <select
                    required
                    name="opportunity"
                    defaultValue=""
                    className="rounded-md border-gray-300 bg-white text-gray-950 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  >
                    <option value="" disabled>
                      {copy.opportunityPlaceholder}
                    </option>
                    {copy.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {copy.url}
                  <input
                    type="url"
                    name="relevant_url"
                    inputMode="url"
                    placeholder="https://"
                    className="rounded-md border-gray-300 bg-white text-gray-950 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {copy.message}
                  <textarea
                    required
                    minLength="60"
                    rows="7"
                    name="message"
                    placeholder={copy.messagePlaceholder}
                    className="resize-y rounded-md border-gray-300 bg-white text-gray-950 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  />
                </label>
                <button
                  type="submit"
                  className="group mt-1 inline-flex min-h-[3rem] items-center justify-center rounded-md bg-gray-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-700 dark:bg-white dark:text-gray-950 dark:hover:bg-secondary-300"
                >
                  {copy.submit}
                  <span aria-hidden="true" className="ml-3 transition group-hover:translate-x-0.5">
                    -&gt;
                  </span>
                </button>
                <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">{copy.privacy}</p>
              </form>
            )}
          </div>
        </div>
      </section>
    </LayoutWrapper>
  )
}
