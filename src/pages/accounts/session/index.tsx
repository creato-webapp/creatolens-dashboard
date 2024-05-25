import React, { useState, useCallback } from 'react'
import Card from '@components/Card'
import { Table } from '@components/Table'
import Link from 'next/link'
import { useAccountSessionPagination } from 'src/hooks/useAccountSession'
import { getSessionPagination } from '@services/Account/Session'
import { Form } from '@components/Form'
import Pagination from '@components/Pagination'
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { IGenericRowData } from '@components/Table/Row'
import { Cookies } from '@lib/Account/Account/interface'
import dayjs from '@services/Dayjs'
import { PaginationMetadata, usePagination } from '@hooks/usePagination'

type Props = {
  paginationData: PaginationMetadata<IAccountSession[]>
}

export interface IAccountSession extends IGenericRowData {
  account_id: string
  created_at: string
  trace_id: string
  updated_at: string
  username: string
  session_cookies: Cookies
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> => {
  const paginationProps = {
    username: null,
    pageNumber: 1,
    pageSize: 10,
    orderBy: 'created_at',
    isAsc: false,
  }
  const response = await getSessionPagination(paginationProps, {
    headers: {
      Cookie: context.req.headers.cookie,
    },
  })
  const paginationData: PaginationMetadata<IAccountSession[]> = {
    data: response?.data ?? [],
    page: response?.page ?? 1,
    size: response?.size ?? 0,
    total_items: response?.total_items ?? 0,
  }
  return { props: { paginationData } }
}

const AccountsSessionPage = ({ paginationData }: Props) => {
  const [filter, setFilter] = useState('')
  const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    if (!e.target.value || e.target.value === ' ') return
    setFilter(e.target.value)
  }, [])
  const { pageParams, onPageClick, onNextClick, onPrevClick } = usePagination()
  const { sessions: responseData, isLoading, error } = useAccountSessionPagination(pageParams, filter, paginationData)

  const accountSession: IAccountSession[] = responseData?.data ? responseData.data : []
  if (error) {
    return <div>Failed to load account error data</div>
  }
  if (!responseData) {
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
            <div style={{ color: '#0070f3', cursor: 'pointer' }}>{e}</div>
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
            <div style={{ color: '#0070f3', cursor: 'pointer' }}>{e}</div>
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
            {!isLoading && accountSession.map((e, index) => (
              <Table.Row key={`accountSession-table-row-${index}`} columns={columns} rowData={e} rowKey={index} />
            ))}
          </Table.Body>
        </Table.Layout>
      </div>
      <Pagination<IAccountSession[]>
        isLoading={isLoading}
        data={responseData}
        onNextClick={onNextClick}
        onPrevClick={onPrevClick}
        onPageClick={onPageClick}
      />
    </Card>
  )
}
export default AccountsSessionPage
