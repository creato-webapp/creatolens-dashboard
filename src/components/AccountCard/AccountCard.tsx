import { ReactNode, PropsWithChildren, FC } from 'react'
import AccountField from './AccountField'
import Link from 'next/link'

export interface rowData {
  [key: string]: any
}

export interface Column {
  title: string
  dataIndex: string
  render?: Function
}

export interface AccountCardProps extends PropsWithChildren {
  key: number
  columns: Column[]
  rowData: rowData
}

const AccountCard: FC<AccountCardProps> = (props: AccountCardProps) => {
  return (
    <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-2 shadow sm:p-8">
      <h5 className="text-l mb-4 font-medium text-gray-500">
        {props.rowData?.id}
      </h5>
      <div className="flex text-gray-900">
        <span className="text-l font-semibold">{props.rowData?.username}</span>
      </div>
      {/* <!-- List --> */}
      <ul role="list" className="space-5 my-7 flex-wrap">
        <AccountField title="status" value={props.rowData?.status} />
        <AccountField title="IS OCCUPIED" value={props.rowData?.is_occupied} />
        <AccountField title="IS ENABLED" value={props.rowData?.enabled} />
        <AccountField title="IS_AUTH" value={props.rowData?.is_authenticated} />
        <AccountField title="LOGIN_COUNT" value={props.rowData?.login_count} />
        <AccountField
          title="POST_SCRAPPED"
          value={props.rowData?.post_scrapped_count}
        />
        <AccountField
          title="LAST_LOGIN_DT
          (HK TIME)"
          value={props.rowData?.last_login_dt}
        />
      </ul>
      <Link
        href="/accounts/[id]"
        as={`/accounts/${props.rowData?.id}`}
        legacyBehavior
      >
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-lg bg-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
        >
          Edit
        </button>
      </Link>
    </div>
  )
}
export default AccountCard
