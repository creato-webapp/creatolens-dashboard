import React, { PropsWithChildren } from 'react'

import { Popover } from '@headlessui/react'

import Footer from '@components/Footer'

import NavBar from './Navbar'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Popover className="relative bg-white">
        <div className="mx-auto max-w-screen-2xl">
          <NavBar />
        </div>
      </Popover>
      <main>{children}</main>
      <Footer />
    </>
  )
}
