import React, { ReactNode } from 'react'
import CrossIcon from '@components/Icon/CrossIcon'
export type TagVariant = 'default' | 'primary' | 'success' | 'fail' | 'grey' | 'outline' | 'processing' | 'warning'

// Define the props for the Tag component
interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  label: ReactNode
  variant?: TagVariant
  onClose?: () => void
}

const variantStyles: Record<TagVariant, string> = {
  default: 'outline outline-1 outline-text-stroke bg-color-white text-text-secondary',
  processing: 'outline outline-1 outline-accent2-700 bg-accent2-200 text-accent2-900',
  primary: 'outline outline-1 outline-accent1-200 bg-accent1-200 text-text-primary',
  outline: 'outline outline-1 outline-accent1-400',
  success: 'outline outline-1 outline-successful-700 bg-successful-200 text-successful-900',
  warning: 'outline outline-1 outline-warning-700 bg-warning-200 text-warning-900',
  fail: 'outline outline-1 outline-error-700 bg-error-200 text-error-900',
  grey: 'outline outline-1 outline-gray-700 bg-gray-200 text-gray-900',
}

// Tag component
const Tag: React.FC<TagProps> = ({ label, onClose, variant = 'primary', ...props }) => {
  const { className: propsClassName } = props
  const variantStyle = variantStyles[variant]
  return (
    <div {...props} className={`mr-2 mb-2 inline-flex items-center rounded-full px-1 py-1 text-sm ${variantStyle} ${propsClassName}`}>
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
