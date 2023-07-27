import React, { useState } from 'react'
import Card from '@components/Card'
import { Table } from '@components/Table'
import { Button } from '@components/Button'
import { IAccount } from '@components/Account/interface'
import { AccountCard } from '@components/AccountCard'
import useSWR from 'swr'
import Link from 'next/link'
import { getSession } from 'next-auth/react'
import moment from 'moment'
import { Fetcher } from 'services/fetcher'
import axios, { AxiosError } from 'axios'
import Tag from '@components/Tag'
import Avatar from '@components/Avatar'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'
import StatusTag from '@lib/StatusTag'
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
  // Fetch data from next API
  const res = await axios
    .get(`${process.env.LOCAL_SERVER_URL}/api/accounts?filter=username != null`, {
      headers: {
        Cookie: context.req.headers.cookie,
      },
    })
    .catch(function (error: AxiosError) {
      return
    })

  // Pass data to the page via props
  const accountData: IAccount[] = res ? res.data : []
  return { props: { accountData } }
}

const AccountsPage = ({ accountData }: Props) => {
  const [shouldFetch, setShouldFetch] = useState(false)
  const {
    data,
    error,
    mutate: mutateAccList,
    isValidating,
  } = useSWR(shouldFetch ? ['api/accounts', '?filter=username != null'] : null, Fetcher.GET, { refreshInterval: 0, fallbackData: accountData })

  if (error) {
    console.log(data)
    console.log(error)
    return <div>Failed to load users</div>
  }
  if (!data) {
    console.log(data)
    return <div>Loading...</div>
  }

  const columns = [
    {
      title: 'Last Login(HK Time)',
      dataIndex: 'last_login_dt',
      render: (e: any) => {
        const date = moment(e, 'YYYY-MM-DD THH:mm:ss')
        return moment.utc(date).local().format('YYYY-MM-DD HH:mm:ss')
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
        return e ? <CheckCircleIcon className="h-6 w-6 text-green-600" /> : <XCircleIcon className="h-6 w-6 text-red-500" />
      },
    },
    {
      title: 'Is Enabled',
      dataIndex: 'enabled',
      render: (e: any) => {
        return e ? <CheckCircleIcon className="h-6 w-6 text-green-600" /> : <XCircleIcon className="h-6 w-6 text-red-500" />
      },
    },
    {
      title: 'Is Auth',
      dataIndex: 'is_authenticated',
      render: (e: any) => {
        return e ? <CheckCircleIcon className="h-6 w-6 text-green-600" /> : <XCircleIcon className="h-6 w-6 text-red-500" />
      },
    },

    {
      title: 'Account Info',
      dataIndex: 'id',
      render: (e: any) => (
        <Link href="/accounts/[id]" as={`/accounts/${e}`} legacyBehavior>
          <Button.Text loading={false} onClick={() => console.log(e)}>
            Edit
          </Button.Text>
        </Link>
      ),
    },
  ]

  return (
    <Card title="Accounts Table">
      <Link href="/accounts/create-account">
        <Button.Primary loading={false}>Create New Account</Button.Primary>
      </Link>
      {/* desktop */}
      <div className="hidden  md:flex">
        <Table.Layout>
          <Table.Header columns={columns} />

          <Table.Body>
            {accountData.map((e, index) => (
              <Table.Row columns={columns} rowData={e} key={index} />
            ))}
          </Table.Body>
        </Table.Layout>
      </div>
      {/* Phone */}
      <div className="hidden flex-col sm:flex">
        {accountData.map((e, index) => (
          <AccountCard columns={columns} rowData={e} key={index} />
        ))}
      </div>
      <p>status: | 'active' | 'blocked' | 'banned' | 'retry' | 'test' |</p>
    </Card>
  )
}

export default AccountsPage
