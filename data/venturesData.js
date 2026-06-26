const venturesData = [
  {
    title: 'FP32',
    description:
      'Publicacion y laboratorio editorial para convertir lectura t?cnica, investigaci?n y pr?ctica con IA en ensayos, recursos y futuros libros.',
    href: 'https://fp32.io/',
    category: 'Editorial lab',
    status: 'Activo',
    role: 'Autor, editor y creador del sistema editorial',
    image: '/static/images/fp32/fp32-code.png',
    imageAlt: 'FP32 newsletter',
    tags: ['AI', 'Writing', 'Research', 'Books'],
    featured: true,
    orderRank: 10,
    researchItems: [{ title: 'FP32 y libros t?cnicos', href: 'https://fp32.io/' }],
  },
  {
    title: 'Clinical-Core',
    description:
      'Iniciativa en borrador para organizar pipelines m?dicos auditables: datos, manifests, evaluacion anti-leakage y componentes reutilizables.',
    href: '/research',
    category: 'Research tooling',
    status: 'Draft',
    role: 'Arquitectura tecnica, evaluacion y direccion de producto',
    tags: ['Medical AI', 'Reproducibility', 'Tooling'],
    featured: true,
    orderRank: 20,
    researchItems: [
      { title: 'Clinical-Core', href: '/research' },
      { title: 'Evaluacion anti-leakage', href: '/research' },
    ],
  },
  {
    title: 'Kolearning',
    description:
      'Producto EdTech en exploracion para transformar apuntes y materiales de estudiantes en rutas de aprendizaje con apoyo de IA generativa.',
    href: 'https://kolearning.com',
    category: 'EdTech',
    status: 'En desarrollo',
    role: 'Producto, IA generativa y experiencia de aprendizaje',
    image: '/static/images/book.png',
    imageAlt: 'Libro abierto como referencia educativa',
    tags: ['Generative AI', 'Learning', 'Product'],
    featured: false,
    orderRank: 30,
  },
]

export default venturesData
