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
import { ThemeProvider } from '@context/ThemeProvider'

import Dialogue from '@components/Dialogue'
import Modals from '@components/Modal'
import ErrorBoundary from '@components/common/ErrorBoundary'
import { DialogueProvider } from '@context/DialogueContext'
import { ModalProvider } from '@context/ModalContext'
import { HashtagImageProvider } from '@context/HashtagToImageContext'
import { ImageHashtagProvider } from '@context/ImageToHashtagContext'
import { Layout } from '@components/Layout'
import IMAGE from '@constants/image'

type NextPageWithLayout<P = object> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps<{
  session: Session
  title: string
  description: string
}> & {
  Component: NextPageWithLayout
}

const LOGO_SRC = IMAGE.LOGO_2TAG
const META_TITLE = '2Tag | AI Hashtag Maker'
const META_DESCRIPTION = 'Boost your social media engagement with 2Tag! Get AI-backed hashtags, find inspiration, and drive engagement effortlessly.'
const META_URL = process.env.NEXT_PUBLIC_LOCAL_SERVER_URL

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
        <title>{pageProps.title || META_TITLE}</title>
        <meta name="description" content={pageProps.description || META_DESCRIPTION} />
        <meta name="keywords" content="social media, engagement, AI, hashtags, content creation" />
        <meta name="author" content="2Tag" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta itemProp="image" content={LOGO_SRC} />

        <meta property="og:url" content={META_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={META_TITLE} />
        <meta property="og:description" content={META_DESCRIPTION} />
        <meta property="og:image" content={LOGO_SRC} />
        <meta property="og:site_name" content="2Tag" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={META_URL} />
        <meta name="twitter:title" content={META_TITLE} />
        <meta name="twitter:description" content={META_DESCRIPTION} />
        <meta name="twitter:image" content={LOGO_SRC} />
        <meta name="twitter:site" content="@2Tag" />
        <meta name="twitter:creator" content="@2Tag" />
      </Head>

      <AppProviders>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {getLayout(
            <ErrorBoundary>
              <Component {...pageProps} />
            </ErrorBoundary>
          )}
        </ThemeProvider>
      </AppProviders>

      {process.env.NODE_ENV === 'production' && (
        <>
          <Analytics />
          <SpeedInsights />
          <GoogleAnalytics id={GA_ID} />
        </>
      )}
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
  if (!id) {
    console.warn('Google Analytics ID is not provided.')
    return null
  }

  const initializeGtag = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${id}', {
    page_path: window.location.pathname,
  });
`
  return (
    <>
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${id}`} />
      <Script id="google-analytics-init" strategy="afterInteractive">
        {initializeGtag}
      </Script>
    </>
  )
}

export default appWithTranslation(App, nextI18NextConfig)
