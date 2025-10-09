import type { NextPage } from 'next'
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { getSession } from 'next-auth/react'
import React, { memo } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

import LandingHeader from './_templates/LandingHeader'
import Testimonial from './_templates/Testimonial'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/Tabs'
import PrimaryButton from '@components/Button/Primary'
import Image from 'next/image'
import { Card, CardDescription, CardHeader, CardTitle } from '@components/ui/Card'
import LightBulbIcon from '@components/Icon/LightBulbIcon'
import EyeIcon from '@components/Icon/EyeIcon'
import ThumbUpIcon from '@components/Icon/ThumbUpIcon'
import PenIcon from '@components/Icon/PenIcon'
import FinnTheHumanIcon from '@components/Icon/FinnTheHumanIcon'
import TrendUpIcon from '@components/Icon/TrendUpIcon'
import CoffeeIcon from '@components/Icon/CoffeeIcon'
import Link from 'next/link'
import useAuth from '@hooks/useAuth'
import ROUTE from '@constants/route'

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Record<string, unknown>>> => {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: '/guide',
        permanent: false,
      },
    }
  }
  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'zh-HK', ['home', 'layout', 'common'])),
    },
  }
}

interface FeatureCardProps {
  title: string
  description: string
  image?: string
  button: React.ReactNode
  video?: string
  link: string
}

