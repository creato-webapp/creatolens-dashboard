import React, { HTMLAttributes, useCallback } from 'react'
import { Popover } from '@headlessui/react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { deleteCookie } from 'cookies-next'
import NavBar from './Navbar'

interface NavbarProps extends HTMLAttributes<HTMLDivElement> {}

export interface navBarItem {
  title: string
  href: string
}

export default function Navbar(props: NavbarProps) {
  const { data: session } = useSession()

  const navBarPage = !!session
    ? [
        { name: 'User Guide', path: '/guide' },
        { name: 'Accounts', path: '/accounts' },
        { name: 'Recommendation', path: '/recommendation' },
      ]
    : []

  const onLogin = useCallback(() => {
    signIn('google', { callbackUrl: '/' })
  }, [])

  const onLogout = useCallback(() => {
    deleteCookie('idToken')
    signOut({ callbackUrl: '/' })
  }, [])

  return (
    <>
      <Popover className="relative bg-white">
        <div className="max-w-screen-2xl mx-auto">
          <NavBar logo="/logo_orange.png" pages={navBarPage} isLoggedIn={!!session} onLogin={onLogin} onLogout={onLogout} />
        </div>
      </Popover>
      {props.children}
    </>
  )
}
