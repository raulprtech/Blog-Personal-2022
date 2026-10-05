const test = require('node:test')
const assert = require('node:assert/strict')
const { Readable } = require('node:stream')
const { encodeSignatureHeader, SIGNATURE_HEADER_NAME } = require('@sanity/webhook')
const { safeHref, safeContentLinks, serializeJsonLd } = require('../lib/security.cjs')
const { createHandler, validatePayload } = require('../lib/revalidation.cjs')
const loadSource = require('./load-source.cjs')

test('JSON-LD preserves text and never emits HTML delimiters', () => {
  for (const name of [
    '</script><script>alert(1)</script>',
    '</ScRiPt><!--',
    'Investigación, Raúl, ñ',
  ]) {
    const result = serializeJsonLd({ name, nested: { name } })
    assert.equal(result.includes('<'), false)
    assert.deepEqual(JSON.parse(result), { name, nested: { name } })
  }
})

test('URL policy rejects executable and normalized variants, including localized links', () => {
  for (const value of [
    'javascript:alert(1)',
    'JaVaScRiPt:alert(1)',
    'java\nscript:alert(1)',
    '\0javascript:alert(1)',
    'data:text/html,x',
    '//evil.test',
    '/\\evil.test',
    'vbscript:x',
    'file:///etc/passwd',
    {},
    null,
  ])
    assert.equal(safeHref(value), '')
  for (const value of [
    '/research',
    '/blog/posts/example',
    '#papers',
    'https://fp32.io/',
    'mailto:contact@example.test',
    'tel:+123',
  ])
    assert.equal(safeHref(value), value)
  assert.equal(
    safeContentLinks({ english: { primaryHref: 'javascript:x' } }).english.primaryHref,
    ''
  )
  for (const href of [
    { protocol: 'javascript:', pathname: 'window.__injected=1' },
    ['javascript:x'],
    42,
  ]) {
    assert.equal(safeContentLinks({ href }).href, '')
  }
})

test('webhook fails closed and authenticates the exact bounded body', async () => {
  const original = process.env.SANITY_REVALIDATE_SECRET
  const secret = 'test-only-not-a-production-credential'
  async function request({
    body = '{"_type":"note","slug":"posts/example"}',
    signature,
    configured = secret,
    method = 'POST',
  } = {}) {
    if (configured == null) delete process.env.SANITY_REVALIDATE_SECRET
    else process.env.SANITY_REVALIDATE_SECRET = configured
    const req = Readable.from([Buffer.from(body)])
    req.method = method
    req.headers = signature ? { [SIGNATURE_HEADER_NAME]: signature } : {}
    req.query = { secret }
    const result = { status: 200, calls: [] }
    const res = {
      setHeader() {},
      status(code) {
        result.status = code
        return this
      },
      json(data) {
        result.body = data
        return this
      },
      async revalidate(path) {
        result.calls.push(path)
      },
    }
    await createHandler(async () => ['/blog', '/en/blog', '/blog'])(req, res)
    return result
  }
  try {
    for (const options of [
      { configured: null },
      { configured: '' },
      {},
      { signature: 'wrong' },
      { method: 'GET' },
    ]) {
      const result = await request(options)
      assert.notEqual(result.status, 200)
      assert.deepEqual(result.calls, [])
    }
    const body = '{"_type":"note","slug":"posts/example"}'
    const signature = await encodeSignatureHeader(body, Date.now(), secret)
    assert.deepEqual((await request({ body, signature })).calls, ['/blog', '/en/blog'])
    assert.equal((await request({ body: body + ' ', signature })).status, 401)
    assert.equal((await request({ body: 'x'.repeat(32769), signature })).status, 413)
    for (const invalid of [
      '{"_type":"unknown"}',
      '{"_type":"note","slug":"../about"}',
      'not JSON',
    ]) {
      const result = await request({
        body: invalid,
        signature: await encodeSignatureHeader(invalid, Date.now(), secret),
      })
      assert.equal(result.status, 400)
      assert.deepEqual(result.calls, [])
    }
    assert.equal(
      validatePayload({
        _type: 'note',
        slug: { current: 'posts/new' },
        previousSlug: 'posts/old',
        previousTags: ['IA'],
      }),
      true
    )
    assert.equal(validatePayload({ _type: 'note', slug: ['posts/new'] }), false)
  } finally {
    if (original === undefined) delete process.env.SANITY_REVALIDATE_SECRET
    else process.env.SANITY_REVALIDATE_SECRET = original
  }
})

test('local drafts and traversal are rejected before MDX compilation; legitimate authors work', async () => {
  let compilations = 0
  const mocks = {
    'mdx-bundler': {
      bundleMDX: async ({ source }) => {
        compilations++
        return { code: 'compiled', frontmatter: require('gray-matter')(source).data }
      },
    },
    'unist-util-visit': { visit() {} },
  }
  for (const name of [
    'remark-gfm',
    'remark-footnotes',
    'remark-math',
    'rehype-slug',
    'rehype-autolink-headings',
    'rehype-katex',
    'rehype-citation',
    'rehype-prism-plus',
    'rehype-preset-minify',
    './remark-extract-frontmatter',
    './remark-code-title',
    './remark-toc-headings',
    './remark-img-to-jsx',
  ])
    mocks[name] = () => {}
  const mdx = loadSource('lib/mdx.js', mocks)
  for (const slug of [
    '../authors/default',
    '..\\authors\\default',
    '%2e%2e/authors/default',
    'posts/si-no-la-encuentras-creala',
    'posts/que-son-los-paradigmas-de-programacion',
    ['default'],
  ])
    assert.equal(await mdx.getFileBySlug('blog', slug), null)
  assert.equal(await mdx.getFileBySlug('../authors', 'default'), null)
  assert.equal(compilations, 0)
  const author = await mdx.getFileBySlug('authors', 'default')
  assert.equal(author.mdxSource, 'compiled')
  assert.equal(compilations, 1)
  assert.equal(
    (await mdx.getAllFilesFrontMatter('blog')).some((post) => post.draft),
    false
  )
})

