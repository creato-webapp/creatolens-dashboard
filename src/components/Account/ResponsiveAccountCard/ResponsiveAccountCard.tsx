import { FC, HTMLAttributes } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { Badges } from '@components/Badges'
import { AccountBadges } from '@components/Badges'
import CheckIcon from '@components/Icon/CheckIcon'
import EditIcon from '@components/Icon/EditIcon'
import XCircleIcon from '@components/Icon/XCircleIcon'
import ROUTE from 'src/constants/route'
import dayjs from 'src/utils/dayjs'

import { IAccount } from '../Account'

export interface Column {
  title: string
  dataIndex: string
  sortAvailable?: boolean
}

export interface ResponsiveAccountCardProps extends HTMLAttributes<HTMLDivElement> {
  key: string
  columns: Column[]
  rowData: IAccount
}

const ResponsiveAccountCard: FC<ResponsiveAccountCardProps> = ({ rowData }) => {
  const IconRender = (e: boolean) => {
    return <div className="flex items-center justify-center">{e ? <CheckIcon color="white" /> : <XCircleIcon color="white" />}</div>
  }

  return (
    <div className="w-full rounded-lg border border-gray-200 p-8 shadow-2xl md:hidden">
      <div className="flex flex-col gap-2 font-semibold">
        <div className="flex gap-2">
          <AccountBadges size={'sm'} status={rowData.status} className="capitalize" rounded>
            {typeof rowData?.status === 'string' && rowData?.status}
          </AccountBadges>
          <Badges size={'sm'} status={rowData.enabled ? 'success' : 'error'} className="flex flex-row capitalize" rounded>
            <div className="flex gap-2">
              {IconRender(rowData.enabled)}
              {rowData.enabled ? 'Enabled' : 'Disabled'}
            </div>
          </Badges>
        </div>
        <div className="flex gap-2 text-gray-900">
          <Image alt="instagram" src="/account/InstagramLogo.svg" className="" width={24} height={24}></Image>
          <h3 className="text-l font-extrabold">{rowData.username}</h3>
        </div>
        <div className="flex flex-row font-semibold">
          <span>Created On:</span>
          <span className="ml-2 ">{dayjs(rowData.created_at, 'YYYY-MM-DD THH:mm:ss').local().format('DD MMM YYYY')}</span>
        </div>
        <div className="my-2 flex flex-row">
          <h3 className="font-normal">Post Scrapped: {rowData.post_scrapped_count}</h3>
        </div>
        <Link
          href={{
            pathname: ROUTE.ACCOUNT_BOT_GET,
            query: { id: rowData.id },
          }}
          as="/accounts/bot"
          legacyBehavior
        >
          <div className="flex w-full flex-row items-center justify-center gap-2">
            <EditIcon size={16} className="fill-accent2-500" />
            <div className="font-semibold text-accent2-500">Edit</div>
          </div>
        </Link>
      </div>
    </div>
  )
}
export default ResponsiveAccountCard
