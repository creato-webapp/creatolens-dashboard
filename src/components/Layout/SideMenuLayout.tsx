import React from 'react'
import SideMenu from '@components/SideMenu'

type LayoutProps = {
  children: React.ReactNode
}

export default function SideMenuLayout({ children }: LayoutProps) {
  return (
    <div className="flex w-full flex-col lg:mt-10 lg:items-center">
      <main className="md:flex md:max-w-screen-xl">
        <aside className="mr-6 hidden min-w-[250px] md:flex">
          <SideMenu />
        </aside>
        {children}
      </main>
    </div>
  )
}
