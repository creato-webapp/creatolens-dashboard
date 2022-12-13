import React, { useEffect, useState } from 'react'
import Card from '@components/Card'
import { useRouter } from 'next/router'
import { Form } from '@components/Form'
import { Alerts } from '@components/Alerts'
import { IField } from '@components/Form/interface'
import { IAccountError } from '@components/AccountErrors/interface'
import { SessionModal, IAccount } from '@components/Account'
import useSWR from 'swr'
import { getSession } from 'next-auth/react'
import { Button } from '@components/Button'
import moment from 'moment'
import { Fetcher, FetchWithId } from 'services/fetcher'
import axios from 'axios'
import { serialize } from 'v8'

type Props = {
  accountData: IAccount
  isCreate: boolean
  canRenewSession: boolean
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
  const isCreate = params.id === 'create-account'
  let canRenewSession = false
  const lastErrRes = await axios.get(
    process.env.LOCAL_SERVER_URL + '/api/accounts-error/last',
    {
      params: { username: params.id },
      headers: {
        Cookie: context.req.headers.cookie,
      },
    }
  )
  const lastErrResList = lastErrRes.data.map((e: IAccountError) => {
    return moment(e.occurred_at, 'YYYY-MM-DD THH:mm:ss')
  })
  if (lastErrResList.length > 0) {
    const lastDay = moment().add(-1, 'days').valueOf()
    const errDatetime = lastErrResList[0].valueOf()
    const result = moment(lastDay - errDatetime).valueOf()
    console.log(result)
    canRenewSession = result > 86400000 ? true : false
  } else if (lastErrResList.length == 0) {
    canRenewSession = true
  } else {
    canRenewSession = false
  }

  const res =
    !isCreate &&
    (await axios.get(
      process.env.LOCAL_SERVER_URL + '/api/accounts/' + params.id,
      {
        headers: {
          Cookie: context.req.headers.cookie,
        },
      }
    ))

  // Pass data to the page via props
  const accountData: IAccount = res ? res.data : null
  return { props: { accountData, isCreate, canRenewSession } }
}

const AccountsPage = ({ accountData, isCreate, canRenewSession }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [shouldFetch, setShouldFetch] = useState(false)
  const [isShow, setIsShow] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const session = getSession()
  const router = useRouter()
  const { id } = router.query
  const {
    data,
    error,
    mutate: mutateAccountInfo,
    isValidating,
  } = useSWR(shouldFetch ? ['/api/accounts/', id] : null, FetchWithId.GET, {
    refreshInterval: 0,
    fallbackData: isCreate ? isCreate : accountData,
  })

  if (error) {
    console.log(error)
    return <div>Failed to load users {id}</div>
  }
  if (!data) {
    console.log(data)
    return <div>Loading...</div>
  }

  const account: IAccount = {
    ...data,
    last_login_dt: moment(data?.last_login_dt, 'YYYY-MM-DD THH:mm:ss')
      .utc()
      .local()
      .add(8, 'hours')
      .format('YYYY-MM-DDTHH:mm'),
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
      label: 'is_authenticated',
      type: 'Checkbox',
      name: 'is_authenticated',
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
    {
      label: 'login count',
      type: 'InputNumber',
      name: 'login_count',
      customFormItemProps: { disabled: true },
    },
    {
      label: 'login attempt count',
      type: 'InputNumber',
      name: 'login_attempt_count',
      customFormItemProps: { disabled: true },
    },
    {
      label: 'post_scrapped_count',
      type: 'InputNumber',
      name: 'post_scrapped_count',
      customFormItemProps: { disabled: true },
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
      setIsLoading(true)
      const newValues = {
        ...values,
        login_count: parseInt(values.login_count as unknown as string),
        login_attempt_count: parseInt(
          values.login_attempt_count as unknown as string
        ),
        post_scrapped_count: parseInt(
          values.post_scrapped_count as unknown as string
        ),
      }

      const res = isCreate
        ? await createAccount(newValues)
        : await updateAccount(newValues)
      if (res.status == 400) {
        console.log(res.data)
        throw new Error('Bad Request Updating Accounts')
      }
      setShowAlert(true)
      mutateAccountInfo()
    } catch (error) {
      console.log(error)
      window.alert(error)
    } finally {
      setIsLoading(false)
    }
  }

  const createAccount = async (values: IAccount) => {
    const res = await axios.post(`/api/accounts`, values)
    return res
  }

  const updateAccount = async (values: IAccount) => {
    const newValues = {
      ...account,
      ...values,
      last_login_dt: moment(values.last_login_dt, 'YYYY-MM-DDTHH:mm')
        .utc()
        .local()
        .add(-8, 'hours')
        .format('YYYY-MM-DD THH:mm:ss'),
    }

    const res = await Fetcher.PATCH(`/api/accounts/${id}`, newValues)
    return res
  }

  const fields = isCreate ? fieldsCreate : fieldsUpdate

  return (
    <>
      <Alerts.success isShow={showAlert} setIsShow={setShowAlert} />
      <Card
        title="Accounts Info"
        extra={
          <Button.Primary loading={isLoading} onClick={() => setIsShow(true)}>
            Open Session Modal
          </Button.Primary>
        }
      >
        status: | 'active' | 'blocked' | 'banned' | 'retry' | 'test' |
        'scrapping' | 'occupied'
        <Form.Layout
          onSubmit={handleSubmit}
          Header={account.username}
          loading={isLoading}
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
        <SessionModal
          isDisable={!canRenewSession}
          isShow={isShow}
          account={account}
          loading={!error && !data}
          closeModal={() => setIsShow(false)}
          refresh={async () => {
            if (!shouldFetch) {
              setShouldFetch(true)
            }
            await mutateAccountInfo()
          }}
        />
      </Card>
    </>
  )
}

export default AccountsPage
