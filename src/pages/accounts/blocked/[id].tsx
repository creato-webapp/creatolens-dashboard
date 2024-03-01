import React, { useState } from 'react'
import Card from '@components/Card'
import { useRouter } from 'next/router'
import { Form } from '@components/Form'
import { IField } from '@components/Form/interface'
import { IBlockedAccount } from '@lib/Account/Account/interface'
import { getSession } from 'next-auth/react'
import { GetBlockedAccount } from '@services/Account/BlockAccount'
import { useBlockAccount } from 'src/hooks/useBlockedAccount'
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

type Props = {
  accountData: IBlockedAccount
}

const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

//TODO remove type any in context:any
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<
  GetServerSidePropsResult<{
    accountData: IBlockedAccount
  }>
> => {
  //remove any

  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    }
  }
  const { params } = context
  if (!params || typeof params.id !== 'string') {
    // Check if params.id exists and is a string
    return { redirect: { destination: '/404', permanent: false } }
  }
  const res = await GetBlockedAccount(params.id, {
    headers: {
      Cookie: context.req.headers.cookie,
    },
  })

  // Pass data to the page via props
  const accountData = res as IBlockedAccount
  return { props: { accountData } }
}

const AccountsBlockedPage = ({ accountData }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [shouldFetch, setShouldFetch] = useState(false)
  const router = useRouter()
  const { id } = router.query
  const isCreate = id === 'create-account'

  const { data, error, updateBlockAccount: callUpdateAccount } = useBlockAccount(id as string, shouldFetch, isCreate ? undefined : accountData)

  if (error) {
    console.log(data)
    console.log(error)
    return <div>Failed to load users {id}</div>
  }
  if (!data) {
    console.log(data)
    return <div>Loading...</div>
  }

  const account: IBlockedAccount = {
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

  const handleSubmit = async (values: IBlockedAccount) => {
    try {
      setShouldFetch(true)
      setIsLoading(true)
      const res = await updateAccount(values)
      window.alert(res)
    } catch (error) {
      console.log(error)
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

  return (
    <Card title="Accounts Info">
      <Form.Layout onSubmit={handleSubmit} Header={account.username} loading={isLoading} fields={fields}>
        {fields.map((e: IField, index) => {
          const value = account[e.name as keyof Omit<IBlockedAccount, 'session_cookies'>] as string
          return (
            <Form.Item label={e.label} key={index} customFormItemProps={e.customFormItemProps}>
              <Form.CustomItem id={e.name} defaultValue={value} type={e.type} customFormItemProps={e.customFormItemProps} />
            </Form.Item>
          )
        })}
      </Form.Layout>
    </Card>
  )
}

export default AccountsBlockedPage
