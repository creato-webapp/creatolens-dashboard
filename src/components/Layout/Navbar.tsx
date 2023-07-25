import React, { useState } from 'react'
import { Button } from '..'
import Title from '@components/Typography/Title'
import { useRouter } from 'next/router'
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
}

const NavBar: React.FC<NavBarProps> = ({ logo, pages, isLoggedIn, onLogin, onLogout }) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  console.log(router.pathname)
  return (
    <nav className="flex h-1/4 items-center justify-between bg-bg-dark">
      <div className="ml-6">
        <a href="/">
          <img src={logo} alt="Logo" className="h-24 w-auto" />
        </a>
      </div>

      <div className="flex space-x-10 justify-self-center">
        {pages.map((page) => (
          <div className="inline-flex flex-col items-center justify-start gap-8 pb-9">
            <div className={`${router.pathname === page.path ? 'h-1 self-stretch bg-orange-500' : 'h-1 self-stretch bg-red-500 opacity-0'}`} />
            <a key={page.name} href={page.path}>
              <Title bold level={2} className={` ${router.pathname === page.path ? ' text-orange-500' : ''}`}>
                {page.name}
              </Title>
            </a>
          </div>
        ))}
      </div>

      <div className="m-6">
        {isLoggedIn ? (
          <Button.Text loading={isLoading} onClick={onLogout} className="rounded">
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
    </nav>
  )
}

export default NavBar
