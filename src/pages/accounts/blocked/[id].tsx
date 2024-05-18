import React, { useState } from 'react'

import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { useRouter } from 'next/router'

import { IBlockedAccount } from '@components/Account/Account/interface'
import Card from '@components/Card'
import DynamicForm from '@components/Form/DynamicForm'
import { IField } from '@components/Form/interface'
import { getBlockedAccount } from '@services/Account/BlockAccount'
import { useBlockAccount } from 'src/hooks/useBlockedAccount'
import dayjs from 'src/utils/dayjs'

type Props = {
  accountData: IBlockedAccount | undefined
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> => {
  const id = context.params?.id as string
  const res = await getBlockedAccount(id, {
    headers: {
      Cookie: context.req.headers.cookie,
    },
  })
  return { props: { accountData: res } }
}

const AccountsBlockedPage = ({ accountData }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [shouldFetch, setShouldFetch] = useState(false)
  const router = useRouter()
  const { id } = router.query
  const { data, error, updateBlockAccount: callUpdateAccount } = useBlockAccount(id as string, shouldFetch, accountData)
  if (!data) {
    console.error(data)
    return <div>Loading...</div>
  }

  const account: IBlockedAccount = {
    ...data,
    last_login_dt: dayjs(data.last_login_dt, 'YYYY-MM-DD THH:mm:ss').format('YYYY-MM-DDTHH:mm'),
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
      required: true,
      value: account['username'],
    },
    {
      label: 'pwd',
      type: 'password',
      name: 'pwd',
      id: 'pwd',
      required: true,
      value: account['pwd'],
    },
    {
      label: 'status',
      type: 'text',
      name: 'status',
      id: 'status',
      value: account['status'],
      disabled: true,
    },
    {
      label: 'post_scraped_count',
      type: 'number',
      name: 'post_scraped_count',
      id: 'post_scraped_count',
      value: account['post_scrapped_count'],
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
      label: 'last_login_dt',
      type: 'datetime-local',
      name: 'last_login_dt',
      id: 'last_login_dt',
      value: account['last_login_dt'],
    },
  ]

  const handleSubmit = async (values: IBlockedAccount) => {
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

  const updateAccount = async (values: IBlockedAccount) => {
    const newValues = {
      ...account,
      ...values,
      last_login_dt: dayjs(values.last_login_dt, 'YYYY-MM-DDTHH:mm').utc().local().format('YYYY-MM-DD THH:mm:ss'),
    }
    await callUpdateAccount(newValues)
  }

  if (error) {
    return <div>Failed to load users {id}</div>
  }

  return (
    <Card title="Accounts Info">
      <DynamicForm fields={fields} onSubmit={handleSubmit} Header={account.username} loading={isLoading} />
    </Card>
  )
}

export default AccountsBlockedPage
