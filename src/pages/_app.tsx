import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Session } from 'next-auth/core/types'
import { SessionProvider } from 'next-auth/react'

import Dialogue from '@components/Dialogue'
import { Layout } from '@components/Layout'
import Modals from '@components/Modal'
import { DialogueProvider } from '@context/DialogueContext'
import { ImageHashtagProvider } from '@context/ImageToHashtagContext'
import { ModalProvider } from '@context/ModalContext'

import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../../next-i18next.config'

type PageProps = {
  session: Session
}

type Props = Omit<AppProps<PageProps>, 'pageProps'> & {
  pageProps: PageProps
}

function App({ Component, pageProps }: Props) {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <link key="icon" rel="icon" href="./favicon.ico" />
        <title>Creato Lens | AI Hashtag Maker</title>
      </Head>
      <Layout>
        <DialogueProvider>
          <ModalProvider>
            <ImageHashtagProvider>
              <Component {...pageProps} />
            </ImageHashtagProvider>
            <Dialogue />
            <Modals />
          </ModalProvider>
        </DialogueProvider>
      </Layout>
      <Analytics />
      <SpeedInsights />
    </SessionProvider>
  )
}

export default appWithTranslation(App, nextI18NextConfig)
