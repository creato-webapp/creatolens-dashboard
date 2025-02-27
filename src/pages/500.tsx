import React from 'react'

import { useRouter } from 'next/router'

import { Button } from '@components/Button'
import CustomLink from '@components/Link'

const ErrorPage: React.FC = () => {
  const router = useRouter()

  const goBack = () => {
    router.back()
  }

  return (
    <div className="md:h-[80%]">
      <div className="place-self-start p-4 text-accent2-500 md:hidden md:overflow-hidden">
        <CustomLink onClick={goBack} href={''}>
          {'< Back'}
        </CustomLink>
      </div>

      <div className="relative flex h-screen flex-col items-center justify-center overflow-hidden text-center md:items-start md:pl-32 md:text-left">
        <div>
          <div className="flex flex-col gap-12 md:items-start">
            <h1 className="text-title font-extrabold text-accent1-500">ERROR 500</h1>
            <h1 className="text-subtitle font-extrabold">PAGE NOT FOUND</h1>
            <h4 className="font-semibold">We are working on fixing the problem. Be back soon.</h4>
            <Button.Primary sizes={['s', 's', 's']} onClick={goBack}>
              Go Back
            </Button.Primary>
          </div>
          <img className="absolute -right-36 -z-50 hidden w-1/2 shrink-0 md:-top-36 md:block" src={'./500.svg'} alt="500 Image" />
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
