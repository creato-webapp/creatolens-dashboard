import React, { useState, useCallback } from 'react'
import Card from '@components/Card'
import { Table } from '@components/Table'
import { IAccountError } from '@lib/Account/AccountErrors/interface'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import { Form } from '@components/Form'
import { ScrapperFetcher } from 'services/ScrapperFetcher'
import { useGetErrorPagination } from 'hooks/useLoginError'
import { PaginationParams, PaginationMetadata } from 'hooks/usePagination'
import Pagination from '@components/Pagination'
type Props = {
  paginationData: PaginationMetadata
}

interface AccountErrorPaginationParams extends PaginationParams {
  username?: string | null
}

const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/login',
      },
    }
  }
  // Fetch data from next API
  const response = await ScrapperFetcher.GET(`${process.env.LOCAL_SERVER_URL}/api/accounts-error`, {
    username: null,
    pageNumber: 1,
    pageSize: 10,
    orderBy: 'occurred_at',
    isAsc: false,
  })

  const accountData: IAccountError[] = response ? response.data : []

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

const AccountsErrorPage = ({ paginationData }: Props) => {
  const [pageParams, setPageParams] = useState<AccountErrorPaginationParams>({
    username: null,
    pageNumber: 1,
    pageSize: 10,
    orderBy: 'occurred_at',
    isAsc: false,
  })

  const onPageChange = (newPage: number) => {
    setPageParams((prevParams) => ({
      ...prevParams,
      pageNumber: newPage,
    }))
  }

  const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setPageParams(() => ({
      pageNumber: 1,
      pageSize: 10,
      orderBy: 'occurred_at',
      isAsc: false,
      username: e.target.value,
    }))
  }, [])

  const { accountErrors: responseData, isLoading, error } = useGetErrorPagination(`/api/accounts-error`, pageParams, true, paginationData)
  const accountError: IAccountError[] = responseData?.data ? responseData.data : []
  if (error) {
    console.log(responseData)
    console.log(error)
    return <div>Failed to load account error data</div>
  }
  if (!responseData) {
    console.log(responseData)
    return <div>Loading...</div>
  }

  const columns = [
    {
      title: 'document_id',
      dataIndex: 'document_id',
      render: (e: string) => {
        if (e === 'empty document_id') {
          return ''
        }
        return (
          <Link href="/accounts/[id]" as={`/accounts/${e}`} legacyBehavior>
            <a style={{ color: '#0070f3' }}>{e}</a>
          </Link>
        )
      },
    },
    {
      title: 'account',
      dataIndex: 'account',
      render: (e: string) => {
        return (
          <Link href="/accounts/[id]" as={`/accounts/${e}`} legacyBehavior>
            <a style={{ color: '#0070f3' }}>{e}</a>
          </Link>
        )
      },
    },
    {
      title: 'occurred_at(HK Time)',
      dataIndex: 'occurred_at',
      render: (e: any) => {
        const date = dayjs(e, 'YYYY-MM-DD THH:mm:ss')
        return dayjs.utc(date).local().format('YYYY-MM-DD HH:mm:ss')
      },
    },
    { title: 'exception', dataIndex: 'exception' },
    { title: 'trace_id', dataIndex: 'trace_id' },
  ]

  return (
    <Card title="Login Error History">
      <Form.BaseInput
        placeholder="Search Account Username 'test@role'"
        className="order-shades-100 block w-full rounded-lg border p-2  text-slate-600 placeholder-slate-400 outline-none focus:border-slate-700 focus:outline-none"
        onChange={(e) => onChange(e)}
      ></Form.BaseInput>
      <div className="flex gap-3">
        <Table.Layout>
          <Table.Header columns={columns} />
          <Table.Body>
            {accountError.map((e, index) => (
              <Table.Row columns={columns} rowData={e} key={index} />
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
    </Card>
  )
}
export default AccountsErrorPage
