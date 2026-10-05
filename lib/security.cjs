function serializeJsonLd(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}

function safeHref(value) {
  if (typeof value !== 'string') return ''
  const href = value.trim()
  // Browsers normalize control characters and backslashes before parsing URLs.
  if (!href || /[\u0000-\u0020\u007f\\]/.test(href)) return ''
  if (href.startsWith('#')) return href
  if (href.startsWith('/') && !href.startsWith('//')) return href
  try {
    const url = new URL(href)
    return ['https:', 'http:', 'mailto:', 'tel:'].includes(url.protocol) ? href : ''
  } catch {
    return ''
  }
}

function safeContentLinks(value, key = '') {
  if (/(?:href|url)$/i.test(key)) return safeHref(value)
  if (Array.isArray(value)) return value.map((item) => safeContentLinks(item))
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([name, item]) => [name, safeContentLinks(item, name)])
    )
  }
  return value
}

module.exports = { serializeJsonLd, safeHref, safeContentLinks }
