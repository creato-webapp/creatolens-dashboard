import React, { useCallback } from 'react'

import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import Link from 'next/link'

import { IRetryAccount } from '@components/Account/Account/interface'
import AccountBadges from '@components/Account/AccountBadges'
import Card from '@components/Card'
import EditIcon from '@components/Icon/EditIcon'
import Pagination from '@components/Pagination'
import { Table } from '@components/Table'
import { usePagination } from '@hooks/usePagination'
import { PaginationMetadata } from '@services/Account/AccountInterface'
import { getRetryAccountsPagination } from '@services/Account/RetryAccount'
import { useGetRetryAccountsPagination } from 'hooks/useRetryAccount'

type Props = {
  paginationData: PaginationMetadata<IRetryAccount[]>
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> => {
  const paginationProps = {
    pageNumber: 1,
    pageSize: 10,
    orderBy: 'username',
    isAsc: false,
  }
  const response = await getRetryAccountsPagination(paginationProps, {
    headers: {
      Cookie: context.req.headers.cookie,
    },
  })
  const paginationData: PaginationMetadata<IRetryAccount[]> = {
    data: response?.data ?? [],
    page: response?.page ?? 1,
    size: response?.size ?? 0,
    total_items: response?.total_items ?? 0,
    has_next: response?.has_next ?? false,
    has_prev: response?.has_prev ?? false,
  }
  return { props: { paginationData } }
}

const RetryAccountsPage = ({ paginationData }: Props) => {
  const { pageParams, onPageClick, updateSort, updateOrderBy, onNextClick, onPrevClick } = usePagination()

  const { accounts: responseData, error, isLoading } = useGetRetryAccountsPagination(pageParams, paginationData)
  const accounts: IRetryAccount[] = responseData?.data || []

  const updateSorting = useCallback(
    (orderBy: string, isAsc: boolean): React.MouseEventHandler<HTMLDivElement> =>
      () => {
        updateSort(isAsc)
        updateOrderBy(orderBy)
      },
    [updateSort, updateOrderBy]
  )

  if (error) {
    return <div>Failed to load users</div>
  }
  if (!responseData) {
    return <div>Loading...</div>
  }

  const columns = [
    {
      title: 'Wait Until(HK Time)',
      dataIndex: 'wait_until',
    },
    { title: 'Login Count', dataIndex: 'login_count' },
    { title: 'Last Login Date', dataIndex: 'last_login_dt' },
    {
      title: 'Username',
      dataIndex: 'username',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },

    {
      title: 'Account Info',
      dataIndex: 'id',
    },
  ]

  return (
    <Card title="Accounts Table">
      <div className="hidden  md:flex">
        <Table.Layout>
          <Table.Header
            columns={columns}
            thClassName={'text-sm font-normal text-text-primary items-center justify-center'}
            className="capitalize"
            isAsc={pageParams.isAsc}
            orderBy={pageParams.orderBy}
            updateSorting={updateSorting}
          />
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
                <Table.DateTimeCell key={`wait-until-${e.id}`} date={e.wait_until} />
                <Table.BodyCell key={`login-count-${e.id}`}>{e.login_count}</Table.BodyCell>
                <Table.BodyCell key={`last-login-dt-${e.last_login_dt}`}></Table.BodyCell>
                <Table.BodyCell key={`username-${e.id}`}>
                  <div className="flex items-center text-nowrap text-accent1-600">{e.username}</div>
                </Table.BodyCell>
                <Table.BodyCell key={`status-${e.id}`}>
                  <AccountBadges status={e.status} />
                </Table.BodyCell>
                <Table.BodyCell key={e.id}>
                  <Link href="/accounts/[id]" as={`/accounts/${e.id}`} legacyBehavior>
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
      {responseData.total_items > responseData.size && (
        <Pagination<IRetryAccount[]>
          isLoading={isLoading}
          data={responseData}
          onNextClick={onNextClick}
          onPageClick={onPageClick}
          onPrevClick={onPrevClick}
        />
      )}
    </Card>
  )
}

export default RetryAccountsPage
