import React, { ReactNode } from 'react'
import CrossIcon from '@components/Icon/CrossIcon'
type TagVariant = 'default' | 'primary' | 'success' | 'fail' | 'grey' | 'outline' | 'processing' | 'warning'

// Define the props for the Tag component
type TagProps = {
  label: ReactNode
  variant?: TagVariant
  onClose?: () => void
}

const variantStyles: Record<TagVariant, string> = {
  default: 'outline outline-1 outline-text-stroke bg-color-white text-text-secondary',
  processing: 'outline outline-1 outline-indigo-700 bg-indigo-200 text-indigo-900',
  primary: 'outline outline-1 outline-orange-200 bg-orange-200 text-text-primary',
  outline: 'outline outline-1 outline-orange-400',
  success: 'outline outline-1 outline-green-700 bg-green-200 text-green-900',
  warning: 'outline outline-1 outline-yellow-700 bg-yellow-200 text-yellow-900',
  fail: 'outline outline-1 outline-red-700 bg-red-200 text-red-900',
  grey: 'outline outline-1 outline-gray-700 bg-gray-200 text-gray-900',
}

// Tag component
const Tag: React.FC<TagProps> = ({ label, onClose, variant = 'primary' }) => {
  const variantStyle = variantStyles[variant]
  return (
    <div className={`mr-2 mb-2 inline-flex items-center rounded-full px-1 py-1 text-sm ${variantStyle}`}>
      <span>{label}</span>
      {onClose && (
        <button onClick={onClose} className="ml-1 hover:text-gray-500 focus:outline-none">
          <CrossIcon size={18} />
        </button>
      )}
    </div>
  )
}

export default Tag
