import Link from 'next/link' // Import Next.js Link
import { CaretUpIcon } from '@components/Icon'
import { useState } from 'react'
import ROUTE from '@constants/route'
import SubtleButton from '@components/Button/Subtle'
import LogoutIcon from '@components/Icon/LogOutIcon'
import useAuth from '@hooks/useAuth'
import { useRouter } from 'next/router'

const menus = [
  {
    header: 'Features',
    items: [
      { name: 'Instagram Trend Analysis', path: ROUTE.DASHBOARD },
      { name: 'Manage Instabot Accounts', path: ROUTE.ACCOUNTS },
      { name: 'Hashtags-to-Image', path: ROUTE.HASHTAG_TO_IMAGE },
      { name: 'Image-to-Hashtags', path: ROUTE.IMAGE_TO_HASHTAG },
    ],
  },
  {
    header: 'User Settings',
    items: [
      { name: 'Profile Settings', path: ROUTE.ACCOUNTS },
      { name: 'Privacy Settings', path: ROUTE.ACCOUNTS },
    ],
  },
  {
    header: 'Support',
    items: [
      { name: 'Contact', path: ROUTE.CONTACT_US },
      { name: 'FAQ', path: ROUTE.FAQ },
    ],
  },
]

const SideMenu = () => {
  const [active, setActive] = useState<string>('')
  const { onLogout } = useAuth()
  const router = useRouter() // Use Next.js router to get the current path

  const toggleMenu = (header: string) => {
    setActive(active === header ? '' : header) // Toggle active state
  }

  return (
    <div className="flex h-full max-h-screen w-full flex-col justify-between rounded-lg border border-neutral-300 p-4 text-base">
      <div>
        {menus.map((menu) => (
          <div key={menu.header} className="dropdown">
            <button
              className={`dropdown-toggle flex w-full flex-row justify-between px-4 py-2 font-bold hover:text-primary-500 ${
                active === menu.header ? 'active text-primary-500' : ''
              }`}
              onClick={() => toggleMenu(menu.header)} // Handle click to toggle dropdown
            >
              {menu.header}
              <CaretUpIcon
                className={`pointer-events-none w-fit transform transition-transform duration-300 ${active === menu.header ? 'rotate-180' : ''}`}
                color={'black'}
              />
            </button>
            <div className="my-2 border-b border-neutral-300 px-4"></div>
            <div className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${active === menu.header ? 'max-h-96' : 'max-h-0'}`}>
              <div className="dropdown-content my-4 flex flex-col items-center border-b border-neutral-300 pb-2">
                {menu.items.map(
                  (item) =>
                    item.path && ( // Only use Link if `link` is provided
                      <Link key={item.name} href={item.path} className="flex w-full text-center">
                        <div
                          className={`dropdown-item w-full rounded-lg px-3 py-4 hover:bg-neutral-200 hover:text-primary-500 ${
                            router.pathname === item.path ? 'font-semibold text-primary-500' : ''
                          }`}
                        >
                          {item.name}
                        </div>
                      </Link>
                    )
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-end justify-center">
        <SubtleButton onClick={onLogout} className="flex h-auto items-center rounded">
          <LogoutIcon className="mr-1" size={18} fillColor="fill-neutral-800"></LogoutIcon>
          Logout
        </SubtleButton>
      </div>
    </div>
  )
}

export default SideMenu
