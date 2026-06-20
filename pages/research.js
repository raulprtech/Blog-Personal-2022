import LayoutWrapper from '@/components/LayoutWrapper'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

const researchLines = [
  {
    name: 'IA eficiente y hardware-aware',
    description:
      'Cuantizacion, rotaciones, primitivas implementables y co-diseno algoritmo-hardware para modelos de IA mas eficientes.',
  },
  {
    name: 'Evaluacion anti-leakage',
    description:
      'Metodos, manifests y benchmarks para detectar atajos temporales y evaluar modelos medicos con mayor rigor.',
  },
  {
    name: 'Clinical-Core',
    description:
      'Arquitecturas modulares para investigacion medica reproducible, trazable y preparada para validacion multimodal.',
  },
  {
    name: 'FP32 y libros tecnicos',
    description:
      'Un laboratorio editorial para convertir lectura, investigacion y practica tecnica en ensayos, libros y recursos formativos.',
  },
]

export default function Research() {
  return (
    <LayoutWrapper>
      <PageSEO
        title={`Investigacion - ${siteMetadata.author}`}
        description="Lineas de investigacion de Raul Pacheco Rodriguez en IA eficiente, evaluacion anti-leakage y co-diseno algoritmo-hardware."
      />
      <section className="pb-16 pt-8">
        <div className="max-w-4xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-primary-700 dark:text-secondary-400">
            Direccion 2026-2032
          </p>
          <h1 className="text-4xl font-black tracking-tight text-gray-950 dark:text-white md:text-6xl">
            IA eficiente, reproducible y desplegable.
          </h1>
          <p className="mt-8 text-xl leading-9 text-gray-600 dark:text-gray-300">
            Uso problemas medicos exigentes como banco de prueba para desarrollar optimizacion
            hardware-aware, evaluacion rigurosa y herramientas que conecten machine learning,
            cuantizacion, RTL y sistemas verificables.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {researchLines.map((line) => (
            <article
              key={line.name}
              className="rounded-md border border-gray-200 bg-white p-6 transition hover:border-gray-400 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-600"
            >
              <h2 className="text-2xl font-bold text-gray-950 dark:text-white">{line.name}</h2>
              <p className="mt-4 leading-8 text-gray-600 dark:text-gray-300">{line.description}</p>
            </article>
          ))}
        </div>
      </section>
    </LayoutWrapper>
  )
}
