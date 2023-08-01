import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Alerts } from '@components/Alerts'
import { SessionModal, IAccount } from '@components/Account'
import useSWR from 'swr'
import { getSession } from 'next-auth/react'
import { Fetcher, FetchWithId } from 'services/fetcher'
import axios from 'axios'
import Title from '@components/Typography/Title'
import Paragraph from '@components/Typography/Paragraph'
import AccountInfoCard from '@lib/Account/AccountInfoCard'
import AccountCreateCard from '@lib/Account/AccountCreateCard'

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
  let canRenewSession = false
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
    (await axios.get(process.env.LOCAL_SERVER_URL + '/api/accounts/' + params.id, {
      headers: {
        Cookie: context.req.headers.cookie,
      },
    }))

  // Pass data to the page via props
  const accountData: IAccount = res ? res.data : null
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
    error,
    mutate: mutateAccountInfo,
    isValidating,
  } = useSWR(shouldFetch ? ['/api/accounts/', id] : null, FetchWithId.GET, {
    refreshInterval: 0,
    fallbackData: isCreate ? isCreate : accountData,
  })
  console.log(accountData)
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

  const handleSubmit = async (values: IAccount) => {
    try {
      setShouldFetch(true)
      setIsLoading(true)
      const newValues = {
        ...values,
        login_attempt_count: parseInt(values.login_attempt_count as unknown as string),
        post_scrapped_count: parseInt(values.post_scrapped_count as unknown as string),
      }

      const res = isCreate ? await createAccount(newValues) : await updateAccount(newValues)
      if (res.status == 400) {
        console.log(res.data)
        throw new Error('Bad Request Updating Accounts')
      }
      setShowAlert(true)
      mutateAccountInfo()
      router.replace(`/accounts`)
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
      last_login_dt: dayjs(values.last_login_dt, 'YYYY-MM-DDTHH:mm').utc().local().format('YYYY-MM-DD THH:mm:ss'),
    }

    const res = await Fetcher.PATCH(`/api/accounts/${id}`, newValues)
    return res
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.checked)
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
            handleSubmit={handleSubmit}
            setIsShow={setIsShow}
            isChecked={isChecked}
            handleChange={handleChange}
          />
        ) : (
          <AccountInfoCard
            isLoading={isLoading}
            isCreate={isCreate}
            account={account}
            handleSubmit={handleSubmit}
            setIsShow={setIsShow}
            isChecked={isChecked}
            handleChange={handleChange}
          />
        )}
      </div>

      <Alerts.success isShow={showAlert} setIsShow={setShowAlert} />
    </div>
  )
}

export default AccountsPage
