const fs = require('node:fs')
const path = require('node:path')
const Module = require('node:module')
const { transformSync } = require('esbuild')

module.exports = function loadSource(file, mocks = {}) {
  const cache = new Map()
  const root = path.resolve(__dirname, '..')
  function load(filename) {
    if (cache.has(filename)) return cache.get(filename).exports
    const instance = new Module(filename, module)
    instance.filename = filename
    instance.paths = Module._nodeModulePaths(path.dirname(filename))
    cache.set(filename, instance)
    const nativeRequire = Module.createRequire(filename)
    instance.require = (name) => {
      if (Object.hasOwn(mocks, name)) return mocks[name]
      if (name.startsWith('@/') || name.startsWith('.')) {
        const resolved = nativeRequire.resolve(
          name.startsWith('@/') ? path.join(root, name.slice(2)) : name
        )
        if (resolved.endsWith('.js') && !resolved.includes('node_modules')) return load(resolved)
        return nativeRequire(resolved)
      }
      return nativeRequire(name)
    }
    instance._compile(
      transformSync(fs.readFileSync(filename, 'utf8'), { format: 'cjs', loader: 'jsx' }).code,
      filename
    )
    return instance.exports
  }
  return load(path.join(root, file))
}
