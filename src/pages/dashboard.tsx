import { ReactElement, useMemo, useState } from 'react'

import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import Link from 'next/link'
import { getSession } from 'next-auth/react'
import Image from 'next/image'

import { IAccount } from '@components/Account/Account'
import Primary from '@components/Button/Primary'
import PlusIcon from '@components/Icon/PlusIcon'
import ReportLayout from '@components/Layout/ReportLayout'
import ROUTE from '@constants/route'
import { useKeyword, useMostRepeatedPost, useMostRepeatedPostImage, usePostCount, useProfile } from '@hooks/useMeta'
import { getFilteredAccounts } from '@services/Account/Account'
import { CountryEnum } from 'enums/CountryCodeEnums'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/Tabs'
import Dropdown from '@components/Form/Dropdown/Dropdown'
import SideMenuLayout from '@components/Layout/SideMenuLayout'
import { Layout } from '@components/Layout'
import { getRoles } from '@services/util'
import { DatePickerWithRange } from '@components/ui/DatePickerWithRange'
import { DateRange } from 'react-day-picker'
import dayjs from '@utils/dayjs'

type Props = {
  botList: IAccount[]
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

  const roles = (await getRoles(user.email!)) as string[]
  const isAdmin = roles.includes('admin')

  const botList = isAdmin ? await getFilteredAccounts() : await getFilteredAccounts({ created_by: user.email! })

  return { props: { botList } }
}

