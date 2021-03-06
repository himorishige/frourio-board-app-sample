import { ColorModeScript } from '@chakra-ui/react'
import { Head, Html, Main, NextScript } from 'next/document'
import { theme } from '~/src/lib/theme'

const MyDocument = () => {
  const url = '<https://example.com>'
  const title = 'Demo Next.js'
  const description = 'Demo of Next.js'

  return (
    <Html lang="ja-JP">
      <Head>
        {/* Change the contents of `<Head>` as needed. */}
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content={url} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content={title} />
        <meta property="og:image" content={`${url}/favicon.png`} />
        <meta name="format-detection" content="telephone=no" />
      </Head>
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default MyDocument
