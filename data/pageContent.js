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
        'Ensayos, papers, notas de investigaci?n y aprendizajes sobre deep learning, IA medica, sistem?s eficientes y herramientas para investigadores aumentados.',
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
        'Investigo IA eficiente, reproducible y hardware-aware en la frontera entre machine learning, cuantizaci?n y sistemas digitales.',
      primaryCtaLabel: 'Ver investigaci?n',
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
        eyebrow: 'Bitacora de investigaci?n',
        title: 'Notas cercanas al trabajo en curso',
        description:
          'Apuntes cortos sobre papers, decisiones t?cnicas, experimentos y preguntas que todavia estan tomando forma.',
        hrefLabel: 'Leer notas',
      },
      resources: {
        eyebrow: 'Biblioteca tecnica',
        title: 'Recursos',
        description:
          'Lecturas, repositorios y referencias que alimentan mi investigaci?n, mi escritura y mi trabajo de programaci?n.',
        hrefLabel: 'Ver recursos',
      },
      projects: {
        eyebrow: 'Trabajo seleccionado',
        title: 'Proyectos',
        description:
          'Experimentos, repositorios y piezas t?cnicas que conectan software, hardware e IA aplicada.',
        hrefLabel: 'Ver proyectos',
      },
    },
  },
  blog: {
    seoTitle: 'Notas de investigaci?n - Raul Pacheco Rodriguez',
    seoDescription:
      'Notas cercanas a investigaci?n, papers, sistem?s eficientes e IA reproducible de Raul Pacheco Rodriguez.',
    eyebrow: 'Bitacora de investigaci?n',
    title: 'Notas cercanas al trabajo en curso',
    description:
      'Apuntes cortos sobre papers, decisiones t?cnicas, experimentos y preguntas que todavia estan tomando forma.',
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
    title: 'Proyectos que conectan investigaci?n, producto y sistemas.',
    description:
      'Una seleccion de trabajo en aceleracion hardware, IA medica, productos educativos y escritura t?cnica. La estructura esta pensada para migrar cada proyecto a Sanity con imagen, estado, rol, tags y enlaces.',
  },
  credentials: {
    seoDescription:
      'Constancias, cursos y credenciales destacadas de Raul Pacheco Rodriguez en IA, frontend, cloud y producto.',
    eyebrow: 'Constancias destacadas',
    title: 'Cursos que sostienen mi trabajo entre frontend, IA y producto.',
    description:
      'Una seleccion breve de credenciales ?tiles para entender mi perfil tecnico. El resto vive en mi perfil publico de Platzi.',
  },
  papers: {
    seoDescription:
      'Publicaciones, preprints y borradores de investigaci?n relacionados con IA eficiente, sistemas y evaluacion reproducible.',
    eyebrow: 'Publicaciones',
    title: 'Papers y manuscritos conectados con mi investigaci?n.',
    description:
      'Una lista editorial de trabajos publicados, preprints y borradores que se conectan con lineas de investigaci?n, proyectos y colaboradores.',
  },
  ventures: {
    seoDescription:
      'Emprendimientos, productos y laboratorios editoriales conectados con el trabajo profesional de Raul Pacheco Rodriguez.',
    eyebrow: 'Emprendimientos',
    title: 'Iniciativas que convierten investigaci?n y software en productos.',
    description:
      'Un espacio para productos, laboratorios editoriales y proyectos con vocacion de convertirse en organizaciones o herramientas sostenibles.',
  },
  resources: {
    seoDescription:
      'Biblioteca tecnica y recursos curados de Raul Pacheco Rodriguez sobre IA, sistemas, investigaci?n y programaci?n.',
    eyebrow: 'Biblioteca tecnica',
    title: 'Lecturas, herramientas y referencias para construir mejor.',
    description:
      'Una pagina viva para recursos de investigaci?n, programaci?n y escritura t?cnica. La idea es que pueda crecer como un indice curado: util para mi flujo de trabajo y util para quien quiera seguir las mismas rutas de aprendizaje.',
    categories: ['papers', 'repos', 'blogs', 'books', 'talks', 'datasets'],
  },
  research: {
    seoDescription:
      'Lineas de investigaci?n de Raul Pacheco Rodriguez en IA eficiente, evaluacion anti-leakage y co-diseno algoritmo-hardware.',
    eyebrow: 'Direccion 2026-2032',
    title: 'IA eficiente, reproducible y desplegable.',
    description:
      'Uso problemas m?dicos exigentes como banco de prueba para desarrollar optimizacion hardware-aware, evaluacion rigurosa y herramientas que conecten machine learning, cuantizaci?n, RTL y sistemas verificables.',
    cards: [
      {
        name: 'IA eficiente y hardware-aware',
        description:
          'Cuantizacion, rotaciones, primitivas implementables y co-diseno algoritmo-hardware para modelos de IA m?s eficientes.',
      },
      {
        name: 'Evaluacion anti-leakage',
        description:
          'Metodos, manifests y benchmarks para detectar atajos temporales y evaluar modelos m?dicos con mayor rigor.',
      },
      {
        name: 'Clinical-Core',
        description:
          'Arquitecturas modulares para investigaci?n medica reproducible, trazable y preparada para validacion multimodal.',
      },
      {
        name: 'FP32 y libros t?cnicos',
        description:
          'Un laboratorio editorial para convertir lectura, investigaci?n y practica tecnica en ensayos, libros y recursos formativos.',
      },
    ],
  },
  trajectory: {
    seoDescription: 'Trayectoria profesional, academica y editorial de Raul Pacheco Rodriguez.',
    eyebrow: 'Trayectoria',
    title: 'De electr?nica y web hacia IA eficiente y sistemas verificables.',
    description:
      'Una linea de tiempo de mi formacion, trabajo, investigaci?n, productos y actividad editorial. Esta pagina funciona como puente entre el CV, los proyectos y la direccion de investigaci?n del sitio.',
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
      'Perfil profesional, trayectoria, investigaci?n, proyectos y escritura t?cnica de Raul Pacheco Rodriguez.',
    eyebrow: 'Acerca de',
    title: 'Investigacion, sistemas y escritura t?cnica.',
    description:
      'Un resumen de mi perfil profesional: que construyo, que investigo y como conecto electr?nica, software, IA eficiente y divulgacion tecnica.',
    bodySections: [
      {
        eyebrow: 'Perfil',
        heading: 'Construyo entre software, electr?nica e investigaci?n aplicada.',
        text: 'Soy ingeniero electr?nico y desarrollador frontend con interes en sistemas de IA que no solo funcionen en una demo, sino que puedan explicarse, medirse y desplegarse con restricciones reales. Mi trabajo conecta interfaces, sistemas digitales, machine learning y escritura t?cnica para convertir ideas complejas en herramientas ?tiles.',
      },
      {
        eyebrow: 'Foco actual',
        heading: 'IA eficiente con evidencia, no solo demos.',
        text: 'Actualmente concentro mi investigaci?n en machine learning hardware-aware, evaluacion anti-leakage, cuantizaci?n y flujos reproducibles para problemas m?dicos. Me interesa entender como llevar modelos desde notebooks experimentales hacia sistemas verificables, auditables y m?s eficientes.',
      },
      {
        eyebrow: 'Forma de trabajo',
        heading: 'Me gusta construir mapas, prototipos y sistemas que otros puedan revisar.',
        text: 'Trabajo mejor cuando puedo unir investigaci?n, producto y documentacion: leer papers, convertirlos en experimentos, dise?ar interfaces para explorarlos y dejar una ruta clara para que otras personas entiendan las decisiones t?cnicas. Por eso este sitio funciona como hub de trayectoria, notas, proyectos, papers y recursos.',
      },
      {
        eyebrow: 'Biblioteca tecnica',
        heading: 'Recursos para seguir el mapa de trabajo.',
        text: 'Mantengo una biblioteca viva con lecturas, repositorios, referencias y herramientas que alimentan mi investigaci?n y mis notas t?cnicas. Es una forma de mostrar no solo resultados, sino tambien el contexto que los hace posibles.',
        href: '/resources',
        linkLabel: 'Ver recursos',
      },
    ],
    occupation: 'Ingeniero electr?nico e investigador en IA eficiente',
  },
}

export default pageContent
