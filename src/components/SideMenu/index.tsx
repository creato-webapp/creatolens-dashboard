import Link from 'next/link'
import { CaretUpIcon } from '@components/Icon'
import { useState } from 'react'
import SubtleButton from '@components/Button/Subtle'
import LogoutIcon from '@components/Icon/LogOutIcon'
import useAuth from '@hooks/useAuth'
import { useRouter } from 'next/router'
import PrimaryButton from '@components/Button/Primary'
import { useTranslation } from 'next-i18next'
import { useMenuTranslation } from '@hooks/useMenuTranslation'

const SideMenu = (props: { collapseMenu?: () => void }) => {
  const { collapseMenu } = props
  const [active, setActive] = useState<string>('')
  const { session, onLogin, onLogout } = useAuth()
  const router = useRouter()
  const { t } = useTranslation('layout')
  const { getMenuSections } = useMenuTranslation()

  const renderMenu = getMenuSections(!session)

  const toggleMenu = (header: string) => {
    setActive(active === header ? '' : header)
  }

  return (
    <div className="flex h-full max-h-screen w-full flex-col justify-between rounded-lg border border-neutral-300 p-4 text-base">
      <div>
        {renderMenu.map((menu) => (
          <div key={menu.header} className="dropdown">
            <button
              className={`dropdown-toggle flex w-full flex-row justify-between px-4 py-2 font-bold hover:text-primary-500 ${
                active === menu.header ? 'active text-primary-500' : ''
              }`}
              onClick={() => toggleMenu(menu.header)}
            >
              {menu.header}
              <CaretUpIcon
                className={`pointer-events-none w-fit transform transition-transform duration-300 ${active === menu.header ? 'rotate-180' : ''}`}
                color={'black'}
              />
            </button>
            <div className="my-2 border-b border-neutral-300 px-4"></div>
            <div className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${active === menu.header ? 'max-h-96' : 'max-h-0'}`}>
              <div className="dropdown-content flex flex-col items-center border-b border-neutral-300 pb-2">
                {menu.items.map(
                  (item) =>
                    item.path && (
                      <Link
                        key={item.name}
                        href={item.path}
                        className={`flex w-full text-center ${item.disabled ? 'pointer-events-none text-text-disabled' : ''}`}
                        onClick={collapseMenu}
                      >
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
        {session ? (
          <SubtleButton onClick={onLogout} className="flex h-auto items-center rounded">
            <LogoutIcon className="mr-1" size={18} fillColor="fill-neutral-800"></LogoutIcon>
            {t('navbar.logout')}
          </SubtleButton>
        ) : (
          <PrimaryButton onClick={onLogin} sizes={['s', 's', 's']} className="flex w-full flex-row items-center justify-center gap-4">
            {t('navbar.login_register')}
          </PrimaryButton>
        )}
      </div>
    </div>
  )
}

export default SideMenu
