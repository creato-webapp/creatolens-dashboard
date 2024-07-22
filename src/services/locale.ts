import { GetStaticPropsContext, GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import nextI18NextConfig from '../..//next-i18next.config.js'
import { LOCAL_NAME_SPACE, LANGUAGE } from '@constants/locales'

export const getLocaleProps = async ({ locale }: GetStaticPropsContext | GetServerSidePropsContext, props?: { [key: string]: unknown }) => ({
  props: {
    locale: {
      ...(await serverSideTranslations(locale ?? LANGUAGE[0], LOCAL_NAME_SPACE, nextI18NextConfig, LANGUAGE)),
    },
    ...(props ?? {}),
  },
})
