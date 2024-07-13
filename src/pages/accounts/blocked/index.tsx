import React, { useCallback } from 'react'

import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import Link from 'next/link'

import { IBlockedAccount } from '@components/Account/Account/interface'
import { AccountBadges } from '@components/Badges'
import Card from '@components/Card'
import EditIcon from '@components/Icon/EditIcon'
import Pagination from '@components/Pagination'
import { Table } from '@components/Table'
import ROUTE from '@constants/route'
import { usePagination } from '@hooks/usePagination'
import { PaginationMetadata } from '@services/Account/AccountInterface'
import { getBlockedAccountsPagination } from '@services/Account/BlockAccount'
import { useGetBlockAccountsPagination } from 'hooks/useBlockedAccount'

type Props = {
  paginationData: PaginationMetadata<IBlockedAccount[]>
}
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Record<string, unknown>>> => {
  const paginationProps = {
    pageNumber: 1,
    pageSize: 10,
    orderBy: 'username',
    isAsc: false,
  }
  const cookies = context.req.headers.cookie
  const response = await getBlockedAccountsPagination(paginationProps, {
    headers: {
      Cookie: cookies,
    },
  })
  const paginationData: PaginationMetadata<IBlockedAccount[]> = {
    data: response?.data ?? [],
    page: response?.page ?? 1,
    size: response?.size ?? 0,
    total_items: response?.total_items ?? 0,
    has_next: response?.has_next ?? false,
    has_prev: response?.has_prev ?? false,
  }
  return { props: { paginationData } }
}

const BlockedAccountsPage = ({ paginationData }: Props) => {
  // const [usernameFilter, setUsernameFilter] = useState('')
  const { pageParams, onPageClick, updateSort, updateOrderBy, onNextClick, onPrevClick } = usePagination()

  const { accounts: responseData, isLoading, error } = useGetBlockAccountsPagination(pageParams, paginationData)
  const accounts: IBlockedAccount[] = responseData?.data || []

  const updateSorting = useCallback(
    (orderBy: string, isAsc: boolean): React.MouseEventHandler<HTMLDivElement> =>
      () => {
        updateSort(isAsc)
        updateOrderBy(orderBy)
      },
    [updateSort, updateOrderBy]
  )

  if (error) {
    throw new Error('Error fetching data')
  }
  if (!responseData) {
    return <div>Loading...</div>
  }

  const columns = [
    {
      title: 'Blocked At(HK Time)',
      dataIndex: 'blocked_at',
    },
    { title: 'Post Scrapped', dataIndex: 'post_scrapped_count' },
    { title: 'Login Count', dataIndex: 'login_count' },
    {
      title: 'Username',
      dataIndex: 'username',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Is Occupied',
      dataIndex: 'is_occupied',
    },
    {
      title: 'Is Enabled',
      dataIndex: 'enabled',
    },
    {
      title: 'Is Auth',
      dataIndex: 'is_authenticated',
    },

    {
      title: 'Account Info',
      dataIndex: 'id',
    },
  ]

  return (
    <Card title="Accounts Table">
      <div className="hidden overflow-auto md:flex">
        <Table.Layout>
          <Table.Header
            columns={columns}
            thClassName={'text-sm font-normal text-text-primary items-center justify-center'}
            className="capitalize"
            orderBy={pageParams.orderBy}
            isAsc={pageParams.isAsc}
            updateSorting={updateSorting}
          />
          <Table.Body className="text-sm font-normal leading-5 text-black">
            {accounts.map((e, index) => (
              <Table.Row key={`table-row-${e.id}-${index}`} className="text-sm">
                <Table.DateTimeCell key={`blocked-at-${e.id}`} date={e.blocked_at} />
                <Table.DateTimeCell key={`created_at-${e.id}`} date={e.created_at} />
                <Table.BodyCell key={`blocked-count-${e.id}`}>{e.blocked_count}</Table.BodyCell>
                <Table.BodyCell key={`last-login-dt-${e.last_login_dt}`}></Table.BodyCell>
                <Table.BodyCell key={`username-${e.id}`}>
                  <div className="flex items-center text-nowrap text-accent1-600">{e.username}</div>
                </Table.BodyCell>
                <Table.BodyCell key={`status-${e.id}`}>
                  <AccountBadges status={e.status} />
                </Table.BodyCell>
                <Table.BodyCell key={e.id}>
                  <Link
                    href={{
                      pathname: ROUTE.ACCOUNT_BOT_GET,
                      query: { id: e.id },
                    }}
                    as="/accounts/bot"
                    legacyBehavior
                  >
                    <div className="flex w-full cursor-pointer flex-row items-center justify-center gap-2">
                      <EditIcon size={16} className="fill-accent2-500" />
                      <div className="font-semibold text-accent2-500">Edit</div>
                    </div>
                  </Link>
                </Table.BodyCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Layout>
      </div>
      <Pagination<IBlockedAccount[]>
        isLoading={isLoading}
        data={responseData}
        onNextClick={onNextClick}
        onPageClick={onPageClick}
        onPrevClick={onPrevClick}
      />
    </Card>
  )
}

export default BlockedAccountsPage
