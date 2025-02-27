import { FC } from 'react'

import { deleteCookie } from 'cookies-next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getProviders, signIn, signOut, useSession } from 'next-auth/react'

import PrimaryButton from '@components/Button/Primary'
import Card from '@components/Card'
import { ErrorCodes } from 'enums/ErrorCodeEnums'
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

const ERROR_MESSAGE: Record<ErrorCodes, string> = {
  [ErrorCodes.OAuthSignin]: 'Error in constructing an authorization URL.',
  [ErrorCodes.OAuthCallback]: 'Error in handling the response from the OAuth provider.',
  [ErrorCodes.OAuthCreateAccount]: 'User not in white list. Please Contact our team for support or questions',
  [ErrorCodes.EmailCreateAccount]: 'Could not create email provider user in the database.',
  [ErrorCodes.Callback]: 'Error in the OAuth callback handler route.',
  [ErrorCodes.OAuthAccountNotLinked]: 'The email on the account is already linked, but not with this OAuth account.',
  [ErrorCodes.EmailSignin]: 'Sending the email with the verification token failed.',
  [ErrorCodes.CredentialsSignin]: 'An error occurred during sign-in.',
  [ErrorCodes.SessionRequired]: 'This page requires you to be signed in at all times.',
  [ErrorCodes.Default]: 'An error occurred during sign-in.',
}

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}

const Login: FC<loginProps> = ({ providers }) => {
  const { data: session } = useSession()
  const router = useRouter()
  const errorCode = router.query.error as ErrorCodes

  const whiteListPrompt = (
    <div className="my-4 text-center">
      You are not in whitelist.&nbsp;
      <a href="https://www.creatogether.app/creatolens/survey" target="_blank" rel="noopener noreferrer">
        <span className="text-blue-600 underline">Click here</span>
      </a>
      &nbsp;to apply for whitelisting.
      <br />
      用戶不在白名單之內，
      <a href="https://www.creatogether.app/creatolens/survey" target="_blank" rel="noopener noreferrer">
        <span className="text-blue-600 underline">按此</span>
      </a>
      加入申請
    </div>
  )

  const OAuthErrorMessage = ERROR_MESSAGE[errorCode]

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
                id="logout-button"
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
            {errorCode === ErrorCodes.OAuthCreateAccount ? (
              whiteListPrompt
            ) : (
              <div className="error-message">
                <p>You are not signed in.</p>
                {OAuthErrorMessage}
              </div>
            )}
            {providers &&
              Object.values(providers).map((provider) => (
                <div key={provider.name} className="flex justify-center">
                  {provider.name === 'Google' && (
                    <PrimaryButton id={'login'} loading={false} onClick={() => signIn(provider.id)}>
                      Sign in
                    </PrimaryButton>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>
    </Card>
  )
}
export default Login