const Dashboard = ({ botList }: Props) => {
  const [metaAttributes, setMetaAttributes] = useState<{
    accId: string | undefined
    days: number
    profile_id: string | undefined
    session_id?: string
    location?: CountryEnum
  }>({
    accId: botList.length > 0 ? botList[0].id : undefined,
    days: 3,
    profile_id: botList.length > 0 ? (botList[0].profile_id as string) : undefined,
  })
  const selectedAccount = useMemo(() => {
    if (!botList || botList.length === 0) {
      return null
    }
    const bot = botList.find((bot: IAccount) => bot.id === metaAttributes.accId)
    return bot ? bot : null
  }, [botList, metaAttributes.accId])

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 7)), // 7 days ago
    to: new Date(), // today
  })

  const { data: keywordData, isLoading: keywordIsLoading } = useKeyword(metaAttributes)
  const { data: postCountData, isLoading: postCountIsLoading } = usePostCount(metaAttributes)
  const { data: mostRepeatedPostData, isLoading: mostRepeatedPostIsLoading } = useMostRepeatedPost({
    ...metaAttributes,
    session_id: selectedAccount?.session_cookies?.sessionid as string,
    location: CountryEnum[selectedAccount?.location as CountryEnum],
  })
  const { data: mostRepeatedPostImage, isLoading: mostRepeatedPostImageIsLoading } = useMostRepeatedPostImage({
    shortcode: mostRepeatedPostData?.shortcode,
    batch_id: mostRepeatedPostData?.batch_id,
  })

  const { data: profile, isLoading: profileIsLoading } = useProfile({
    profile_id: selectedAccount?.profile_id as string,
    session_id: selectedAccount?.session_cookies?.sessionid as string,
    location: CountryEnum[selectedAccount?.location as CountryEnum],
  })

  const loadingStates = {
    keywordIsLoading,
    postCountIsLoading,
    mostRepeatedPostImageIsLoading,
    mostRepeatedPostIsLoading,
    profileIsLoading,
  }

  const onAccountChange = (e: string | number) => {
    const targetAccount = typeof e === 'string' ? botList?.find((item) => item.id === e) : null
    setMetaAttributes((prev) => ({
      ...prev,
      profile_id: (targetAccount?.profile_id as string) || '',
      accId: typeof e === 'string' ? e : '',
      session_id: targetAccount?.session_cookies?.sessionid,
      location: CountryEnum[targetAccount?.location as CountryEnum],
    }))
  }

  const tabItems = [
    {
      key: '1',
      value: '3-day-report',
      title: '3 Days Report',
      children: (
        <ReportLayout
          onAccountChange={onAccountChange}
          botList={botList || []}
          days={3}
          keyword={keywordData?.data}
          postCount={postCountData?.data?.post_count}
          mostRepeatedPost={mostRepeatedPostData}
          selectedAccount={selectedAccount}
          loading={loadingStates}
          mostRepeatedPostImage={mostRepeatedPostImage}
          profile={profile}
        />
      ),
      days: 3,
    },
    {
      key: '2',
      title: '7 Days Report',
      value: '7-day-report',
      children: (
        <ReportLayout
          days={7}
          keyword={keywordData?.data}
          postCount={postCountData?.data?.post_count}
          mostRepeatedPost={mostRepeatedPostData}
          onAccountChange={onAccountChange}
          botList={botList || []}
          selectedAccount={selectedAccount}
          loading={loadingStates}
          mostRepeatedPostImage={mostRepeatedPostImage}
          profile={profile}
        />
      ),
      days: 7,
    },
  ]

  const instaBotList = useMemo(() => {
    if (!botList || botList.length <= 0) return []
    return botList.map((bot: IAccount) => {
      return {
        label: (!bot.profile_id ? '[No Profile Found]\n' : '') + bot.username,
        value: bot.id,
      }
    })
  }, [botList])

  return (
    <div className="flex w-full justify-center ">
      <div className="flex w-full max-w-screen-xl flex-col">
        <div className="flex w-full flex-col">
          <h1 className="text-heading">Instagram Trend Analysis</h1>
          {instaBotList && (
            <div>
              <div className="relative flex flex-col gap-2 px-4 py-6">
                Instabot Account
                <div className="flex w-64 flex-row items-center gap-6">
                  <Dropdown
                    className="flex"
                    onValueChange={(e) => onAccountChange(e)}
                    value={selectedAccount?.id}
                    defaultValue={selectedAccount?.id}
                    options={instaBotList}
                    name={instaBotList[0].label}
                    dropDownSizes={['s', 's', 's']}
                    isFloating
                  />
                  <Link href={profile?.data.url ? profile.data.url : ''} target="_blank" className="flex min-h-6 min-w-6">
                    <Image className="cursor-pointer" alt={'account share button'} src={'./external-link.svg'} width={32} height={32} />
                  </Link>
                </div>
              </div>
              <div className="">
                <DatePickerWithRange date={date} className={''} setDate={setDate} />
                {date && (
                  <div>
                    {dayjs(date.from).format('MMM DD, YYYY')} - {dayjs(date.to).format('MMM DD, YYYY')}
                  </div>
                )}
              </div>
              <div className="mx-4 border-b border-neutral-300 pt-4"></div>
            </div>
          )}
        </div>
        {!botList || botList.length == 0 ? (
          <div className="flex w-full flex-col items-center justify-center gap-4 px-4 py-4 md:py-24 md:pt-12">
            <img alt="missing insta bot" className="h-auto w-96" src={'/no-insta-bot.png'} />
            <h2 className="font-extrabold">You have no linked instabot</h2>
            <h3 className="items-center text-center text-text-secondary">
              Your account does not have any verified instabot. Complete the adding account process to see dashboard.
            </h3>
            <Link href={ROUTE.ACCOUNT_BOT_CREATE}>
              <Primary sizes={['s', 'l', 'l']} className="px-2">
                <div className="flex flex-row items-center gap-2">
                  <PlusIcon className="h-6 w-6" />
                  <div className="">Add New Account</div>
                </div>
              </Primary>
            </Link>
          </div>
        ) : (
          <Tabs defaultValue={tabItems[0].value} className="mt-4 w-full ">
            <TabsList>
              {tabItems.map((item) => (
                <TabsTrigger className="w-full" key={item.key} value={item.value}>
                  {item.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {tabItems.map((item) => (
              <TabsContent key={item.key} value={item.value}>
                {item.children}
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>
    </div>
  )
}
export default Dashboard

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <SideMenuLayout>{page}</SideMenuLayout>
    </Layout>
  )
}
