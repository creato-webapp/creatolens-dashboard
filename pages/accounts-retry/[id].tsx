import React, { useEffect, useState } from 'react'
import Card from '@components/Card'
import { useRouter } from 'next/router'
import { Form } from '@components/Form'
import { IField } from '@components/Form/interface'
import { IAccount } from '@components/Account/interface'
import useSWR, { useSWRConfig } from 'swr'
import { getSession } from 'next-auth/react'
import moment from 'moment'
import { GetServerSideProps } from 'next'
import { Fetcher, FetchWithId } from 'services/fetcher'
import axios from 'axios'

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
  const res = await axios.get(
    process.env.LOCAL_SERVER_URL + '/api/accounts-retry/' + params.id,
    {
      headers: {
        Cookie: context.req.headers.cookie,
      },
    }
  )
  // Pass data to the page via props
  const accountData: IAccount = res ? res.data : null
  return { props: { accountData } }
}

const AccountsRetryPage = ({ accountData }: Props) => {
  const { mutate } = useSWRConfig()
  const [shouldFetch, setShouldFetch] = useState(false)
  const session = getSession()
  const router = useRouter()
  const { id } = router.query
  const isCreate = id === 'create-account'

  const {
    data,
    error,
    mutate: mutateAccountInfo,
    isValidating,
  } = useSWR(
    shouldFetch ? ['/api/accounts-retry/', id] : null,
    FetchWithId.GET,
    {
      refreshInterval: 0,
      fallbackData: accountData,
    }
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
    ...data,
    last_login_dt: moment(data?.last_login_dt, 'YYYY-MM-DD THH:mm:ss').format(
      'YYYY-MM-DDTHH:mm'
    ),
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
    try {
      setShouldFetch(true)
      const res = isCreate
        ? await createAccount(values)
        : await updateAccount(values)
      mutateAccountInfo()
      router.replace(`/accounts-retry`)
    } catch (error) {
      window.alert(error)
    }
  }

  const createAccount = async (values: IAccount) => {
    const res = await axios.post(`/api/accounts-retry`, values)
    return res
  }

  const updateAccount = async (values: IAccount) => {
    const newValues = {
      ...account,
      ...values,
      last_login_dt: moment(values.last_login_dt, 'YYYY-MM-DDTHH:mm').format(
        'YYYY-MM-DD THH:mm:ss'
      ),
    }
    const res = await Fetcher.PATCH(`/api/accounts-retry/${id}`, newValues)
    return res
  }

  const fields = isCreate ? fieldsCreate : fieldsUpdate
  return (
    <Card title="Accounts Info">
      <Form.Layout
        onSubmit={handleSubmit}
        Header={account.username}
        loading={!error && !data}
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

export default AccountsRetryPage