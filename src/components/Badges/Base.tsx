import React from 'react'

import BADGES, { BadgesType } from 'src/constants/badges'

import XCircleIcon from '../Icon/XCircleIcon'

export interface BadgesProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'lg' | 'sm'
  isOutline?: boolean
  isDisabled?: boolean
  clickable?: boolean
  closeable?: boolean
  rounded?: boolean
  status: BadgesType
  onClose?: () => void
}

const solidBadgesStyles: Record<BadgesType, string> = {
  [BADGES.primary]: 'bg-accent1-500 text-text-white border border-accent1-500',
  [BADGES.secondary]: 'bg-accent2-500 text-text-white border border-accent2-500',
  [BADGES['text-primary']]: 'bg-text-primary text-text-white border border-text-primary',
  [BADGES['text-secondary']]: 'bg-text-secondary text-text-white border border-text-secondary',
  [BADGES.disabled]: 'bg-text-disabled text-text-white border border-text-disabled',
  [BADGES.success]: 'bg-successful-600 text-text-white border-successful-500 border border-successful-500',
  [BADGES.warning]: 'bg-warning-500 text-warning-800 border-warning-300 border border-warning-500',
  [BADGES.error]: 'bg-error-600 text-text-white border-error-600',
} as const

const outlineBadgesStyles: Record<BadgesType, string> = {
  [BADGES.primary]: 'border border-accent1-500 text-accent1-500',
  [BADGES.secondary]: 'border border-accent2-500 text-accent2-500',
  [BADGES['text-primary']]: 'border border-text-primary text-text-primary',
  [BADGES['text-secondary']]: 'border border-text-secondary text-text-secondary',
  [BADGES.disabled]: 'border border-text-disabled text-text-disabled',
  [BADGES.success]: 'border border-successful-500 text-successful-700',
  [BADGES.warning]: 'border border-warning-500 text-warning-800',
  [BADGES.error]: 'border border-error-600 text-error-600',
} as const

const Badges = ({ ...props }: BadgesProps) => {
  const { size = 'lg', children, isOutline, isDisabled, closeable, rounded, status, onClose, className } = props
  const isShow = true
  const roundedStyle = rounded ? 'rounded-full' : 'rounded'

  const handleClose = () => {
    // setIsShow(false)
    onClose && onClose()
  }

  const SmallBadges = () => {
    return (
      <div
        className={`flex h-auto w-fit items-center justify-center px-2 py-1 ${roundedStyle}
    ${isOutline ? outlineBadgesStyles[status] : solidBadgesStyles[status]}
    ${isDisabled ? 'bg-bg-dark' : ''} ${className}
    ${closeable ? 'cursor-pointer' : ''}
    `}
      >
        <h6 className="capitalize-first-letter flex flex-row items-center font-normal">{children}</h6>
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
        className={`flex h-auto w-fit items-center justify-center px-2 py-1  ${roundedStyle}
    ${isOutline ? outlineBadgesStyles[status] : solidBadgesStyles[status]}
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
