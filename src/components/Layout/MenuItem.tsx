import type { FC } from 'react'
import Link from 'next/link'

export interface MenuItemProps {
  title: string
  href: string
  onClose?: () => void
}

const MenuItem: FC<MenuItemProps> = ({ title, href, onClose }) => {
  return (
    <li>
      <Link href={href} key={title} replace>
        <a
          onClick={onClose}
          key={title}
          className="block rounded py-2 pl-3 pr-4  dark:text-white md:bg-transparent md:p-0 md:text-blue-700"
          aria-current="page"
          href={href}
        >
          {title}
        </a>
      </Link>
    </li>
  )
}
export default MenuItem
