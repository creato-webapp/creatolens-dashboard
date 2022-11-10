import React, { FC, useEffect } from 'react'
import Card from '@components/Card'
import { Table } from '@components/Table'
import Button from '@components/Button/Button'
import { IAccount } from '@components/Account/interface'
import useSWR from 'swr'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import moment from 'moment'

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    return res.json()
  })

type Props = {
  accountData: IAccount[]
}

export const getServerSideProps: GetServerSideProps = async () => {
  // Fetch data from external API
  const res = await fetch(
    'http://localhost:3000/api/accounts?filter=username != null'
  )
  const data = await res.json()

  // Pass data to the page via props
  const accountData: IAccount[] = data.data
  return { props: { accountData } }
}

const AccountsPage = ({ accountData }: Props) => {
  const { data: session } = useSession()
  const { data, error, isValidating } = useSWR(
    'api/accounts?filter=username != null',
    fetcher
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
  const accounts: IAccount[] = data.data

  const columns = [
    {
      title: 'document_id',
      dataIndex: 'id',
      render: (e: string) => {
        return (
          <Link href="/accounts/[id]" as={`/accounts/${e}`} legacyBehavior>
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
        <Button type="text" loading={false} onClick={() => console.log(e)}>
          Edit
        </Button>
      ),
    },
  ]

  // const dataSource = accounts
  return (
    <Card title="Accounts Table">
      <Link href="/accounts/create-account">
        <Button loading={false}>Create New Account</Button>
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
