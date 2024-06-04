import React from 'react'

import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { useRouter } from 'next/router'

import { IAccount } from '@components/Account/Account/interface'
import AccountInfoCard from '@components/Account/AccountInfoCard'
import { getAccount } from '@services/Account/Account'
import { useAccount } from 'src/hooks/useAccount'
import dayjs from 'src/utils/dayjs'

type Props = {
  account: IAccount | null
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> => {
  const id = context.query.id as string
  const res = await getAccount(id, {
    headers: {
      Cookie: context.req.headers.cookie,
    },
  })

  if (!res) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      account: {
        ...res,
        last_login_dt: dayjs(res.last_login_dt, 'YYYY-MM-DDTHH:mm:ss').utc().local().format('YYYY-MM-DDTHH:mm'),
      },
    },
  }
}

const BotPage = ({ account }: Props) => {
  const router = useRouter()
  const { id } = router.query
  const { data } = useAccount(id as string, false, account as IAccount)

  return (
    <div className="h-full bg-cover bg-center bg-no-repeat md:px-12 ">
      <div className="flex justify-center">{account && <AccountInfoCard account={data as IAccount} />}</div>
    </div>
  )
}

export default BotPage
