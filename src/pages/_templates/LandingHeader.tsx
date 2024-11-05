import React from 'react'
import Image from 'next/image'
import PrimaryButton from '@components/Button/Primary'

interface LandingHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function LandingHeader(props: LandingHeaderProps) {
  const TransparentCard = () => {
    return (
      <div className="flex w-full flex-col items-center gap-2 rounded-3xl bg-white bg-opacity-60 py-6 shadow-lg shadow-primary-200 drop-shadow-lg md:px-8">
        <h1 className="text-title font-bold">The magical tool that gets</h1>
        <h1 className="w-full bg-primary-500 text-title font-bold text-white  md:text-title">ENGAGEMENT</h1>
        <h1 className="text-subtitle font-normal">All in one</h1>
        <div className="flex flex-col items-center gap-8">
          <PrimaryButton className=" drop-shadow-md">Start Exploring</PrimaryButton>
          <div className="text-xs text-neutral-500">Start with $0. No credit card needed.</div>
          <div className="text-xs text-neutral-500">7 days a week customer services</div>
        </div>
      </div>
    )
  }

  return (
    <div className={`${props.className} w-full`}>
      <div className="relative z-10 flex h-full flex-col-reverse items-center justify-center py-16 text-center md:h-[calc(100vh-95px)] md:flex-row">
        <div className="z-10 w-full md:w-1/2 md:px-4 lg:w-1/3">
          <TransparentCard />
        </div>
        <div className="absolute left-0 top-0 h-full w-full opacity-15 md:relative md:w-2/5 md:opacity-100">
          <Image src="/landing-animation.gif" objectFit="coverImage" alt={'2Tag animation'} fill />
        </div>
      </div>
    </div>
  )
}
