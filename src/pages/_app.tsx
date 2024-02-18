import '../styles/globals.css'
import { Session } from 'next-auth'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Footer from '@components/Footer'
import Navbar from '../components/Layout/Layout'
import { SessionProvider } from 'next-auth/react'
import { DialogueProvider } from 'src/context/DialogueContext'
import Dialogue from '@components/Dialogue'
function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session
}>) {
  return (
    <SessionProvider session={pageProps.session}>
      <DialogueProvider>
        <Head>
          <link key="icon" rel="icon" href="./favicon.ico" />
          <title>Creato Lens | AI Hashtag Maker</title>
        </Head>
        <Navbar>
          <Component {...pageProps} />
          <Dialogue />
        </Navbar>
        <Footer />
      </DialogueProvider>
    </SessionProvider>
  )
}

export default MyApp
