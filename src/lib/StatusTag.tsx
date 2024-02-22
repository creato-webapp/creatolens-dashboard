import React from 'react'
import Tag, { TagVariant } from '@components/Tag'

export type Status = 'active' | 'blocked' | 'banned' | 'retry' | 'test' | 'scrapping' | 'occupied'

interface StatusTagProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  isOutline?: boolean
  clickable?: boolean
  removable?: boolean
  status: Status
  onClose?: () => void
}

const statusToVariantMap: Record<Status, TagVariant> = {
  active: 'success',
  retry: 'warning',
  blocked: 'fail',
  banned: 'fail',
  test: 'processing',
  scrapping: 'processing',
  occupied: 'processing',
}

const StatusTag: React.FC<StatusTagProps> = ({ status, onClose, ...props }) => {
  const variant = statusToVariantMap[status]

  return <Tag label={status} variant={variant} onClose={onClose} {...props} className="px-2" />
}

export default StatusTag
