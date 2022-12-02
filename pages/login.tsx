import type { FC } from 'react'
import { useSession, signIn, signOut, getSession } from 'next-auth/react'
import Card from '@components/Card'
import Link from 'next/link'
import { deleteCookie } from 'cookies-next'
import { setCookie } from 'cookies-next'

interface loginProps {}

export const getServerSideProps = async (context: any) => {
  return { props: {} }
}

const login: FC<loginProps> = ({}) => {
  const { data: session, status } = useSession()

  return (
    <Card title="Login Page">
      {session ? (
        <div>
          <div>
            <p>Welcome, {session.user?.email}</p>
            <Link href="/accounts" legacyBehavior>
              <button style={{ color: '#0070f3' }}>Go To Account Page</button>
            </Link>
          </div>
          <div>
            <button
              onClick={() => {
                deleteCookie('idToken')
                signOut()
              }}
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p>You are not signed in.</p>
          <button
            onClick={() => signIn('google', { callbackUrl: '/accounts' })}
          >
            Sign In
          </button>
        </div>
      )}
    </Card>
  )
  // if (session) {
  //   return (
  //     <div>
  //       <p>Welcome, {session.user?.email}</p>
  //       <button onClick={() => signOut()}>Logout</button>
  //     </div>
  //   )
  // } else {
  //   return (
  //     <div>
  //       <p>You are not signed in.</p>
  //       <button onClick={() => signIn()}>Login </button>
  //     </div>
  //   )
  // }
}
export default login
