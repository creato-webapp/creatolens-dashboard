import React from 'react'
import InstagramLogo from '../../assets/social-media-icons/InstagramLogo.svg'
import LinkedinLogo from '../../assets/social-media-icons/LinkedinLogo.svg'
import SpotifyLogo from '../../assets/social-media-icons/SpotifyLogo.svg'
import YoutubeLogo from '../../assets/social-media-icons/YoutubeLogo.svg'
import Image from 'next/image'
import Link from 'next/link'

interface FooterItem {
  title: string
  content: FooterItemContent[]
}
interface FooterItemContent {
  title: string
  link: string
}
function Footer() {
  const footerItems: FooterItem[] = [
    {
      title: 'About Creato',
      content: [
        {
          title: 'Our Story',
          link: 'https://live.creatogether.app/pages/about-us',
        },
        {
          title: 'Blog',
          link: 'https://www.creatogether.app/zh/blogs',
        },
      ],
    },
    {
      title: 'Support',
      content: [
        {
          title: 'FAQ',
          link: 'https://www.notion.so/ffd8e5bab4b04ac1b8dd1b9988dbd10f?v=d25dc72cdc9d44cf9dc492e74acf6855',
        },
        {
          title: 'Terms & Conditions',
          link: 'https://live.creatogether.app/pages/privacy-terms',
        },
        {
          title: 'Privacy Policy',
          link: 'https://live.creatogether.app/pages/privacy-policy',
        },
        {
          title: 'Contact Us',
          link: 'https://live.creatogether.app/pages/contact',
        },
      ],
    },
    {
      title: 'Discover',
      content: [
        {
          title: 'Join As Creator',
          link: 'https://live.creatogether.app/pages/join-as-creator',
        },
        {
          title: 'School Resources',
          link: 'https://live.creatogether.app/pages/ole-%E5%85%B6%E4%BB%96%E5%AD%B8%E7%BF%92%E7%B6%93%E6%AD%B7',
        },
      ],
    },
  ]

  const footerIcon = [
    {
      alt: 'Instagram',
      src: InstagramLogo,
      link: 'https://www.instagram.com/creatogether.app/',
    },
    {
      alt: 'Linkedin',
      src: LinkedinLogo,
      link: 'https://www.linkedin.com/company/creato-edu/',
    },
    {
      alt: 'Spotify',
      src: SpotifyLogo,
      link: 'https://open.spotify.com/show/1nOYgPbId7Cq8fQoqXuxf5?si=dceab17fa4c04db5&nd=1&dlsi=9c44e2be6f314145',
    },
    {
      alt: 'Youtube',
      src: YoutubeLogo,
      link: 'https://www.youtube.com/@Creatopodcast',
    },
  ]

  const FooterItem = (props: { item: FooterItem }) => {
    const { item } = props
    return (
      <div className="flex flex-col items-center gap-6 py-3 md:items-start">
        <div className="text-lg font-bold leading-loose text-zinc-400">{item.title}</div>
        <div className="flex flex-col items-center gap-6 md:items-start">
          {item.content.map((i: FooterItemContent) => (
            <a href={i.link}>
              <div className="inline-flex items-start justify-start self-stretch">
                <div className="text-sm font-normal leading-none tracking-tight text-slate-600">{i.title}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    )
  }

  return (
    <footer className={`flex w-full flex-col gap-6 bg-neutral-100 py-14 px-12 md:gap-14 `}>
      <div className="flex flex-col justify-center gap-6 md:flex-row md:justify-around">
        {footerItems.map((item: FooterItem) => (
          <FooterItem item={item} />
        ))}
      </div>
      <div>
        <div className="flex flex-row justify-center gap-8">
          {footerIcon.map((icon) => (
            <Link href={icon.link} className="">
              <Image src={icon.src} alt={icon.alt} className="cursor-pointer" />
            </Link>
          ))}
        </div>
      </div>
      <div className="inline-flex w-full flex-col items-center justify-start">
        <div className="text-xs font-semibold leading-none text-slate-600">©2024 ESSAA Limited All Rights Reserved</div>
      </div>
    </footer>
  )
}

export default Footer
