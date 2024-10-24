import React, { PropsWithChildren } from 'react'

import { Popover } from '@headlessui/react'

import Footer from '@components/Footer'

import NavBar from './Navbar'
import SideMenu from '@components/SideMenu'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Popover className="relative bg-white">
        <div className="max-w-screen-2xl mx-auto">
          <NavBar />
        </div>
      </Popover>
      <main className="mt-10 flex h-full flex-row justify-center">
        <div className="mr-6 w-full max-w-[300px] items-start">
          <SideMenu />
        </div>
        {children}
      </main>
      <Footer />
    </>
  )
}
