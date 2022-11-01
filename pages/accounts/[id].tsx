import React, { useEffect } from 'react'
import Card from '@components/Card'
import { useRouter } from 'next/router'
import { Form, FormExample } from '@components/Form'
import { IField } from '@components/Form/interface'
import Button from '@components/Button/Button'
import { IAccount } from '@components/Account/interface'
import useSWR from 'swr'

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    console.log({ res })
    return res.json()
  })

const AccountsPage = () => {
  const router = useRouter()
  const { id } = router.query

  const { data, error, isValidating } = useSWR(
    router.query.id ? `/api/accounts/${router.query.id}` : null,
    fetcher
  )

  if (error) {
    console.log(data)
    console.log(error)
    return <div>Failed to load users {id}</div>
  }
  if (!data) {
    console.log(data)
    return <div>Loading...</div>
  }
  const account: IAccount = data.data

  const fields: IField[] = [
    {
      label: 'document_id',
      type: 'Input',
      name: 'id',
    },
    {
      label: 'username',
      type: 'Input',
      name: 'username',
    },
    {
      label: 'status',
      type: 'Input',
      name: 'statusz',
    },
  ]

  type StatusKey = keyof typeof account
  let str1: StatusKey = 'username'
  account[str1] // 200

  return (
    <Card title="Accounts Info">
      <Form.Layout>
        <Form.Item label="Document ID">
          <Form.Input id="id" defaultValue={account.id} />
        </Form.Item>
        <Form.Item label="Username">
          <Form.Input id="username" defaultValue={account.username} />
        </Form.Item>
      </Form.Layout>
      <FormExample />
    </Card>
  )
}

export default AccountsPage
