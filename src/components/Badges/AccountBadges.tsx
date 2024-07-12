import React from 'react'

import { BadgesType } from '@constants/badges'
import STATUS, { IAccountStatusType } from '@constants/status'

import Badges, { BadgesProps } from './Base'

interface IAccountBadges extends Omit<BadgesProps, 'status'> {
  status: IAccountStatusType
}

const STATUS_MAP: Record<IAccountStatusType, BadgesType> = {
  [STATUS.active]: 'success',
  [STATUS.retry]: 'warning',
  [STATUS.blocked]: 'error',
  [STATUS.banned]: 'error',
  [STATUS.test]: 'disabled',
  [STATUS.scrapping]: 'warning',
  [STATUS.occupied]: 'secondary',
} as const

const AccountBadges: React.FC<IAccountBadges> = ({ status, ...props }) => {
  const badgeStatus = STATUS_MAP[status]
  return (
    <Badges size="sm" className="capitalize" rounded {...props} status={badgeStatus}>
      {status}
    </Badges>
  )
}

export default AccountBadges
