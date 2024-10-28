import type { NextPage } from 'next'
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { getSession } from 'next-auth/react'

import LandingHeader from './_templates/LandingHeader'
import Testimonial from './_templates/Testimonial'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/Tabs'
import PrimaryButton from '@components/Button/Primary'

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
    button: <PrimaryButton>See More</PrimaryButton>,
    image: './landing.png',
  },
]
const TabSession = () => {
  return (
    <Tabs defaultValue="hashtags" className="">
      <TabsList className="flex w-fit justify-center">
        <TabsTrigger value="dashboard">Instagram Trend Analysis Report</TabsTrigger>
        <TabsTrigger value="instabot">Instabot</TabsTrigger>
        <TabsTrigger value="hashtag-recommendation">Hashtags Recommendation</TabsTrigger>
        <TabsTrigger value="hashtags-to-image">Hashtags-to-Image</TabsTrigger>
        <TabsTrigger value="image-to-hashtags">Image-to-Hashtags</TabsTrigger>
      </TabsList>
      <div className="flex w-full justify-start">
        <TabsContent value="dashboard">1</TabsContent>
        <TabsContent value="instabot">2</TabsContent>
        <TabsContent value="hashtag-recommendation">3</TabsContent>
        <TabsContent value="hashtags-to-image">4</TabsContent>
        <TabsContent value="image-to-hashtags">5</TabsContent>
      </div>
    </Tabs>
  )
}

const FeatureSession = () => {
  return (
    <div>
      {features.map((feature) => {
        return (
          <div key={feature.title}>
            <div className="text-heading">{feature.title}</div>
            <div>{feature.description}</div>
          </div>
        )
      })}
    </div>
  )
}
const Index: NextPage = () => {
  return (
    <div className="">
      <div className="flex w-full flex-col items-center">
        <LandingHeader className="mb-5" />
        <div className="hidden w-full md:flex  md:max-w-screen-xl">
          <TabSession />
        </div>
        <FeatureSession />
      </div>
      <Testimonial />
    </div>
  )
}

export default Index
