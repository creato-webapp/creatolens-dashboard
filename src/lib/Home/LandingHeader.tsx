import { Button } from '@components/Button'
import BaseInput from '@components/Form/BaseInput'
import TextInput from '@components/Form/TextInput'

import React from 'react'
import LandingImageLogo from './LandingImageLogo'
import { useRouter } from 'next/router'

interface LandingHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function LandingHeader(props: LandingHeaderProps) {
  const router = useRouter()
  const handleClick = () => {
    router.replace('https://www.creatogether.app/zh/creatolens')
  }
  return (
    <div className={`flex w-auto flex-col items-center space-y-8 ${props.className}`}>
      <>
        <span className="text-center">
          <h1 className="mt-24 text-accent1-500">Creato Lens</h1>
          <h1 className=" text-6xl font-extrabold text-text-secondary">
            Get Your <br />
            <span className="text-6xl font-extrabold text-text-secondary">Content&nbsp;</span>
            <span className="text-6xl font-extrabold text-accent1-500">Seen</span>
          </h1>
        </span>
      </>
      <h3 className="w-72 text-center font-medium">Elevate your content's visibility with 100% personalised hashtag trend recommendations.</h3>
      <Button.Primary onClick={handleClick}>Free Trial {'>>'}</Button.Primary>
      <LandingImageLogo className="mb-10 h-auto w-96"></LandingImageLogo>
    </div>
  )
}