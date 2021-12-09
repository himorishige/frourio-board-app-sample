import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Auth0Provider } from '@auth0/auth0-react'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '~/lib/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN || ''}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || ''}
      redirectUri={
        process.env.NEXT_PUBLIC_REDIRECT_URI || 'http://localhost:8000'
      }
      audience={process.env.NEXT_PUBLIC_AUTH0_AUDIENCE || ''}
      scope="read:current_user"
      useRefreshTokens={true}
    >
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Auth0Provider>
  )
}

export default MyApp
