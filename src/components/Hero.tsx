import React, { ReactNode } from 'react'

interface HeroProps {
  backgroundImage: string
  children: ReactNode
  className?: string
}

const Hero: React.FC<HeroProps> = ({ backgroundImage, children, className }: HeroProps) => {
  return (
    <div className={`relative bg-cover bg-center bg-no-repeat md:pb-0 ${className}`} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="bg-white md:bg-black md:bg-opacity-50 md:backdrop-blur-sm md:backdrop-filter">
        <div className="mb-0 p-4 text-left text-text-primary md:p-8 md:py-8 md:pl-10 md:text-white">{children}</div>
      </div>
    </div>
  )
}

export default Hero
