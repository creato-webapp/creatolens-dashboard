import React from 'react'

import ROUTE from '@constants/route'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { Button } from '@components/Button'
import Card from '@components/Card'
import Hero from '@components/Hero'
import PlusIcon from '@components/Icon/PlusIcon'

const Guide: NextPage = () => {
  const router = useRouter()
  const { t } = useTranslation('guide')

  const onClick = () => {
    // Redirect to the "accounts/create" page
    router.push(ROUTE.ACCOUNT_BOT_CREATE)
  }
  return (
    <>
      <div className=" flex-col justify-start  ">
        <Hero
          backgroundImage="./GuideHero.svg"
          className="flex h-full flex-col justify-between md:h-52"
          childrenStyle="h-full md:gap-3 flex-col flex md:py-24 justify-center"
        >
          <h1 className="text-title uppercase md:font-extrabold">{t('title')}</h1>
          <h3 className="md:font-medium">{t('subtitle')}</h3>
        </Hero>
        <div className="flex w-full flex-col items-center justify-start gap-6 md:flex-row md:flex-wrap md:items-stretch md:justify-center md:gap-12 md:p-12">
          <Card className="mx-6 h-full w-auto rounded-none bg-neutral-50 shadow-lg md:mx-0 md:h-auto md:w-[30%] ">
            {<img alt={t('step1.image_alt')} className="h-auto w-full rounded-xl md:shrink-0 " src={'/guide/create-insta-bot.svg'} />}
            <h2 className="font-extrabold">{t('step1.heading')}</h2>
            <ul className="line flex list-outside list-disc flex-col gap-6">
              <li className="mx-2 text-lg">{t('step1.bullet1')}</li>
              <li className="mx-2 text-lg">{t('step1.bullet2')}</li>
            </ul>

            <footer>{t('step1.footer')}</footer>
            <Button.Primary onClick={onClick}>
              <PlusIcon className="mr-2" />
              {t('step1.button')}
            </Button.Primary>
          </Card>
          <Card className="mx-6 h-full w-auto rounded-none bg-neutral-50 shadow-lg md:mx-0 md:h-auto md:w-[30%]">
            {<img className="h-auto w-full rounded-xl md:shrink-0 " alt={t('step2.image_alt')} src={'/guide/hashtag-exploration.svg'} />}
            <h2>{t('step2.heading')}</h2>
            <ul className="line flex list-outside list-disc flex-col gap-6">
              <li className="mx-2 text-lg">{t('step2.bullet1')}</li>
              <li className="mx-2 text-lg">{t('step2.bullet2')}</li>
            </ul>

            <footer>{t('step2.footer')}</footer>
          </Card>

          <Card className="mx-6 h-full w-auto rounded-none bg-neutral-50 shadow-lg md:mx-0 md:h-auto md:w-[30%]">
            <img className="h-auto w-full rounded-xl md:shrink-0" alt={t('step3.image_alt')} src={'/guide/apply-hashtag.svg'} />
            <h2>{t('step3.heading')}</h2>
            <ul className="line flex list-outside list-disc flex-col gap-6">
              <li className="mx-2 text-lg">{t('step3.bullet1')}</li>
              <li className="mx-2 text-lg">{t('step3.bullet2')}</li>
            </ul>
          </Card>
        </div>
      </div>
    </>
  )
}
export default Guide
