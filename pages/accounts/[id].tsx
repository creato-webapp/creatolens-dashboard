import React, { useEffect } from 'react'
import Card from '@components/Card'
import { useRouter } from 'next/router'
import { Form, FormExample } from '@components/Form'
import { IField } from '@components/Form/interface'
import Button from '@components/Button/Button'
import { IAccount } from '@components/Account/interface'
import useSWR, { useSWRConfig } from 'swr'
import moment from 'moment'

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    //massage datetime
    return res.json()
  })

const AccountsPage = () => {
  const router = useRouter()
  const { id } = router.query

  const { mutate } = useSWRConfig()
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

  const account: IAccount = {
    ...data.data,
    last_login_dt: moment(
      data.data.last_login_dt,
      'YYYY-MM-DD THH:mm:ss'
    ).format('YYYY-MM-DDTHH:mm'),
  }

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
      name: 'status',
    },
    {
      label: 'enabled',
      type: 'Checkbox',
      name: 'enabled',
    },
    {
      label: 'is_occupied',
      type: 'Checkbox',
      name: 'is_occupied',
    },
    {
      label: 'last_login_dt',
      type: 'Input',
      name: 'last_login_dt',
    },
  ]

  const handleSubmit = async (
    event: React.FormEvent<EventTarget | HTMLFormElement>
  ) => {
    event.preventDefault()
    const target = event.target as typeof event.target & {
      [key: string]: { value: string }
    }
    var obj: { [key: string]: string | number | boolean } = {}

    fields.map((e) => (obj[e.name] = target[e.name].value))
    const values = {
      ...account,
      ...obj,
    }
    fetch(`/api/accounts/${router.query.id}`, {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(values),
    })
      .then((response) => {
        console.log(response.status)
        return response.json()
      })
      .then((data) => console.log(data))
  }

  return (
    <Card title="Accounts Info">
      <Form.Layout
        onSubmit={handleSubmit}
        Header={account.username}
        loading={isValidating}
      >
        <Form.Item label="Document ID">
          <Form.Input id="id" defaultValue={account.id} />
        </Form.Item>
        <Form.Item label="Username">
          <Form.Input id="username" defaultValue={account.username} />
        </Form.Item>
        <Form.Item label="status">
          <Form.Input id="status" defaultValue={account.status} />
        </Form.Item>
        <Form.Item label="enabled">
          <Form.Checkbox id="enabled" defaultValue={account.enabled} />
        </Form.Item>
        <Form.Item label="is_occupied">
          <Form.Checkbox id="is_occupied" defaultValue={account.is_occupied} />
        </Form.Item>
        <Form.Item label="last_login_dt">
          <Form.DateTimePicker
            id="last_login_dt"
            defaultValue={account.last_login_dt}
          />
        </Form.Item>
      </Form.Layout>
    </Card>
  )
}

export default AccountsPage
