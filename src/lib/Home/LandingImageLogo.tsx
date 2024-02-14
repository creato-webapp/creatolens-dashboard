import React from 'react'

interface LandingImageLogoProps {
  className?: string
}

export default function LandingImageLogo({ className }: LandingImageLogoProps) {
  return (
    <div className={`${className} relative mx-auto md:mx-0 md:w-1/2`}>
      <img src="landing-mobile-new.png" alt="Front" className="front-image h-auto w-full overflow-x-hidden md:shrink-0" />
    </div>
  )
}
