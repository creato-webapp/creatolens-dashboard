import React, { useState, useEffect } from 'react'
import Card from '@components/Card'
import { Table } from '@components/Table'
import { Button } from '@components/Button'
import { IAccount } from '@lib/Account/Account/interface'
import { ResponsiveAccountCard } from '@lib/Account/ResponsiveAccountCard'
import Link from 'next/link'
import { getSession } from 'next-auth/react'
import Tag from '@components/Tag'
import Avatar from '@components/Avatar'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'
import StatusTag from '@lib/StatusTag'
import Pagination from '@components/Pagination'
import { useGetAccountsPagination } from 'src/hooks/useAccount'
import { GetAccountsPagination, PaginationMetadata } from '@services/Account/Account'
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

type Props = {
  paginationData: PaginationMetadata
}

//TODO getServerSideProps: GetServerSideProps; cannot set GetServerSideProps type.
export const getServerSideProps = async (context: any) => {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
      },
    }
  }
  const paginationProps = {
    pageNumber: 1,
    pageSize: 10,
    orderBy: 'created_at',
    isAsc: false,
  }
  const cookies = context.req.headers.cookie
  const response = await GetAccountsPagination(paginationProps, {
    headers: {
      Cookie: cookies, // Forward the cookies to the server-side request
    },
  })
  // Pass data to the page via props
  const accountData: IAccount[] = response ? response?.data : []
  console.log(response)
  const paginationData: PaginationMetadata = {
    data: accountData,
    has_next: response ? response.has_next : false,
    has_prev: response ? response.has_prev : false,
    page: response ? response.page : 1,
    size: response ? response.size : 0,
    total_items: response ? response.total_items : 0,
  }
  return { props: { paginationData } }
}

const AccountsPage = ({ paginationData }: Props) => {
  const [pageParams, setPageParams] = useState({
    pageNumber: 1,
    pageSize: 10,
    orderBy: 'created_at',
    isAsc: false,
  })
  const { accounts: responseData, error, mutate } = useGetAccountsPagination(pageParams, true, paginationData)

  const accounts: IAccount[] = responseData?.data || []
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
    console.log(responseData)
    console.log(error)
    return <div>Failed to load users</div>
  }
  if (!responseData) {
    console.log(responseData)
    return <div>Loading...</div>
  }

  const columns = [
    {
      title: 'Created At(HK Time)',
      dataIndex: 'created_at',
      render: (e: any) => {
        const date = dayjs(e, 'YYYY-MM-DD THH:mm:ss')
        return dayjs.utc(date).local().format('YYYY-MM-DD HH:mm:ss')
      },
    },
    { title: 'Post Scrapped', dataIndex: 'post_scrapped_count' },
    { title: 'Login Count', dataIndex: 'login_count' },
    {
      title: 'Username',
      dataIndex: 'username',
      render: (e: any) => {
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
      render: (e: any) => {
        return <StatusTag status={e} />
      },
    },
    {
      title: 'Is Occupied',
      dataIndex: 'is_occupied',
      render: (e: any) => {
        return e ? <CheckCircleIcon className="h-6 w-6 text-successful-600" /> : <XCircleIcon className="h-6 w-6 text-error-500" />
      },
    },
    {
      title: 'Is Enabled',
      dataIndex: 'enabled',
      render: (e: any) => {
        return e ? <CheckCircleIcon className="h-6 w-6 text-successful-600" /> : <XCircleIcon className="h-6 w-6 text-error-500" />
      },
    },
    {
      title: 'Is Auth',
      dataIndex: 'is_authenticated',
      render: (e: any) => {
        return e ? <CheckCircleIcon className="h-6 w-6 text-successful-600" /> : <XCircleIcon className="h-6 w-6 text-error-500" />
      },
    },
    {
      title: 'Created By',
      dataIndex: 'created_by',
    },
    {
      title: 'Account Info',
      dataIndex: 'id',
      render: (e: any) => (
        <Link href="/accounts/[id]" as={`/accounts/${e}`} legacyBehavior>
          <a>
            <Button.Text>Edit</Button.Text>
          </a>
        </Link>
      ),
    },
  ]

  return (
    <Card title="Accounts Table">
      <div className="flex gap-3">
        <Link href="/accounts/create-account">
          <a>
            <Button.Primary>Create New Account</Button.Primary>
          </a>
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
              orderBy: 'created_at',
              isAsc: false,
            })
          }}
        >
          Reset Params
        </Button.Primary>
      </div>
      {/* desktop */}
      <div className="hidden  md:flex">
        <Table.Layout>
          <Table.Header columns={columns} />

          <Table.Body>
            {accounts?.map((e, index) => (
              <Table.Row columns={columns} rowData={e} rowKey={index} />
            ))}
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

      <div className="hidden flex-col sm:flex">
        {accounts?.map((e, index) => (
          <ResponsiveAccountCard columns={columns} rowData={e} key={index} />
        ))}
      </div>
    </Card>
  )
}

export default AccountsPage