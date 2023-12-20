import React, { ReactNode } from 'react'

interface HeroProps {
  backgroundImage: string
  children: ReactNode
  className?: string
  childrenStyle?: string
}

const Hero: React.FC<HeroProps> = ({ backgroundImage, children, className, childrenStyle }: HeroProps) => {
  return (
    <div className={`relative bg-cover bg-center bg-no-repeat md:pb-0 ${className}`} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="h-full bg-white md:bg-black md:bg-opacity-50 md:backdrop-filter">
        <div className={`mb-0 px-4 py-10 text-left text-text-primary md:p-8 md:pl-10 md:text-white ${childrenStyle}`}>{children}</div>
        <div className="hidden h-3 w-full bg-accent1-500 md:flex"></div>
      </div>
    </div>
  )
}

export default Hero
