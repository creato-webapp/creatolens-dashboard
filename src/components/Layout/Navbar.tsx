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

const LOGO_SRC = IMAGE.LOGO_CREATO_ORANGE

const LINKS = [
  { name: 'Instagram Trend Analysis', path: ROUTE.DASHBOARD },
  { name: 'Instabot', path: ROUTE.ACCOUNTS },
  { name: 'Recommendation', path: ROUTE.RECOMMENDATION },
  { name: 'Hashtags-to-Image', path: ROUTE.HASHTAG_TO_IMAGE },
  { name: 'Image to Hashtags', path: ROUTE.IMAGE_TO_HASHTAG },
] as const

const SUPPORT_LINKS = [
  { name: 'FAQ', path: ROUTE.FAQ },
  { name: 'Contact Us', path: ROUTE.CONTACT_US },
] as const

type NavLink = {
  readonly name: string
  readonly path: string
}

type DropdownMenuProps = {
  items: readonly NavLink[] // Changed to readonly array
  isOpen: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  label: string
  className?: string
  dropdownWidth?: string
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ items, isOpen, onMouseEnter, onMouseLeave, label, className = '', dropdownWidth = 'w-64' }) => {
  const router = useRouter()

  return (
    <div
      className={`relative cursor-pointer rounded-lg p-2 hover:bg-neutral-200 hover:text-primary-500 ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span>{label}</span>
      {isOpen && (
        <div className={`absolute -left-14 top-full z-50 flex ${dropdownWidth} flex-col rounded-md border bg-white p-2 shadow-lg`}>
          {items.map((link, index) => (
            <Link href={link.path} key={`${link.name}-${index}`}>
              <div
                className={`block px-4 py-2 text-sm transition-colors hover:bg-gray-100 ${
                  router.pathname === link.path ? 'font-bold text-primary-500' : 'text-neutral-800'
                }`}
              >
                {link.name}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

const NavBar: React.FC = () => {
  const { session, onLogin } = useAuth()
  const [isMenuCollapse, setIsMenuCollapse] = useState(true)

  const { isCollapsed: isFeatureMenuCollapsed, open: openFeatureMenu, close: closeFeatureMenu } = useDropdown()
  const { isCollapsed: isSupportMenuCollapsed, open: openSupportMenu, close: closeSupportMenu } = useDropdown()

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
        <div className="relative mr-4 hidden flex-row items-center gap-2 md:flex">
          <DropdownMenu
            items={LINKS}
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
        </div>
        {session ? (
          <Avatar size={'large'} src={session?.user?.image ? session?.user?.image : IMAGE.BOT_CREATO} fallbackSrc={IMAGE.BOT_CREATO} />
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

          <SideMenu />
        </div>
      </aside>
    </nav>
  )
}

export default NavBar
