const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const root = process.cwd()
const blogRoot = path.join(root, 'data', 'blog')
const outFile = path.join(root, 'studio', 'import', 'legacy-blog-notes.ndjson')

const titleTranslations = {
  'blog-investigacion-vs-fp32': 'Why I am separating this research blog from FP32',
  'evaluacion-anti-leakage-ia-medica': 'Anti-leakage evaluation for reproducible medical AI',
  'pseudo-softmax-hardware-aware': 'Hardware-aware Pseudo-Softmax: a research note',
  'chatgpt-el-chatbot-ia-basado-openai': "ChatGPT: OpenAI's powerful GPT-3-based chatbot",
  'ia-generativas-futuro-2023': 'A major year for generative AI: what comes next?',
  'javascript-en-el-desarrollo-web': 'JavaScript in web development',
  'la-inteligencia-artificial-solo-necesitaba-atencion':
    'Artificial intelligence only needed attention',
  'porque-aprender-react-para-desarrollo-web': 'Why learn React for web development?',
  'porque-javascript-debe-ser-mi-primer-lenguaje': 'Why should JavaScript be my first language?',
  'pyscript-sustituto-de-javascript': 'PyScript: a replacement for JavaScript?',
  'pytorch-se-une-a-la-fundacion-linux': 'PyTorch joins the Linux Foundation',
  'que-es-arduino-y-donde-conseguir-uno': 'What Arduino is, what it is for, and where to get one',
  'que-es-el-deep-learning': 'What is deep learning?',
  'que-es-la-inteligencia-artificial': 'What is artificial intelligence?',
  'que-se-puede-hacer-con-javascript': 'What can you build with JavaScript?',
  'tecnologia-mundial-quatar-2022': 'Technology at the 2022 Qatar World Cup',
  'usos-menos-conocidos-de-javascript': 'Lesser-known uses of JavaScript',
  'haciendo-un-clon-de-google': 'Building a Google clone',
  'haciendo-un-portafolio-de-desarrollo-web-con-jamstack':
    'Building a web development portfolio with Jamstack',
  'haz-tu-propio-linktree': 'Build your own Linktree',
}

const summaryTranslations = {
  'blog-investigacion-vs-fp32':
    'A short note on why this site should host research-adjacent writing while FP32 remains an independent editorial lab.',
  'evaluacion-anti-leakage-ia-medica':
    'Initial notes on temporal shortcuts, information leakage, and more honest evaluation protocols for medical AI systems.',
  'pseudo-softmax-hardware-aware':
    'A research note for organizing the intuition behind approximating Softmax when the goal is efficient and verifiable hardware.',
  'chatgpt-el-chatbot-ia-basado-openai':
    'A legacy article explaining ChatGPT, its relationship with GPT-style language models, and why conversational AI became a useful interface for everyday users.',
  'ia-generativas-futuro-2023':
    'A legacy overview of the generative AI wave around 2022 and the questions it opened for creative tools, productivity, and technical education.',
  'javascript-en-el-desarrollo-web':
    "A beginner-friendly explanation of JavaScript's role in modern web development and how it connects interaction, tooling, and application logic.",
  'la-inteligencia-artificial-solo-necesitaba-atencion':
    'A legacy note about attention mechanisms, transformers, and why they changed the trajectory of natural language processing.',
  'porque-aprender-react-para-desarrollo-web':
    'A practical article about why React became a valuable tool for building user interfaces and learning frontend engineering.',
  'porque-javascript-debe-ser-mi-primer-lenguaje':
    'A beginner-oriented argument for starting with JavaScript because it connects quickly with visible, interactive projects on the web.',
  'pyscript-sustituto-de-javascript':
    'A legacy note about PyScript, its promise, and the limits of thinking about Python in the browser as a direct JavaScript replacement.',
  'pytorch-se-une-a-la-fundacion-linux':
    'A short note on PyTorch joining the Linux Foundation and what that means for open-source machine learning infrastructure.',
  'que-es-arduino-y-donde-conseguir-uno':
    'An introductory article about Arduino, physical computing, electronics learning, and how to start experimenting with boards and sensors.',
  'que-es-el-deep-learning':
    'A concise introduction to deep learning, neural networks, and the kind of problems where layered models become useful.',
  'que-es-la-inteligencia-artificial':
    'A beginner-friendly introduction to artificial intelligence, its branches, examples, and why the field matters beyond hype.',
  'que-se-puede-hacer-con-javascript':
    'A broad tour of what JavaScript can be used for, from web interfaces to servers, tooling, and creative experiments.',
  'tecnologia-mundial-quatar-2022':
    'A legacy article about technology used in the 2022 Qatar World Cup and how data, sensors, and automation changed the game experience.',
  'usos-menos-conocidos-de-javascript':
    'A compact tour of less obvious JavaScript use cases beyond simple websites, including tooling, apps, and creative development.',
  'haciendo-un-clon-de-google':
    'A project note about recreating the Google search homepage as a practical exercise in HTML, CSS, layout, and attention to interface detail.',
  'haciendo-un-portafolio-de-desarrollo-web-con-jamstack':
    'A project note about building a web development portfolio with Jamstack ideas, React, Next.js, Tailwind, and deployable static workflows.',
  'haz-tu-propio-linktree':
    'A practical tutorial-style article about building a personal link hub with HTML and CSS instead of depending entirely on a third-party tool.',
}

