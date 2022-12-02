import React, { useState } from 'react'
import Card from '@components/Card'
import { Table } from '@components/Table'
import { Button } from '@components/Button'
import { IAccount } from '@components/Account/interface'
import useSWR from 'swr'
import Link from 'next/link'
import { getSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import moment from 'moment'
import { Fetcher } from 'services/fetcher'
import axios from 'axios'

type Props = {
  accountData: IAccount[]
}

//TODO getServerSideProps: GetServerSideProps; cannot set GetServerSideProps type.
export const getServerSideProps = async (context: any) => {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/login',
      },
    }
  }
  // Fetch data from external API
  const res = await axios.get(
    `${process.env.LOCAL_SERVER_URL}/api/accounts-retry?filter=username != null`,
    {
      headers: {
        Cookie: context.req.headers.cookie,
      },
    }
  )
  // Pass data to the page via props
  const accountData: IAccount[] = res.data
  return { props: { accountData } }
}

const AccountsPage = ({ accountData }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [shouldFetch, setShouldFetch] = useState(false)
  const {
    data,
    error,
    mutate: mutateAccList,
    isValidating,
  } = useSWR(
    shouldFetch ? ['api/accounts', '?filter=username != null'] : null,
    Fetcher.GET,
    { refreshInterval: 0, fallbackData: accountData }
  )

  if (error) {
    console.log(data)
    console.log(error)
    return <div>Failed to load users</div>
  }
  if (!data) {
    console.log(data)
    return <div>Loading...</div>
  }
  const accounts: IAccount[] = data

  const columns = [
    {
      title: 'document_id',
      dataIndex: 'id',
      render: (e: string) => {
        return (
          <Link
            href="/accounts-retry/[id]"
            as={`/accounts-retry/${e}`}
            legacyBehavior
          >
            <a style={{ color: '#0070f3' }}>{e}</a>
          </Link>
        )
      },
    },
    { title: 'username', dataIndex: 'username' },
    {
      title: 'is occupied',
      dataIndex: 'is_occupied',
      render: (e: any) => {
        return <div>{e.toString()}</div>
      },
    },
    {
      title: 'is enabled',
      dataIndex: 'enabled',
      render: (e: any) => {
        return <div>{e.toString()}</div>
      },
    },
    {
      title: 'last_login_dt(HK Time)',
      dataIndex: 'last_login_dt',
      render: (e: any) => {
        const date = moment(e, 'YYYY-MM-DD THH:mm:ss')
        return moment
          .utc(date)
          .local()
          .add(8, 'hours')
          .format('YYYY-MM-DD HH:mm:ss')
      },
    },
    {
      title: 'action',
      dataIndex: 'id',
      render: (e: any) => (
        <Link
          href="/accounts-retry/[id]"
          as={`/accounts-retry/${e}`}
          legacyBehavior
        >
          <Button.Text loading={isLoading} onClick={() => console.log(e)}>
            Edit
          </Button.Text>
        </Link>
      ),
    },
  ]

  const dataSource = accountData

  return (
    <Card title="Retry Accounts Table">
      <Link href="/accounts/create-account">
        <Button.Primary loading={false}>
          Create New Retry Account
        </Button.Primary>
      </Link>
      <Table.Layout>
        <Table.Header columns={columns} />
        <Table.Body>
          {accountData.map((e, index) => (
            <Table.Row columns={columns} rowData={e} key={index} />
          ))}
        </Table.Body>
      </Table.Layout>
    </Card>
  )
}

export default AccountsPage
