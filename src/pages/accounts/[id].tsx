import React, { useState, useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'
import { IAccount } from '@lib/Account/Account/interface'
import SessionModal from '@lib/Account/Account/SessionModal'
import { getSession } from 'next-auth/react'
import Title from '@components/Typography/Title'
import Paragraph from '@components/Typography/Paragraph'
import AccountInfoCard from '@lib/Account/AccountInfoCard'
import AccountCreateCard from '@lib/Account/AccountCreateCard'
import { useAccount } from 'src/hooks/useAccount'
import { getAccount, createAccount } from '@services/Account/Account'
import Image from 'next/image'
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import dayjs from '@services/Dayjs'

type Props = {
  accountData: IAccount | null
  isCreate: boolean
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> => {
  const id = context.params?.id as string
  const isCreate = id === 'create-account'
  if (isCreate) {
    return { props: { accountData: null, isCreate } }
  }
  const res = await getAccount(id, {
    headers: {
      Cookie: context.req.headers.cookie,
    },
  })
  return { props: { accountData: res, isCreate } }
}

const AccountsPage = ({ accountData, isCreate }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [shouldFetch, setShouldFetch] = useState(false)
  const [isShow, setIsShow] = useState(false)
  const router = useRouter()
  const { id } = router.query
  const { data, error, updateAccount: callUpdateAccount, updateSession } = useAccount(id as string, shouldFetch, accountData)

  const account: IAccount | null = useMemo(
    () =>
      data
        ? {
            ...data,
            last_login_dt: dayjs(data.last_login_dt, 'YYYY-MM-DDTHH:mm:ss').utc().local().format('YYYY-MM-DDTHH:mm'),
          }
        : null,
    [data]
  )

  const goBack = useCallback(() => {
    router.push(`/accounts`)
  }, [router])

  const updateAccount = useCallback(
    async (values: IAccount) => {
      const newValues = {
        ...account,
        ...values,
        last_login_dt: dayjs(values.last_login_dt, 'YYYY-MM-DDTHH:mm').utc().local().format('YYYY-MM-DD THH:mm:ss'),
      }
      const res = await callUpdateAccount(newValues)
      return res
    },
    [account, callUpdateAccount]
  )

  const handleCreateSubmit = useCallback(
    async (values: IAccount) => {
      try {
        setShouldFetch(false)
        setIsLoading(true)
        const res = await createAccount(values)
        if (res.id) {
          window.alert(`Account ${res.username} created successfully`)
          goBack()
        } else {
          window.alert(res)
        }
      } catch (error) {
        console.error(error)
        window.alert(error)
      } finally {
        setIsLoading(false)
      }
    },
    [goBack]
  )

  const handleUpdateSubmit = useCallback(
    async (values: IAccount) => {
      try {
        setShouldFetch(true)
        setIsLoading(true)
        const res = await updateAccount(values)
        if (res.id) {
          window.alert(`Account ${res.username} updated successfully`)
          goBack()
        } else {
          window.alert(res)
        }
      } catch (error) {
        console.error(error)
        window.alert(error)
      } finally {
        setIsLoading(false)
      }
    },
    [goBack, updateAccount]
  )

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked)
  }, [])

  if (error) {
    return <div>Failed to load users {id}</div>
  }
  return (
    <div>
      {isCreate ? (
        <div className="h-full bg-bg-white bg-cover bg-center bg-no-repeat pb-12 md:static md:bg-[url('/create-account/background.svg')] md:px-12">
          <div className="flex w-full flex-col px-4 pt-4 md:w-1/2">
            <div className="flex flex-col pb-8">
              <div className="pb-4 pt-3">
                <div className="flex cursor-pointer flex-row gap-2 font-semibold text-accent2-500" onClick={goBack}>
                  <Image alt="back" src="/create-account/back.svg" width={20} height={20} />
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
                handleSubmit={handleCreateSubmit}
                setIsShow={setIsShow}
                isValidate={isChecked}
                handleChange={handleChange}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full bg-cover bg-center bg-no-repeat md:px-12 ">
          <div className="flex justify-center">
            {account && (
              <AccountInfoCard isLoading={isLoading} isCreate={isCreate} account={account} handleSubmit={handleUpdateSubmit} setIsShow={setIsShow} />
            )}
          </div>
        </div>
      )}

      <SessionModal isShow={isShow} account={account} isLoading={!error && !data} onCancel={() => setIsShow(false)} updateSession={updateSession} />
    </div>
  )
}

export default AccountsPage
