import React, { ReactEventHandler, useState } from 'react'

import Image from 'next/image'

import UserIcon from '@components/Icon/UserIcon'
import IMAGE from '@constants/image'
import SIZE, { ISizeType } from '@constants/size'

type AvatarSize = ISizeType

const sizeClassName = {
  [SIZE.L]: ['w-4 h-4'],
  [SIZE.M]: ['w-7 h-7'],
  [SIZE.S]: ['w-12 h-12'],
} as const

const pixel = {
  [SIZE.S]: 18,
  [SIZE.M]: 28,
  [SIZE.L]: 36,
} as const

const DEFAULT_SRC = IMAGE.LOGO_CREATO_ORANGE

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: AvatarSize
  fallbackSrc?: string
}
const Avatar = ({ src: newSrc, alt = 'Avatar', size = SIZE.S, className, fallbackSrc = DEFAULT_SRC }: AvatarProps) => {
  const [src, setSrc] = useState(newSrc)

  const onError: ReactEventHandler = () => {
    setSrc(fallbackSrc)
  }

  return (
    <>
      {src ? (
        <Image
          src={src}
          width={pixel[size]}
          height={pixel[size]}
          alt={alt}
          onError={onError}
          className={`rounded-full bg-gray-300 object-cover ${sizeClassName[size]} ${className}`}
        />
      ) : (
        <UserIcon size={pixel[size]} fill="currentColor" className="m-auto" />
      )}
    </>
  )
}

export default Avatar
