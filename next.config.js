const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// Static Next.js hydration needs inline scripts; legacy MDX currently needs eval.
// See docs/security-operations.md before removing either exception.
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://giscus.app https://www.googletagmanager.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: https:;
  media-src 'none';
  connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com;
  font-src 'self';
  frame-src https://giscus.app https://www.youtube.com https://www.youtube-nocookie.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  `

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]

module.exports = withBundleAnalyzer({
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/images/a668buu6/production/**' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
    qualities: [60, 65, 70, 72, 75, 80, 85, 90, 100],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [32, 48, 64, 96, 160, 320],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/feed.xml', destination: '/api/feed' },
        { source: '/en/feed.xml', destination: '/api/feed?lang=en' },
        { source: '/tags/:tag/feed.xml', destination: '/api/feed?tag=:tag' },
        { source: '/en/tags/:tag/feed.xml', destination: '/api/feed?lang=en&tag=:tag' },
        { source: '/sitemap.xml', destination: '/api/sitemap' },
        { source: '/favicon.ico', destination: '/api/site-icon/48?format=ico' },
        { source: '/favicon.png', destination: '/api/site-icon/96' },
        { source: '/apple-touch-icon.png', destination: '/api/site-icon/180' },
        { source: '/site.webmanifest', destination: '/api/site-manifest' },
        { source: '/static/favicons/site.webmanifest', destination: '/api/site-manifest' },
        { source: '/static/favicons/favicon.ico', destination: '/api/site-icon/48?format=ico' },
        { source: '/static/favicons/favicon-16x16.png', destination: '/api/site-icon/16' },
        { source: '/static/favicons/favicon-32x32.png', destination: '/api/site-icon/32' },
        { source: '/static/favicons/favicon-48x48.png', destination: '/api/site-icon/48' },
        { source: '/static/favicons/apple-touch-icon.png', destination: '/api/site-icon/180' },
        { source: '/static/favicons/android-chrome-96x96.png', destination: '/api/site-icon/96' },
        {
          source: '/static/favicons/android-chrome-192x192.png',
          destination: '/api/site-icon/192',
        },
        {
          source: '/static/favicons/android-chrome-512x512.png',
          destination: '/api/site-icon/512',
        },
        { source: '/static/favicons/mstile-150x150.png', destination: '/api/site-icon/150' },
      ],
    }
  },
  async redirects() {
    return [
      { source: '/credentials', destination: '/education', permanent: true },
      { source: '/en/credentials', destination: '/en/education', permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
})
