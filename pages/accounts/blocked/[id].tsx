import React, { useEffect, useState } from 'react'
import Card from '@components/Card'
import { useRouter } from 'next/router'
import { Form } from '@components/Form'
import { IField } from '@components/Form/interface'
import { IAccount } from '@lib/Account/Account/interface'
import useSWR, { useSWRConfig } from 'swr'
import { getSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import { useAccount } from 'hooks/useAccount'
import axios from 'axios'
import { AccountFetcher } from 'services/AccountFetcher'

type Props = {
  accountData: IAccount
}

const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

//TODO remove type any in context:any
export const getServerSideProps = async (context: any) => {
  //remove any

  const session: any = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/404',
      },
    }
  }
  const { params } = context
  const res = await AccountFetcher.GET(process.env.LOCAL_SERVER_URL + '/api/accounts-blocked/' + params.id, {
    headers: {
      Cookie: context.req.headers.cookie,
    },
  })

  // Pass data to the page via props
  const accountData: IAccount = res ? res : null
  return { props: { accountData } }
}

const AccountsBlockedPage = ({ accountData }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [shouldFetch, setShouldFetch] = useState(false)
  const router = useRouter()
  const { id } = router.query
  const isCreate = id === 'create-account'

  const {
    data,
    isLoading: loading,
    error,
    updateAccount: useUpdateAccount,
  } = useAccount('/api/accounts-blocked', id as string, shouldFetch, isCreate ? isCreate : accountData)

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
    ...data,
    last_login_dt: dayjs(data?.last_login_dt, 'YYYY-MM-DD THH:mm:ss').format('YYYY-MM-DDTHH:mm'),
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

  const handleSubmit = async (values: IAccount) => {
    try {
      setShouldFetch(true)
      setIsLoading(true)
      await updateAccount(values)
      setShowAlert(true)
    } catch (error) {
      console.log(error)
      window.alert(error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateAccount = async (values: IAccount) => {
    const newValues = {
      ...account,
      ...values,
      last_login_dt: dayjs(values.last_login_dt, 'YYYY-MM-DDTHH:mm').utc().local().format('YYYY-MM-DD THH:mm:ss'),
    }
    await useUpdateAccount(newValues)
  }

  return (
    <Card title="Accounts Info">
      <Form.Layout onSubmit={handleSubmit} Header={account.username} loading={isLoading} fields={fields}>
        {fields.map((e: IField, index) => (
          <Form.Item label={e.label} key={index} customFormItemProps={e.customFormItemProps}>
            <Form.CustomItem id={e.name} defaultValue={account[e.name]} type={e.type} customFormItemProps={e.customFormItemProps} />
          </Form.Item>
        ))}
      </Form.Layout>
    </Card>
  )
}

export default AccountsBlockedPage
