// src/pages/_app.tsx
import { ChakraProvider } from '@chakra-ui/react'
import { AccountInfoProvider } from 'utils/accountInfoContext';
import type { AppProps } from 'next/app'
import { Layout } from 'components/layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // wrapping the application with Chakra and AccountInfoProvider
      <ChakraProvider>
        <AccountInfoProvider>
        <Layout>
        <Component {...pageProps} />
        </Layout>
        </AccountInfoProvider>
      </ChakraProvider>
  )
}

export default MyApp
