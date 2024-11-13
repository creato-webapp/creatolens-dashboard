import type { NextPage } from 'next'
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { getSession } from 'next-auth/react'
import React, { memo } from 'react'

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
    props: {},
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

const features: FeatureCardProps[] = [
  {
    title: 'Instagram Trend Analysis Report',
    description: 'From up-to-date hashtags to topics, Trend Analysis can help you quickly realize the current market trend pattern.',
    button: (
      <PrimaryButton sizes={['m', 'm', 'm']}>
        <div className="md:w-96">See More</div>
      </PrimaryButton>
    ),
    image: '/hashtag/analysis.png',
    link: '/dashboard',
  },
  {
    title: 'Instabot',
    description:
      'Instabot acts as a real Instagram user, scraping explore page posts to collect data. It builds a shared library, allowing users to access both personal and collective information.',
    button: (
      <PrimaryButton sizes={['m', 'm', 'm']}>
        <div className="md:w-96">See More</div>
      </PrimaryButton>
    ),
    // image: '/features/instabot-video.mp4',
    video: '/features/instabot-video.mp4',
    link: '/accounts',
  },
  {
    title: 'Hashtags Recommendation',
    description: 'Generate data-backed hashtag to add under your post. Enhancing your post content to be seen under the algorithm of Instagram',
    button: (
      <PrimaryButton sizes={['m', 'm', 'm']}>
        <div className="md:w-96">See More</div>
      </PrimaryButton>
    ),
    image: '/hashtag/hashtags-recommendation.png',
    link: '/recommendation',
  },
  {
    title: 'Hashtags-to-Image',
    description: 'Try new way to prompt the image to make your content visible with AI creation',
    button: (
      <PrimaryButton sizes={['m', 'm', 'm']}>
        <div className="md:w-96">See More</div>
      </PrimaryButton>
    ),
    image: '/hashtag/hashtags-to-image.png',
    link: '/hashtag/hashtag-to-image',
  },
  {
    title: 'Image-to-Hashtags',
    description: 'Enhance your content with trending, targeted data-backed keywords for maximum impact.',
    button: (
      <PrimaryButton sizes={['m', 'm', 'm']}>
        <div className="md:w-96">See More</div>
      </PrimaryButton>
    ),
    image: '/hashtag/image-to-hashtag.png',
    link: '/hashtag/image-to-hashtag',
  },
]
const TabSession = memo(() => {
  return (
    <Tabs defaultValue="Instagram Trend Analysis Report" className="flex w-full max-w-screen-xl flex-col px-12">
      <TabsList className="flex h-full w-full overflow-x-auto md:flex-wrap lg:flex-nowrap">
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
                  <video className="h-fit rounded-lg object-cover" autoPlay>
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
              <video className="h-fit w-full" autoPlay controls>
                <source src={feature.video} type="video/mp4" />
              </video>
            )}
          </div>
          <div className="gap-2">
            <div className="text-heading text-neutral-800">{feature.title}</div>
            <div className="text-base text-neutral-500">{feature.description}</div>
          </div>
          <div className="flex w-full justify-center">{feature.button}</div>
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
  const cards = [
    {
      icon: <LightBulbIcon size={32} />,
      heading: 'Idea in Hashtag',
      content: 'We solve the challenge of using hashtags and promoting SEO effectively to enhance the online visibility of digital content.',
    },
    {
      icon: <EyeIcon size={32} />,
      heading: 'Boosting Organic Reach',
      content: 'We ensure your valuable content reaches a wide and targeted audience, fostering growth and maximizing potential engagement.',
    },
    {
      icon: <ThumbUpIcon />,
      heading: 'Gaining Impressions',
      content: 'We address the frustration of low impressions on digital content, enhancing visibility and extending the reach of your message.',
    },
  ]
  return (
    <div className="flex w-full justify-center">
      <div className="session max-w-screen-xl py-6 md:px-12 md:py-16">
        <div>
          <h2 className="text-heading">{'What can 2TAG provide?'}</h2>
          <h3 className="pt-2 text-subheading text-neutral-500">{'2TAG is the easiest way to grow content visibility on social media channels.'}</h3>
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
  const services = [
    {
      icon: <PenIcon width={40} height={40} />,
      title: <b className="font-normal text-[#9374FA]">Content Managers</b>,
    },

    {
      icon: <FinnTheHumanIcon width={40} height={40} />,
      title: <b className="font-normal text-[#ED6C67]">Individual Creators</b>,
    },
    {
      icon: <TrendUpIcon width={40} height={40} />,
      title: <b className="font-normal text-[#00B2FB]">Digital Marketers</b>,
    },
    {
      icon: <CoffeeIcon width={40} height={40} />,
      title: <b className="font-normal text-[#FE7CB5]">Freelancers</b>,
    },
  ]
  return (
    <div className="flex w-full justify-center">
      <div className="session w-full max-w-screen-xl py-6 md:px-12 md:py-16">
        <div>
          <h2 className="text-heading">{'Who uses 2TAG?'}</h2>
          <h3 className="pt-2 text-subheading text-neutral-500">
            {'Joining is quick and easy. Start in just seconds — 2TAG is now open to all Instagram enthusiasts.'}
          </h3>
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
          <PrimaryButton sizes={['l', 'l', 'l']} className="!w-80 drop-shadow-md">
            Start Exploring
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
