import React, { ReactNode } from 'react'

interface HeroProps {
  backgroundImage: string
  children: ReactNode
  className?: string
}

const Hero: React.FC<HeroProps> = ({ backgroundImage, children, className }) => {
  return (
    <div className={`relative bg-cover bg-center bg-no-repeat ${className}`} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="bg-black bg-opacity-50 backdrop-blur-sm backdrop-filter">
        <div className="p-4 py-8 text-left text-white md:p-8 md:py-16 md:pl-24">{children}</div>
      </div>
    </div>
  )
}

export default Hero
