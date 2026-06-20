const projectsData = [
  {
    title: 'Aceleracion hardware para Softmax',
    description:
      'Acelerador de la funcion de activacion para bloques Shifted Window Transformers, pensado para reducir costos de inferencia en modelos de vision profunda.',
    imgSrc: '/static/images/fp32/project-logo.png',
    href: 'https://github.com/RaulprTech/Pseudo-Softmax-with-parameters',
    category: 'Hardware-aware AI',
    status: 'Research prototype',
    role: 'Diseno digital, Verilog, FPGA y deep learning',
    tags: ['Verilog', 'FPGA', 'PyTorch', 'Transformers'],
  },
  {
    title: 'Analisis histologico con Machine Learning',
    description:
      'Trabajo en colaboracion orientado a mejorar sistemas de clasificacion de tejido benigno y cancerigeno mediante modelos de aprendizaje profundo.',
    imgSrc: '/static/images/Hero.png',
    href: '/research',
    category: 'Medical AI',
    status: 'En desarrollo',
    role: 'Modelado, evaluacion y arquitectura ML',
    tags: ['PyTorch', 'CUDA', 'TensorFlow', 'Medical AI'],
  },
  {
    title: 'FP32',
    description:
      'Newsletter y laboratorio editorial para convertir lectura tecnica, investigacion y practica con IA en ensayos, recursos y futuros libros.',
    imgSrc: '/static/images/fp32/fp32-code.png',
    href: 'https://fp32.io/',
    category: 'Editorial lab',
    status: 'Activo',
    role: 'Autor, editor y creador del sistema editorial',
    tags: ['AI', 'Research', 'Writing', 'Substack'],
  },
  {
    title: 'Kolearning',
    description:
      'Plataforma EdTech que transforma apuntes de estudiantes en planes de aprendizaje personalizados con apoyo de IA generativa.',
    imgSrc: '/static/images/book.png',
    href: 'https://kolearning.com',
    category: 'EdTech',
    status: 'Producto',
    role: 'Producto, IA generativa y experiencia de aprendizaje',
    tags: ['Generative AI', 'Genkit', 'Learning', 'Product'],
  },
]

export default projectsData
