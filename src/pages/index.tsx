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
      <div className="relative w-screen overflow-hidden">
        <img src="/landing_page.svg" alt="Background" className="relative h-full w-full object-cover" />
        <div className="absolute top-1/4 left-[100px] text-white ">
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
      <div className="inline-flex w-screen flex-col items-center justify-center gap-10 bg-blue-900 px-20">
        <div className="w-96 text-center text-4xl font-extrabold leading-10 tracking-wide text-neutral-50">Why Creato Lens?</div>
        <div className="inline-flex items-center justify-start gap-44">
          <div className="inline-flex flex-col items-start justify-start gap-2.5 p-2.5">
            <div className="flex flex-col items-start justify-start gap-12">
              <div className="self-stretch text-3xl font-bold leading-10 text-neutral-50 underline">Why choose Creato Lens for Instagram?</div>
              <div className="w-96 text-xl font-medium leading-loose text-neutral-50">
                Differing from other platforms, Creato LENS offers personalized hashtag suggestions based on your provided account. Elevate social
                media engagement in your chosen areas of interest!
              </div>
            </div>
          </div>
          <div className="inline-flex flex-col items-start justify-start gap-12">
            <div className="w-96 text-3xl font-bold leading-10 text-neutral-50 underline">Unlimited Account!</div>
            <div className="w-96 text-xl font-medium leading-loose text-neutral-50">
              We encourage users to add a multiple of accounts to Creato LENS, spanning diverse areas of interest. Your input fuels the expansion of
              our library and reinforce the result accuracy!
            </div>
          </div>
        </div>
      </div>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
