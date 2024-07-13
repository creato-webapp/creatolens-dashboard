import React from 'react'

interface HeroProps extends React.HTMLAttributes<HTMLElement> {
  backgroundImage: string
  childrenStyle?: string
  mobileBackgroundImage?: boolean
}

const Hero: React.FC<HeroProps> = ({ backgroundImage, children, className, childrenStyle, mobileBackgroundImage = false }: HeroProps) => {
  return (
    <div className={`relative bg-cover bg-center bg-no-repeat md:pb-0 ${className}`} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className={`h-full ${mobileBackgroundImage ? '' : 'bg-white'} md:bg-black md:bg-opacity-50 md:backdrop-filter`}>
        <div className={`mb-0 px-4 py-10 text-left text-text-primary md:p-8 md:pl-10 md:text-white ${childrenStyle}`}>{children}</div>
        <div className={`${mobileBackgroundImage ? 'h-1' : 'hidden'} w-full bg-accent1-500 md:flex md:h-3`}></div>
      </div>
    </div>
  )
}

export default Hero
