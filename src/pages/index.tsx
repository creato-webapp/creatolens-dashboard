import type { NextPage } from 'next'
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { getSession } from 'next-auth/react'

import HowItWorks from './_templates/HowItWorks'
import LandingHeader from './_templates/LandingHeader'
import Testimonial from './_templates/Testimonial'
import WhyCreatoLens from './_templates/WhyCreatoLens'

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

const Index: NextPage = () => {
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

export default Index
