import React, { useState, HTMLAttributes, useCallback } from 'react'
import { Popover } from '@headlessui/react'
import { useSession, signIn, signOut, getSession } from 'next-auth/react'
import { deleteCookie } from 'cookies-next'
import NavBar from './Navbar'
import { useRouter } from 'next/router'

interface NavbarProps extends HTMLAttributes<HTMLDivElement> {}

export interface navBarItem {
  title: string
  href: string
}

export default function Navbar(props: NavbarProps) {
  const navBarItemList: Array<navBarItem> = [
    { title: 'Home', href: '/' },
    { title: 'Accounts', href: '/accounts' },
    { title: 'Blocked Accounts', href: '/accounts-blocked' },
    { title: 'Retry Accounts', href: '/accounts-retry' },
    { title: 'Login Error History', href: '/accounts-error' },
    { title: 'Account Session History', href: '/accounts-session' },
    { title: 'Hashtag', href: '/hashtag' },
    { title: 'recommendation', href: '/recommendation' },
  ]

  const navBarPage = [
    { name: 'Home', path: '/' },
    { name: 'Accounts', path: '/accounts' },
    { name: 'Recommendation', path: '/recommendation' },
  ]

  const { data: session, status } = useSession()
  const onLogin = useCallback(() => {
    signIn()
  }, [])

  const onLogout = useCallback(() => {
    deleteCookie('idToken')
    signOut()
  }, [])

  return (
    <>
      <Popover className="relative bg-white">
        <div className="max-w-screen-2xl mx-auto">
          <NavBar logo="/small-logo.svg" pages={navBarPage} isLoggedIn={!!session} onLogin={onLogin} onLogout={onLogout}></NavBar>
        </div>
      </Popover>
      {props.children}
    </>
  )
}
