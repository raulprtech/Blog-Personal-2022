const papersData = [
  {
    title: 'Pseudo-Softmax con parametros para aceleracion hardware',
    summary:
      'Trabajo base sobre aproximaciones de Softmax pensadas para bloques tipo transformer, con foco en costo de inferencia, implementacion RTL y evaluacion reproducible.',
    venue: 'Research note',
    year: 2026,
    status: 'Draft',
    href: '/blog/notas/pseudo-softmax-hardware-aware',
    codeHref: 'https://github.com/RaulprTech/Pseudo-Softmax-with-parameters',
    tags: ['Softmax', 'FPGA', 'Transformers', 'Hardware-aware AI'],
    featured: true,
    orderRank: 10,
    researchItems: [{ title: 'IA eficiente y hardware-aware', href: '/research' }],
    projects: [
      {
        title: 'Aceleracion hardware para Softmax',
        href: 'https://github.com/RaulprTech/Pseudo-Softmax-with-parameters',
        category: 'Hardware-aware AI',
        status: 'Research prototype',
      },
    ],
  },
  {
    title: 'Evaluacion anti-leakage para modelos medicos reproducibles',
    summary:
      'Linea de manuscrito sobre manifests temporales, particiones honestas y controles de fuga de informacion en pipelines de IA medica.',
    venue: 'Working paper',
    year: 2026,
    status: 'Draft',
    href: '/research',
    tags: ['Medical AI', 'Evaluation', 'Reproducibility'],
    featured: true,
    orderRank: 20,
    researchItems: [
      { title: 'Evaluacion anti-leakage', href: '/research' },
      { title: 'Clinical-Core', href: '/research' },
    ],
    projects: [
      {
        title: 'Analisis histologico con Machine Learning',
        href: '/research',
        category: 'Medical AI',
        status: 'En desarrollo',
      },
    ],
  },
  {
    title: 'Cuantizacion y primitivas rotacionales para modelos eficientes',
    summary:
      'Borrador de exploracion para conectar cuantizacion, rotaciones, kernels eficientes y posibles implementaciones verificables en hardware.',
    venue: 'Exploration memo',
    year: 2026,
    status: 'Draft',
    href: '/research',
    tags: ['Quantization', 'RTL', 'Efficient AI'],
    featured: false,
    orderRank: 30,
    researchItems: [{ title: 'IA eficiente y hardware-aware', href: '/research' }],
  },
]

export default papersData
