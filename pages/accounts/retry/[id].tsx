import React, { useEffect, useState } from 'react'
import Card from '@components/Card'
import { useRouter } from 'next/router'
import { Form } from '@components/Form'
import { IField } from '@components/Form/interface'
import { IAccount } from '@lib/Account/Account/interface'
import useSWR, { useSWRConfig } from 'swr'
import { getSession } from 'next-auth/react'
import { useAccount } from 'hooks/useAccount'
import { AccountFetcher } from 'services/AccountFetcher'

const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

type Props = {
  accountData: IAccount
}

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
  const res = await AccountFetcher.GET(process.env.LOCAL_SERVER_URL + '/api/accounts-retry/' + params.id, {
    headers: {
      Cookie: context.req.headers.cookie,
    },
  })
  // Pass data to the page via props
  const accountData: IAccount = res ? res : null
  return { props: { accountData } }
}

const AccountsRetryPage = ({ accountData }: Props) => {
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
  } = useAccount('/api/accounts-retry', id as string, shouldFetch, isCreate ? isCreate : accountData)

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
    wait_until: dayjs(data?.wait_until, 'YYYY-MM-DD THH:mm:ss').format('YYYY-MM-DDTHH:mm'),
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
      label: 'wait_until',
      type: 'DateTimePicker',
      name: 'wait_until',
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
      wait_until: dayjs(values.wait_until, 'YYYY-MM-DDTHH:mm').format('YYYY-MM-DD THH:mm:ss'),
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

export default AccountsRetryPage
