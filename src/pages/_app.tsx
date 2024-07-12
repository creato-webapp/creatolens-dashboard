import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { AppProps } from 'next/app'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
import Head from 'next/head'
import { Session } from 'next-auth/core/types'
import { SessionProvider } from 'next-auth/react'

import Dialogue from '@components/Dialogue'
import { Layout } from '@components/Layout'
import Modals from '@components/Modal'
import { DialogueProvider } from '@context/DialogueContext'
import { ImageHashtagProvider } from '@context/ImageToHashtagContext'
import { ModalProvider } from '@context/ModalContext'

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
      <Layout>
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
      </Layout>
      <Analytics />
      <SpeedInsights />
    </SessionProvider>
  )
}

export default MyApp
