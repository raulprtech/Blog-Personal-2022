export const defaultLang = 'es'
export const supportedLangs = ['es', 'en']

export function getPathWithoutLang(path = '/') {
  if (!path || path === '/') return '/'
  return path.replace(/^\/en(?=\/|$)/, '') || '/'
}

export function localizedPath(path = '/', lang = defaultLang) {
  if (!path || /^https?:\/\//.test(path) || path.startsWith('mailto:')) return path

  const cleanPath = getPathWithoutLang(path)
  if (lang === 'en') return cleanPath === '/' ? '/en' : `/en${cleanPath}`
  return cleanPath
}

export function alternateLanguagePath(currentPath = '/', lang = defaultLang) {
  const cleanPath = getPathWithoutLang(currentPath.split('?')[0])
  return localizedPath(cleanPath, lang)
}

export function getLanguageLabel(lang = defaultLang) {
  return lang === 'en' ? 'English' : 'Español'
}
