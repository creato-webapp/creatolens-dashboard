import React from 'react'
import Image from 'next/image'
import PrimaryButton from '@components/Button/Primary'
import useAuth from '@hooks/useAuth'
import { useTranslation } from 'next-i18next'

interface LandingHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function LandingHeader(props: LandingHeaderProps) {
  const { onLogin } = useAuth()
  const { t } = useTranslation('home')

  const TransparentCard = () => {
    return (
      <div className="flex w-full flex-col items-center gap-2 rounded-3xl bg-white bg-opacity-60 py-6 shadow-lg shadow-primary-200 md:mt-0 md:px-8">
        <h1 className="text-title font-bold">{t('landing.title_line1')}</h1>
        <h1 className="w-full break-words bg-primary-500 text-title font-bold text-white md:text-title">{t('landing.title_highlight')}</h1>
        <h1 className="text-subtitle font-normal">{t('landing.subtitle')}</h1>
        <div className="flex flex-col items-center gap-8">
          <PrimaryButton className=" drop-shadow-md" onClick={onLogin}>
            {t('landing.cta')}
          </PrimaryButton>
          <div className="text-xs text-neutral-500">{t('landing.no_credit_card')}</div>
          <div className="text-xs text-neutral-500">{t('landing.customer_service')}</div>
        </div>
      </div>
    )
  }

  return (
    <div className={`${props.className} mt-12 flex w-full items-center justify-center overflow-hidden pt-12 md:mt-0 md:px-12`}>
      <div className="relative z-10 flex h-full w-full max-w-screen-xl flex-col-reverse items-center justify-center pb-16 text-center md:h-[calc(100vh-90px)] md:flex-row">
        <div className="z-10 w-full px-2 md:w-1/2 md:px-4">
          <TransparentCard />
        </div>
        <div className="-px-4 absolute inset-0 -left-[100%] -top-[50%]  flex h-[200%] w-[300%] items-center justify-center overflow-visible opacity-15 md:relative md:left-0 md:top-0 md:h-full md:w-1/2 md:w-full md:opacity-100">
          <Image
            src="/landing-animation.gif"
            style={{ objectFit: 'contain' }}
            alt={'2Tag animation'}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
            loading="eager"
            priority
            blurDataURL="/landing-animation-loading.avif"
          />
        </div>
      </div>
    </div>
  )
}
