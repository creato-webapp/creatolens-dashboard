import { GetStaticPropsContext, GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import nextI18NextConfig from '../../next-i18next.config.js'
import { LOCAL_NAME_SPACE, LANGUAGE } from '@constants/locales'

export const getLocaleProps = async (context: GetStaticPropsContext | GetServerSidePropsContext, additionalProps?: { [key: string]: unknown }) => {
  const translations = await serverSideTranslations(context.locale ?? LANGUAGE[0], LOCAL_NAME_SPACE, nextI18NextConfig, LANGUAGE)

  return {
    props: {
      ...translations,
      ...(additionalProps ?? {}),
    },
  }
}
