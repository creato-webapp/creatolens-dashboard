import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Example from '../src/components/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Example>
      <Component {...pageProps} />
    </Example>
  )
}

export default MyApp
