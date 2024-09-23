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
import { ModalProvider } from '@context/ModalContext'
import { HashtagImageProvider } from '@context/HashtagToImageContext'
import { ImageHashtagProvider } from '@context/ImageToHashtagContext'

import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../../next-i18next.config'
import ErrorBoundary from '@components/common/ErrorBoundary'

import Script from 'next/script'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

type PageProps = {
  session: Session
}

type Props = Omit<AppProps<PageProps>, 'pageProps'> & {
  pageProps: PageProps
}

function App({ Component, pageProps }: Props) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (typeof window.gtag !== 'undefined' && process.env.NEXT_PUBLIC_GA_TRACKING_ID) {
        window.gtag('config', process.env.NEXT_PUBLIC_GA_TRACKING_ID, {
          page_path: url,
        })
      }
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <link key="icon" rel="icon" href="./favicon.ico" />
        <title>Creato Lens | AI Hashtag Maker</title>
      </Head>
      <Layout>
        <ErrorBoundary>
          <DialogueProvider>
            <ModalProvider>
              <ImageHashtagProvider>
                <HashtagImageProvider>
                  <Component {...pageProps} />
                </HashtagImageProvider>
              </ImageHashtagProvider>
              <Dialogue />
              <Modals />
            </ModalProvider>
          </DialogueProvider>
        </ErrorBoundary>
      </Layout>
      <Analytics />
      <SpeedInsights />
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`} />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </SessionProvider>
  )
}

export default appWithTranslation(App, nextI18NextConfig)
