import type { NextPage } from 'next'
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { getSession } from 'next-auth/react'
import React, { memo } from 'react'

import LandingHeader from './_templates/LandingHeader'
import Testimonial from './_templates/Testimonial'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/Tabs'
import PrimaryButton from '@components/Button/Primary'
import Image from 'next/image'

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
  image: string
  button: React.ReactNode
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
    image: '/GuildHeroHeader.png',
  },
  {
    title: 'Hashtags Recommendation',
    description: 'Generate data-backed hashtag to add under your post. Enhancing your post content to be seen under the algorithm of Instagram',
    button: (
      <PrimaryButton sizes={['m', 'm', 'm']}>
        <div className="md:w-96">See More</div>
      </PrimaryButton>
    ),
    image: '/GuildHeroHeader.png',
  },
  {
    title: 'Hashtags-to-Image',
    description: 'Generate data-backed hashtag to add under your post. Enhancing your post content to be seen under the algorithm of Instagram',
    button: (
      <PrimaryButton sizes={['m', 'm', 'm']}>
        <div className="md:w-96">See More</div>
      </PrimaryButton>
    ),
    image: '/GuildHeroHeader.png',
  },
  {
    title: 'Image-to-Hashtags',
    description: 'Generate data-backed hashtag to add under your post. Enhancing your post content to be seen under the algorithm of Instagram',
    button: (
      <PrimaryButton sizes={['m', 'm', 'm']}>
        <div className="md:w-96">See More</div>
      </PrimaryButton>
    ),
    image: '/hashtag/image-to-hashtag.png',
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
                {feature.button}
              </div>
              <div className="relative h-full w-full items-center justify-center">
                <Image src={feature.image} alt={`Feature ${index + 1}`} fill className="px-2 py-2" objectFit="contain" />
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
    <div className="m-4 flex flex-col gap-6 ">
      {features.map((feature) => (
        <div key={feature.title} className="flex w-full flex-col gap-6 rounded-lg bg-white p-6">
          <div className="relative flex min-h-40 w-full">
            <Image
              src={feature.image}
              alt={feature.title}
              objectFit="contain"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }} // optional
            ></Image>
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
      <div className="bg-primary-100 md:hidden">
        <MobileTabSession />
      </div>
    </div>
  )
})

const Index: NextPage = () => {
  return (
    <div className="">
      <div className="flex w-full flex-col items-center">
        <LandingHeader className="mb-5" />
      </div>

      <FeatureSession />
      <div className="px-6 md:px-12 md:py-16">
        <Testimonial />
      </div>
    </div>
  )
}

export default Index
