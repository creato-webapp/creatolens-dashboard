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
    <div className={`${props.className} w-full bg-[url('/landing-background2.png')] bg-cover bg-bottom bg-no-repeat`}>
      {/* <div className="flex flex-col md:ml-12 md:w-1/2">
        <span className="text-center md:text-left">
          <h1 className="text-title text-accent1-500">2Tag</h1>
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
      <LandingImageLogo className="mb-10 h-auto w-full md:w-full"></LandingImageLogo> */}
      <div className="flex h-[calc(100vh-95px)] items-center justify-center text-center">
        <div className="h-4/5 w-1/3">
          <TransparentCard />
        </div>
      </div>
    </div>
  )
}
