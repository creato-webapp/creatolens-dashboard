import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../src/components/Layout'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps, session }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Navbar>
        <Component {...pageProps} />
      </Navbar>
    </SessionProvider>
  )
}

export default MyApp
