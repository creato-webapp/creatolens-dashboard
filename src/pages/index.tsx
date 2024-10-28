import type { NextPage } from 'next'
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { getSession } from 'next-auth/react'

import LandingHeader from './_templates/LandingHeader'
import Testimonial from './_templates/Testimonial'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/Tabs'

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

const TabSession = () => {
  return (
    <Tabs defaultValue="hashtags" className="flex w-full max-w-screen-xl flex-col items-center">
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

const Index: NextPage = () => {
  return (
    <div className="">
      <div className="flex w-full flex-col items-center">
        <LandingHeader className="mb-5" />
        {/* <HowItWorks /> */}
        <TabSession />
      </div>
      <Testimonial />
      {/* <WhyCreatoLens /> */}
    </div>
  )
}

export default Index