const TabSession = memo(() => {
  const { t } = useTranslation('home')

  const features: FeatureCardProps[] = [
    {
      title: t('features.instagram_trend_analysis.title'),
      description: t('features.instagram_trend_analysis.description'),
      button: (
        <PrimaryButton sizes={['m', 'm', 'm']}>
          <div className="md:w-96">{t('features.instagram_trend_analysis.button')}</div>
        </PrimaryButton>
      ),
      image: '/hashtag/analysis.png',
      link: ROUTE.STATIC_DASHBOARD,
    },
    {
      title: t('features.instabot.title'),
      description: t('features.instabot.description'),
      button: (
        <PrimaryButton sizes={['m', 'm', 'm']}>
          <div className="md:w-96">{t('features.instabot.button')}</div>
        </PrimaryButton>
      ),
      video: '/features/instabot-video.mp4',
      link: ROUTE.STATIC_ACCOUNTS,
    },
    {
      title: t('features.hashtags_recommendation.title'),
      description: t('features.hashtags_recommendation.description'),
      button: (
        <PrimaryButton sizes={['m', 'm', 'm']}>
          <div className="md:w-96">{t('features.hashtags_recommendation.button')}</div>
        </PrimaryButton>
      ),
      image: '/hashtag/hashtags-recommendation.png',
      link: ROUTE.STATIC_RECOMMENDATION,
    },
    {
      title: t('features.hashtags_to_image.title'),
      description: t('features.hashtags_to_image.description'),
      button: (
        <PrimaryButton sizes={['m', 'm', 'm']}>
          <div className="md:w-96">{t('features.hashtags_to_image.button')}</div>
        </PrimaryButton>
      ),
      image: '/hashtag/hashtags-to-image.png',
      link: ROUTE.STATIC_HASHTAG_TO_IMAGE,
    },
    {
      title: t('features.image_to_hashtags.title'),
      description: t('features.image_to_hashtags.description'),
      button: (
        <PrimaryButton sizes={['m', 'm', 'm']}>
          <div className="md:w-96">{t('features.image_to_hashtags.button')}</div>
        </PrimaryButton>
      ),
      image: '/hashtag/image-to-hashtag.png',
      link: ROUTE.STATIC_IMAGE_TO_HASHTAG,
    },
  ]
  return (
    <Tabs defaultValue={features[0].title} className="flex w-full max-w-screen-xl flex-col px-12">
      <TabsList className="flex h-full w-full overflow-x-auto md:flex-wrap">
        {features.map((feature) => (
          <TabsTrigger key={feature.title} value={feature.title} className="my-2">
            {feature.title}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="w-full items-center justify-center">
        {features.map((feature, index) => (
          <TabsContent key={index} value={feature.title} className="h-full pt-9 md:min-h-96">
            <div className="flex h-full flex-row items-center justify-center">
              <div className="min-w-1/2 flex w-full flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-semibold text-neutral-800">{feature.title}</h3>
                  <p className="text-base text-neutral-500">{feature.description}</p>
                </div>
                <Link href={feature.link}>{feature.button}</Link>
              </div>
              <div className="relative h-full w-full items-center justify-center">
                {feature.image && (
                  <Image
                    src={feature.image}
                    alt={`Feature ${index + 1}`}
                    fill
                    className="px-2 py-2"
                    style={{ objectFit: 'contain' }}
                    quality={100}
                    unoptimized={true}
                  />
                )}
                {feature.video && (
                  <video className="h-fit rounded-lg object-cover" autoPlay muted playsInline>
                    <source src={feature.video} type="video/mp4" />
                  </video>
                )}
              </div>
            </div>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  )
})

const MobileTabSession = memo(() => {
  const { t } = useTranslation('home')

  const features: FeatureCardProps[] = [
    {
      title: t('features.instagram_trend_analysis.title'),
      description: t('features.instagram_trend_analysis.description'),
      button: (
        <PrimaryButton sizes={['m', 'm', 'm']}>
          <div className="md:w-96">{t('features.instagram_trend_analysis.button')}</div>
        </PrimaryButton>
      ),
      image: '/hashtag/analysis.png',
      link: ROUTE.STATIC_DASHBOARD,
    },
    {
      title: t('features.instabot.title'),
      description: t('features.instabot.description'),
      button: (
        <PrimaryButton sizes={['m', 'm', 'm']}>
          <div className="md:w-96">{t('features.instabot.button')}</div>
        </PrimaryButton>
      ),
      video: '/features/instabot-video.mp4',
      link: ROUTE.STATIC_ACCOUNTS,
    },
    {
      title: t('features.hashtags_recommendation.title'),
      description: t('features.hashtags_recommendation.description'),
      button: (
        <PrimaryButton sizes={['m', 'm', 'm']}>
          <div className="md:w-96">{t('features.hashtags_recommendation.button')}</div>
        </PrimaryButton>
      ),
      image: '/hashtag/hashtags-recommendation.png',
      link: ROUTE.STATIC_RECOMMENDATION,
    },
    {
      title: t('features.hashtags_to_image.title'),
      description: t('features.hashtags_to_image.description'),
      button: (
        <PrimaryButton sizes={['m', 'm', 'm']}>
          <div className="md:w-96">{t('features.hashtags_to_image.button')}</div>
        </PrimaryButton>
      ),
      image: '/hashtag/hashtags-to-image.png',
      link: ROUTE.STATIC_HASHTAG_TO_IMAGE,
    },
    {
      title: t('features.image_to_hashtags.title'),
      description: t('features.image_to_hashtags.description'),
      button: (
        <PrimaryButton sizes={['m', 'm', 'm']}>
          <div className="md:w-96">{t('features.image_to_hashtags.button')}</div>
        </PrimaryButton>
      ),
      image: '/hashtag/image-to-hashtag.png',
      link: ROUTE.STATIC_IMAGE_TO_HASHTAG,
    },
  ]

  return (
    <div className="flex flex-col gap-6 ">
      {features.map((feature) => (
        <div key={feature.title} className="flex w-full flex-col gap-6 rounded-lg border bg-white p-6">
          <div className="relative flex min-h-40 w-full">
            {feature.image && (
              <Image
                src={feature.image}
                alt={feature.title}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }} // optional
                quality={100}
              ></Image>
            )}
            {feature.video && (
              <video className="h-fit w-full" autoPlay muted playsInline>
                <source src={feature.video} type="video/mp4" />
              </video>
            )}
          </div>
          <div className="gap-2">
            <div className="text-heading text-neutral-800">{feature.title}</div>
            <div className="text-base text-neutral-500">{feature.description}</div>
          </div>
          <Link className="flex w-full justify-center" href={feature.link}>
            {feature.button}
          </Link>
        </div>
      ))}
    </div>
  )
})

const FeatureSession = memo(() => {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="hidden w-full justify-center md:flex">
        <TabSession />
      </div>
      <div className="md:hidden">
        <MobileTabSession />
      </div>
    </div>
  )
})

const UsageSession = memo(() => {
  const { t } = useTranslation('home')

  const cards = [
    {
      icon: <LightBulbIcon size={32} />,
      heading: t('usage.cards.idea_in_hashtag.heading'),
      content: t('usage.cards.idea_in_hashtag.content'),
    },
    {
      icon: <EyeIcon size={32} />,
      heading: t('usage.cards.boosting_organic_reach.heading'),
      content: t('usage.cards.boosting_organic_reach.content'),
    },
    {
      icon: <ThumbUpIcon />,
      heading: t('usage.cards.gaining_impressions.heading'),
      content: t('usage.cards.gaining_impressions.content'),
    },
  ]
  return (
    <div className="flex w-full justify-center">
      <div className="session max-w-screen-xl py-6 md:px-12 md:py-16">
        <div>
          <h2 className="text-heading">{t('usage.heading')}</h2>
          <h3 className="pt-2 text-subheading text-neutral-500">{t('usage.subheading')}</h3>
        </div>
        <div className="flex flex-col gap-6 pt-4 md:flex-row md:pt-12">
          {cards.map((card) => {
            return (
              <Card key={card.heading}>
                <CardHeader className="flex flex-row gap-6 md:flex-col">
                  <div className="my-2">{card.icon}</div>
                  <div className="flex flex-col items-start justify-start gap-2">
                    <CardTitle className="text-heading font-semibold text-neutral-800">{card.heading}</CardTitle>
                    <CardDescription className="text-neutral-500">{card.content}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
})

const Service = memo(() => {
  const { onLogin } = useAuth()
  const { t } = useTranslation('home')

  const services = [
    {
      icon: <PenIcon width={40} height={40} />,
      title: <b className="font-normal text-[#9374FA]">{t('service.roles.content_managers')}</b>,
    },

    {
      icon: <FinnTheHumanIcon width={40} height={40} />,
      title: <b className="font-normal text-[#ED6C67]">{t('service.roles.individual_creators')}</b>,
    },
    {
      icon: <TrendUpIcon width={40} height={40} />,
      title: <b className="font-normal text-[#00B2FB]">{t('service.roles.digital_marketers')}</b>,
    },
    {
      icon: <CoffeeIcon width={40} height={40} />,
      title: <b className="font-normal text-[#FE7CB5]">{t('service.roles.freelancers')}</b>,
    },
  ]
  return (
    <div className="flex w-full justify-center">
      <div className="session w-full max-w-screen-xl py-6 md:px-12 md:py-16">
        <div>
          <h2 className="text-heading">{t('service.heading')}</h2>
          <h3 className="pt-2 text-subheading text-neutral-500">{t('service.subheading')}</h3>
        </div>
        <div className="flex flex-col justify-between gap-12 pt-12 md:flex-row">
          {services.map((service, index) => {
            return (
              <div
                key={`service-${index}`}
                className="flex flex-1 flex-col items-center justify-center gap-6 rounded-lg border border-neutral-300 p-6"
              >
                <div className="">{service.icon}</div>
                <div>{service.title}</div>
              </div>
            )
          })}
        </div>
        <div className="flex w-full items-center justify-center pt-12">
          <PrimaryButton sizes={['l', 'l', 'l']} className="!w-80 drop-shadow-md" onClick={onLogin}>
            {t('service.cta')}
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
})

const Index: NextPage = () => {
  return (
    <div className="">
      <div className="w-full">
        <LandingHeader className="w-full" />
      </div>
      <div className="w-full">
        <FeatureSession />
        <UsageSession />
        <Service />
      </div>
      <div className="md:px-12 md:py-16">
        <Testimonial />
      </div>
    </div>
  )
}

export default Index
