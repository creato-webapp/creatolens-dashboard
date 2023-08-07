import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Alerts } from '@components/Alerts'
import { IAccount } from '@lib/Account/Account/interface'
import SessionModal from '@lib/Account/Account/SessionModal'
import useSWR from 'swr'
import { getSession } from 'next-auth/react'
import { AccountFetcher } from 'services/AccountFetcher'
import axios from 'axios'
import Title from '@components/Typography/Title'
import Paragraph from '@components/Typography/Paragraph'
import AccountInfoCard from '@lib/Account/AccountInfoCard'
import AccountCreateCard from '@lib/Account/AccountCreateCard'
import { useAccount } from 'hooks/useAccount'

const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

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
  const canRenewSession = false
  // const lastErrRes = await axios.get(
  //   process.env.LOCAL_SERVER_URL + '/api/accounts-error/last',
  //   {
  //     params: { username: params.id },
  //     headers: {
  //       Cookie: context.req.headers.cookie,
  //     },
  //   }
  // )
  // const lastErrResList = lastErrRes.data.map((e: IAccountError) => {
  //   return dayjs(e.occurred_at, 'YYYY-MM-DD THH:mm:ss')
  // })
  // if (lastErrResList.length > 0) {
  //   const lastDay = dayjs().add(-1, 'days').valueOf()
  //   const errDatetime = lastErrResList[0].valueOf()
  //   const result = dayjs(lastDay - errDatetime).valueOf()
  //   console.log(result)
  //   canRenewSession = result > 86400000 ? true : false
  // } else if (lastErrResList.length == 0) {
  //   canRenewSession = true
  // } else {
  //   canRenewSession = false
  // }

  const res =
    !isCreate &&
    (await AccountFetcher.GET(process.env.LOCAL_SERVER_URL + '/api/accounts/' + params.id, {
      headers: {
        Cookie: context.req.headers.cookie,
      },
    }))

  // Pass data to the page via props
  const accountData: IAccount = res
  return { props: { accountData, isCreate, canRenewSession } }
}

const AccountsPage = ({ accountData, isCreate, canRenewSession }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [shouldFetch, setShouldFetch] = useState(false)
  const [isShow, setIsShow] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const session = getSession()
  const router = useRouter()
  const { id } = router.query
  const {
    data,
    isLoading: loading,
    error,
    updateAccount: useUpdateAccount,
    updateSession,
  } = useAccount('/api/accounts', id as string, shouldFetch, isCreate ? isCreate : accountData)
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
    last_login_dt: dayjs(data?.last_login_dt, 'YYYY-MM-DD THH:mm:ss').utc().local().format('YYYY-MM-DDTHH:mm'),
  }

  const handleCreateSubmit = async (values: IAccount) => {
    try {
      setShouldFetch(false)
      setIsLoading(true)
      const newValues = {
        ...values,
        login_attempt_count: parseInt(values.login_attempt_count as unknown as string),
        post_scrapped_count: parseInt(values.post_scrapped_count as unknown as string),
      }

      const res = await createAccount(newValues)
      if (res?.status == 400) {
        throw new Error('Bad Request Creating Account')
      }
      setShowAlert(true)
      // You can navigate to another page if needed
    } catch (error) {
      console.log(error)
      window.alert(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateSubmit = async (values: IAccount) => {
    try {
      setShouldFetch(true)
      setIsLoading(true)
      const newValues = {
        ...values,
        login_attempt_count: parseInt(values.login_attempt_count as unknown as string),
        post_scrapped_count: parseInt(values.post_scrapped_count as unknown as string),
      }

      await updateAccount(newValues)
      setShowAlert(true)
    } catch (error) {
      console.log(error)
      window.alert(error)
    } finally {
      setIsLoading(false)
    }
  }

  const createAccount = async (values: IAccount) => {
    const res = await AccountFetcher.POST(`/api/accounts`, values)
    return res
  }

  const updateAccount = async (values: IAccount) => {
    const newValues = {
      ...account,
      ...values,
      last_login_dt: dayjs(values.last_login_dt, 'YYYY-MM-DDTHH:mm').utc().local().format('YYYY-MM-DD THH:mm:ss'),
    }
    console.log({ newValues })
    await useUpdateAccount(newValues)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked)
  }
  return (
    <div>
      {isCreate ? (
        <div className="mx-48 my-8">
          <Title level={1} bold>
            CREATE NEW ACCOUNT
          </Title>
          <Paragraph bold> Connect your Instagram account to start scraping</Paragraph>
        </div>
      ) : (
        <div className="mx-48 my-8">
          <Title level={1} bold>
            ACCOUNT INFO
          </Title>
        </div>
      )}

      <div className="flex justify-center">
        {isCreate ? (
          <AccountCreateCard
            isLoading={isLoading}
            isCreate={isCreate}
            account={account}
            handleSubmit={handleCreateSubmit}
            setIsShow={setIsShow}
            isChecked={isChecked}
            handleChange={handleChange}
          />
        ) : (
          <AccountInfoCard
            isLoading={isLoading}
            isCreate={isCreate}
            account={account}
            handleSubmit={handleUpdateSubmit}
            setIsShow={setIsShow}
            isChecked={isChecked}
            handleChange={handleChange}
          />
        )}
      </div>
      <SessionModal
        isDisable={!canRenewSession}
        isShow={isShow}
        account={account}
        isLoading={!error && !data}
        onCancel={() => setIsShow(false)}
        updateSession={updateSession}
      />

      <Alerts.success isShow={showAlert} setIsShow={setShowAlert} />
    </div>
  )
}

export default AccountsPage
