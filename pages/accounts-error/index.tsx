import React, { useState } from 'react'
import Card from '@components/Card'
import { Table } from '@components/Table'
import { IAccountError } from '@lib/Account/AccountErrors/interface'
import useSWR from 'swr'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import axios from 'axios'
import { Fetcher } from 'services/fetcher'
import { Form } from '@components/Form'
type Props = {
  accountErrorData: IAccountError[]
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
  const res = await axios.get(`${process.env.LOCAL_SERVER_URL}/api/accounts-error`, {
    headers: {
      Cookie: context.req.headers.cookie,
    },
  })
  const accountErrorData: IAccountError[] = res.data

  return { props: { accountErrorData } }
}

const AccountsErrorPage = ({ accountErrorData }: Props) => {
  const [shouldFetch, setShouldFetch] = useState(false)
  const [username, setUsername] = useState('')

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setUsername(e.target.value)
    if (!shouldFetch) setShouldFetch(true)
  }

  const {
    data,
    error,
    mutate: mutateAccErrList,
    isValidating,
  } = useSWR(shouldFetch ? ['api/accounts-error', { username: username }] : null, Fetcher.GET, { refreshInterval: 0, fallbackData: accountErrorData })

  if (error) {
    console.log(data)
    console.log(error)
    return <div>Failed to load account error data</div>
  }
  if (!data) {
    console.log(data)
    return <div>Loading...</div>
  }
  const accountError: IAccountError[] = data
  console.log(data)
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
        return dayjs.utc(date).local().add(8, 'hours').format('YYYY-MM-DD HH:mm:ss')
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
      <Table.Layout>
        <Table.Header columns={columns} />
        <Table.Body>
          {accountError.map((e, index) => (
            <Table.Row columns={columns} rowData={e} key={index} />
          ))}
        </Table.Body>
      </Table.Layout>
    </Card>
  )
}
export default AccountsErrorPage
