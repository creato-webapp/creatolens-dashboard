import React, { useCallback } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'

import AccountCreateCard from '@components/Account/AccountCreateCard'
import Paragraph from '@components/Typography/Paragraph'
import Title from '@components/Typography/Title'
import IMAGE from '@constants/image'
import ROUTE from '@constants/route'

const NewBotPage = () => {
  const router = useRouter()

  const goBack = useCallback(() => {
    router.push(ROUTE.GUIDE)
  }, [router])

  return (
    <div className={`h-full bg-bg-white bg-cover bg-center bg-no-repeat pb-12 md:static md:bg-[url('/background/instagram.svg')] md:px-12`}>
      <div className="flex w-full flex-col px-4 pt-4 md:w-1/2">
        <div className="flex flex-col pb-8">
          <div className="pb-4 pt-3">
            <div className="flex cursor-pointer flex-row gap-2 font-semibold text-accent2-500" onClick={goBack}>
              <Image alt="back" src={IMAGE.LOGO_BACK} width={20} height={20} />
              <div>{`Back`}</div>
            </div>
          </div>
          <div className="flex flex-col px-2 md:gap-6 md:px-12">
            <Title level={1} bold>
              CREATE NEW ACCOUNT
            </Title>
            <Paragraph size="md" className=" text-lg" bold>
              Connect your Instagram account
            </Paragraph>
          </div>
        </div>
        <div className="flex w-full justify-center shadow-lg md:ml-12 md:max-w-sm ">
          <AccountCreateCard isCreate={false} />
        </div>
      </div>
    </div>
  )
}

export default NewBotPage
