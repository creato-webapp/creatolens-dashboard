import { Badges } from '@components/Badges'
import { BadgesType } from 'src/constants/badges'
import STATUS, { IAccountStatusType } from 'src/constants/status'

const STATUS_TO_VARIANT_MAP: Record<IAccountStatusType, BadgesType> = {
  [STATUS.active]: 'success',
  [STATUS.blocked]: 'error',
  [STATUS.banned]: 'error',
  [STATUS.retry]: 'warning',
  [STATUS.test]: 'secondary',
  [STATUS.scrapping]: 'warning',
  [STATUS.occupied]: 'warning',
} as const

const AccountBadges = ({ status }: { status: IAccountStatusType }) => {
  return (
    <Badges size="sm" className="capitalize" rounded status={STATUS_TO_VARIANT_MAP[status]}>
      {status}
    </Badges>
  )
}

export default AccountBadges
