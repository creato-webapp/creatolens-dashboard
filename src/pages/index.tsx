import type { NextPage } from 'next'
import { useCallback } from 'react'
import { getSession } from 'next-auth/react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Paragraph, Title } from '@components/Typography'
import { Button } from '@components/Button'
import ArrowRightIcon from '@components/Icon/ArrowRightIcon'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'

export const getServerSideProps = async (context: any) => {
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
    <div className={styles.container}>
      <div className="relative h-screen w-screen overflow-hidden">
        <img src="/landing-page.svg" alt="Background" className="relative h-full w-full object-cover" />
        <div className="absolute top-[8rem] ml-32 text-white ">
          <div className="float-left flex flex-col justify-center">
            <h1 className="text-6xl font-extrabold tracking-wide text-orange-500">CREATO</h1>
            <h1 className="text-[10rem] font-black tracking-wide text-white">LENS</h1>
            <Paragraph className="text-lg">Introducing data-backed AI tool - Creato Lens.</Paragraph>
            <Paragraph className="text-lg">Creators are empowered to make informed decisions in creating content.</Paragraph>
            <div className="mt-24 flex gap-8">
              <Button.Primary className="mt-4 w-fit p-2" onClick={onLogin}>
                Sign In
              </Button.Primary>
              <Button.Primary className="mt-4 w-fit bg-text-white p-2 text-text-primary" onClick={GetStarted}>
                Get Started <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button.Primary>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
