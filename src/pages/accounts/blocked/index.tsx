import React, { useCallback } from 'react'
import Card from '@components/Card'
import { Table } from '@components/Table'
import { Button } from '@components/Button'
import { IBlockedAccount } from '@lib/Account/Account/interface'
import Link from 'next/link'
import Tag from '@components/Tag'
import Avatar from '@components/Avatar'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'
import StatusTag, { Status } from '@lib/StatusTag'
import Pagination from '@components/Pagination'
import { useGetBlockAccountsPagination } from 'src/hooks/useBlockedAccount'
import { getBlockedAccountsPagination } from '@services/Account/BlockAccount'
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import dayjs from '@services/Dayjs'
import { PaginationMetadata, usePagination } from '@hooks/usePagination'

type Props = {
  paginationData: PaginationMetadata<IBlockedAccount[]>
}
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<{}>> => {
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
  }
  return { props: { paginationData } }
}

const BlockedAccountsPage = ({ paginationData }: Props) => {
  const { pageParams, onPageClick, updateSort, updateOrderBy, onNextClick, onPrevClick } = usePagination()
  const { accounts: responseData, isLoading, error } = useGetBlockAccountsPagination(pageParams, paginationData)
  const accounts: IBlockedAccount[] = responseData?.data || []

  const updateSorting = useCallback(
    (orderBy: string, isAsc: boolean): React.MouseEventHandler<HTMLDivElement> =>
      () => {
        updateSort(isAsc)
        updateOrderBy(orderBy)
      },
    []
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
      render: (e: string) => {
        const date = dayjs(e, 'YYYY-MM-DD THH:mm:ss')
        return dayjs.utc(date).local().format('YYYY-MM-DD HH:mm:ss')
      },
    },
    { title: 'Post Scrapped', dataIndex: 'post_scrapped_count' },
    { title: 'Login Count', dataIndex: 'login_count' },
    {
      title: 'Username',
      dataIndex: 'username',
      render: (e: string) => {
        return (
          <Tag
            label={
              <div className="flex items-center gap-1">
                <Avatar />
                {e}
              </div>
            }
            variant="outline"
          />
        )
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (e: Status) => {
        return <StatusTag status={e} />
      },
    },
    {
      title: 'Is Occupied',
      dataIndex: 'is_occupied',
      render: (e: boolean) => {
        return e ? <CheckCircleIcon className="h-6 w-6 text-successful-600" /> : <XCircleIcon className="h-6 w-6 text-error-500" />
      },
    },
    {
      title: 'Is Enabled',
      dataIndex: 'enabled',
      render: (e: boolean) => {
        return e ? <CheckCircleIcon className="h-6 w-6 text-successful-600" /> : <XCircleIcon className="h-6 w-6 text-error-500" />
      },
    },
    {
      title: 'Is Auth',
      dataIndex: 'is_authenticated',
      render: (e: boolean) => {
        return e ? <CheckCircleIcon className="h-6 w-6 text-successful-600" /> : <XCircleIcon className="h-6 w-6 text-error-500" />
      },
    },

    {
      title: 'Account Info',
      dataIndex: 'id',
      render: (e: string) => (
        <Link href="/accounts/blocked/[id]" as={`/accounts/blocked/${e}`} legacyBehavior>
          <Button.Text loading={false}>Edit</Button.Text>
        </Link>
      ),
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
            pageParams={pageParams}
            updateSorting={updateSorting}
          />
          <Table.Body className="text-sm font-normal leading-5 text-black">
            {accounts?.map((e, index) => (
              <Table.Row key={`accounts-table-${index}`} columns={columns} className="text-sm" rowData={e} rowKey={index} />
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
