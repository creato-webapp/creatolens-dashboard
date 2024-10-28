import React, { useCallback, useState } from 'react'

import IMAGE from '@constants/image'
import ROUTE from '@constants/route'
import Link from 'next/link'
import { useRouter } from 'next/router'

import CrossIcon from '@components/Icon/CrossIcon'
import LoginIcon from '@components/Icon/LoginIcon'
import LogoutIcon from '@components/Icon/LogOutIcon'
import MenuIcon from '@components/Icon/MenuIcon'
import { Title } from '@components/Typography'
import useAuth from '@hooks/useAuth'

import { Button } from '..'
// import DarkModeIcon from '@components/Icon/DarkModeIcon'
import Avatar from '@components/Avatar'

const LOGO_SRC = IMAGE.LOGO_CREATO_ORANGE

const LINKS = [
  { name: 'Accounts', path: ROUTE.ACCOUNTS },
  { name: 'Recommendation', path: ROUTE.RECOMMENDATION },
  { name: 'Trend Analysis', path: ROUTE.DASHBOARD },
  { name: 'Image to Hashtags', path: ROUTE.IMAGE_TO_HASHTAG },
] as const

const NavBar: React.FC = () => {
  const router = useRouter()
  const { session, onLogin, onLogout } = useAuth()
  const [isMenuCollapse, setIsMenuCollapse] = useState(true)
  const pages = session ? LINKS : []

  const toggleMenu = useCallback(() => {
    setIsMenuCollapse((prev) => !prev)
  }, [])

  const collapseMenu = useCallback(() => {
    setIsMenuCollapse(true)
  }, [])

  return (
    <nav className="relative flex h-auto items-center justify-between border-b border-neutral-300 px-6 py-7 md:mx-10 md:px-6 md:px-8">
      <div className="flex flex-row gap-4">
        <div className="flex min-w-8 md:hidden">
          <div className={'my-auto flex w-full md:hidden'} onClick={toggleMenu}>
            <Button.Text className="text-text-primary">
              <MenuIcon></MenuIcon>
            </Button.Text>
          </div>
        </div>
        <Link href="/">
          <div className="flex h-full items-center">
            <img src={LOGO_SRC} alt="Logo" className="h-10" />
          </div>
        </Link>
      </div>

      <div className="flex flex-row-reverse items-center md:flex-row">
        {/* <div className="flex h-10 w-10 items-center">
          <DarkModeIcon height={'20'} width={'20'} />
        </div> */}

        {session ? (
          <Avatar size={'large'} src={session?.user?.image ? session?.user?.image : IMAGE.BOT_CREATO} fallbackSrc={IMAGE.BOT_CREATO} />
        ) : (
          <Button.Text onClick={onLogin} className="flex w-full flex-row items-center justify-center gap-4">
            <LoginIcon />
          </Button.Text>
        )}
      </div>
      <aside
        id="default-sidebar"
        className={`fixed top-0 z-50 h-screen w-screen -translate-x-8 transition-transform ${isMenuCollapse ? 'hidden' : 'block'}`}
        aria-label="Sidebar"
      >
        <div className="flex h-[100vh] flex-col overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <Button.Text className="m-8 ml-auto text-text-primary" onClick={collapseMenu}>
            <CrossIcon></CrossIcon>
          </Button.Text>

          <ul className="mx-auto my-auto list-none flex-row space-y-16">
            {pages.map((page, index) => (
              <li key={`${page.name}-${index}`} className="text-center">
                <Link href={page.path}>
                  <Title bold level={3} className={`${router.pathname === page.path ? ' text-accent1-500' : ''}`}>
                    {page.name}
                  </Title>
                </Link>
              </li>
            ))}
            <div className="flex w-full text-lg font-bold text-text-primary md:hidden">
              {session ? (
                <Button.Text onClick={onLogout} className="flex w-full flex-row items-center justify-center gap-4 ">
                  Logout <LogoutIcon />
                </Button.Text>
              ) : (
                <Button.Text onClick={onLogin} className="flex w-full flex-row items-center justify-center gap-4">
                  Login <LoginIcon />
                </Button.Text>
              )}
            </div>
          </ul>
        </div>
      </aside>
    </nav>
  )
}

export default NavBar
