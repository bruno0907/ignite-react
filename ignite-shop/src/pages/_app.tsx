import type { AppProps } from 'next/app'
import Head from 'next/head'
import Image from 'next/image'

import logo from '../assets/logo.svg'

import { globalStyles } from '../styles/global'
import { Container, Header } from '../styles/pages/app'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Ignite Shop</title>
      </Head>
      <Container>      
        <Header>          
          <Image src={logo} alt="" />
        </Header>
        <Component {...pageProps} />      
      </Container>
    </>
  )
}
