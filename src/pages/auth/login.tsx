import { FC } from 'react'

import { deleteCookie } from 'cookies-next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getProviders, signIn, signOut, useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

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

export async function getServerSideProps({ locale }: { locale: string }) {
  const providers = await getProviders()
  return {
    props: {
      providers,
      ...(await serverSideTranslations(locale, ['auth', 'common'])),
    },
  }
}

const Login: FC<loginProps> = ({ providers }) => {
  const { data: session } = useSession()
  const router = useRouter()
  const errorCode = router.query.error as ErrorCodes
  const { t } = useTranslation('auth')

  const ERROR_MESSAGE: Record<ErrorCodes, string> = {
    [ErrorCodes.OAuthSignin]: t('errors.oauth_signin'),
    [ErrorCodes.OAuthCallback]: t('errors.oauth_callback'),
    [ErrorCodes.OAuthCreateAccount]: t('errors.oauth_create_account'),
    [ErrorCodes.EmailCreateAccount]: t('errors.email_create_account'),
    [ErrorCodes.Callback]: t('errors.callback'),
    [ErrorCodes.OAuthAccountNotLinked]: t('errors.oauth_account_not_linked'),
    [ErrorCodes.EmailSignin]: t('errors.email_signin'),
    [ErrorCodes.CredentialsSignin]: t('errors.credentials_signin'),
    [ErrorCodes.SessionRequired]: t('errors.session_required'),
    [ErrorCodes.Default]: t('errors.default'),
  }

  const whiteListPrompt = (
    <div className="my-4 text-center">
      {t('login.whitelist.not_in_whitelist')}&nbsp;
      <a href="https://www.creatogether.app/creatolens/survey" target="_blank" rel="noopener noreferrer">
        <span className="text-blue-600 underline">{t('login.whitelist.click_here')}</span>
      </a>
      &nbsp;{t('login.whitelist.to_apply')}
    </div>
  )

  const OAuthErrorMessage = ERROR_MESSAGE[errorCode]

  return (
    <Card title={t('login.page_title')}>
      <div className="flex justify-center">
        {session ? (
          <div>
            <div>
              <p>{t('login.welcome', { email: session.user?.email })}</p>
              <Link href="/accounts" legacyBehavior>
                <button style={{ color: '#0070f3' }}>{t('login.go_to_account')}</button>
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
                {t('login.logout')}
              </button>
            </div>
          </div>
        ) : (
          <div>
            {errorCode === ErrorCodes.OAuthCreateAccount ? (
              whiteListPrompt
            ) : (
              <div className="error-message">
                <p>{t('login.not_signed_in')}</p>
                {OAuthErrorMessage}
              </div>
            )}
            {providers &&
              Object.values(providers).map((provider) => (
                <div key={provider.name} className="flex justify-center">
                  {provider.name === 'Google' && (
                    <PrimaryButton id={'login'} loading={false} onClick={() => signIn(provider.id)}>
                      {t('login.sign_in')}
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
