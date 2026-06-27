import { useEffect } from 'react'

const hotjarId = process.env.NEXT_PUBLIC_HOTJAR_ID
const hotjarVersion = Number(process.env.NEXT_PUBLIC_HOTJAR_VERSION || 6)

function injectHotjar(id, version) {
  window.hj =
    window.hj ||
    function () {
      ;(window.hj.q = window.hj.q || []).push(arguments)
    }
  window._hjSettings = { hjid: id, hjsv: version }

  if (document.querySelector('script[data-hotjar]')) return

  const script = document.createElement('script')
  script.async = true
  script.dataset.hotjar = 'true'
  script.src = `https://static.hotjar.com/c/hotjar-${id}.js?sv=${version}`
  document.head.appendChild(script)
}

export default function Hotjar() {
  useEffect(() => {
    if (!hotjarId) return undefined

    const loadHotjar = () => injectHotjar(Number(hotjarId), hotjarVersion)

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(loadHotjar, { timeout: 4000 })
      return () => window.cancelIdleCallback?.(id)
    }

    const timer = window.setTimeout(loadHotjar, 2500)
    return () => window.clearTimeout(timer)
  }, [])

  return null
}
