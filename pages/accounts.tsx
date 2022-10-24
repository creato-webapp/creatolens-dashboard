import React from 'react'
import Link from 'next/link'
import Card from '../src/components/Card'
import Table from '../src/components/Table/Table'
import Button from '../src/components/Button/Button'
const AccountsPage = () => {
  const columns = [
    {
      title: 'document_id',
      dataIndex: 'document_id',
    },
    { title: 'username', dataIndex: 'username' },
    {
      title: 'action',
      dataIndex: 'action',
      render: (
        <Button
          loading={false}
          type="primary"
          onClick={() => console.log('pressed')}
        >
          test
        </Button>
      ),
    },
  ]

  const dataSource = [
    {
      id: '123',
      document_id: 'XVSFEES',
      username: '123@gmail.com',
    },
    {
      id: '456',
      document_id: 'TOEEOWMW',
      username: '456@gmail.com',
    },
  ]
  return (
    <Card title="Accounts Table">
      <Table columns={columns} dataSource={dataSource} />
    </Card>
  )
}

export default AccountsPage
