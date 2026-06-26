const papersData = [
  {
    title: 'Pseudo-Softmax con par?metros para aceleraci?n hardware',
    summary:
      'Trabajo base sobre aproximaciones de Softmax pensadas para bloques tipo transformer, con foco en costo de inferencia, implementaci?n RTL y evaluaci?n reproducible.',
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
        title: 'Aceleraci?n hardware para Softmax',
        href: 'https://github.com/RaulprTech/Pseudo-Softmax-with-parameters',
        category: 'Hardware-aware AI',
        status: 'Research prototype',
      },
    ],
  },
  {
    title: 'Evaluaci?n anti-leakage para modelos m?dicos reproducibles',
    summary:
      'L?nea de manuscrito sobre manifests temporales, particiones honestas y controles de fuga de informaci?n en pipelines de IA m?dica.',
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
        title: 'An?lisis histol?gico con Machine Learning',
        href: '/research',
        category: 'Medical AI',
        status: 'En desarrollo',
      },
    ],
  },
  {
    title: 'Cuantizaci?n y primitivas rotacionales para modelos eficientes',
    summary:
      'Borrador de exploraci?n para conectar cuantizaci?n, rotaciones, kernels eficientes y posibles implementaciones verificables en hardware.',
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
