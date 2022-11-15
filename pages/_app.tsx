import '../styles/globals.css'
import { Session } from 'next-auth'
import type { AppProps } from 'next/app'
import Navbar from '../src/components/Layout'
import { SessionProvider } from 'next-auth/react'

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session
}>) {
  return (
    <SessionProvider session={pageProps.session}>
      <Navbar>
        <Component {...pageProps} />
      </Navbar>
    </SessionProvider>
  )
}

export default MyApp
