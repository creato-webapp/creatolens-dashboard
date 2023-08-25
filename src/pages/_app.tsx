import '../styles/globals.css'
import { Session } from 'next-auth'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Footer from '@components/Footer'
import Navbar from '../components/Layout/Layout'
import { SessionProvider } from 'next-auth/react'

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session
}>) {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <link key="icon" rel="icon" href="favicon.ico" />
      </Head>
      <Navbar>
        <Component {...pageProps} />
      </Navbar>
      <Footer />
    </SessionProvider>
  )
}

export default MyApp
