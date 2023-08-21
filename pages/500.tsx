import React from 'react'
import { useRouter } from 'next/router'
import { Paragraph, Title } from '@components/Typography'
import { Button } from '@components/Button'

const UnexpectedError = () => {
  const router = useRouter()

  const goBack = () => {
    router.back()
  }

  return (
    <div className="ml-48 flex flex-col-reverse ">
      <div className="my-36 flex flex-col gap-5">
        <Title className="inline-block text-9xl font-extrabold text-orange-500">ERROR 500</Title>
        <Title className="inline-block text-5xl font-extrabold text-text-primary">SORRY, UNEXPECTED ERROR</Title>
        <Paragraph>We are working on fixing the problem. Be back soon</Paragraph>
        <Button.Primary className="mt-10 w-fit" onClick={goBack}>
          Go Back
        </Button.Primary>
      </div>
      <div className="relative">
        <img className="absolute right-20 -top-20 z-auto h-[900px] overflow-hidden" src="/500.svg" />
      </div>
    </div>
  )
}

export default UnexpectedError
