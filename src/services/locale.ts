import { GetStaticPropsContext, GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getLocaleProps = async ({ locale }: GetStaticPropsContext | GetServerSidePropsContext, props?: { [key: string]: unknown }) => ({
  props: {
    locale: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'error'])),
    },
    ...(props ?? {}),
  },
})
