import React, { useState, useCallback } from 'react'
import Card from '@components/Card'
import { Table } from '@components/Table'
import { IAccountError } from '@lib/Account/AccountErrors/interface'
import Link from 'next/link'
import { Form } from '@components/Form'
import { useAccountErrorPagination } from 'src/hooks/useAccountErrors'
import { getErrorPagination } from '@services/Account/AccountErros'
import Pagination from '@components/Pagination'
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { PaginationMetadata, PaginationParams } from '@services/Account/AccountInterface'
import dayjs from '@services/Dayjs'

type Props = {
  paginationData: PaginationMetadata<IAccountError[]>
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> => {
  const paginationProps = {
    username: null,
    pageNumber: 1,
    pageSize: 10,
    orderBy: 'occurred_at',
    isAsc: false,
  }
  const response = await getErrorPagination(paginationProps, {
    headers: {
      Cookie: context.req.headers.cookie,
    },
  })
  const paginationData: PaginationMetadata<IAccountError[]> = {
    data: response?.data ?? [],
    has_next: response?.has_next ?? false,
    has_prev: response?.has_prev ?? false,
    page: response?.page ?? 1,
    size: response?.size ?? 0,
    total_items: response?.total_items ?? 0,
  }
  return { props: { paginationData } }
}

const AccountsErrorPage = (paginationData: PaginationMetadata<IAccountError[]>) => {
  const [pageParams, setPageParams] = useState<PaginationParams>({
    username: null,
    pageNumber: 1,
    pageSize: 10,
    orderBy: 'occurred_at',
    isAsc: false,
  })

  const [shouldFetch, setShouldFetch] = useState(false)
  const { errors: responseData, isLoading, error } = useAccountErrorPagination(pageParams, shouldFetch, paginationData)
  const accountError: IAccountError[] = responseData?.data ? responseData.data : []

  const onPageChange = (newPage: number) => {
    setPageParams((prevParams) => ({
      ...prevParams,
      pageNumber: newPage,
    }))
    setShouldFetch(true)
  }

  const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) =>
      setPageParams((prevParams) => ({
        ...prevParams,
        pageNumber: 1,
        pageSize: 10,
        orderBy: 'occurred_at',
        isAsc: false,
        username: e.target.value,
      })),
    []
  )
  if (error) {
    return <div>Failed to load account error data</div>
  }
  if (!responseData) {
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
            <div style={{ color: '#0070f3', cursor: 'pointer' }}>{e}</div>
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
            <div style={{ color: '#0070f3', cursor: 'pointer' }}>{e}</div>
          </Link>
        )
      },
    },
    {
      title: 'occurred_at(HK Time)',
      dataIndex: 'occurred_at',
      render: (e: string) => {
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
              <Table.Row key={`account-error-${index}`} columns={columns} rowData={e} rowKey={index} />
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
