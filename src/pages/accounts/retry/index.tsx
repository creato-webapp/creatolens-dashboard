import React, { useState, useEffect } from 'react'
import Card from '@components/Card'
import { Table } from '@components/Table'
import { Button } from '@components/Button'
import { IRetryAccount } from '@lib/Account/Account/interface'
import Link from 'next/link'
import { getSession } from 'next-auth/react'
import Tag from '@components/Tag'
import Avatar from '@components/Avatar'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'
import StatusTag, { Status } from '@lib/StatusTag'
import Pagination from '@components/Pagination'
import { useGetRetryAccountsPagination } from 'src/hooks/useRetryAccount'
import { GetRetryAccountsPagination } from '@services/Account/RetryAccount'
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { PaginationMetadata } from '@services/Account/AccountInterface'
import dayjs from '@services/Dayjs'

type Props = {
  paginationData: PaginationMetadata<IRetryAccount[]>
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{ paginationData?: PaginationMetadata<IRetryAccount[]> }>> => {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }
  }
  const paginationProps = {
    pageNumber: 1,
    pageSize: 10,
    orderBy: 'username',
    isAsc: false,
  }
  const response = await GetRetryAccountsPagination(paginationProps)
  const accountData: IRetryAccount[] = response ? response.data : []

  const paginationData: PaginationMetadata<IRetryAccount[]> = {
    data: accountData,
    has_next: response ? response.has_next : false,
    has_prev: response ? response.has_prev : false,
    page: response ? response.page : 1,
    size: response ? response.size : 0,
    total_items: response ? response.total_items : 0,
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
  const { accounts: responseData, error, mutate } = useGetRetryAccountsPagination(pageParams, true, paginationData)

  const accounts: IRetryAccount[] = responseData?.data || []
  const isLoading = !responseData && !error
  const onPageChange = (newPage: number) => {
    setPageParams((prevParams) => ({
      ...prevParams,
      pageNumber: newPage,
    }))
  }

  useEffect(() => {
    if (pageParams.pageNumber !== 1) {
      mutate()
    }
  }, [pageParams])

  if (error) {
    console.error(responseData)
    console.error(error)
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
      <div className="flex gap-3">
        <Link href="/accounts/create-account">
          <Button.Primary loading={false}>Create New Retry Account</Button.Primary>
        </Link>
        <Button.Primary
          onClick={() => {
            setPageParams({
              pageNumber: 1,
              pageSize: 10,
              orderBy: 'username',
              isAsc: true,
            })
          }}
        >
          Change order
        </Button.Primary>
        <Button.Primary
          onClick={() => {
            setPageParams({
              pageNumber: 1,
              pageSize: 10,
              orderBy: 'username',
              isAsc: false,
            })
          }}
        >
          Reset Params
        </Button.Primary>
      </div>
      <div className="hidden  md:flex">
        <Table.Layout>
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
