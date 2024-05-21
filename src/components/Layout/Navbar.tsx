import React, { useCallback, useState } from 'react'
import { Button } from '..'
import { Title } from '@components/Typography'
import { useRouter } from 'next/router'
import MenuIcon from '@components/Icon/MenuIcon'
import LogoutIcon from '@components/Icon/LogOutIcon'
import CrossIcon from '@components/Icon/CrossIcon'
import LoginIcon from '@components/Icon/LoginIcon'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
interface Page {
  name: string
  path: string
}

interface NavBarProps extends JSX.IntrinsicAttributes {
  logo: string
  pages: Page[]
  isLoggedIn: boolean
  onLogin: () => void
  onLogout: () => void
  isCollapse?: boolean
}

const NavBar: React.FC<NavBarProps> = ({ logo, pages, isLoggedIn, onLogin, onLogout, isCollapse = true }) => {
  const [isMenuCollapse, setIsMenuCollapse] = useState(isCollapse)
  const router = useRouter()
  const { data: session } = useSession()

  const toggleMenu = useCallback(() => {
    setIsMenuCollapse((prev) => !prev)
  }, [])

  const collapseMenu = useCallback(() => {
    setIsMenuCollapse(true)
  }, [])

  return (
    <nav className="relative flex h-auto justify-between bg-bg-dark px-4 md:px-6">
      <div className="flex min-w-8 md:hidden">
        {session && (
          <div className={'my-auto flex w-full md:hidden'} onClick={toggleMenu}>
            <Button.Text className="text-text-primary">
              <MenuIcon></MenuIcon>
            </Button.Text>
          </div>
        )}
      </div>
      <Link href="/">
        <div className="mx-8 my-auto shrink-0 md:mx-2 lg:mx-16">
          <img src={logo} alt="Logo" className="h-12 md:h-16" />
        </div>
      </Link>
      <div className="hidden space-x-10 justify-self-center md:flex md:min-h-[4rem] md:items-center">
        {pages.map((page, index) => (
          <div key={`${page.name}-${index}`} className={`flex h-full flex-col items-center justify-center`}>
            <a
              href={page.path}
              className={`${
                router.pathname === page.path ? 'border-t-4 pb-1' : 'py-1'
              } box-border flex h-full items-center  border-accent1-500 text-center`}
            >
              <h3 className={`${router.pathname === page.path ? ' text-accent1-500' : ''} font-extrabold`}>{page.name}</h3>
            </a>
          </div>
        ))}
      </div>
      <div className="flex w-8 md:hidden">
        {isLoggedIn ? (
          <Button.Text onClick={onLogout} className="text-text-primary">
            <LogoutIcon />
          </Button.Text>
        ) : (
          <Button.Text onClick={onLogin} className="text-text-primary">
            <LoginIcon />
          </Button.Text>
        )}
      </div>
      <div className="my-auto hidden md:flex">
        {isLoggedIn ? (
          <Button.Text onClick={onLogout} className="flex h-auto items-center rounded">
            <LogoutIcon className="mr-1" size={24} fillColor="fill-accent2-500"></LogoutIcon>
            <Title level={3} bold className="text-accent2-500">
              Logout
            </Title>
          </Button.Text>
        ) : (
          <Button.Text onClick={onLogin} className="flex h-auto items-center rounded">
            <LoginIcon className="mr-1" size={24} fillColor="fill-accent2-500"></LoginIcon>
            <Title level={3} bold className="text-accent2-500">
              Sign In
            </Title>
          </Button.Text>
        )}
      </div>
      <aside
        id="default-sidebar"
        className={`fixed z-50 h-screen w-screen -translate-x-4 transition-transform ${isMenuCollapse ? 'hidden' : 'block'}`}
        aria-label="Sidebar"
      >
        <div className="flex h-[100vh] flex-col overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <Button.Text className="m-8 ml-auto text-text-primary" onClick={collapseMenu}>
            <CrossIcon></CrossIcon>
          </Button.Text>

          <ul className="mx-auto my-auto list-none flex-row space-y-16">
            {pages.map((page, index) => (
              <li key={`${page.name}-${index}`} className="text-center">
                <a href={page.path}>
                  <Title bold level={3} className={`${router.pathname === page.path ? ' text-accent1-500' : ''}`}>
                    {page.name}
                  </Title>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </nav>
  )
}

export default NavBar
