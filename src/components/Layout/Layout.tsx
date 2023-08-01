import React, { useState, PropsWithChildren } from 'react'
import { Popover } from '@headlessui/react'
import { useSession, signIn, signOut, getSession } from 'next-auth/react'
import { deleteCookie } from 'cookies-next'
import NavBar from './Navbar'

interface NavbarProps extends PropsWithChildren {}

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
    { name: 'Login Error History', path: '/accounts-error' },
    { name: 'Account Session History', path: '/accounts-session' },
    { name: 'Recommendation', path: '/recommendation' },
  ]

  const { data: session, status } = useSession()
  const [isShowMenu, setIsShowMenu] = useState(false)
  const handleMenuButtonClick = () => {
    console.log(isShowMenu)
    setIsShowMenu((prevIsOn) => !prevIsOn) // Set the state to its opposite value
  }
  const closeModal = () => {
    setIsShowMenu(false)
  }

  return (
    <>
      <Popover className="relative bg-white">
        <div className="max-w-screen-2xl mx-auto">
          <NavBar
            logo="small-logo.svg"
            pages={navBarPage}
            isLoggedIn={!!session}
            onLogin={() => signIn()}
            onLogout={() => {
              deleteCookie('idToken')
              signOut()
            }}
          ></NavBar>
        </div>
      </Popover>
      {props.children}
    </>
  )
}

{
  /* <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <nav className="rounded border-gray-200 bg-white px-2 py-2.5 dark:bg-gray-900 sm:px-4">
              <div className="container mx-auto flex flex-wrap items-center justify-between">
                <button
                  data-collapse-toggle="navbar-default"
                  type="button"
                  aria-controls="navbar-default"
                  aria-expanded="false"
                  className="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
                  onClick={() => handleMenuButtonClick()}
                >
                  <span className="sr-only">Open main menu</span>
                  <svg className="h-6 w-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
                <Menu isShow={isShowMenu} items={navBarItemList} onClose={closeModal} />
              </div>
            </nav>

            <Popover.Group as="nav" className="hidden space-x-8 md:flex">
              {navBarItemList.map((e, index) => (
                <Link href={e.href} key={index} replace>
                  <a className="text-base font-medium text-gray-500 hover:text-gray-900">{e.title}</a>
                </Link>
              ))}
            </Popover.Group>
            <div className="hidden items-center justify-end sm:flex sm:flex-1 lg:w-0">
              {session ? (
                <div className="grid grid-rows-2  justify-items-end">
                  <div className="hidden space-x-10 px-1 text-gray-500 sm:flex">{`Logged In as ${session.user?.name}`}</div>

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
                <button className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900" onClick={() => signIn()}>
                  Login
                </button>
              )}
            </div>
          </div> */
}
