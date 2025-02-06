import React, { useCallback, useState } from 'react'

import IMAGE from '@constants/image'
import ROUTE from '@constants/route'
import Link from 'next/link'
import { useRouter } from 'next/router'

import CrossIcon from '@components/Icon/CrossIcon'
import MenuIcon from '@components/Icon/MenuIcon'
import useAuth from '@hooks/useAuth'

import { Button } from '..'
import Avatar from '@components/Avatar'
import PrimaryButton from '@components/Button/Primary'
import SideMenu from '@components/SideMenu'
import { useDropdown } from '@hooks/useDropdown'

const LOGO_SRC = IMAGE.LOGO_2TAG

import { FEATURE_LINKS, FEATURE_LINKS_STATIC, SUPPORT_LINKS } from '@constants/menu'

type NavLink = {
  readonly name: string
  readonly path: string
  readonly disabled: boolean
}

type DropdownMenuProps = {
  items: readonly NavLink[] // Changed to readonly array
  isOpen: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  label?: string | React.ReactNode
  className?: string
  dropdownWidth?: string
  children?: React.ReactNode
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  items,
  isOpen,
  onMouseEnter,
  onMouseLeave,
  label,
  className = '',
  dropdownWidth = 'w-64',
  children,
}) => {
  const router = useRouter()

  return (
    <div
      className={`relative cursor-pointer rounded-lg p-2 hover:bg-neutral-200 hover:text-primary-500 ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div>{label}</div>
      {isOpen && (
        <div className={`absolute -left-14 top-full z-50 flex ${dropdownWidth} flex-col rounded-md border bg-white p-2 shadow-lg`}>
          {items.map((link, index) => (
            <Link href={link.path} key={`${link.name}-${index}`} className={`${link.disabled ? 'pointer-events-none' : ''}`}>
              <div
                className={`block px-4 py-2 text-sm transition-colors hover:bg-gray-100 ${
                  router.pathname === link.path ? 'font-bold text-primary-500' : 'text-neutral-800'
                } ${link.disabled ? 'text-text-disabled' : ''}`}
              >
                {link.name}
              </div>
            </Link>
          ))}
          <div>{children}</div>
        </div>
      )}
    </div>
  )
}

const NavBar: React.FC = () => {
  const { session, onLogin, onLogout } = useAuth()
  const [isMenuCollapse, setIsMenuCollapse] = useState(true)

  const { isCollapsed: isFeatureMenuCollapsed, open: openFeatureMenu, close: closeFeatureMenu } = useDropdown()
  const { isCollapsed: isSupportMenuCollapsed, open: openSupportMenu, close: closeSupportMenu } = useDropdown()
  const { isCollapsed: isUserMenuCollapsed, open: openUserMenu, close: closeUsermenu } = useDropdown()

  const toggleMenu = useCallback(() => {
    setIsMenuCollapse((prev) => !prev)
  }, [])

  const collapseMenu = useCallback(() => {
    setIsMenuCollapse(true)
  }, [])

  return (
    <nav className="relative my-2 flex h-auto items-center justify-between border-b border-neutral-300 px-6 py-7 md:mx-10 md:px-6">
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
        <div className="relative mr-4 hidden flex-row items-center gap-4 md:flex">
          <DropdownMenu
            items={session ? FEATURE_LINKS : FEATURE_LINKS_STATIC}
            isOpen={!isFeatureMenuCollapsed}
            onMouseEnter={openFeatureMenu}
            onMouseLeave={closeFeatureMenu}
            label="Feature"
          />
          <DropdownMenu
            items={SUPPORT_LINKS}
            isOpen={!isSupportMenuCollapsed}
            onMouseEnter={openSupportMenu}
            onMouseLeave={closeSupportMenu}
            label="Support"
            dropdownWidth="w-48"
          />
          <Link href={ROUTE.BLOG} className="rounded-md px-4 py-2 text-text-primary hover:bg-neutral-200 hover:text-primary-500">
            Blog
          </Link>
        </div>
        {session ? (
          <DropdownMenu
            label={<Avatar size={'large'} src={session?.user?.image ? session?.user?.image : IMAGE.BOT_CREATO} fallbackSrc={IMAGE.BOT_CREATO} />}
            isOpen={!isUserMenuCollapsed}
            onMouseEnter={openUserMenu}
            onMouseLeave={closeUsermenu}
            dropdownWidth="w-38"
            items={[]}
          >
            <div onClick={onLogout} className="block px-4 py-2 text-sm text-neutral-800 transition-colors hover:bg-gray-100">
              {'Logout'}
            </div>
          </DropdownMenu>
        ) : (
          <PrimaryButton onClick={onLogin} sizes={['s', 's', 's']} className="flex w-full flex-row items-center justify-center gap-4">
            Log in/ Register
          </PrimaryButton>
        )}
      </div>
      <aside
        id="default-sidebar"
        className={`fixed top-0 z-50 h-screen w-screen -translate-x-7 transition-transform ${isMenuCollapse ? 'hidden' : 'block'}`}
        aria-label="Sidebar"
      >
        <div className="flex h-[100vh] flex-col overflow-y-auto bg-white">
          <Button.Text className="m-8 ml-auto text-text-primary" onClick={collapseMenu}>
            <CrossIcon></CrossIcon>
          </Button.Text>
          <SideMenu collapseMenu={collapseMenu} />
        </div>
      </aside>
    </nav>
  )
}

export default NavBar
