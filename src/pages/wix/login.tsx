import { useEffect } from 'react'

import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'

export default function WixSignin() {
  const router = useRouter()
  const { status } = useSession()

  useEffect(() => {
    if (status === 'unauthenticated') {
      void signIn('google')
    } else if (status === 'authenticated') {
      void router.push('/')
    }
  }, [status, router])

  return <div></div>
}
