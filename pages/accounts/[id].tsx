import React, { useEffect, useState } from 'react'
import Card from '@components/Card'
import { useRouter } from 'next/router'
import { Form } from '@components/Form'
import { IField } from '@components/Form/interface'
import { IAccount } from '@components/Account/interface'
import useSWR from 'swr'
import moment from 'moment'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'

const fetcher = (url: string) => {
  if (url === 'create-account') {
    return
  }
  const res = fetch(url).then((res) => {
    return res.json()
  })
  return res
}

type Props = {
  accountData: IAccount[]
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch data from external API
  const { params } = context
  const res = await fetch(`http://localhost:3000/api/accounts?${params?.id}`)
  const data = await res.json()

  // Pass data to the page via props
  const accountData: IAccount = data.data
  return { props: { accountData } }
}

const AccountsPage = ({ accountData }: Props) => {
  const [loading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const { id } = router.query
  const isCreate = id === 'create-account'
  const { data, error, isValidating } = useSWR(
    id ? `/api/accounts/${id}` : null,
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
    ...data?.data,
    last_login_dt: moment(
      data?.data?.last_login_dt,
      'YYYY-MM-DD THH:mm:ss'
    ).format('YYYY-MM-DDTHH:mm'),
  }

  const fieldsUpdate: IField[] = [
    {
      label: 'document_id',
      type: 'Input',
      name: 'id',
    },
    {
      label: 'username',
      type: 'Input',
      name: 'username',
      customFormItemProps: { required: true },
    },
    {
      label: 'pwd',
      type: 'Input',
      name: 'pwd',
      customFormItemProps: { required: true },
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
      type: 'DateTimePicker',
      name: 'last_login_dt',
    },
  ]

  const fieldsCreate: IField[] = [
    {
      label: 'username',
      type: 'Input',
      name: 'username',
      customFormItemProps: { required: true },
    },
    {
      label: 'pwd',
      type: 'Input',
      name: 'pwd',
      customFormItemProps: { required: true },
    },
  ]

  const handleSubmit = async (values: IAccount) => {
    isCreate ? createAccount(values) : updateAccount(values)
  }

  const createAccount = async (values: IAccount) => {
    fetch(`/api/accounts`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(values),
    }).then((response) => {
      return response.json()
    })
  }
  const updateAccount = async (values: IAccount) => {
    const newValues = {
      ...account,
      ...values,
    }
    fetch(`/api/accounts/${router.query.id}`, {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(newValues),
    }).then((response) => {
      return response.json()
    })
  }
  const fields = isCreate ? fieldsCreate : fieldsUpdate

  return (
    <Card title="Accounts Info">
      <Form.Layout
        onSubmit={handleSubmit}
        Header={account.username}
        loading={isValidating}
        fields={fields}
      >
        {fields.map((e: IField, index) => (
          <Form.Item
            label={e.label}
            key={index}
            customFormItemProps={e.customFormItemProps}
          >
            <Form.CustomItem
              id={e.name}
              defaultValue={account[e.name]}
              type={e.type}
              customFormItemProps={e.customFormItemProps}
            />
          </Form.Item>
        ))}
      </Form.Layout>
    </Card>
  )
}

export default AccountsPage
