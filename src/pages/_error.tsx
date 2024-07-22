import React from 'react'

import { useRouter } from 'next/router'

import { Button } from '@components/Button'
import { StatusCodes } from 'http-status-codes'
import { NextPageContext } from 'next'

type IPageProps = {
  statusCode: (typeof StatusCodes)[keyof typeof StatusCodes]
}

const Error = ({ statusCode }: IPageProps) => {
  const router = useRouter()

  const goBack = () => {
    router.back()
  }

  return (
    <div className="md:h-[80%]">
      <Button.Text onClick={goBack} className="place-self-start p-4 text-accent2-500 md:hidden md:overflow-hidden">
        {'< Back'}
      </Button.Text>
      <div className="relative flex h-screen flex-col items-center justify-center overflow-hidden text-center md:items-start md:pl-32 md:text-left">
        <div className="">
          <div className="flex flex-col gap-12 md:items-start">
            <h1 className="text-7xl font-extrabold text-accent1-500">ERROR</h1>
            <h4 className="font-semibold">We are working on fixing the problem. Be back soon.</h4>
            <p>{statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}</p>
            <Button.Primary onClick={goBack}>Go Back</Button.Primary>
          </div>
          <img className="absolute -right-36 -z-50 hidden w-1/2 shrink-0 md:-top-36 md:block" src={'./500.svg'} alt="500 Image" />
        </div>
      </div>
    </div>
  )
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : StatusCodes.NOT_FOUND
  return { statusCode }
}

export default Error
