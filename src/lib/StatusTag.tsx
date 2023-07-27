import React from 'react'
import Tag, { TagVariant } from '@components/Tag'

type Status = 'active' | 'retry' | 'blocked'

interface StatusTagProps extends React.HTMLAttributes<HTMLDivElement> {
  status: Status | string
  onClose?: () => void
}

const statusToVariantMap: Record<Status, TagVariant> = {
  active: 'success',
  retry: 'warning',
  blocked: 'fail',
}

const StatusTag: React.FC<StatusTagProps> = ({ status, onClose, ...props }) => {
  const variant = statusToVariantMap[status]

  return <Tag label={status} variant={variant} onClose={onClose} {...props} className="px-2" />
}

export default StatusTag
