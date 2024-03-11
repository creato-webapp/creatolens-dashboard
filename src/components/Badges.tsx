import React, { useState } from 'react'
import XCircleIcon from './Icon/XCircleIcon'
export type Status = 'primary' | 'secondary' | 'text-primary' | 'text-secondary' | 'disabled' | 'success' | 'warning' | 'error'

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
  const { size = 'lg', children, isOutline, isDisabled, closeable, rounded, status, onClose, className } = props
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
                ? 'bg-successful-600 text-text-white border-successful-500 border'
                : status === 'warning'
                  ? 'bg-warning-500 text-warning-800 border-warning-300 border'
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
                ? 'border border-successful-500 text-successful-700'
                : status === 'warning'
                  ? 'border border-warning-500 text-warning-800'
                  : status === 'error'
                    ? 'border border-error-600 text-error-600'
                    : ''

  const handleClose = () => {
    setIsShow(false)
    onClose && onClose()
  }

  const SmallBadges = () => {
    return (
      <div
        {...props}
        className={`curs flex h-auto w-fit items-center justify-center px-2 py-1 ${roundedStyle}
    ${isOutline ? outlineBadgesStyles : solidBadgesStyles}
    ${isDisabled ? 'bg-bg-dark' : ''} ${className}
    ${closeable ? 'cursor-pointer' : ''}
    `}
      >
        <h6 className="capitalize-first-letter flex flex-row font-normal">{children}</h6>
        {closeable && (
          <button onClick={handleClose} className="ml-1 focus:outline-none">
            <XCircleIcon size={18} />
          </button>
        )}
      </div>
    )
  }

  const LargeBadges = () => {
    return (
      <div
        {...props}
        className={`curs flex h-auto w-fit items-center justify-center px-2 py-1  ${roundedStyle}
    ${isOutline ? outlineBadgesStyles : solidBadgesStyles}
    ${isDisabled ? 'bg-bg-dark' : ''} ${className}
    ${closeable ? 'cursor-pointer' : ''}
    `}
      >
        <h4 className="capitalize-first-letter flex flex-row items-center font-normal leading-7">{children}</h4>
        {closeable && (
          <button onClick={handleClose} className="ml-1 focus:outline-none">
            <XCircleIcon size={22} />
          </button>
        )}
      </div>
    )
  }

  return isShow ? size === 'sm' ? <SmallBadges /> : <LargeBadges /> : null
}

export default Badges
