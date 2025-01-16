// ErrorPage.tsx

import React from 'react'

import { useRouter } from 'next/router'

import { Button } from '@components/Button'
import { useTranslation } from 'next-i18next'
import { getLocaleProps } from '@services/locale'
import CustomLink from '@components/Link'
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next'

export async function getStaticProps(context: { locale: GetStaticPropsContext | GetServerSidePropsContext }) {
  return await getLocaleProps(context.locale)
}

const NOT_FOUND: React.FC = () => {
  const { t } = useTranslation('error')
  const router = useRouter()

  const goBack = () => {
    router.back()
  }

  return (
    <div>
      <div className="place-self-start p-4 text-accent2-500 md:hidden md:overflow-hidden">
        <CustomLink onClick={goBack} href={''}>
          {'< Back'}
        </CustomLink>
      </div>
      <div className="flex h-screen w-full justify-center overflow-hidden text-center md:items-start md:text-left">
        <div className="flex h-full w-full flex-row items-center justify-center">
          <div className="flex items-center md:w-1/2 md:pl-16 lg:pl-32">
            <div className="flex flex-col justify-center gap-12 md:items-start">
              <h1 className="text-7xl font-extrabold uppercase text-accent1-500">{t('title', { statusCode: 400 })}</h1>
              <h1 className="text-5xl font-extrabold">PAGE NOT FOUND</h1>
              <h4 className="font-semibold">We are working on fixing the problem. Be back soon.</h4>
              <Button.Primary onClick={goBack}>Go Back</Button.Primary>
            </div>
          </div>
          <div className="relative hidden h-full w-1/2 md:block">
            <img className="absolute -right-36 -z-50  h-full w-full shrink-0 md:top-0 " src={'./404.svg'} alt="404 Image" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NOT_FOUND
