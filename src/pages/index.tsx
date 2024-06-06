import type { NextPage } from 'next'
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { getSession } from 'next-auth/react'

import HowItWorks from '@lib/Home/HowItWorks'
import LandingHeader from '@lib/Home/LandingHeader'
import Testimonial from '@lib/Home/Testimonial'
import WhyCreatoLens from '@lib/Home/WhyCreatoLens'

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Record<string, never>>> => {
  const session = await getSession(context)
  if (session) {
    return {
      redirect: {
        destination: '/guide',
        permanent: false,
      },
    }
  }
  return { props: {} }
}

const Home: NextPage = () => {
  return (
    <>
      <div className="pb-6">
        <LandingHeader className="mb-5" />
        <HowItWorks />
      </div>
      <Testimonial />
      <WhyCreatoLens />
    </>
  )
}

export default Home
