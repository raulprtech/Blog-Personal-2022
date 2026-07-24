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
      title: 'Una bitácora técnica para pensar mejor la IA.',
      description:
        'Ensayos, papers, notas de investigación y aprendizajes sobre deep learning, IA médica, sistemas eficientes y herramientas para investigadores aumentados.',
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
        'Investigo IA eficiente, reproducible y hardware-aware en la frontera entre machine learning, cuantización y sistemas digitales.',
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
          'Lecturas, repositorios y referencias que alimentan mi investigación, mi escritura y mi trabajo de programación.',
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
    collaborationCta: {
      eyebrow: 'Colaboraciones y oportunidades',
      title: 'Disponible para conversaciones científicas y técnicas con propósito.',
      description:
        'Busco colaboraciones científicas, oportunidades de investigación, conferencias, docencia especializada y un número limitado de proyectos de consultoría técnica donde la IA eficiente y los sistemas rigurosos sean centrales.',
      href: '/contact',
      linkLabel: 'Compartir una propuesta',
      areas: ['Investigación', 'Conferencias', 'Docencia especializada', 'Consultoría selectiva'],
    },
    english: {
      collaborationCta: {
        eyebrow: 'Collaborations and opportunities',
        title: 'Available for purposeful scientific and technical conversations.',
        description:
          'I am looking for scientific collaborations, research opportunities, conferences, specialized teaching and a limited number of technical consulting projects where efficient AI and rigorous systems are central.',
        linkLabel: 'Share a proposal',
        areas: ['Research', 'Conferences', 'Specialized teaching', 'Selective consulting'],
      },
    },
  },
  me: {
    seoTitle: 'Links - Raúl Pacheco Rodríguez',
    seoDescription: 'Enlaces principales, redes y recursos de Raúl Pacheco Rodríguez.',
    title: 'Raúl Pacheco Rodríguez',
    description: 'IA eficiente, frontend, investigación aplicada y escritura técnica desde FP32.',
    linkPage: {
      handle: '@RaulprTech',
      bio: 'Investigo y construyo sistemas de IA eficientes, trazables y reproducibles. Aquí reúno mis enlaces principales, proyectos, notas y canales de contacto.',
      avatar: '/static/images/avatar_nblue.png',
      imageAlt: 'Raúl Pacheco Rodríguez',
      links: [
        {
          title: 'Sitio personal',
          href: '/',
          description: 'Investigación, proyectos, trayectoria y notas.',
          image: '/static/images/twitter-card.png',
          bgColor: 'default',
          emoji: '->',
        },
        {
          title: 'FP32 newsletter',
          href: 'https://fp32.io/',
          description: 'Ensayos y notas sobre IA, papers y sistemas eficientes.',
          image: '/static/images/fp32/fp32-code.png',
          bgColor: 'cyan',
          emoji: '->',
        },
        {
          title: 'Notas de investigación',
          href: '/blog',
          description: 'Apuntes cercanos al trabajo en curso.',
          bgColor: 'blue',
          emoji: '->',
        },
        {
          title: 'Charlas y talleres',
          href: '/talks',
          description: 'Presentaciones, talleres y actividad pública.',
          bgColor: 'green',
          emoji: '->',
        },
        {
          title: 'Descargar CV',
          href: '/static/CV/CV.pdf',
          description: 'Resumen profesional, educación y experiencia.',
          bgColor: 'dark',
          emoji: 'CV',
        },
      ],
    },
  },
  blog: {
    seoTitle: 'Notas de investigación - Raúl Pacheco Rodríguez',
    seoDescription:
      'Notas cercanas a investigación, papers, sistemas eficientes e IA reproducible de Raúl Pacheco Rodríguez.',
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
      'Conferencias, publicaciones, proyectos, libros, software y notas de carrera. Esta sección esta pensada para actualizaciones cortas y editables, con una estructura preparada para migrar a Sanity.',
  },
  projects: {
    seoDescription:
      'Proyectos técnicos de Raúl Pacheco Rodríguez en IA, hardware-aware ML, FPGA, web y productos educativos.',
    eyebrow: 'Portfolio técnico',
    title: 'Proyectos que conectan investigación, producto y sistemas.',
    description:
      'Una seleccion de trabajo en aceleracion hardware, IA médica, productos educativos y escritura técnica. La estructura esta pensada para migrar cada proyecto a Sanity con imagen, estado, rol, tags y enlaces.',
  },
  credentials: {
    seoDescription:
      'Formación académica, certificados y cursos destacados de Raúl Pacheco Rodríguez en electrónica, IA, frontend y producto.',
    eyebrow: 'Educación',
    title: 'Formación académica y aprendizaje continuo.',
    description:
      'Grados académicos, especialización técnica y cursos seleccionados que ayudan a entender la evolución de mi perfil profesional y de investigación.',
    academicEducationTitle: 'Formación académica',
    credentialsTitle: 'Certificados y cursos',
    educationProfilesTitle: 'Perfiles educativos',
    educationProfiles: [
      {
        provider: 'Platzi',
        label: 'Ver perfil de Platzi',
        href: 'https://platzi.com/p/RaulprTech/',
        description: 'Cursos y constancias públicas de formación continua.',
      },
    ],
  },
  papers: {
    seoDescription:
      'Publicaciones, preprints y borradores de investigación relacionados con IA eficiente, sistemas y evaluación reproducible.',
    eyebrow: 'Publicaciones',
    title: 'Papers y manuscritos conectados con mi investigación.',
    description:
      'Una lista editorial de trabajos publicados, preprints y borradores que se conectan con líneas de investigación, proyectos y colaboradores.',
  },
  talks: {
    seoDescription:
      'Charlas, talleres, ponencias y actividad pública de Raúl Pacheco Rodríguez sobre IA, investigación, frontend y sistemas eficientes.',
    eyebrow: 'Actividad pública',
    title: 'Charlas, talleres y ponencias.',
    description:
      'Un registro curado de presentaciones, talleres, clases invitadas y apariciones públicas conectadas con mis líneas de investigación, proyectos y recursos.',
  },
  ventures: {
    seoDescription:
      'Emprendimientos, productos y laboratorios editoriales conectados con el trabajo profesional de Raúl Pacheco Rodríguez.',
    eyebrow: 'Emprendimientos',
    title: 'Iniciativas que convierten investigación y software en productos.',
    description:
      'Un espacio para productos, laboratorios editoriales y proyectos con vocación de convertirse en organizaciones o herramientas sostenibles.',
  },
  resources: {
    seoDescription:
      'Biblioteca técnica y recursos curados de Raúl Pacheco Rodríguez sobre IA, sistemas, investigación y programación.',
    eyebrow: 'Biblioteca técnica',
    title: 'Lecturas, herramientas y referencias para construir mejor.',
    description:
      'Una página viva para recursos de investigación, programación y escritura técnica. La idea es que pueda crecer como un índice curado: útil para mi flujo de trabajo y útil para quien quiera seguir las mismas rutas de aprendizaje.',
    categories: ['papers', 'repos', 'blogs', 'books', 'talks', 'datasets'],
  },
  research: {
    seoDescription:
      'Líneas de investigación de Raúl Pacheco Rodríguez en IA eficiente, evaluación anti-leakage y co-diseño algoritmo-hardware.',
    eyebrow: 'Dirección 2026-2032',
    title: 'IA eficiente, reproducible y desplegable.',
    description:
      'Uso problemas médicos exigentes como banco de prueba para desarrollar optimización hardware-aware, evaluación rigurosa y herramientas que conecten machine learning, cuantización, RTL y sistemas verificables.',
    cards: [
      {
        name: 'IA eficiente y hardware-aware',
        description:
          'Cuantización, rotaciones, primitivas implementables y co-diseño algoritmo-hardware para modelos de IA más eficientes.',
      },
      {
        name: 'Evaluación anti-leakage',
        description:
          'Metodos, manifests y benchmarks para detectar atajos temporales y evaluar modelos médicos con mayor rigor.',
      },
      {
        name: 'Clinical-Core',
        description:
          'Arquitecturas modulares para investigación médica reproducible, trazable y preparada para validación multimodal.',
      },
      {
        name: 'FP32 y libros técnicos',
        description:
          'Un laboratorio editorial para convertir lectura, investigación y práctica técnica en ensayos, libros y recursos formativos.',
      },
    ],
  },
  trajectory: {
    seoDescription: 'Trayectoria profesional, académica y editorial de Raúl Pacheco Rodríguez.',
    eyebrow: 'Trayectoria',
    title: 'De electrónica y web hacia IA eficiente y sistemas verificables.',
    description:
      'Una selección de los hitos más importantes de mi experiencia, investigación, proyectos, educación y actividad pública. Cada categoría enlaza con su archivo completo.',
    archiveLinksTitle: 'Explorar por categoría',
    archiveLinks: [
      {
        label: 'Educación',
        href: '/education',
        description: 'Grados académicos, certificados y formación continua.',
      },
      {
        label: 'Investigación',
        href: '/research',
        description: 'Líneas de investigación y trabajo en curso.',
      },
      {
        label: 'Proyectos',
        href: '/projects',
        description: 'Software, hardware y sistemas seleccionados.',
      },
      { label: 'Papers', href: '/papers', description: 'Publicaciones, preprints y manuscritos.' },
      {
        label: 'Charlas y talleres',
        href: '/talks',
        description: 'Ponencias, talleres y actividad pública.',
      },
      {
        label: 'Emprendimientos',
        href: '/ventures',
        description: 'Productos e iniciativas independientes.',
      },
    ],
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
    collaborationCta: {
      eyebrow: 'Colaboraciones',
      title: 'Abierto a trabajo científico y técnico con objetivos concretos.',
      description:
        'Me interesa conversar sobre colaboraciones científicas, oportunidades de investigación, conferencias, docencia especializada y consultoría técnica selectiva donde mi experiencia en IA eficiente, sistemas digitales y producto pueda aportar valor real.',
      href: '/contact',
      linkLabel: 'Proponer una colaboración',
      areas: ['Investigación', 'Conferencias', 'Docencia especializada', 'Consultoría selectiva'],
    },
    occupation: 'Ingeniero electrónico e investigador en IA eficiente',
    profileCard: {
      imageAlt: 'Raúl Pacheco Rodríguez',
      affiliation: 'CINVESTAV / FP32',
      cvNote: 'Versión breve para revisar trayectoria, proyectos y contacto profesional.',
    },
    skillGroups: [
      {
        title: 'IA y machine learning',
        description: 'Modelado, evaluación reproducible, cuantización y lectura técnica de papers.',
        skills: [
          { name: 'Python', iconKind: 'python' },
          { name: 'PyTorch', iconKind: 'pytorch' },
          { name: 'Jupyter', iconKind: 'jupyter' },
        ],
      },
      {
        title: 'Frontend y producto',
        description: 'Interfaces claras para explorar sistemas, datos y flujos editoriales.',
        skills: [
          { name: 'React', iconKind: 'react' },
          { name: 'Next.js', iconKind: 'next' },
          { name: 'Tailwind', iconKind: 'tailwind' },
        ],
      },
      {
        title: 'Hardware y sistemas',
        description: 'FPGA, Verilog, diseño digital y restricciones reales de despliegue.',
        skills: [
          { name: 'FPGA', iconKind: 'fpga' },
          { name: 'Verilog', iconKind: 'verilog' },
          { name: 'C', iconKind: 'c' },
        ],
      },
      {
        title: 'Automatización y escritura',
        description: 'Sistemas de contenido, notas técnicas, SEO estructurado y flujos AI-ready.',
        skills: [
          { name: 'Sanity', iconKind: 'sanity' },
          { name: 'Markdown', iconKind: 'markdown' },
          { name: 'Git', iconKind: 'git' },
        ],
      },
    ],
    english: {
      collaborationCta: {
        eyebrow: 'Collaborations',
        title: 'Open to scientific and technical work with concrete goals.',
        description:
          'I welcome conversations about scientific collaborations, research opportunities, conferences, specialized teaching and selective technical consulting where my experience in efficient AI, digital systems and product can create real value.',
        linkLabel: 'Propose a collaboration',
        areas: ['Research', 'Conferences', 'Specialized teaching', 'Selective consulting'],
      },
    },
  },
  contact: {
    seoTitle: 'Colaboraciones y contacto - Raúl Pacheco Rodríguez',
    seoDescription:
      'Propuestas de colaboración científica, investigación, conferencias, docencia especializada y consultoría técnica selectiva con Raúl Pacheco Rodríguez.',
    eyebrow: 'Colaboraciones y oportunidades',
    title: 'Hagamos trabajo técnico que merezca existir.',
    description:
      'Estoy abierto a conversaciones concretas donde la investigación rigurosa, la ingeniería y una comunicación clara puedan producir resultados útiles. Comparte el contexto, el objetivo y la forma de colaboración que imaginas.',
    bodySections: [
      {
        eyebrow: 'Investigación',
        heading: 'Colaboración científica',
        text: 'Coautoría, experimentos reproducibles, evaluación de modelos, cuantización y trabajo en la frontera entre machine learning, sistemas digitales e IA médica.',
      },
      {
        eyebrow: 'Oportunidades',
        heading: 'Investigación y estancias',
        text: 'Conversaciones sobre estancias, posiciones, grupos de trabajo y proyectos donde la IA eficiente o hardware-aware sea una parte central del problema.',
      },
      {
        eyebrow: 'Actividad pública',
        heading: 'Conferencias y talleres',
        text: 'Ponencias, paneles y talleres técnicos sobre IA eficiente, reproducibilidad, cuantización, sistemas digitales y herramientas para investigación aumentada.',
      },
      {
        eyebrow: 'Formación avanzada',
        heading: 'Docencia especializada',
        text: 'Cursos, sesiones invitadas y materiales para equipos académicos o técnicos que necesiten conectar fundamentos, implementación y evaluación rigurosa.',
      },
      {
        eyebrow: 'Trabajo aplicado',
        heading: 'Consultoría técnica selectiva',
        text: 'Acepto un número limitado de colaboraciones aplicadas cuando existe un problema bien definido, acceso al contexto necesario y una expectativa realista sobre evidencia, alcance y resultados.',
      },
    ],
    english: {
      seoTitle: 'Collaborations and contact - Raúl Pacheco Rodríguez',
      seoDescription:
        'Scientific collaboration, research, conference, specialized teaching and selective technical consulting opportunities with Raúl Pacheco Rodríguez.',
      eyebrow: 'Collaborations and opportunities',
      title: 'Let us build technical work worth doing.',
      description:
        'I welcome concrete conversations where rigorous research, engineering and clear communication can produce useful outcomes. Share the context, goal and form of collaboration you have in mind.',
      bodySections: [
        {
          eyebrow: 'Research',
          heading: 'Scientific collaboration',
          text: 'Co-authorship, reproducible experiments, model evaluation, quantization and work at the intersection of machine learning, digital systems and medical AI.',
        },
        {
          eyebrow: 'Opportunities',
          heading: 'Research and visiting opportunities',
          text: 'Conversations about visiting positions, research roles, working groups and projects where efficient or hardware-aware AI is central to the problem.',
        },
        {
          eyebrow: 'Public engagement',
          heading: 'Conferences and workshops',
          text: 'Talks, panels and technical workshops on efficient AI, reproducibility, quantization, digital systems and tools for augmented research.',
        },
        {
          eyebrow: 'Advanced learning',
          heading: 'Specialized teaching',
          text: 'Courses, invited sessions and materials for academic or technical teams that need to connect fundamentals, implementation and rigorous evaluation.',
        },
        {
          eyebrow: 'Applied work',
          heading: 'Selective technical consulting',
          text: 'I take on a limited number of applied engagements when the problem is well defined, the necessary context is available and expectations around evidence, scope and outcomes are realistic.',
        },
      ],
    },
  },
}

export default pageContent
