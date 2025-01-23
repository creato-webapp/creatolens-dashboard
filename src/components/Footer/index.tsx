import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import IMAGE from '@constants/image'
import dayjs from '@utils/dayjs'
import useAuth from '@hooks/useAuth'

const COMMON_LINKS = {
  FAQ: {
    title: 'FAQs',
    href: '/faqs',
  },
  TERMS: {
    title: 'Terms & Conditions',
    href: 'https://hickory-fight-55b.notion.site/Creato-Terms-Conditions-62e6fbb474394483bda8f81cd73b0a2a',
  },
  PRIVACY: {
    title: 'Privacy Policy',
    href: 'https://hickory-fight-55b.notion.site/Creato-Privacy-Policy-3e9a90f983d74fed8b4734c0775d897e',
  },
  CONTACT: {
    title: 'Contact Us',
    href: '/contact-us',
  },
} as const

const FOOTER_LINKS = [
  {
    title: 'About 2Tag',
    links: [
      {
        title: 'Our Story',
        href: 'https://www.creatogether.app/',
      },
      {
        title: 'Blog',
        href: 'https://www.creatogether.app/zh/blogs',
      },
    ],
  },
  {
    title: 'Support',
    links: Object.values(COMMON_LINKS),
  },
  {
    title: 'Discover',
    links: [
      {
        title: 'Join As Creator',
        href: 'https://room591.notion.site/room591/Creato-Is-Hiring-100d3ca4ef8e42f889aa1c577596d308',
      },
      {
        title: 'School Resources',
        href: 'https://www.creatogether.app/creato-academy',
      },
      {
        title: 'Hashtags & Keywords ',
        href: '/hashtag',
      },
    ],
  },
] as const

const loginedInFooterLink = [
  {
    title: 'Features',
    links: [
      {
        title: 'Instagram Trend Analysis',
        href: '/dashboard',
      },
      {
        title: 'Instabot',
        href: '/accounts',
      },
      {
        title: 'Hashtags Recommendation',
        href: 'https://www.creatogether.app/hashtags-recommendation',
      },
      {
        title: 'Hashtags-to-Image',
        href: '/hashtag/hashtags-to-image',
      },
      {
        title: 'Image-to-Hashtags',
        href: '/hashtag/image-to-hashtags',
      },
    ],
  },
  {
    title: 'Support',
    links: Object.values(COMMON_LINKS),
  },
] as const

const SOCIAL_MEDIA_LINKS = [
  {
    alt: 'Instagram',
    src: IMAGE.LOGO_INSTAGRAM,
    href: 'https://www.instagram.com/creatogether.app/',
  },
  {
    alt: 'Linkedin',
    src: IMAGE.LOGO_LINKEDIN,
    href: 'https://www.linkedin.com/company/creato-edu/',
  },
  {
    alt: 'Spotify',
    src: IMAGE.LOGO_SPOTIFY,
    href: 'https://open.spotify.com/show/1nOYgPbId7Cq8fQoqXuxf5?si=dceab17fa4c04db5&nd=1&dlsi=9c44e2be6f314145',
  },
  {
    alt: 'Youtube',
    src: IMAGE.LOGO_YOUTUBE,
    href: 'https://www.youtube.com/@Creatopodcast',
  },
] as const

const LoggedOutFooter = () => (
  <footer className={`flex w-full flex-col gap-6 bg-neutral-100 px-12 py-14 md:gap-14 `}>
    <div className="flex flex-col justify-center gap-6 md:flex-row md:justify-around">
      {FOOTER_LINKS.map(({ title, links }) => (
        <div key={`Footer_div_${title}`} className="flex flex-col items-center gap-6 py-3 md:items-start">
          <div className="text-lg font-bold leading-loose text-zinc-400">{title}</div>
          <div className="flex flex-col items-center gap-6 md:items-start">
            {links.map((link) => (
              <a href={link.href} key={`Footer_a_${link.href}`}>
                <div className="inline-flex items-start justify-start self-stretch">
                  <div className="text-sm font-normal leading-none tracking-tight text-slate-600">{link.title}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
    <div>
      <div className="flex flex-row justify-center gap-8">
        {SOCIAL_MEDIA_LINKS.map(({ alt, src, href }) => (
          <Link href={href} className="" key={alt}>
            <Image width={24} height={24} src={src} alt={alt} className="cursor-pointer" />
          </Link>
        ))}
      </div>
    </div>
    <div className="inline-flex w-full flex-col items-center justify-start">
      <span className="text-xs font-semibold leading-none text-slate-600">{`©${dayjs().get('year')} ESSAA Limited All Rights Reserved`}</span>
    </div>
  </footer>
)

const LoggedInFooter = () => (
  <footer className="my-8 flex flex-col border-t pt-8 md:flex-row md:p-8 md:px-20">
    <div className="w-full md:max-w-64">
      <div className="flex flex-row items-start justify-between gap-4 md:flex-col">
        <div>
          <Image src="/logo_orange.png" width={40} height={40} alt={'2tag logo'} />
        </div>
        <div className="flex flex-row gap-4">
          {SOCIAL_MEDIA_LINKS.map(({ alt, src, href }) => (
            <Link href={href} className="" key={alt}>
              <Image width={24} height={24} src={src} alt={alt} className="cursor-pointer fill-black stroke-black" />
            </Link>
          ))}
        </div>
      </div>
    </div>
    <div className="flex w-full">
      <div className="flex w-full flex-col md:flex-row">
        {loginedInFooterLink.map((items) => {
          return (
            <div key={items.title} className="mt-12 w-full max-w-64 text-base font-semibold">
              {items.title}
              <div className="flex flex-col gap-2 pt-4 md:gap-4 md:pt-8">
                {items.links.map((link) => {
                  return (
                    <Link href={link.href} key={link.title}>
                      <div className="font-normal text-neutral-800">{link.title}</div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  </footer>
)
function Footer() {
  const { session } = useAuth()
  return session ? <LoggedInFooter /> : <LoggedOutFooter />
}

export default Footer
