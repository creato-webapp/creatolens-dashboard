import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
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
import { ModalProvider } from 'src/context/ModalContext'
import Modals from '@components/Modal'
import { ImageHashtagProvider } from 'src/context/ImageToHashtagContext'

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
            <ModalProvider>
              <ImageHashtagProvider>
                <Component {...pageProps} />
              </ImageHashtagProvider>
              <Dialogue />
              <Modals />
            </ModalProvider>
          </DialogueProvider>
        </ErrorBoundary>
      </Navbar>
      <Footer />
      <Analytics />
      <SpeedInsights />
    </SessionProvider>
  )
}

export default MyApp
