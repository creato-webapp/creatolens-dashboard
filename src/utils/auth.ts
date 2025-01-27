import { getSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import { CombinedUser } from '@api/auth/[...nextauth]'

export const requireAuth: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}

export const getUserId = (user: CombinedUser | undefined): string => {
  return user?.id ?? ''
}
