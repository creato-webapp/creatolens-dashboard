import React from 'react'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import Paragraph from '@components/Typography/Paragraph'
import { Title } from '@components/Typography'
import { Button } from '@components/Button'
import PlusIcon from '@components/Icon/PlusIcon'

const Guide: NextPage = () => {
  const router = useRouter()

  const handleNewAccountClick = () => {
    // Redirect to the "accounts/create" page
    router.push('/accounts/create-account')
  }
  return (
    <>
      <div className="ml-6 flex-col justify-start gap-6 py-6">
        <Title level={1} bold>
          How To Start
        </Title>
        <Paragraph>2 Easy Steps to Kick Start</Paragraph>
      </div>
      <div className="flex w-full justify-center gap-4">
        <div className="mr-32 h-128 space-y-4 rounded bg-neutral-50 shadow-lg">
          <div className="w-96 bg-white">
            <div className="inline-flex h-14 w-14 flex-col items-center justify-center gap-2.5 rounded-br-lg bg-violet-200 p-2.5">
              <div className="text-center text-3xl font-semibold text-blue-700">1</div>
            </div>
            <img className="" src="/NewAccountFrame.svg"></img>
          </div>
          <div className="w-96 px-4 text-center text-3xl font-bold text-neutral-800">Add new Instagram account in Creato LENS</div>
          <div className="flex justify-center">
            <Button.Primary className="mb-4" onClick={handleNewAccountClick}>
              <PlusIcon className="mr-2" />
              New Account
            </Button.Primary>
          </div>
        </div>
        <div className="mr-12 h-128 w-96 rounded bg-neutral-50 shadow-lg">
          <div className="w-96 bg-white">
            <div className="left-0 top-0 inline-flex h-14 w-14 flex-col items-center justify-center gap-2.5 rounded-br-lg bg-violet-200 p-2.5">
              <div className="text-center text-3xl font-semibold leading-10 text-blue-700">2</div>
            </div>
          </div>
          <img className="" src="/GetHashtagFrame.svg"></img>
          <div className="w-96 p-4 text-center text-3xl font-bold leading-10 text-neutral-800">
            Go to Recommendation search for hashtag recommendation
          </div>
        </div>
      </div>
    </>
  )
}
export default Guide
