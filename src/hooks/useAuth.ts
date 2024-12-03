import { useCallback } from 'react'

import { deleteCookie } from 'cookies-next'
import { signIn, signOut, useSession } from 'next-auth/react'

const CALLBACK_URL = '/'

export const useAuth = () => {
  const { data: session } = useSession()

  const onLogin = useCallback(() => {
    signIn('google', { callbackUrl: CALLBACK_URL })
  }, [])

  const onLogout = useCallback(() => {
    deleteCookie('idToken')
    signOut({ callbackUrl: CALLBACK_URL })
  }, [])

  return {
    session,
    onLogin,
    onLogout,
  }
}
