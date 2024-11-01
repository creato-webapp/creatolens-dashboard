import React, { PropsWithChildren } from 'react'

import { Popover } from '@headlessui/react'

import Footer from '@components/Footer'

import NavBar from './Navbar'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Popover className="relative bg-white">
        <NavBar />
      </Popover>
      <main className="px-4 py-4 md:mx-0">{children}</main>
      <Footer />
    </>
  )
}
