import React, { useEffect, useState } from 'react'
import UserIcon from '@components/Icon/UserIcon'

type AvatarSize = 'small' | 'medium' | 'large'

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  size?: AvatarSize
  fallbackSrc?: string
}

// Define the styles for each avatar size
const sizeStyles: Record<AvatarSize, string[]> = {
  small: ['w-4 h-4'],
  medium: ['w-8 h-8'],
  large: ['w-12 h-12'],
}

// Avatar component
const Avatar = ({ src, alt = 'Avatar', size = 'small', className, fallbackSrc = '/logo_orange.png' }: AvatarProps) => {
  const sizeStyle = sizeStyles[size || 'medium']
  const iconSize = size === 'small' ? 18 : size === 'large' ? 36 : 26

  const [error, setError] = useState(null)

  useEffect(() => {
    setError(null)
  }, [src])

  return (
    <div className={`flex overflow-hidden rounded-full ${sizeStyle} bg-gray-300 ${className}`}>
      {src ? (
        <img
          width={iconSize}
          height={iconSize}
          src={error ? '/logo_orange.png' : src}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null
            currentTarget.src = fallbackSrc
          }}
          alt={alt}
          className="h-full w-full object-cover"
        />
      ) : (
        <UserIcon size={iconSize} color="currentColor" className="m-auto" />
      )}
    </div>
  )
}

export default Avatar
