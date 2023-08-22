import type { FC } from 'react'
import { useRouter } from 'next/router'
import { useSession, signIn, signOut, getProviders } from 'next-auth/react'
import Card from '@components/Card'
import Link from 'next/link'
import { deleteCookie } from 'cookies-next'
import { setCookie } from 'cookies-next'
import { Button } from '@components/Button'
interface loginProps {
  providers: Providers
}
type Providers = {
  [provider: string]: {
    id: string
    name: string
    type: string
    signinUrl: string
  }
}

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}
const login: FC<loginProps> = ({ providers }) => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const errorCode = router.query.error

  let errorMessage = 'An error occurred during sign-in.'

  switch (errorCode) {
    case 'OAuthSignin':
      errorMessage = 'Error in constructing an authorization URL.'
      break
    case 'OAuthCallback':
      errorMessage = 'Error in handling the response from the OAuth provider.'
      break
    case 'OAuthCreateAccount':
      errorMessage = 'User not in white list. Please Contact'
      break
    case 'EmailCreateAccount':
      errorMessage = 'Could not create email provider user in the database.'
      break
    case 'Callback':
      errorMessage = 'Error in the OAuth callback handler route.'
      break
    case 'OAuthAccountNotLinked':
      errorMessage = 'The email on the account is already linked, but not with this OAuth account.'
      break
    case 'EmailSignin':
      errorMessage = 'Sending the email with the verification token failed.'
      break
    case 'CredentialsSignin':
      errorMessage = 'An error occurred during sign-in.'
      break
    case 'SessionRequired':
      errorMessage = 'This page requires you to be signed in at all times.'
      break
    default:
      errorMessage = 'An error occurred during sign-in.'
  }

  return (
    <Card title="Login Page">
      <div className="flex justify-center">
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
            {errorCode && <div className="error-message">{errorMessage}</div>}
            {Object.values(providers).map((provider) => (
              <div key={provider.name} className="flex justify-center">
                {provider.name === 'Google' && (
                  <Button.Text loading={false} onClick={() => signIn(provider.id)} className="">
                    Sign in
                  </Button.Text>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
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
