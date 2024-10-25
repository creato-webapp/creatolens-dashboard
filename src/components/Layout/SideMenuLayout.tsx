import React from 'react'
import Footer from '@components/Footer'
import SideMenu from '@components/SideMenu'

type LayoutProps = {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex w-full flex-col lg:mt-10 lg:items-center">
      <main className="lg:flex lg:max-w-screen-xl">
        <aside className="mr-6 hidden min-w-[250px] lg:flex">
          <SideMenu />
        </aside>
        {children}
      </main>
      <Footer />
    </div>
  )
}
