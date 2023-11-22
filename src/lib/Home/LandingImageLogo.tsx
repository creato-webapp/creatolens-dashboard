import React from 'react'

interface LandingImageLogoProps {
  className?: string
}

export default function LandingImageLogo({ className }: LandingImageLogoProps) {
  return (
    <div className="relative mx-auto max-w-lg ">
      <div
        className={`bg-accent1-300 ${className} flex w-auto max-w-lg items-end justify-evenly`}
        style={{ borderRadius: ' 83% 17% 46% 54% / 34% 30% 70% 66%' }}
      >
        <img src="image-left.svg" alt="Front" className="front-image h-auto w-36" />
        <img src="image-right.svg" alt="Front" className="front-image mb-4 h-auto w-72" />
      </div>
    </div>
  )
}
