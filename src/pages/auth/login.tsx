import type { FC } from 'react'
import { useRouter } from 'next/router'
import { useSession, signIn, signOut, getProviders } from 'next-auth/react'
import Card from '@components/Card'
import Link from 'next/link'
import { deleteCookie } from 'cookies-next'
import { ErrorCodes } from 'src/enums/ErrorCodeEnums'
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
  const errorCode = router.query.error as ErrorCodes
  const errorMessages: Record<ErrorCodes, string> = {
    [ErrorCodes.OAuthSignin]: 'Error in constructing an authorization URL.',
    [ErrorCodes.OAuthCallback]: 'Error in handling the response from the OAuth provider.',
    [ErrorCodes.OAuthCreateAccount]: 'User not in white list. Please Contact',
    [ErrorCodes.EmailCreateAccount]: 'Could not create email provider user in the database.',
    [ErrorCodes.Callback]: 'Error in the OAuth callback handler route.',
    [ErrorCodes.OAuthAccountNotLinked]: 'The email on the account is already linked, but not with this OAuth account.',
    [ErrorCodes.EmailSignin]: 'Sending the email with the verification token failed.',
    [ErrorCodes.CredentialsSignin]: 'An error occurred during sign-in.',
    [ErrorCodes.SessionRequired]: 'This page requires you to be signed in at all times.',
    [ErrorCodes.Default]: 'An error occurred during sign-in.',
  }

  const OAuthErrorMessage = errorMessages[errorCode]

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
            {errorCode && <div className="error-message">{OAuthErrorMessage}</div>}
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
}
export default login
