import Breadcrumb from '@components/Breadcrumb'
import CaretLeftIcon from '@components/Icon/CaretLeftIcon'
import Image from 'next/image'
import router from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'zh-HK', ['contact-us', 'layout', 'common'])),
    },
  }
}

const ContactUs = () => {
  const { t } = useTranslation('contact-us')
  return (
    <div className="mb-10 flex w-full items-center justify-center md:mb-40">
      <div className="flex w-full flex-col md:max-w-screen-xl">
        <div className="hidden md:flex">
          <Breadcrumb lastItemName={t('breadcrumb')} />
        </div>

        <div className="flex flex-row items-center px-4 py-2">
          <div className="flex md:hidden">
            <div className="flex cursor-pointer md:hidden" onClick={() => router.push('/')}>
              <CaretLeftIcon size={20} />
            </div>
          </div>
          <h1 className="px-4 py-4 text-2xl font-bold md:pl-16">{t('heading')}</h1>
        </div>
        <hr className="my-4 hidden w-full border-t border-neutral-300 md:flex" />
        <div className="flex flex-col px-6 md:flex-row">
          <div className="relative h-96 w-full">
            <Image src={'/contact-us.png'} style={{ objectFit: 'contain' }} fill alt={t('page_title')} />
          </div>
          <div className="flex w-full flex-col justify-center gap-6 text-neutral-500">
            <div className="flex flex-col gap-2">
              <div className="text-heading text-neutral-800">{t('heading')}</div>
              <div className="text-subheading text-neutral-500">{t('subheading')}</div>
            </div>
            <div>{t('description')}</div>
            <div>{t('reach_us')}</div>
            <a href="mailto:hello@creatogether.app">
              {t('email')}
              <div className="text-blue-600 underline">hello@creatogether.app</div>
            </a>
            <a href="https://wa.me/85268215494">
              {t('whatsapp')}
              <div className="text-blue-600 underline">+852 6821 5494</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
