import Hero from '@components/Hero'
import ReportLayout from '@components/Layout/ReportLayout'
import Tab from '@components/Tab'
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { useMemo, useState } from 'react'
import { useMeta } from 'src/hooks/useMeta'
import { getSession } from 'next-auth/react'
import { getAccounts } from '@services/Account/Account'
import { IAccount } from '@lib/Account/Account'

type Props = {
  botList?: IAccount[]
}

export interface DashboardData {
  count: number
  fetched_by: string
  last_created_at: string
  last_updated_at: string
  last_uploaded_at: string
  term: string
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> => {
  const session = await getSession(context)
  if (!session || !session.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const user = session.user

  const botList = await getAccounts({
    created_by: user.email!,
  })
  return { props: { botList } }
}

const Dashboard = ({ botList }: Props) => {
  const [metaAttributes, setMetaAttributes] = useState({
    accId: botList![0].id,
    days: 3,
    profile_id: botList![0].profile_id as string,
  })

  const { data: responseData, isLoading } = useMeta(metaAttributes, true)

  const onKeyChange = (key: string) => {
    const targetItem = tabItems.find((item) => item.key === key)
    setMetaAttributes((pre) => ({
      ...pre,
      days: Number(targetItem?.days),
    }))
  }

  const onAccountChange = (e: string | number) => {
    const targetAccount = typeof e === 'string' ? botList?.find((item) => item.id === e) : null
    setMetaAttributes((prev) => ({
      ...prev,
      profile_id: (targetAccount?.profile_id as string) || '',
      accId: typeof e === 'string' ? e : '',
    }))
  }

  const selectedAccount = useMemo(() => {
    if (!botList || botList.length === 0) {
      return null
    }
    const bot = botList.find((bot: IAccount) => bot.id === metaAttributes.accId)
    return bot ? bot : null
  }, [botList, metaAttributes.accId])

  const tabItems = [
    {
      key: '1',
      title: '3 Days Report',
      children: (
        <ReportLayout
          onAccountChange={onAccountChange}
          botList={botList || []}
          days={3}
          data={responseData}
          isLoading={isLoading}
          selectedAccount={selectedAccount}
        />
      ),
      days: 3,
    },
    {
      key: '2',
      title: '7 Days Report',
      children: (
        <ReportLayout
          days={7}
          data={responseData}
          isLoading={isLoading}
          onAccountChange={onAccountChange}
          botList={botList || []}
          selectedAccount={selectedAccount}
        />
      ),
      days: 7,
    },
  ]

  return (
    <div className="">
      <Hero
        backgroundImage="./GuideHero.svg"
        className="flex h-full flex-col justify-between md:h-52"
        childrenStyle="h-full md:gap-3 flex-col flex py-4 md:py-16 justify-center"
      >
        <div>
          <h1 className="uppercase md:font-extrabold">TREND ANALYSIS</h1>
        </div>
      </Hero>
      <Tab
        items={tabItems}
        defaultActiveKey="1"
        onKeyChange={onKeyChange}
        scrollable={false}
        className="mt-3 px-2 shadow-none md:px-4 md:shadow-xl lg:px-24"
      />
    </div>
  )
}
export default Dashboard
