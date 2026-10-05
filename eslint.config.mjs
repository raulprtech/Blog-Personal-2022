import nextVitals from 'eslint-config-next/core-web-vitals'
import prettier from 'eslint-config-prettier'

export default [
  { ignores: ['.next/**', 'node_modules/**', 'studio/**', 'public/**'] },
  ...nextVitals,
  prettier,
  // These existing hydration adapters deliberately synchronize after mounting.
  {
    files: [
      'components/ThemeSwitch.js',
      'components/comments/Giscus.js',
      'components/comments/Utterances.js',
    ],
    rules: { 'react-hooks/set-state-in-effect': 'off' },
  },
  {
    files: ['components/MDXComponents.js'],
    // mdx-bundler's documented client API memoizes a compiled component by source.
    rules: { 'react-hooks/static-components': 'off' },
  },
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'no-unused-vars': 'off',
      'react/no-unescaped-entities': 'off',
    },
  },
]
