import React from 'react'

import PrimaryButton from '@components/Button/Primary'

interface LandingHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function LandingHeader(props: LandingHeaderProps) {
  const TransparentCard = () => {
    return (
      <div className="flex flex-col items-center gap-2 rounded-3xl bg-white px-8 py-6 opacity-90">
        <h1 className="text-title font-bold">The magical tool that gets engagement</h1>
        <h2 className="text-subtitle font-normal">Keyword, SEO Insight, Gen AI All in one</h2>
        <div className="flex flex-col items-center gap-8">
          <PrimaryButton className="drop-shadow-md">Start Exploring</PrimaryButton>
          <div className="text-xs text-neutral-500">Start with $0. No credit card needed.</div>
          <div className="text-xs text-neutral-500">7 days a week customer services</div>
        </div>
      </div>
    )
  }

  return (
    <div className={`${props.className} w-full bg-cover bg-bottom bg-no-repeat md:bg-[url('/landing-background2.png')]`}>
      <div className="flex h-[calc(100vh-95px)] items-center justify-center text-center">
        <div className="md:w-1/2 lg:w-1/3">
          <TransparentCard />
        </div>
      </div>
    </div>
  )
}
