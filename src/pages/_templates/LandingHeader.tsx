import React from 'react'

import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'

import { Button } from '@components/Button'

import LandingImageLogo from './LandingImageLogo'

interface LandingHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function LandingHeader(props: LandingHeaderProps) {
  const router = useRouter()
  const handleClick = () => {
    router.replace('https://www.creatogether.app/zh/creatolens')
  }
  return (
    <div
      className={`flex w-auto flex-col items-center space-y-8 pt-12 ${props.className} bg-[url('/landing-background.png')]  bg-cover bg-bottom bg-no-repeat px-2 pb-10 md:flex-row md:justify-between`}
    >
      <div className="flex flex-col md:ml-12 md:w-1/2">
        <span className="text-center md:text-left">
          <h1 className="text-title text-accent1-500">Creato Lens</h1>
          <div className="text-m-landing-title font-extrabold text-text-secondary md:text-d-landing-title">
            Get Your <br />
            <span className="text-m-landing-title font-extrabold text-text-secondary md:text-d-landing-title">Content&nbsp;</span>
            <span className="text-m-landing-title font-extrabold text-accent1-500 md:text-d-landing-title">Seen</span>
          </div>
        </span>
        <h3 className="mx-auto mt-14 w-72 text-center font-medium md:mt-9 md:w-auto md:text-left">
          Elevate your content&apos;s visibility with 100% personalised hashtag trend recommendations.
        </h3>
        <div className="mt-14 flex flex-row justify-center gap-8 md:mt-9 md:justify-start md:gap-3 ">
          <Button.Primary className=" w-auto" sizes={['m', 'l', 'l']} onClick={handleClick}>
            <h4>Free Trial &gt;&gt;</h4>
          </Button.Primary>
          <Button.Outline className=" w-auto !px-6 !py-3" sizes={['m', 'l', 'l']} onClick={() => signIn('google', { callbackUrl: '/' })}>
            <h4>Sign In</h4>
          </Button.Outline>
        </div>
      </div>
      <LandingImageLogo className="mb-10 h-auto w-full md:w-full"></LandingImageLogo>
    </div>
  )
}
