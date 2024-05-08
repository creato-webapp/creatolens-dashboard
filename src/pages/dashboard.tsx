import Hero from '@components/Hero'
import ReportLayout from '@components/Layout/ReportLayout'
import Tab from '@components/Tab'
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { useEffect, useMemo, useState } from 'react'
import { useMeta } from 'src/hooks/useMeta'
import { getSession } from 'next-auth/react'
import { getAccounts } from '@services/Account/Account'
import { IAccount } from '@lib/Account/Account'
import { getMetaImage } from '@services/Image'

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

  // const botList = []
  return { props: { botList } }
}

const Dashboard = ({ botList }: Props) => {
  const [metaAttributes, setMetaAttributes] = useState({
    accId: botList[0]?.id ?? null,
    days: 3,
    profile_id: (botList[0]?.profile_id as string) ?? null,
  })

  const [userProfilePic, setUserProfilePic] = useState('')
  const selectedAccount = useMemo(() => {
    if (!botList || botList.length === 0) {
      return null
    }
    const bot = botList.find((bot: IAccount) => bot.id === metaAttributes.accId)
    return bot ? bot : null
  }, [botList, metaAttributes.accId])

  useEffect(() => {
    const fetchImage = async (profileId: string) => {
      try {
        const response = await getMetaImage({ profile_id: profileId })

        const buffer = Buffer.from(response, 'binary')

        // Convert the Buffer to a base64 string
        const base64String = buffer.toString('base64')

        // Create an object URL from the base64 string
        const objectUrl = `data:image/jpeg;base64,${base64String}`
        // const newResponse = response
        console.log('dllm', objectUrl)
        return objectUrl
      } catch (error) {
        console.error('Failed to fetch image', error)
        return null // Return null or handle the error appropriately
      }
    }

    if (selectedAccount && selectedAccount.profile_id) {
      fetchImage(selectedAccount.profile_id as string)
        .then((userPic) => {
          if (userPic) {
            console.log('userPic', userPic)
            // Do something with the userPic
            setUserProfilePic(userPic)
            console.log('User Picture Fetched:', userPic)
          } else {
            console.log('No picture fetched.')
          }
        })
        .catch((error) => {
          console.error('Error fetching user picture:', error)
        })
    } else {
      console.log('No selected account')
    }
  }, [selectedAccount])

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
          userProfilePic={userProfilePic}
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
          userProfilePic={userProfilePic}
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
        className="mt-3 px-2 shadow-none md:px-4 md:pb-12 lg:px-24"
      />
    </div>
  )
}
export default Dashboard
