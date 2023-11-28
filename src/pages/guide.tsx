import React from 'react'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import Paragraph from '@components/Typography/Paragraph'
import { Title } from '@components/Typography'
import { Button } from '@components/Button'
import PlusIcon from '@components/Icon/PlusIcon'
import Card from '@components/Card'
import { ListItem, UnorderedList } from '@components/Typography/ListItem'
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
        <Hero backgroundImage="./GuideHero.svg">
          <h1> User Guide</h1>
          <h4>2 Easy Steps to Kick Start</h4>
        </Hero>
        <div className="flex w-full flex-col items-center justify-start gap-6 md:flex-row md:flex-wrap md:items-stretch md:justify-center md:gap-12 md:p-12">
          <Card
            className="mx-6 h-full w-auto rounded-none bg-neutral-50 shadow-lg md:mx-0 md:h-auto md:w-[30%] "
            customTitle={
              <div className="w-full text-center text-accent1-500">
                <h2>01</h2>
                <h2>CREATE INSTANT BOT</h2>
              </div>
            }
          >
            {<img className="h-auto w-full rounded-xl md:shrink-0 " src={'/NewAccountFrame.svg'} />}
            <h2>Connect an empty IG account to LENS</h2>
            <ul className="list-outside list-disc ">
              <li className="mx-2 text-lg">Use the account to follow about 10 creators in your niche or area.</li>
              <li className="mx-2 text-lg">Add this account as an Insta-bot in “Accounts”</li>
            </ul>
            <Button.Primary onClick={handleNewAccountClick}>
              <PlusIcon className="mr-2" />
              New Account
            </Button.Primary>
            <footer> We value your privacy, so please refrain from using your active account as the Instagram bot.</footer>
          </Card>
          <Card
            className="mx-6 h-full w-auto rounded-none bg-neutral-50 shadow-lg md:mx-0 md:h-auto md:w-[30%]"
            customTitle={
              <div className="w-full text-center text-accent1-500">
                <h2>02</h2>
                <h2>TEXT-TO-HASHTAG</h2>
              </div>
            }
          >
            {<img className="h-auto w-full rounded-xl md:shrink-0 " src={'/GetHashtagFrame.svg'} />}
            <h2>Input a 5-8 word-prompt</h2>
            <ul className="list-outside list-disc">
              <li className="mx-2 text-lg">In a few words, tell us in text what your content is about. </li>
              <li className="mx-2 text-lg">AI companion will analyze and customize the most relevant hashtag trends for your consideration. </li>
            </ul>

            <footer>Tell us again in another few words and let us work for you again if results are not satisfied.</footer>
          </Card>

          <Card
            className="mx-6 h-full w-auto rounded-none bg-neutral-50 shadow-lg md:mx-0 md:h-auto md:w-[30%]"
            customTitle={
              <div className="w-full text-center text-accent1-500">
                <h2>03</h2>
                <h2>APPLY HASHTAG</h2>
              </div>
            }
          >
            {<img className="h-auto w-full rounded-xl md:shrink-0 " src={'/applyHashtagFrame.svg'} />}
            <h2>Ready to use to grow more impressions and reaches</h2>
            <ul className="list-outside list-disc ">
              <li className="mx-2 text-lg"> Save or choose hashtag trends based on relevance i.e. 80%, 90%, 95% etc. visibility.</li>
              <li className="mx-2 text-lg"> Ready to use for your social media content to elevate</li>
            </ul>
            <footer>We value your privacy, so please refrain from using your active account as the Instagram bot.</footer>
          </Card>
        </div>
      </div>
    </>
  )
}
export default Guide
