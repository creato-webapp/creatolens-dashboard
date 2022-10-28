import React, { useEffect } from 'react'
import Card from '../src/components/Card'
import { Table } from '../src/components/Table'
import Button from '../src/components/Button/Button'
import { IAccount } from '../src/components/Account/interface'
import useSWR from 'swr'

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    return res.json()
  })

const AccountsPage = () => {
  const { data, error, isValidating } = useSWR(
    'api/accounts/query?filter=username != null',
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
      title: 'action',
      dataIndex: 'action',
      render: (e: any) => (
        <Button
          type="text"
          loading={isValidating}
          onClick={() => console.log(e)}
        >
          Edit
        </Button>
      ),
    },
  ]

  const dataSource = accounts
  return (
    <Card title="Accounts Table">
      <Table.Layout>
        <Table.Header columns={columns} />
        <Table.Body>
          {dataSource.map((e, index) => (
            <Table.Row columns={columns} rowData={e} key={index} />
          ))}
        </Table.Body>
      </Table.Layout>
    </Card>
  )
}

export default AccountsPage
