import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Alerts } from '@components/Alerts'
import { IAccount } from '@lib/Account/Account/interface'
import SessionModal from '@lib/Account/Account/SessionModal'
import { getSession } from 'next-auth/react'
import Title from '@components/Typography/Title'
import Paragraph from '@components/Typography/Paragraph'
import AccountInfoCard from '@lib/Account/AccountInfoCard'
import AccountCreateCard from '@lib/Account/AccountCreateCard'
import { useAccount } from 'src/hooks/useAccount'
import { GetAccount, CreateAccount } from '@services/Account/Account'
import Image from 'next/image'

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

  const res =
    !isCreate &&
    (await GetAccount(params.id, {
      headers: {
        Cookie: context.req.headers.cookie,
      },
    }))
  const accountData = res as IAccount
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
  } = useAccount(id as string, shouldFetch, isCreate ? isCreate : accountData)
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

      const res = await CreateAccount(newValues)
      if (res.id) {
        window.alert(`Account ${res.username} created successfully`)
        router.push(`/accounts`)
      } else {
        window.alert(res)
      }

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

      const res = await updateAccount(newValues)
      if (res.id) {
        window.alert(`Account ${res.username} updated successfully`)
        router.push(`/accounts`)
      } else {
        window.alert(res)
      }
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
    console.log({ newValues })
    const res = await useUpdateAccount(newValues)
    return res
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked)
  }

  const goBack = () => {
    router.push(`/accounts`)
  }
  return (
    <div>
      {isCreate ? (
        <div className="h-full bg-bg-white bg-cover bg-center bg-no-repeat pb-12 md:static md:bg-[url('/create-account/background.svg')] md:px-12">
          <div className="flex w-full flex-col px-4 pt-4 md:w-1/2">
            <div className="flex flex-col pb-8">
              <div className="pb-4 pt-3">
                <div className="flex cursor-pointer flex-row gap-2 font-semibold text-accent2-500" onClick={goBack}>
                  <Image src="/create-account/back.svg" width={20} height={20} />
                  <div>{`Back`}</div>
                </div>
              </div>
              <div className="flex flex-col px-2 md:gap-6 md:px-12">
                <Title level={1} bold>
                  CREATE NEW ACCOUNT
                </Title>
                <Paragraph size="md" className=" text-lg" bold>
                  Connect your Instagram account
                </Paragraph>
              </div>
            </div>
            <div className="flex w-full justify-center shadow-lg md:ml-12 md:max-w-sm ">
              <AccountCreateCard
                isLoading={isLoading}
                isCreate={isCreate}
                account={account}
                handleSubmit={handleCreateSubmit}
                setIsShow={setIsShow}
                isChecked={isChecked}
                handleChange={handleChange}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full bg-cover bg-center bg-no-repeat md:px-12 ">
          <div className="flex justify-center">
            <AccountInfoCard isLoading={isLoading} isCreate={isCreate} account={account} handleSubmit={handleUpdateSubmit} setIsShow={setIsShow} />
          </div>
        </div>
      )}

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
