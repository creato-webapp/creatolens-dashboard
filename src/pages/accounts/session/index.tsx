import React, { useCallback, useState } from 'react'

import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

import { Cookies } from '@components/Account/Account/interface'
import Card from '@components/Card'
import { Form } from '@components/Form'
import Pagination from '@components/Pagination'
import { Table } from '@components/Table'
import { useAccountSessionPagination } from '@hooks/useAccountSession'
import { usePagination } from '@hooks/usePagination'
import { PaginationMetadata, getSessionPagination } from '@services/Account/Session'

type Props = {
  paginationData: PaginationMetadata<IAccountSession[]>
}

export interface IAccountSession {
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
    has_next: response?.has_next ?? false,
    has_prev: response?.has_prev ?? false,
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
    },
    {
      title: 'account',
      dataIndex: 'username',
    },
    {
      title: 'created_at(HK Time)',
      dataIndex: 'created_at',
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
          <Table.Header columns={columns} isAsc={pageParams.isAsc} orderBy={pageParams.orderBy} />
          <Table.Body>
            {accountSession.map((e, index) => (
              <Table.Row key={`accountSession-table-row-${index}`}>
                <Table.BodyCell key={`account_id-${e.account_id}`}>{e.account_id}</Table.BodyCell>
                <Table.BodyCell key={`username-${e.username}`}>{e.username}</Table.BodyCell>
                <Table.DateTimeCell key={`created_at-${e.created_at}`} date={e.created_at} />
                <Table.BodyCell key={`session-${e.session_cookies.csrftoken}`}>{e.session_cookies.csrftoken}</Table.BodyCell>
                <Table.BodyCell key={`trace_id-${e.trace_id}`}>{e.trace_id}</Table.BodyCell>
              </Table.Row>
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
