import React, { useCallback, useState } from 'react'

import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

import { IAccountError } from '@components/Account/AccountErrors/interface'
import Card from '@components/Card'
import { Form } from '@components/Form'
import Pagination from '@components/Pagination'
import { Table } from '@components/Table'
import { getErrorPagination } from '@services/Account/AccountErros'
import { PaginationMetadata } from '@services/Account/AccountInterface'
import ROUTE from 'src/constants/route'
import { useAccountErrorPagination } from 'src/hooks/useAccountErrors'
import dayjs from 'src/utils/dayjs'


type Props = {
  paginationData: PaginationMetadata<IAccountError[]>
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> => {
  const paginationProps = {
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
    page: response?.page ?? 1,
    size: response?.size ?? 0,
    total_items: response?.total_items ?? 0,
  }
  return { props: { paginationData } }
}

const AccountsErrorPage = (paginationData: PaginationMetadata<IAccountError[]>) => {
  const [usernameFilter, setUsernameFilter] = useState('')
  const { pageParams, onPageClick, updateSort, updateOrderBy, onNextClick, onPrevClick } = usePagination({ orderBy: 'occurred_at' })
  const { errors: responseData, isLoading, error } = useAccountErrorPagination(pageParams, usernameFilter, paginationData)

  const accountError: IAccountError[] = responseData?.data ? responseData.data : []

  const updateSorting = useCallback(
    (orderBy: string): React.MouseEventHandler<HTMLDivElement> =>
      () => {
        updateOrderBy(orderBy)
        updateSort(!pageParams.isAsc)
      },
    [pageParams.isAsc, updateOrderBy, updateSort]
  )

  const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    if (e.target.value === ' ') return
    setUsernameFilter(e.target.value)
  }, [])

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
    },
    {
      title: 'account',
      dataIndex: 'account',
    },
    {
      title: 'occurred_at(HK Time)',
      dataIndex: 'occurred_at',
    },
    { title: 'exception', dataIndex: 'exception' },
    { title: 'trace_id', dataIndex: 'trace_id' },
  ]

  const formatDate = (datetimeStr: string) => {
    return dayjs(datetimeStr, 'YYYY-MM-DDTHH:mm:ss').local().format('DD MMM YYYY')
  }

  return (
    <Card title="Login Error History">
      <Form.BaseInput
        placeholder="Search Account Username 'test@role'"
        className="order-shades-100 block w-full rounded-lg border p-2  text-slate-600 placeholder-slate-400 outline-none focus:border-slate-700 focus:outline-none"
        onChange={(e) => onChange(e)}
      ></Form.BaseInput>
      <div className="flex gap-3">
        <Table.Layout>
          <Table.Header
            columns={columns}
            thClassName={'text-sm font-normal text-text-primary items-center justify-center'}
            className="capitalize"
            orderBy={pageParams.orderBy}
            isAsc={pageParams.isAsc}
            updateSorting={updateSorting}
          />
          <Table.Body>
            {accountError.map((e, index) => (
              <Table.Row key={`table-row-${e.account}-${index}`} className="text-sm">
                <Table.BodyCell key={e.account}></Table.BodyCell>
                <Table.BodyCell key={e.exception}></Table.BodyCell>
                <Table.BodyCell key={`occurred_at-${e.account}`}>{formatDate(e.occurred_at)}</Table.BodyCell>
                <Table.BodyCell key={e.trace_id}></Table.BodyCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Layout>
      </div>
      {responseData.total_items > responseData.size && (
        <Pagination<IAccountError[]>
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
export default AccountsErrorPage
