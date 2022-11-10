import type { FC } from 'react'
import { useSession, signIn, signOut, getSession } from 'next-auth/react'
interface loginProps {}

const login: FC<loginProps> = ({}) => {
  const { data: session, status } = useSession()

  if (session) {
    return (
      <div>
        <p>Welcome, {session.user?.email}</p>
        <button onClick={() => signOut()}>Logout</button>
      </div>
    )
  } else {
    return (
      <div>
        <p>You are not signed in.</p>
        <button onClick={() => signIn()}>Login </button>
      </div>
    )
  }
}
export default login
