import type { NextPage } from 'next'
import { useCallback } from 'react'
import { useSession, signIn, signOut, getSession } from 'next-auth/react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Paragraph, Title } from '@components/Typography'
import { Button } from '@components/Button'
import ArrowRightIcon from '@components/Icon/ArrowRightIcon'
import { useRouter } from 'next/router'
import LandingHeader from '@lib/Home/LandingHeader'
import LandingImageLogo from '@lib/Home/LandingImageLogo'
import HowItWorks from '@lib/Home/HowItWorks'

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context)
  if (session) {
    return {
      redirect: {
        destination: '/guide',
      },
    }
  }
  return { props: {} }
}

const Home: NextPage = () => {
  const router = useRouter()
  const onLogin = useCallback(() => {
    signIn()
  }, [])

  const GetStarted = useCallback(() => {
    router.push(process.env.NEXT_PUBLIC_REGISTER_URL as string)
  }, [])

  return (
    <div className="px-2">
      <LandingHeader className="mb-5" />

      <HowItWorks />
    </div>
  )
}

export default Home
