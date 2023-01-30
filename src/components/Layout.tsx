import React from 'react'
import { Popover } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { useSession, signIn, signOut, getSession } from 'next-auth/react'
import { deleteCookie } from 'cookies-next'
import Link from 'next/link'

interface NavbarProps {
  children: React.ReactNode
}

export default function Navbar(props: NavbarProps) {
  type navBarItem = {
    title: string
    href: string
  }

  const navBarItemList: Array<navBarItem> = [
    { title: 'Home', href: '/' },
    { title: 'Accounts', href: '/accounts' },
    { title: 'Blocked Accounts', href: '/accounts-blocked' },
    { title: 'Retry Accounts', href: '/accounts-retry' },
    { title: 'Login Error History', href: '/accounts-error' },
    { title: 'Account Session History', href: '/accounts-session' },
    { title: 'Hashtag', href: '/hashtag' },
    { title: 'Hashet', href: '/hashet' },
  ]

  const { data: session, status } = useSession()

  return (
    <>
      <Popover className="relative bg-white">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <Popover.Group as="nav" className="hidden space-x-8 md:flex">
              {navBarItemList.map((e, index) => (
                <Link href={e.href} key={index} replace>
                  <a className="text-base font-medium text-gray-500 hover:text-gray-900">
                    {e.title}
                  </a>
                </Link>
              ))}
            </Popover.Group>
            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
              {session ? (
                <div className="grid grid-rows-2  justify-items-end">
                  <div className="hidden space-x-10 px-1 text-gray-500 md:flex">
                    {`Logged In as ${session.user?.name}`}
                  </div>

                  <button
                    className="whitespace-nowrap text-base font-medium text-blue-500 hover:text-blue-700"
                    onClick={() => {
                      deleteCookie('idToken')
                      signOut()
                    }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                  onClick={() => signIn()}
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </Popover>
      {props.children}
    </>
  )
}
