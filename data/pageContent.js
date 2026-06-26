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
        'Ensayos, papers, notas de investigación y aprendizajes sobre deep learning, IA medica, sistemás eficientes y herramientas para investigadores aumentados.',
      primaryCtaLabel: 'Suscribirme a FP32',
      primaryCtaHref: 'https://fp32.io/',
      secondaryCtaLabel: 'Ver updates',
      secondaryCtaHref: '/updates',
      image: '/static/images/fp32/fp32-code.png',
      imageAlt: 'FP32 newsletter',
    },
    hero: {
      eyebrow: 'Raúl Pacheco Rodríguez',
      title: 'Efficient AI for systems that need evidence.',
      description:
        'Investigo IA eficiente, reproducible y hardware-aware en la frontera entre machine learning, cuantizaci?n y sistemas digitales.',
      primaryCtaLabel: 'Ver investigación',
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
        eyebrow: 'Bitacora de investigación',
        title: 'Notas cercanas al trabajo en curso',
        description:
          'Apuntes cortos sobre papers, decisiones técnicas, experimentos y preguntas que todavia estan tomando forma.',
        hrefLabel: 'Leer notas',
      },
      resources: {
        eyebrow: 'Biblioteca técnica',
        title: 'Recursos',
        description:
          'Lecturas, repositorios y referencias que alimentan mi investigación, mi escritura y mi trabajo de programaci?n.',
        hrefLabel: 'Ver recursos',
      },
      projects: {
        eyebrow: 'Trabajo seleccionado',
        title: 'Proyectos',
        description:
          'Experimentos, repositorios y piezas técnicas que conectan software, hardware e IA aplicada.',
        hrefLabel: 'Ver proyectos',
      },
    },
  },
  blog: {
    seoTitle: 'Notas de investigación - Raúl Pacheco Rodríguez',
    seoDescription:
      'Notas cercanas a investigación, papers, sistemás eficientes e IA reproducible de Raúl Pacheco Rodríguez.',
    eyebrow: 'Bitacora de investigación',
    title: 'Notas cercanas al trabajo en curso',
    description:
      'Apuntes cortos sobre papers, decisiones técnicas, experimentos y preguntas que todavia estan tomando forma.',
  },
  updates: {
    seoDescription:
      'Notas breves sobre publicaciones, charlas, proyectos, docencia y avances profesionales de Raúl Pacheco Rodríguez.',
    eyebrow: 'Updates profesionales',
    title: 'Lo nuevo, sin convertirlo todo en blog.',
    description:
      'Conferencias, publicaciones, proyectos, libros, software y notas de carrera. Esta seccion esta pensada para actualizaciones cortas y editables, con una estructura preparada para migrar a Sanity.',
  },
  projects: {
    seoDescription:
      'Proyectos tecnicos de Raúl Pacheco Rodríguez en IA, hardware-aware ML, FPGA, web y productos educativos.',
    eyebrow: 'Portfolio tecnico',
    title: 'Proyectos que conectan investigación, producto y sistemas.',
    description:
      'Una seleccion de trabajo en aceleracion hardware, IA medica, productos educativos y escritura técnica. La estructura esta pensada para migrar cada proyecto a Sanity con imagen, estado, rol, tags y enlaces.',
  },
  credentials: {
    seoDescription:
      'Constancias, cursos y credenciales destacadas de Raúl Pacheco Rodríguez en IA, frontend, cloud y producto.',
    eyebrow: 'Constancias destacadas',
    title: 'Cursos que sostienen mi trabajo entre frontend, IA y producto.',
    description:
      'Una seleccion breve de credenciales útiles para entender mi perfil tecnico. El resto vive en mi perfil publico de Platzi.',
  },
  papers: {
    seoDescription:
      'Publicaciones, preprints y borradores de investigación relacionados con IA eficiente, sistemas y evaluacion reproducible.',
    eyebrow: 'Publicaciones',
    title: 'Papers y manuscritos conectados con mi investigación.',
    description:
      'Una lista editorial de trabajos publicados, preprints y borradores que se conectan con lineas de investigación, proyectos y colaboradores.',
  },
  ventures: {
    seoDescription:
      'Emprendimientos, productos y laboratorios editoriales conectados con el trabajo profesional de Raúl Pacheco Rodríguez.',
    eyebrow: 'Emprendimientos',
    title: 'Iniciativas que convierten investigación y software en productos.',
    description:
      'Un espacio para productos, laboratorios editoriales y proyectos con vocacion de convertirse en organizaciones o herramientas sostenibles.',
  },
  resources: {
    seoDescription:
      'Biblioteca técnica y recursos curados de Raúl Pacheco Rodríguez sobre IA, sistemas, investigación y programaci?n.',
    eyebrow: 'Biblioteca técnica',
    title: 'Lecturas, herramientas y referencias para construir mejor.',
    description:
      'Una pagina viva para recursos de investigación, programaci?n y escritura técnica. La idea es que pueda crecer como un indice curado: util para mi flujo de trabajo y util para quien quiera seguir las mismas rutas de aprendizaje.',
    categories: ['papers', 'repos', 'blogs', 'books', 'talks', 'datasets'],
  },
  research: {
    seoDescription:
      'Lineas de investigación de Raúl Pacheco Rodríguez en IA eficiente, evaluacion anti-leakage y co-diseno algoritmo-hardware.',
    eyebrow: 'Direccion 2026-2032',
    title: 'IA eficiente, reproducible y desplegable.',
    description:
      'Uso problemas médicos exigentes como banco de prueba para desarrollar optimizacion hardware-aware, evaluacion rigurosa y herramientas que conecten machine learning, cuantizaci?n, RTL y sistemas verificables.',
    cards: [
      {
        name: 'IA eficiente y hardware-aware',
        description:
          'Cuantizacion, rotaciones, primitivas implementables y co-diseno algoritmo-hardware para modelos de IA más eficientes.',
      },
      {
        name: 'Evaluacion anti-leakage',
        description:
          'Metodos, manifests y benchmarks para detectar atajos temporales y evaluar modelos médicos con mayor rigor.',
      },
      {
        name: 'Clinical-Core',
        description:
          'Arquitecturas modulares para investigación medica reproducible, trazable y preparada para validacion multimodal.',
      },
      {
        name: 'FP32 y libros t?cnicos',
        description:
          'Un laboratorio editorial para convertir lectura, investigación y practica tecnica en ensayos, libros y recursos formativos.',
      },
    ],
  },
  trajectory: {
    seoDescription: 'Trayectoria profesional, academica y editorial de Raúl Pacheco Rodríguez.',
    eyebrow: 'Trayectoria',
    title: 'De electrónica y web hacia IA eficiente y sistemas verificables.',
    description:
      'Una linea de tiempo de mi formacion, trabajo, investigación, productos y actividad editorial. Esta pagina funciona como puente entre el CV, los proyectos y la direccion de investigación del sitio.',
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
      'Perfil profesional, trayectoria, investigación, proyectos y escritura técnica de Raúl Pacheco Rodríguez.',
    eyebrow: 'Acerca de',
    title: 'Investigación, sistemas y escritura técnica.',
    description:
      'Un resumen de mi perfil profesional: qué construyo, qué investigo y cómo conecto electrónica, software, IA eficiente y divulgación técnica.',
    bodySections: [
      {
        eyebrow: 'Perfil',
        heading: 'Construyo entre software, electrónica e investigación aplicada.',
        text: 'Soy ingeniero electrónico y desarrollador frontend con interés en sistemas de IA que no solo funcionen en una demo, sino que puedan explicarse, medirse y desplegarse con restricciones reales. Mi trabajo conecta interfaces, sistemas digitales, machine learning y escritura técnica para convertir ideas complejas en herramientas útiles.',
      },
      {
        eyebrow: 'Foco actual',
        heading: 'IA eficiente con evidencia, no solo demos.',
        text: 'Actualmente concentro mi investigación en machine learning hardware-aware, evaluación anti-leakage, cuantización y flujos reproducibles para problemas médicos. Me interesa entender cómo llevar modelos desde notebooks experimentales hacia sistemas verificables, auditables y más eficientes.',
      },
      {
        eyebrow: 'Forma de trabajo',
        heading: 'Me gusta construir mapas, prototipos y sistemas que otros puedan revisar.',
        text: 'Trabajo mejor cuando puedo unir investigación, producto y documentación: leer papers, convertirlos en experimentos, diseñar interfaces para explorarlos y dejar una ruta clara para que otras personas entiendan las decisiones técnicas. Por eso este sitio funciona como hub de trayectoria, notas, proyectos, papers y recursos.',
      },
      {
        eyebrow: 'Biblioteca técnica',
        heading: 'Recursos para seguir el mapa de trabajo.',
        text: 'Mantengo una biblioteca viva con lecturas, repositorios, referencias y herramientas que alimentan mi investigación y mis notas técnicas. Es una forma de mostrar no solo resultados, sino también el contexto que los hace posibles.',
        href: '/resources',
        linkLabel: 'Ver recursos',
      },
    ],
    occupation: 'Ingeniero electrónico e investigador en IA eficiente',
    profileCard: {
      imageAlt: 'Raúl Pacheco Rodríguez',
      affiliation: 'CINVESTAV / FP32',
      cvNote: 'Versión breve para revisar trayectoria, proyectos y contacto profesional.',
    },
  },
}

export default pageContent
