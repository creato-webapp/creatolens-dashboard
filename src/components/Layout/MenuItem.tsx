import type { FC, HTMLAttributes } from 'react'
import Link from 'next/link'

export interface MenuItemProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  href: string
  onClose?: () => void
  index?: number
}

const MenuItem: FC<MenuItemProps> = ({ title, href, onClose, index }) => {
  return (
    <li className="m-2 border-b border-blue-500" key={title + index}>
      <Link href={href} key={title} replace>
        <a onClick={onClose} key={title} className="block rounded py-2 pl-3 pr-4 text-blue-500" aria-current="page" href={href}>
          {title}
        </a>
      </Link>
    </li>
  )
}
export default MenuItem
