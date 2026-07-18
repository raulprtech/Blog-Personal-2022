import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

class MyDocument extends Document {
  render() {
    const page = this.props?.__NEXT_DATA__?.page || '/'
    const lang = page === '/en' || page.startsWith('/en/') ? 'en' : 'es'

    return (
      <Html lang={lang} className="scroll-smooth">
        <Head>
          <link rel="apple-touch-icon" sizes="180x180" href="/api/site-icon/180" />
          <link rel="icon" type="image/png" sizes="48x48" href="/favicon.ico" />
          <link rel="icon" type="image/png" sizes="32x32" href="/api/site-icon/32" />
          <link rel="icon" type="image/png" sizes="16x16" href="/api/site-icon/16" />
          <link rel="manifest" href="/api/site-manifest" />
          <link rel="mask-icon" href="/api/site-icon/48" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#000000" />
          <meta name="theme-color" content="#000000" />
          <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
          <link rel="alternate" type="text/markdown" href="/llms.txt" />
          <link rel="alternate" type="text/plain" href="/llms-full.txt" />
        </Head>
        <Script
          async
          name="netlify"
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (window.netlifyIdentity) {
                window.netlifyIdentity.on("init", user => {
                  if (!user) {
                    window.netlifyIdentity.on("login", () => {
                      document.location.href = "/admin/";
                    });
                  }
                });
              }
          `,
          }}
        />
        <body className="bg-white text-black antialiased dark:bg-gray-900 dark:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
