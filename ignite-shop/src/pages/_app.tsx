import type { AppProps } from 'next/app'

import { Roboto } from '@next/font/google'
import Head from 'next/head'

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={roboto.className}>
      <Head>
        <title>Ignite Shop</title>
      </Head>
      <Component {...pageProps} />
    </main>
  )
}
