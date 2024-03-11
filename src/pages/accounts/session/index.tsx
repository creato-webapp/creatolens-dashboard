import React, { useState, useCallback } from 'react'
import Card from '@components/Card'
import { Table } from '@components/Table'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import { useAccountSessionPagination } from 'src/hooks/useAccountSession'
import { GetSessionPagination, PaginationParams, PaginationMetadata } from '@services/Account/Session'
import { Form } from '@components/Form'
import Pagination from '@components/Pagination'
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { IGenericRowData } from '@components/Table/Row'
import { Cookies } from '@lib/Account/Account/interface'

type Props = {
  paginationData: PaginationMetadata<IAccountSession[]>
}

interface AccountSessionPaginationParams extends PaginationParams {
  username?: string | null
}
export interface IAccountSession extends IGenericRowData {
  account_id: string
  created_at: string
  trace_id: string
  updated_at: string
  username: string
  session_cookies: Cookies
}
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{ paginationData?: PaginationMetadata<IAccountSession[]> }>> => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/some-destination',
        permanent: false,
      },
    }
  }

  const paginationProps = {
    username: null,
    pageNumber: 1,
    pageSize: 10,
    orderBy: 'created_at',
    isAsc: false,
  }
  const response = await GetSessionPagination(paginationProps)
  const paginationData: PaginationMetadata<IAccountSession[]> = {
    data: response ? response?.data : [],
    has_next: response ? response.has_next : false,
    has_prev: response ? response.has_prev : false,
    page: response ? response.page : 1,
    size: response ? response.size : 0,
    total_items: response ? response.total_items : 0,
  }
  return { props: { paginationData } }
}

const AccountsSessionPage = ({ paginationData }: Props) => {
  const [pageParams, setPageParams] = useState<AccountSessionPaginationParams>({
    username: null,
    pageNumber: 1,
    pageSize: 10,
    orderBy: 'created_at',
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
      orderBy: 'created_at',
      isAsc: false,
      username: e.target.value,
    }))
  }, [])

  const { sessions: responseData, isLoading, error } = useAccountSessionPagination(pageParams, true, paginationData)

  const accountSession: IAccountSession[] = responseData?.data ? responseData.data : []
  if (error) {
    console.error(responseData)
    console.error(error)
    return <div>Failed to load account error data</div>
  }
  if (!responseData) {
    console.error('No response data', responseData)
    return <div>Loading...</div>
  }
  const columns = [
    {
      title: 'account_id',
      dataIndex: 'account_id',
      render: (e: string) => {
        if (e === 'empty account_id') {
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
      dataIndex: 'username',
      render: (e: string) => {
        return (
          <Link href="/accounts/[id]" as={`/accounts/${e}`} legacyBehavior>
            <a style={{ color: '#0070f3' }}>{e}</a>
          </Link>
        )
      },
    },
    {
      title: 'created_at(HK Time)',
      dataIndex: 'created_at',
      render: (e: string) => {
        const date = dayjs(e, 'YYYY-MM-DD THH:mm:ss')
        return dayjs.utc(date).local().format('YYYY-MM-DD HH:mm:ss')
      },
    },
    { title: 'session', dataIndex: 'session_cookies.csrftoken' },
    { title: 'trace_id', dataIndex: 'trace_id' },
  ]

  return (
    <Card title="Login Session History">
      <Form.BaseInput
        placeholder="Search Account Username 'test@role'"
        className="order-shades-100 block w-full rounded-lg border p-2  text-slate-600 placeholder-slate-400 outline-none focus:border-slate-700 focus:outline-none"
        onChange={(e) => onChange(e)}
      ></Form.BaseInput>
      <div className="flex gap-3">
        <Table.Layout>
          <Table.Header columns={columns} />
          <Table.Body>
            {accountSession.map((e, index) => (
              <Table.Row key={`accountSession-table-row-${index}`} columns={columns} rowData={e} rowKey={index} />
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
export default AccountsSessionPage