test('CMS empty lists stay empty and operational failures are not replaced with examples', async () => {
  let fail = false
  const content = loadSource('lib/content.js', {
    '@/lib/sanity': {
      imageUrl() {},
      sanityFetch: async () => {
        if (fail) throw new Error('upstream unavailable')
        return []
      },
    },
  })
  for (const name of [
    'getProjects',
    'getUpdates',
    'getResearchItems',
    'getResources',
    'getCredentials',
    'getPapers',
    'getTalks',
    'getVentures',
  ])
    assert.deepEqual(await content[name](), [])
  fail = true
  await assert.rejects(content.getProjects(), /upstream unavailable/)
  await assert.rejects(content.getPageContent('home'), /upstream unavailable/)
})

test('removed migrated notes do not reappear from local files; fetch failures propagate', async () => {
  let fail = false
  const notes = loadSource('lib/notes.js', {
    '@/lib/sanity': {
      imageUrl() {},
      sanityFetch: async (query) => {
        if (fail) throw new Error('upstream unavailable')
        return query.includes('[0]') ? null : []
      },
    },
    '@/lib/mdx': {
      getAllFilesFrontMatter: async () => [{ slug: 'posts/chatgpt-el-chatbot-ia-basado-openai' }],
      getFileBySlug: async () => {
        throw new Error('must not load migrated local content')
      },
      dateSortDesc: () => 0,
    },
  })
  assert.deepEqual(await notes.getNoteSlugs(), [])
  assert.deepEqual(await notes.getAllNotesFrontMatter(), [])
  assert.equal(await notes.getNoteBySlug('posts/chatgpt-el-chatbot-ia-basado-openai'), null)
  fail = true
  await assert.rejects(notes.getAllNotesFrontMatter(), /upstream unavailable/)
})

test('deleted CMS pages become 404s and deleted global settings do not restore links', async () => {
  const sanity = { sanityFetch: async () => null, imageUrl() {}, fileUrl() {} }
  const content = loadSource('lib/content.js', { '@/lib/sanity': sanity })
  const settings = loadSource('lib/siteSettings.js', { '@/lib/sanity': sanity })
  const { withSiteSettings } = loadSource('lib/withSiteSettings.js', {
    './siteSettings': settings,
  })
  for (const slug of ['home', 'about', 'me', 'contact', 'talks']) {
    assert.deepEqual(await withSiteSettings(() => content.getPageContent(slug))({}), {
      notFound: true,
      revalidate: 60,
    })
  }
  const empty = await settings.getSiteSettings()
  assert.deepEqual(empty.navigationLinks, [])
  assert.deepEqual(empty.socialLinks, [])
  assert.equal(empty.cvHref, '')
  await assert.rejects(
    withSiteSettings(async () => {
      throw new Error('upstream unavailable')
    })({}),
    /upstream unavailable/
  )
  const legitimate = await withSiteSettings(async () => ({ props: { title: 'Raúl' } }))({})
  assert.equal(legitimate.props.title, 'Raúl')
})

test('revalidation includes deleted slugs and previous translated tags', async () => {
  const { default: pathsFor } = loadSource('pages/api/revalidate.js', {
    '@/lib/revalidation.cjs': {
      ...require('../lib/revalidation.cjs'),
      createHandler: (buildPaths) => buildPaths,
    },
    '@/lib/notes': { getAllNotesFrontMatter: async () => [] },
    '@/lib/content': { getProjectSlugs: async () => [] },
  })
  const payload = {
    _type: 'note',
    previousSlug: 'posts/old',
    previousTags: ['Investigación'],
    previousEnglishTags: ['Previous research'],
    englishTags: ['New research'],
  }
  assert.equal(validatePayload(payload), true)
  assert.equal(validatePayload({ ...payload, previousEnglishTags: [{}] }), false)
  const paths = await pathsFor(payload)
  for (const route of [
    '/blog/posts/old',
    '/en/blog/posts/old',
    '/en/tags/previous-research',
    '/en/tags/new-research',
    '/blog/page/1',
  ]) {
    assert.ok(paths.includes(route), route)
  }
})

test('empty and malicious RSS remains escaped', () => {
  const generateRss = loadSource('lib/generate-rss.js').default
  assert.equal(generateRss([]).includes('Invalid Date'), false)
  const rss = generateRss([
    { title: '<script>', slug: 'a&b', tags: ['</category>'], date: 'bad', summary: 'ñ & IA' },
  ])
  assert.equal(rss.includes('<script>'), false)
  assert.equal(rss.includes('Invalid Date'), false)
  assert.ok(rss.includes('ñ &amp; IA'))
})
