const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// You might need to insert additional domains in script-src if you are using external services
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' giscus.app netlify www.google-analytics.com www.googletagmanager.com https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js https://identity.netlify.com/v1/netlify-identity-widget.js http://static.hotjar.com/c/hotjar-1928200.js https://unpkg.com/netlify-cms@%5E2.0.0/dist/netlify-cms.js https://pagead2.googlesyndication.com/pagead/managed/js/adsense/m202211010101/show_ads_impl_fy2021.js https://partner.googleadservices.com/gampad/cookie.js https://adservice.google.com.mx/adsid/integrator.js https://tpc.googlesyndication.com/sodar/sodar2.js https://pagead2.googlesyndication.com/pagead/managed/js/adsense/m202211010101/show_ads_impl_fy2021.js https://script.hotjar.com/modules.43d9c9e9a68c20171706.js https://plausible.io/js/plausible.js https://pagead2.googlesyndication.com/pagead/managed/js/adsense/m202211080101/show_ads_impl_fy2021.js https://script.hotjar.com/modules.55241fd65a1af5a1837b.js https://script.hotjar.com/modules.142ca8ad0099c834b74b.js;
  style-src 'self' 'unsafe-inline' *.googleapis.com cdn.jsdelivr.net;
  img-src * blob: data:;
  media-src 'none';
  connect-src *;
  font-src 'self' fonts.gstatic.com cdn.jsdelivr.net;
  frame-src giscus.app youtube.com www.youtube.com netlify https://googleads.g.doubleclick.net/ https://tpc.googlesyndication.com/ https://www.google.com/ https://vars.hotjar.com/ ; 
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
    domains: ['res.cloudinary.com', 'cdn.sanity.io'],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [32, 48, 64, 96, 160, 320],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  eslint: {
    dirs: ['pages', 'components', 'lib', 'layouts', 'scripts'],
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
  webpack: (config, { dev, isServer }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    if (!dev && !isServer) {
      // Replace React with Preact only in client production build
      Object.assign(config.resolve.alias, {
        'react/jsx-runtime.js': 'preact/compat/jsx-runtime',
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      })
    }

    return config
  },
})
