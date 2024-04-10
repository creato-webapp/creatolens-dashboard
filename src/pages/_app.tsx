import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Footer from '@components/Footer'
import Navbar from '../components/Layout/Layout'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth/core/types'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
import { DialogueProvider } from 'src/context/DialogueContext'
import Dialogue from 'src/components/Dialogue'
import ErrorComponent from './error'

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session
}>) {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <link key="icon" rel="icon" href="./favicon.ico" />
        <title>Creato Lens | AI Hashtag Maker</title>
      </Head>
      <Navbar>
        <ErrorBoundary errorComponent={ErrorComponent}>
          <DialogueProvider>
            <Component {...pageProps} />
            <Dialogue />
          </DialogueProvider>
        </ErrorBoundary>
      </Navbar>
      <Footer />
    </SessionProvider>
  )
}

export default MyApp
