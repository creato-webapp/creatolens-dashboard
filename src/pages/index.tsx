import type { NextPage } from 'next'
import { useSession, signIn, signOut, getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import LandingHeader from '@lib/Home/LandingHeader'
import HowItWorks from '@lib/Home/HowItWorks'
import WhyCreatoLens from '@lib/Home/WhyCreatoLens'
import Testimonial from '@lib/Home/Testimonial'
import Checkbox from '@components/Checkbox'

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context)
  if (session) {
    return {
      redirect: {
        destination: '/guide',
      },
    }
  }
  return { props: {} }
}

const Home: NextPage = () => {
  return (
    <>
      <div className="pb-6">
        <LandingHeader className="mb-5" /> <HowItWorks />
      </div>
      <Testimonial />
      <WhyCreatoLens />
    </>
  )
}

export default Home
