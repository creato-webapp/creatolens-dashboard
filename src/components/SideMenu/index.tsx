import { CaretUpIcon } from '@components/Icon'
import { useState } from 'react'

const menus = [
  { header: 'Features', items: ['Instagram Trend Analysis', 'Manage Instabot Accounts', 'Hashtags-to-Image', 'Image-to-Hashtags'] },
  { header: 'User Settings', items: ['item2', 'item3'] },
  { header: 'Support', items: ['Contact'] },
]

const SideMenu = () => {
  const [active, setActive] = useState<string>('')

  const toggleMenu = (header: string) => {
    setActive(active === header ? '' : header) // Toggle active state
  }

  return (
    <div className="flex h-full w-full flex-col justify-between rounded-lg border border-neutral-300 p-4 text-base">
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
                className={`pointer-events-none w-fit transform transition-all ${active === menu.header ? 'rotate-180 ' : ''}`}
                color={'black'}
              />
            </button>
            <div className="my-2 border-b border-neutral-300 px-4"></div>
            {active === menu.header && ( // Show dropdown content only if active
              <div className="dropdown-content my-4 flex flex-col items-center border-b border-neutral-300">
                {menu.items.map((item) => (
                  <button key={item} className="dropdown-item w-full rounded-lg px-3 py-4 hover:bg-neutral-200 hover:text-primary-500">
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-end justify-center">Logout</div>
    </div>
  )
}

export default SideMenu
