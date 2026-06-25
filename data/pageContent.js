const pageContent = {
  home: {
    announcementBanner: {
      enabled: false,
      title: '',
      href: 'https://raulpacheco.dev',
      image: '/static/images/twitter-card.png',
      bgColor: 'blue',
      emoji: '',
    },
    newsletterCta: {
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
    },
    hero: {
      eyebrow: 'Raul Pacheco Rodriguez',
      title: 'Efficient AI for systems that need evidence.',
      description:
        'Investigo IA eficiente, reproducible y hardware-aware en la frontera entre machine learning, cuantizacion y sistemas digitales.',
      primaryCtaLabel: 'Ver investigacion',
      primaryCtaHref: '/research',
      secondaryCtaLabel: 'Ver updates',
      secondaryCtaHref: '/updates',
      focusAreas: ['Hardware-aware AI', 'Anti-leakage evaluation', 'Clinical-Core'],
      visualEyebrow: 'Research direction',
      visualTitle: 'Machine learning, quantization, RTL and reproducible medical AI.',
      visualImage: '/static/images/circuito.png',
      stats: [
        { value: '2026', label: 'Doctoral sprint' },
        { value: 'FP32', label: 'Editorial lab' },
        { value: 'HW', label: 'Aware AI' },
      ],
    },
    sections: {
      updates: {
        eyebrow: 'Carrera y actividad reciente',
        title: 'Updates',
        hrefLabel: 'Ver todos',
      },
      blog: {
        eyebrow: 'Bitacora de investigacion',
        title: 'Notas cercanas al trabajo en curso',
        description:
          'Apuntes cortos sobre papers, decisiones tecnicas, experimentos y preguntas que todavia estan tomando forma.',
        hrefLabel: 'Leer notas',
      },
      resources: {
        eyebrow: 'Biblioteca tecnica',
        title: 'Recursos',
        description:
          'Lecturas, repositorios y referencias que alimentan mi investigacion, mi escritura y mi trabajo de programacion.',
        hrefLabel: 'Ver recursos',
      },
      projects: {
        eyebrow: 'Trabajo seleccionado',
        title: 'Proyectos',
        description:
          'Experimentos, repositorios y piezas tecnicas que conectan software, hardware e IA aplicada.',
        hrefLabel: 'Ver proyectos',
      },
    },
  },
  updates: {
    seoDescription:
      'Notas breves sobre publicaciones, charlas, proyectos, docencia y avances profesionales de Raul Pacheco Rodriguez.',
    eyebrow: 'Updates profesionales',
    title: 'Lo nuevo, sin convertirlo todo en blog.',
    description:
      'Conferencias, publicaciones, proyectos, libros, software y notas de carrera. Esta seccion esta pensada para actualizaciones cortas y editables, con una estructura preparada para migrar a Sanity.',
  },
  projects: {
    seoDescription:
      'Proyectos tecnicos de Raul Pacheco Rodriguez en IA, hardware-aware ML, FPGA, web y productos educativos.',
    eyebrow: 'Portfolio tecnico',
    title: 'Proyectos que conectan investigacion, producto y sistemas.',
    description:
      'Una seleccion de trabajo en aceleracion hardware, IA medica, productos educativos y escritura tecnica. La estructura esta pensada para migrar cada proyecto a Sanity con imagen, estado, rol, tags y enlaces.',
  },
  credentials: {
    seoDescription:
      'Constancias, cursos y credenciales destacadas de Raul Pacheco Rodriguez en IA, frontend, cloud y producto.',
    eyebrow: 'Constancias destacadas',
    title: 'Cursos que sostienen mi trabajo entre frontend, IA y producto.',
    description:
      'Una seleccion breve de credenciales utiles para entender mi perfil tecnico. El resto vive en mi perfil publico de Platzi.',
  },
  papers: {
    seoDescription:
      'Publicaciones, preprints y borradores de investigacion relacionados con IA eficiente, sistemas y evaluacion reproducible.',
    eyebrow: 'Publicaciones',
    title: 'Papers y manuscritos conectados con mi investigacion.',
    description:
      'Una lista editorial de trabajos publicados, preprints y borradores que se conectan con lineas de investigacion, proyectos y colaboradores.',
  },
  ventures: {
    seoDescription:
      'Emprendimientos, productos y laboratorios editoriales conectados con el trabajo profesional de Raul Pacheco Rodriguez.',
    eyebrow: 'Emprendimientos',
    title: 'Iniciativas que convierten investigacion y software en productos.',
    description:
      'Un espacio para productos, laboratorios editoriales y proyectos con vocacion de convertirse en organizaciones o herramientas sostenibles.',
  },
  resources: {
    seoDescription:
      'Biblioteca tecnica y recursos curados de Raul Pacheco Rodriguez sobre IA, sistemas, investigacion y programacion.',
    eyebrow: 'Biblioteca tecnica',
    title: 'Lecturas, herramientas y referencias para construir mejor.',
    description:
      'Una pagina viva para recursos de investigacion, programacion y escritura tecnica. La idea es que pueda crecer como un indice curado: util para mi flujo de trabajo y util para quien quiera seguir las mismas rutas de aprendizaje.',
    categories: ['papers', 'repos', 'blogs', 'books', 'talks', 'datasets'],
  },
  research: {
    seoDescription:
      'Lineas de investigacion de Raul Pacheco Rodriguez en IA eficiente, evaluacion anti-leakage y co-diseno algoritmo-hardware.',
    eyebrow: 'Direccion 2026-2032',
    title: 'IA eficiente, reproducible y desplegable.',
    description:
      'Uso problemas medicos exigentes como banco de prueba para desarrollar optimizacion hardware-aware, evaluacion rigurosa y herramientas que conecten machine learning, cuantizacion, RTL y sistemas verificables.',
    cards: [
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
    ],
  },
  trajectory: {
    seoDescription: 'Trayectoria profesional, academica y editorial de Raul Pacheco Rodriguez.',
    eyebrow: 'Trayectoria',
    title: 'De electronica y web hacia IA eficiente y sistemas verificables.',
    description:
      'Una linea de tiempo de mi formacion, trabajo, investigacion, productos y actividad editorial. Esta pagina funciona como puente entre el CV, los proyectos y la direccion de investigacion del sitio.',
    summaryStats: [
      { value: '2024+', label: 'Doctorado CINVESTAV' },
      { value: 'FPGA', label: 'Hardware-aware AI' },
      { value: 'FP32', label: 'Editorial lab' },
      { value: 'AI', label: 'Research and product' },
    ],
    featuredEyebrow: 'Hitos destacados',
  },
  about: {
    seoDescription:
      'Perfil profesional, trayectoria, investigacion, proyectos y escritura tecnica de Raul Pacheco Rodriguez.',
    eyebrow: 'Acerca de',
    title: 'Investigacion, sistemas y escritura tecnica.',
    description:
      'Un resumen de mi perfil profesional: que construyo, que investigo y como conecto electronica, software, IA eficiente y divulgacion tecnica.',
    bodySections: [
      {
        eyebrow: 'Perfil',
        heading: 'Construyo entre software, electronica e investigacion aplicada.',
        text: 'Mi trabajo conecta experiencia frontend, sistemas digitales e inteligencia artificial eficiente. Me interesa convertir ideas tecnicas complejas en productos, experimentos reproducibles y recursos que otras personas puedan usar.',
      },
      {
        eyebrow: 'Direccion',
        heading: 'IA eficiente con evidencia, no solo demos.',
        text: 'Actualmente concentro mi trabajo en machine learning hardware-aware, evaluacion anti-leakage, cuantizacion y flujos reproducibles para problemas medicos y sistemas verificables.',
      },
    ],
    occupation: 'Ingeniero electronico e investigador en IA eficiente',
  },
}

export default pageContent
