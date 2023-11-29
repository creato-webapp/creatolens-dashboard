import type { NextPage } from 'next'
import { useSession, signIn, signOut, getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import LandingHeader from '@lib/Home/LandingHeader'
import HowItWorks from '@lib/Home/HowItWorks'
import WhyCreatoLens from '@lib/Home/WhyCreatoLens'

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
      <div className="px-2 pb-6">
        <LandingHeader className="mb-5" />
        <HowItWorks />
      </div>
      <WhyCreatoLens />
    </>
  )
}

export default Home
