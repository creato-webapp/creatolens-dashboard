import React from 'react'
import { Paragraph, Title } from '@components/Typography'
import { Button } from '@components/Button'
import { useRouter } from 'next/router'

const NotFound = () => {
  const router = useRouter()

  const goBack = () => {
    router.back()
  }

  return (
    <div className="ml-48 flex flex-col-reverse ">
      <div className="my-36 flex flex-col gap-5">
        <Title className="inline-block text-9xl font-extrabold text-accent1-500">ERROR 404</Title>
        <Title className="inline-block text-5xl font-extrabold text-text-primary">PAGE NOT FOUND</Title>
        <Paragraph>We are working on fixing the problem. Be back soon</Paragraph>
        <Button.Primary className="mt-10 w-fit" onClick={goBack}>
          Go Back
        </Button.Primary>
      </div>
      <div className="relative">
        <img className="absolute -right-28 overflow-hidden" src="/404.svg" />
      </div>
    </div>
  )
}

export default NotFound
