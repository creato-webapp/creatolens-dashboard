import React, { useState, useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'
import { IAccount } from '@lib/Account/Account/interface'
import SessionModal from '@lib/Account/Account/SessionModal'
import Title from '@components/Typography/Title'
import Paragraph from '@components/Typography/Paragraph'
import AccountInfoCard from '@lib/Account/AccountInfoCard'
import AccountCreateCard from '@lib/Account/AccountCreateCard'
import { useAccount } from 'src/hooks/useAccount'
import { getAccount, createAccount } from '@services/Account/Account'
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { useDialogues, Status } from 'src/context/DialogueContext'
import Image from 'next/image'
import dayjs from '@services/Dayjs'

type Props = {
  accountData: IAccount | null
  isCreate: boolean
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> => {
  const id = context.query.id as string
  const isCreate = id === 'create-account'
  if (isCreate) {
    return { props: { accountData: null, isCreate } }
  }
  const res = await getAccount(id, {
    headers: {
      Cookie: context.req.headers.cookie,
    },
  })
  if (!res) {
    return { redirect: { destination: '/404', permanent: false } }
  }
  return { props: { accountData: res, isCreate } }
}

const AccountsPage = ({ accountData, isCreate }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [shouldFetch, setShouldFetch] = useState(false)
  const [isShow, setIsShow] = useState(false)
  const router = useRouter()
  const { addDialogue } = useDialogues()

  const { data, error, updateAccount: callUpdateAccount, updateSession } = useAccount(router.query.id as string, shouldFetch, accountData)

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

  const handleCreateSubmit = useCallback(
    async (values: IAccount) => {
      try {
        setShouldFetch(false)
        setIsLoading(true)
        const res = await createAccount(values)
        if (res.id) {
          goBack()
        } else {
          throw new Error('Account Id not found')
        }
        addDialogue('Account created successfully', Status.SUCCESS)
      } catch (error) {
        console.error(error)
        addDialogue('Failed to create account', Status.FAILED)
      } finally {
        setIsLoading(false)
      }
    },
    [goBack, addDialogue]
  )

  const handleUpdateSubmit = useCallback(
    async (values: IAccount) => {
      try {
        setShouldFetch(true)
        setIsLoading(true)
        const newValues = {
          ...values,
          last_login_dt: dayjs(values.last_login_dt, 'YYYY-MM-DDTHH:mm').utc().local().format('YYYY-MM-DD THH:mm:ss'),
        }
        const res = await callUpdateAccount(newValues)
        if (res?.id) {
          goBack()
        } else {
          throw new Error('Account Id not found')
        }
        addDialogue('Account created successfully', Status.SUCCESS)
      } catch (error) {
        console.error(error)
        addDialogue('Failed update account', Status.FAILED)
      } finally {
        setIsLoading(false)
      }
    },
    [goBack, callUpdateAccount, addDialogue]
  )

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked)
  }, [])

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
