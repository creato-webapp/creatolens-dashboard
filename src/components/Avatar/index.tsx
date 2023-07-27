import React from 'react'
import UserIcon from '@components/Icon/UserIcon'
// Define the type for the avatar size
type AvatarSize = 'small' | 'medium' | 'large'

// Define the props for the Avatar component
interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  size?: AvatarSize
}

// Define the styles for each avatar size
const sizeStyles: Record<AvatarSize, string[]> = {
  small: ['w-4 h-4'],
  medium: ['w-8 h-8'],
  large: ['w-12 h-12'],
}

// Avatar component
const Avatar: React.FC<AvatarProps> = ({ src, alt = 'Avatar', size = 'small', className }) => {
  const sizeStyle = sizeStyles[size || 'medium']
  let iconSize = 26
  if (size === 'small') {
    iconSize = 18
  } else if (size === 'large') {
    iconSize = 36
  }

  return (
    <div className={`flex overflow-hidden rounded-full ${sizeStyle} bg-gray-300 ${className}`}>
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <UserIcon size={iconSize} color="currentColor" className="m-auto" />
      )}
    </div>
  )
}

export default Avatar