const introTranslations = {
  'blog-investigacion-vs-fp32': [
    'This English version keeps the core idea of the original note: FP32 can remain a broader editorial space, while this site can host work that is closer to research, papers, systems, and professional updates.',
    'The distinction matters because not every idea belongs in the same publication context. Some notes are exploratory, some are technical logs, and some are part of a longer academic trajectory.',
  ],
  'evaluacion-anti-leakage-ia-medica': [
    'In medical AI, a strong number can hide a weak experimental question. This note frames anti-leakage evaluation as a prerequisite for reproducible and trustworthy systems.',
    'The practical direction is to document data manifests, split data by the right real-world constraints, and report failure modes instead of only the best metric.',
  ],
  'pseudo-softmax-hardware-aware': [
    'This note organizes a hardware-aware view of approximating Softmax: the target is not only model accuracy, but an implementation that can be measured, verified, and mapped to efficient hardware.',
    'The relevant questions are about approximation error, memory, parallelism, RTL constraints, and the impact of replacing an expensive operation inside a larger model.',
  ],
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    return entry.isDirectory() ? walk(full) : [full]
  })
}

function slugFromFile(file) {
  return path
    .relative(blogRoot, file)
    .replace(/\\/g, '/')
    .replace(/\.mdx?$/, '')
}

function lastSlugSegment(slug) {
  return slug.split('/').pop()
}

function idForSlug(slug) {
  const key = lastSlugSegment(slug)
  if (key === 'evaluacion-anti-leakage-ia-medica') return 'note-anti-leakage-medical-ai'
  return `note-${key.replace(/[^a-z0-9-]/gi, '-').toLowerCase()}`
}

function toPlainTextBlock(text, style = 'normal') {
  const clean = text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/[`*_~]/g, '')
    .trim()

  if (!clean) return null

  return {
    _type: 'block',
    style,
    children: [{ _type: 'span', text: clean, marks: [] }],
    markDefs: [],
  }
}

function markdownToPortableText(markdown) {
  const blocks = []
  const lines = markdown.replace(/\r\n/g, '\n').split('\n')
  let paragraph = []
  let code = []
  let inCode = false
  let codeLanguage = ''

  const flushParagraph = () => {
    if (!paragraph.length) return
    const block = toPlainTextBlock(paragraph.join(' '))
    if (block) blocks.push(block)
    paragraph = []
  }

  const flushCode = () => {
    blocks.push({ _type: 'codeBlock', language: codeLanguage || 'text', code: code.join('\n') })
    code = []
    codeLanguage = ''
  }

  lines.forEach((line) => {
    const codeFence = line.match(/^```\s*([^`]*)/)
    if (codeFence) {
      if (inCode) {
        flushCode()
        inCode = false
      } else {
        flushParagraph()
        inCode = true
        codeLanguage = codeFence[1]?.trim() || 'text'
      }
      return
    }

    if (inCode) {
      code.push(line)
      return
    }

    if (!line.trim()) {
      flushParagraph()
      return
    }

    const heading = line.match(/^(#{2,3})\s+(.+)/)
    if (heading) {
      flushParagraph()
      const block = toPlainTextBlock(heading[2], heading[1] === '##' ? 'h2' : 'h3')
      if (block) blocks.push(block)
      return
    }

    const bullet = line.match(/^[-*]\s+(.+)/)
    if (bullet) {
      flushParagraph()
      const block = toPlainTextBlock(bullet[1])
      if (block) blocks.push(block)
      return
    }

    paragraph.push(line.trim())
  })

  flushParagraph()
  if (inCode && code.length) flushCode()

  return blocks.slice(0, 80)
}

function englishBodyFor(key, title, summary, tags) {
  const custom = introTranslations[key]
  const paragraphs = custom || [
    summary,
    'This is an editable English migration of a legacy article from the original blog. It keeps the central intent of the post while making it fit the newer research-oriented structure of the site.',
    `Topics: ${tags.join(', ')}.`,
  ]

  return [
    toPlainTextBlock(title, 'h2'),
    ...paragraphs.map((paragraph) => toPlainTextBlock(paragraph)).filter(Boolean),
  ]
}

const docs = walk(blogRoot)
  .filter((file) => /\.mdx?$/.test(file))
  .map((file) => {
    const source = fs.readFileSync(file, 'utf8')
    const parsed = matter(source)
    const slug = slugFromFile(file)
    const key = lastSlugSegment(slug)
    const tags = Array.isArray(parsed.data.tags) ? parsed.data.tags : []
    const draft = Boolean(parsed.data.draft)
    const englishTitle = titleTranslations[key] || parsed.data.title
    const englishSummary = summaryTranslations[key] || parsed.data.summary || englishTitle

    return {
      _id: draft ? `drafts.${idForSlug(slug)}` : idForSlug(slug),
      _type: 'note',
      title: parsed.data.title,
      slug: { _type: 'slug', current: slug },
      summary: parsed.data.summary || parsed.data.title,
      date: parsed.data.date ? String(parsed.data.date).slice(0, 10) : undefined,
      tags,
      canonicalUrl: parsed.data.canonicalUrl,
      body: markdownToPortableText(parsed.content),
      authors: [{ _type: 'reference', _ref: 'collaborator-raul-pacheco' }],
      featured: slug.startsWith('notas/'),
      orderRank: slug.startsWith('notas/') ? 30 : 200,
      english: {
        title: englishTitle,
        summary: englishSummary,
        tags,
        body: englishBodyFor(key, englishTitle, englishSummary, tags),
      },
    }
  })
  .map((doc) =>
    Object.fromEntries(Object.entries(doc).filter(([, value]) => typeof value !== 'undefined'))
  )

fs.mkdirSync(path.dirname(outFile), { recursive: true })
fs.writeFileSync(outFile, docs.map((doc) => JSON.stringify(doc)).join('\n') + '\n', 'utf8')
console.log(`Wrote ${docs.length} Sanity note documents to ${path.relative(root, outFile)}`)
console.log('Import from studio with: pnpm run import:legacy-blog:missing')
