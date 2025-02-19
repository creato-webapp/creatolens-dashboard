import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import useAuth from '@hooks/useAuth'
import { FOOTER_LINKS, FOOTER_LINKS_STATIC, SOCIAL_MEDIA_LINKS } from '@constants/menu'
import dayjs from '@utils/dayjs'

function Footer() {
  const { session } = useAuth()

  const footerLinks = session ? FOOTER_LINKS : FOOTER_LINKS_STATIC
  return (
    <footer className="my-8 flex flex-col border-t pt-8 md:p-8 md:px-16">
      <div className="flex w-full flex-col md:flex-row">
        <div className="md:max-w-64">
          <div className="flex flex-row items-start justify-between gap-4 md:flex-col">
            <div>
              <Image src="/logo_orange.png" width={40} height={40} alt={'2tag logo'} />
            </div>
            <div className="flex flex-row gap-4">
              {SOCIAL_MEDIA_LINKS.map(({ alt, Icon, href }) => (
                <Link href={href} className="h-6 w-6 items-center justify-center" key={alt}>
                  <Icon width={24} height={24} />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 flex w-full">
          <div className="flex w-full flex-col flex-wrap items-start justify-around sm:flex-row">
            {footerLinks.map((items) => {
              return (
                <div key={items.header} className="ml-2 mt-6 w-fit max-w-64 flex-1 text-base font-semibold md:ml-12 md:mt-0">
                  {items.header}
                  <div className="flex flex-col gap-2 pt-4 md:gap-4 md:pt-6">
                    {items.items.map((link) => {
                      return (
                        <Link href={link.path} key={link.name}>
                          <div className="font-normal text-neutral-800">{link.name}</div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
          {/* ©2025 ESSAA Limited All Rights Reserved */}
        </div>
      </div>
      <div className="mt-24 inline-flex w-full flex-col items-center justify-start">
        <span className="text-base font-semibold leading-none text-neutral-400">{`©${dayjs().get('year')} ESSAA Limited All Rights Reserved`}</span>
      </div>
    </footer>
  )
}

export default Footer
