import type { NextPage } from 'next'
import { useCallback } from 'react'
import { getSession } from 'next-auth/react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Paragraph, Title } from '@components/Typography'
import { Button } from '@components/Button'
import ArrowRightIcon from '@components/Icon/ArrowRightIcon'
import { signIn } from 'next-auth/react'

export const getServerSideProps = async (context: any) => {
  //remove any
  const session: any = await getSession(context)
  return { props: {} }
}

const Home: NextPage = () => {
  const onLogin = useCallback(() => {
    signIn()
  }, [])

  return (
    <div className={styles.container}>
      <div className="relative h-screen w-screen overflow-hidden">
        <img src="/landing_page.svg" alt="Background" className="relative -top-10 h-full w-full object-cover" />
        <div className="absolute top-1/4 left-[100px]  text-white ">
          <div className="float-left flex flex-col justify-center">
            <Title className="text-6xl font-extrabold tracking-wide text-orange-500">CREATO</Title>
            <Title className="text-[10rem] font-black tracking-wide text-white">LENS</Title>
            <Paragraph className="text-lg">Introducing data-backed AI tool - Creato Lens.</Paragraph>
            <Paragraph className="text-lg">Creators are empowered to make informed decisions in creating content.</Paragraph>
            <div className="mt-24 flex gap-8">
              <Button.Primary className="mt-4 w-fit p-2" onClick={onLogin}>
                Sign In
              </Button.Primary>
              <Button.Primary className="mt-4 w-fit bg-text-white p-2 text-text-primary">
                Get Started <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button.Primary>
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
