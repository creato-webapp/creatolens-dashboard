import React, { useState } from 'react'

import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { useRouter } from 'next/router'

import { IRetryAccount } from '@components/Account/Account/interface'
import Card from '@components/Card'
import DynamicForm from '@components/Form/DynamicForm'
import { IField } from '@components/Form/interface'
import { getRetryAccount } from '@services/Account/RetryAccount'
import { useRetryAccount } from 'src/hooks/useRetryAccount'
import dayjs from 'src/utils/dayjs'

type Props = {
  accountData: IRetryAccount
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> => {
  const { params } = context
  if (!params || typeof params.id !== 'string') {
    return { redirect: { destination: '/404', permanent: false } }
  }
  const res = await getRetryAccount(params.id, {
    headers: {
      Cookie: context.req.headers.cookie,
    },
  })
  const accountData: IRetryAccount = res as IRetryAccount
  return { props: { accountData } }
}

const AccountsRetryPage = ({ accountData }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [shouldFetch, setShouldFetch] = useState(false)
  const router = useRouter()
  const { id } = router.query
  // const isCreate = id === 'create-account'

  const { data, error, updateRetryAccount: callUpdateAccount } = useRetryAccount(id as string, shouldFetch, accountData)

  if (error) {
    console.error(data)
    console.error(error)
    return <div>Failed to load users {id}</div>
  }
  if (!data) {
    console.error(data)
    return <div>Loading...</div>
  }

  const account: IRetryAccount = {
    ...data,
    wait_until: dayjs(data.wait_until, 'YYYY-MM-DD THH:mm:ss').format('YYYY-MM-DDTHH:mm'),
  }

  const fields: IField[] = [
    {
      label: 'document_id',
      type: 'text',
      name: 'id',
      id: 'id',
      value: account['id'],
    },
    {
      label: 'username',
      type: 'text',
      name: 'username',
      id: 'username',
      value: account['username'],

      required: true,
    },
    {
      label: 'pwd',
      type: 'password',
      name: 'pwd',
      id: 'username',
      value: account['username'],
      required: true,
    },
    {
      label: 'status',
      type: 'text',
      name: 'status',
      id: 'status',
      value: account['status'],
    },
    {
      label: 'enabled',
      type: 'checkbox',
      name: 'enabled',
      id: 'enabled',
      checked: account['enabled'],
    },
    {
      label: 'is_occupied',
      type: 'checkbox',
      name: 'is_occupied',
      id: 'is_occupied',
      checked: account['is_occupied'],
    },
    {
      label: 'wait_until',
      type: 'datetime-local',
      name: 'wait_until',
      id: 'wait_until',
      value: account['wait_until'],
    },
  ]

  const handleSubmit = async (values: IRetryAccount) => {
    try {
      setShouldFetch(true)
      setIsLoading(true)
      const res = await updateAccount(values)
      window.alert(res)
    } catch (error) {
      console.error(error)
      window.alert(error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateAccount = async (values: IRetryAccount) => {
    const newValues = {
      ...account,
      ...values,
      wait_until: dayjs(values.wait_until, 'YYYY-MM-DDTHH:mm').format('YYYY-MM-DD THH:mm:ss'),
    }
    await callUpdateAccount(newValues)
  }

  return (
    <Card title="Accounts Info">
      <DynamicForm onSubmit={handleSubmit} Header={account.username} loading={isLoading} fields={fields} />
    </Card>
  )
}

export default AccountsRetryPage
