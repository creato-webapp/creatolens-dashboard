import { HTMLAttributes, FC } from 'react'
import Link from 'next/link'
import Badges, { Status } from '@components/Badges'
import Image from 'next/image'
import XCircleIcon from '@components/Icon/XCircleIcon'
import CheckIcon from '@components/Icon/CheckIcon'
import EditIcon from '@components/Icon/EditIcon'

const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

export interface rowData {
  [key: string]: any
}

export interface Column {
  title: string
  dataIndex: string
  render?: Function
}

export interface ResponsiveAccountCardProps extends HTMLAttributes<HTMLDivElement> {
  key: string
  columns: Column[]
  rowData: rowData
}

const ResponsiveAccountCard: FC<ResponsiveAccountCardProps> = (props: ResponsiveAccountCardProps) => {
  const statusToVariantMap: Record<string, Status> = {
    active: 'success',
    retry: 'warning',
    blocked: 'error',
    disabled: 'disabled',
    test: 'secondary',
    banned: 'error',
  }

  const status: Status = statusToVariantMap[props.rowData?.status]
  const IconRender = (e: boolean) => {
    return <div className="flex items-center justify-center">{e ? <CheckIcon color="white" /> : <XCircleIcon color="white" />}</div>
  }

  return (
    <div className="w-full g rounded-lg border border-gray-200 p-8 shadow-2xl md:hidden">
      <div className="flex flex-col gap-2 font-semibold">
        <div className="flex gap-2">
          <Badges size={'sm'} status={status} className="capitalize" rounded>
            {props.rowData?.status}
          </Badges>
          <Badges size={'sm'} status={props.rowData?.enabled ? 'success' : 'error'} className="flex flex-row capitalize" rounded>
            <div className="flex gap-2">
              {IconRender(props.rowData?.enabled)}
              {props.rowData?.enabled ? 'enabled' : 'disabled'}
            </div>
          </Badges>
        </div>
        <div className="flex gap-2 text-gray-900">
          <Image alt="instagram" src="/account/InstagramLogo.svg" className="" width={24} height={24}></Image>
          <h3 className="text-l font-extrabold">{props.rowData?.username}</h3>
        </div>
        <div className="flex flex-row font-semibold">
          <span>Created On:</span>
          <span className="ml-2 ">{dayjs(props.rowData?.created_at, 'YYYY-MM-DD THH:mm:ss').local().format('DD MMM YYYY')}</span>
        </div>
        <div className="my-2 flex flex-row">
          <h3 className="font-normal">Post Scrapped: {props.rowData?.post_scrapped_count}</h3>
        </div>
        <Link href="/accounts/[id]" as={`/accounts/${props.rowData?.id}`} legacyBehavior>
          <a className="flex w-full flex-row items-center justify-center gap-2">
            <EditIcon size={16} className="fill-accent2-500" />
            <div className="font-semibold text-accent2-500">Edit</div>
          </a>
        </Link>
      </div>
    </div>
  )
}
export default ResponsiveAccountCard
