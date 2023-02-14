import type { FC } from 'react'
import { navBarItem } from './Layout'
import MenuItem from './MenuItem'
interface MenuProps {
  isShow: boolean
  items: Array<navBarItem>
  onClose?: () => void
}

const Menu: FC<MenuProps> = ({ isShow, items, onClose }) => {
  return (
    <div>
      {isShow && (
        <div className="absolute z-10  md:block md:w-auto" id="navbar-default">
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium md:dark:bg-gray-900">
            {items.map((e, index) => (
              <MenuItem {...e} onClose={onClose} />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
export default Menu
