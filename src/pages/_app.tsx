import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Session } from 'next-auth/core/types'
import { SessionProvider } from 'next-auth/react'
import Script from 'next/script'
import { useRouter } from 'next/router'
import { ReactElement, ReactNode, useEffect } from 'react'
import { NextPage } from 'next'
import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../../next-i18next.config'

import Dialogue from '@components/Dialogue'
import Modals from '@components/Modal'
import ErrorBoundary from '@components/common/ErrorBoundary'
import { DialogueProvider } from '@context/DialogueContext'
import { ModalProvider } from '@context/ModalContext'
import { HashtagImageProvider } from '@context/HashtagToImageContext'
import { ImageHashtagProvider } from '@context/ImageToHashtagContext'
import { Layout } from '@components/Layout'

type NextPageWithLayout<P = object> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps<{
  session: Session
}> & {
  Component: NextPageWithLayout
}

function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter()
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>)
  const GA_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID

  useEffect(() => {
    if (!GA_ID) return

    const handleRouteChange = (url: string) => {
      window.gtag?.('config', GA_ID, { page_path: url })
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events, GA_ID])

  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <link rel="icon" href="./favicon.ico" />
        <title>2Tag | AI Hashtag Maker</title>
      </Head>

      <AppProviders>
        {getLayout(
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        )}
      </AppProviders>

      <Analytics />
      <SpeedInsights />
      <GoogleAnalytics id={GA_ID} />
    </SessionProvider>
  )
}

function AppProviders({ children }: { children: ReactNode }) {
  return (
    <DialogueProvider>
      <ModalProvider>
        <ImageHashtagProvider>
          <HashtagImageProvider>
            {children}
            <Dialogue />
            <Modals />
          </HashtagImageProvider>
        </ImageHashtagProvider>
      </ModalProvider>
    </DialogueProvider>
  )
}

function GoogleAnalytics({ id }: { id?: string }) {
  if (!id) return null

  return (
    <>
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${id}`} />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  )
}

export default appWithTranslation(App, nextI18NextConfig)
