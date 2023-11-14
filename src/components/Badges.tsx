import React, { useState } from 'react'
import Tag, { TagVariant } from '@components/Tag'
import CrossIcon from './Icon/CrossIcon'
import { stat } from 'fs'
import XCircleIcon from './Icon/XCircleIcon'
type Status = 'primary' | 'secondary' | 'text-primary' | 'text-secondary' | 'disabled' | 'success' | 'warning' | 'error'

interface BadgesProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'lg' | 'sm'
  isOutline?: boolean
  isDisabled?: boolean
  clickable?: boolean
  closeable?: boolean
  rounded?: boolean
  status: Status
  onClose?: () => void
}

const Badges: React.FC<BadgesProps> = ({ ...props }) => {
  const { size = 'lg', children, isOutline, isDisabled, clickable, closeable, rounded, status, onClose, className } = props
  const [isShow, setIsShow] = useState(true)
  const roundedStyle = rounded ? 'rounded-full' : 'rounded'
  const solidBadgesStyles =
    status === 'primary'
      ? 'bg-accent1-500 text-text-white'
      : status === 'secondary'
      ? 'bg-accent2-500 text-text-white'
      : status === 'text-primary'
      ? 'bg-text-primary text-text-white'
      : status === 'text-secondary'
      ? 'bg-text-secondary text-text-white'
      : status === 'disabled'
      ? 'bg-text-disabled text-text-white'
      : status === 'success'
      ? 'bg-successful-600 text-text-white'
      : status === 'warning'
      ? 'bg-warning-500 text-warning-800'
      : status === 'error'
      ? 'bg-error-600 text-text-white'
      : ''

  const outlineBadgesStyles =
    status === 'primary'
      ? 'border border-accent1-500 text-accent1-500'
      : status === 'secondary'
      ? 'border border-accent2-500 text-accent2-500'
      : status === 'text-primary'
      ? 'border border-text-primary text-text-primary'
      : status === 'text-secondary'
      ? 'border border-text-secondary text-text-secondary'
      : status === 'disabled'
      ? 'border border-text-disabled text-text-disabled'
      : status === 'success'
      ? 'border border-successful-600 text-successful-600'
      : status === 'warning'
      ? 'border border-warning-500 text-warning-800'
      : status === 'error'
      ? 'border border-error-600 text-error-600'
      : ''

  const handleClose = () => {
    setIsShow(false)
    onClose && onClose()
  }

  return isShow ? (
    <div
      {...props}
      className={`curs flex h-auto w-fit items-center justify-center px-2 py-[0.188rem] ${roundedStyle} 
      ${isOutline ? outlineBadgesStyles : solidBadgesStyles} 
      ${isDisabled ? 'bg-bg-dark' : ''} ${className}
      ${closeable ? 'cursor-pointer' : ''}
      `}
    >
      <div className="capitalize-first-letter">{children}</div>
      {closeable && (
        <button onClick={handleClose} className="ml-1 focus:outline-none">
          <XCircleIcon size={18} />
        </button>
      )}
    </div>
  ) : null
}

export default Badges
