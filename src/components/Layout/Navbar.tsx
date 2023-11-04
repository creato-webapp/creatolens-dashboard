import React, { useState } from 'react'
import { Button } from '..'
import { Title } from '@components/Typography'
import { useRouter } from 'next/router'
import MenuIcon from '@components/Icon/MenuIcon'
import LogoutIcon from '@components/Icon/LogOutIcon'
import CrossIcon from '@components/Icon/CrossIcon'

interface Page {
  name: string
  path: string
}

interface NavBarProps {
  logo: string
  pages: Page[]
  isLoggedIn: boolean
  onLogin: () => void
  onLogout: () => void
  isCollapse?: boolean
}

const NavBar: React.FC<NavBarProps> = ({ logo, pages, isLoggedIn, onLogin, onLogout, isCollapse = true }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isMenuCollapse, setIsMenuCollapse] = useState(isCollapse)
  const router = useRouter()

  const toggleMenu = () => {
    setIsMenuCollapse((prev) => !prev)
  }
  return (
    <nav className="relative z-50 flex h-auto justify-between bg-bg-dark">
      <div className="mx-8 my-auto md:hidden">
        <Button.Text className="text-text-primary" onClick={toggleMenu}>
          <MenuIcon></MenuIcon>
        </Button.Text>
      </div>
      <a href="/" className="mx-8 my-auto shrink-0 md:mx-20">
        <img src={logo} alt="Logo" className="h-16" />
      </a>
      <div className="hidden space-x-10 justify-self-center md:flex">
        {pages.map((page, index) => (
          <div key={`${page.name}-${index}`} className="inline-flex flex-col items-center justify-start gap-8 pb-9">
            <div className={`${router.pathname === page.path ? 'h-1 self-stretch bg-orange-500' : 'h-1 self-stretch bg-red-500 opacity-0'}`} />
            <a href={page.path}>
              <Title bold level={3} className={`${router.pathname === page.path ? ' text-orange-500' : ''}`}>
                {page.name}
              </Title>
            </a>
          </div>
        ))}
      </div>
      <div className="m-8 md:hidden">
        <LogoutIcon></LogoutIcon>
      </div>
      <div className="m-6 my-auto hidden md:flex">
        {isLoggedIn ? (
          <Button.Text loading={isLoading} onClick={onLogout} className="flex rounded">
            <LogoutIcon className="mr-1"></LogoutIcon>
            <Title level={3} bold>
              Logout
            </Title>
          </Button.Text>
        ) : (
          <Button.Text loading={isLoading} onClick={onLogin} className="text-text-primary">
            <Title level={3} bold>
              Login
            </Title>
          </Button.Text>
        )}
      </div>
      <aside
        id="default-sidebar"
        className={`fixed z-40 h-screen w-screen -translate-x-full transition-transform sm:translate-x-0 ${isMenuCollapse ? 'hidden' : 'block'}`}
        aria-label="Sidebar"
      >
        <div className="flex h-full flex-col overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <Button.Text className="m-8 ml-auto text-text-primary" onClick={() => setIsMenuCollapse(true)}>
            <CrossIcon className=""></CrossIcon>
          </Button.Text>

          <ul className="mx-auto flex-row space-y-16">
            {pages.map((page, index) => (
              <li key={`${page.name}-${index}`} className="text-center">
                <div className={`${router.pathname === page.path ? 'h-1 self-stretch bg-orange-500' : 'h-1 self-stretch bg-red-500 opacity-0'}`} />
                <a href={page.path}>
                  <Title bold level={3} className={`${router.pathname === page.path ? ' text-orange-500' : ''}`}>
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
