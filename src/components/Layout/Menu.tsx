import type { FC, HTMLAttributes } from 'react'
import { navBarItem } from './Layout'
import MenuItem from './MenuItem'
interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  isShow: boolean
  items: Array<navBarItem>
  onClose?: () => void
}

const Menu: FC<MenuProps> = ({ isShow, items, onClose }) => {
  return (
    <div className="hidden sm:flex">
      {isShow && (
        <div className="absolute z-10  md:block md:w-auto" id="navbar-default">
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-200 bg-white p-1">
            {items.map((e, index) => (
              <MenuItem {...e} index={index} onClose={onClose} />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
export default Menu
