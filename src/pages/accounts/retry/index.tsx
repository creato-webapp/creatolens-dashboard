import React, { useState, useCallback } from 'react'
import Card from '@components/Card'
import { Table } from '@components/Table'
import { Button } from '@components/Button'
import { IRetryAccount } from '@lib/Account/Account/interface'
import Link from 'next/link'
import Tag from '@components/Tag'
import Avatar from '@components/Avatar'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'
import StatusTag, { Status } from '@lib/StatusTag'
import Pagination from '@components/Pagination'
import { useGetRetryAccountsPagination } from 'src/hooks/useRetryAccount'
import { getRetryAccountsPagination } from '@services/Account/RetryAccount'
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { PaginationMetadata } from '@services/Account/AccountInterface'
import dayjs from '@services/Dayjs'

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
    has_next: response?.has_next ?? false,
    has_prev: response?.has_prev ?? false,
    page: response?.page ?? 1,
    size: response?.size ?? 0,
    total_items: response?.total_items ?? 0,
  }
  return { props: { paginationData } }
}

const RetryAccountsPage = ({ paginationData }: Props) => {
  const [pageParams, setPageParams] = useState({
    pageNumber: 1,
    pageSize: 10,
    orderBy: 'username',
    isAsc: false,
  })
  const [shouldFetch, setShouldFetch] = useState(false)
  const { accounts: responseData, error } = useGetRetryAccountsPagination(pageParams, shouldFetch, paginationData)
  const accounts: IRetryAccount[] = responseData?.data || []
  const isLoading = !responseData && !error

  const onPageChange = (newPage: number) => {
    setPageParams((prevParams) => ({
      ...prevParams,
      pageNumber: newPage,
    }))
    setShouldFetch(true)
  }

  const updateSorting = useCallback(
    (orderBy: string, isAsc: boolean): React.MouseEventHandler<HTMLDivElement> =>
      () => {
        setPageParams((prevParams) => ({
          ...prevParams,
          orderBy: orderBy,
          isAsc: isAsc,
        }))
      },
    []
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
        <Link href="/accounts/retry/[id]" as={`/accounts/retry/${e}`} legacyBehavior>
          <Button.Text loading={false}>Edit</Button.Text>
        </Link>
      ),
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
            pageParams={pageParams}
            updateSorting={updateSorting}
          />
          <Table.Header columns={columns} />
          <Table.Body>
            {accounts?.map((e, index) => {
              return <Table.Row key={`retry-account-table-${index}`} columns={columns} rowData={e} rowKey={index} />
            })}
          </Table.Body>
        </Table.Layout>
      </div>
      <Pagination
        isLoading={isLoading}
        page={responseData.page}
        size={responseData.size}
        totalItems={responseData.total_items}
        hasNext={responseData.has_next}
        hasPrev={responseData.has_prev}
        onPageChange={onPageChange}
      />
    </Card>
  )
}

export default RetryAccountsPage
