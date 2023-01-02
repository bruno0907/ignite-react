import Head from 'next/head'
import { Heading } from '@ignite-ui/react'

export default function Home() {
  return (
    <>
      <Head>
        <title>Ignite Call</title>        
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="" />
      </Head>
      <main>
        <Heading as="h1">Ignite Call</Heading>
      </main>
    </>
  )
}
