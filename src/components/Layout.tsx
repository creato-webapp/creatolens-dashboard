import React from 'react'
import { Popover } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import Link from 'next/link'

interface NavbarProps {
  children: React.ReactNode
}

export default function Navbar(props: NavbarProps) {
  type navBarItem = {
    title: string
    href: string
  }

  const navBarItemList: Array<navBarItem> = [
    { title: 'Docs', href: '/docs' },
    { title: 'About', href: '/about' },
    { title: 'Accounts', href: '/accounts' },
  ]

  return (
    <>
      <Popover className="relative bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link href="/">
                <a>
                  <span className="sr-only">Your Company</span>

                  <img
                    className="h-8 w-auto sm:h-10"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                </a>
              </Link>
            </div>

            <div className="-my-2 -mr-2 md:hidden">
              <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <Popover.Group as="nav" className="hidden space-x-10 md:flex">
              {navBarItemList.map((e, index) => (
                <Link href={e.href} key={index} replace>
                  <a className="text-base font-medium text-gray-500 hover:text-gray-900">
                    {e.title}
                  </a>
                </Link>
              ))}
            </Popover.Group>
            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
              <a
                href="#"
                className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Log in
              </a>
            </div>
          </div>
        </div>
      </Popover>
      {props.children}
    </>
  )
}
