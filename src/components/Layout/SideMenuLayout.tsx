import React, { PropsWithChildren } from 'react'

import Footer from '@components/Footer'

import SideMenu from '@components/SideMenu'

export default function SideMenuLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex w-full  flex-col items-center justify-center ">
      <main className="mt-10 flex max-w-screen-xl flex-row justify-center">
        <div className="mr-6">
          <SideMenu />
        </div>
        {children}
      </main>
      <Footer />
    </div>
  )
}
