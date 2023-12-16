import React from 'react'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import { Button } from '@components/Button'
import PlusIcon from '@components/Icon/PlusIcon'
import Card from '@components/Card'
import Hero from '@components/Hero'

const Guide: NextPage = () => {
  const router = useRouter()

  const handleNewAccountClick = () => {
    // Redirect to the "accounts/create" page
    router.push('/accounts/create-account')
  }
  return (
    <>
      <div className=" flex-col justify-start  ">
        <Hero
          backgroundImage="./GuideHero.svg"
          className="flex h-full flex-col justify-between md:h-52"
          childrenStyle="h-full md:gap-3 flex-col flex md:py-24 justify-center"
        >
          <h1 className="uppercase md:font-extrabold"> User Guide</h1>
          <h3 className="md:font-medium">3 Easy Steps to Kick-start</h3>
        </Hero>
        <div className="flex w-full flex-col items-center justify-start gap-6 md:flex-row md:flex-wrap md:items-stretch md:justify-center md:gap-12 md:p-12">
          <Card
            className="mx-6 h-full w-auto rounded-none bg-neutral-50 shadow-lg md:mx-0 md:h-auto md:w-[30%] "
          >
            {<img className="h-auto w-full rounded-xl md:shrink-0 " src={'/guide/create-insta-bot.svg'} />}
          <h2 className='font-extrabold'>Connect an empty IG account to LENS</h2>
            <ul className="list-outside list-disc line flex flex-col gap-6">
              <li className="mx-2 text-lg">Use the account to follow about 10 creators in your niche or area.</li>
              <li className="mx-2 text-lg">Add this account as an Insta-bot in “Accounts”</li>
            </ul>
          
            <footer> We value your privacy, so please refrain from using your active account as the Instagram bot.</footer>
            <Button.Primary onClick={handleNewAccountClick}>
              <PlusIcon className="mr-2" />
              New Account
            </Button.Primary>
          </Card>
          <Card
            className="mx-6 h-full w-auto rounded-none bg-neutral-50 shadow-lg md:mx-0 md:h-auto md:w-[30%]"
          >
            {<img className="h-auto w-full rounded-xl md:shrink-0 " src={'/guide/hashtag-exploration.svg'} />}
            <h2>Input a 5-8 word-prompt</h2>
            <ul className="list-outside list-disc line flex flex-col gap-6">
              <li className="mx-2 text-lg">In a few words, tell us in text what your content is about. </li>
              <li className="mx-2 text-lg">AI companion will analyze and customize the most relevant hashtag trends for your consideration. </li>
            </ul>

            <footer>Tell us again in another few words and let us work for you again if results are not satisfied.</footer>
          </Card>

          <Card
            className="mx-6 h-full w-auto rounded-none bg-neutral-50 shadow-lg md:mx-0 md:h-auto md:w-[30%]"
          >
            {<img className="h-auto w-full rounded-xl md:shrink-0 " src={"/guide/apply-hashtag.svg"} />}
            <h2>Generate Trending Hashtag</h2>
            <ul className="list-outside list-disc line flex flex-col gap-6">
              <li className="mx-2 text-lg"> Save or choose hashtag trends based on relevance i.e. 80%, 90%, 95% etc. visibility.</li>
              <li className="mx-2 text-lg"> Ready to use to grow more impressions and reaches</li>
            </ul>
          </Card>
        </div>
      </div>
    </>
  )
}
export default Guide
