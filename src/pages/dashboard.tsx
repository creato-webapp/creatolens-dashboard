import Hero from '@components/Hero'
import ReportLayout from '@components/Layout/ReportLayout'
import Tab from '@components/Tab'
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { getMeta } from '@services/Meta'
import { useState } from 'react'
import { useMeta } from 'src/hooks/useMeta'
import { getSession } from 'next-auth/react'

type Props = {
  dashboardData?: DashboardDataList
}

interface DashboardDataList {
  code: string
  data: Array<DashboardData>
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

  if (!session?.user?.id) return { props: { dashboardData: undefined } }
  const days = {
    accId: session.user.id,
    days: 90,
  }
  const response = await getMeta(days, {
    headers: {
      Cookie: context.req.headers.cookie,
    },
  })
  return { props: { dashboardData: response } }
}

const Dashboard = ({ dashboardData }) => {
  const [shouldFetch, setShouldFetch] = useState(false)
  const {
    data: responseData,
    isLoading,
    error,
  } = useMeta(
    {
      accId: '123',
      days: 5,
    },
    shouldFetch
  )

  const tabItems = [
    {
      key: '1',
      title: '3 Days Report',
      children: <ReportLayout />,
    },
    {
      key: '2',
      title: '7 Days Report',
      children: <ReportLayout />,
    },
    {
      key: '3',
      title: 'Compare Period',
      children: <div className="w-full flex-wrap gap-2 md:flex md:flex-nowrap md:justify-center md:py-12 md:shadow-lg">Compare Period</div>,
    },
    {
      key: '4',
      title: 'Compared Account',
      children: <div className="w-full flex-wrap gap-2 md:flex md:flex-nowrap md:justify-center md:py-12 md:shadow-lg">Custom Period</div>,
    },
  ]
  return (
    <div>
      <Hero
        backgroundImage="./GuideHero.svg"
        className="flex h-full flex-col justify-between md:h-52"
        childrenStyle="h-full md:gap-3 flex-col flex md:py-16 justify-center"
      >
        <div>
          <h1 className="uppercase md:font-extrabold">TREND ANALYSIS</h1>
        </div>
      </Hero>

      {/* <Card className="min-h-full w-full rounded-none border-none bg-transparent px-4 pt-3 shadow-none md:px-20 md:pb-28"> */}
      <Tab items={tabItems} defaultActiveKey="1" scrollable={false} className="mt-3 px-2 shadow-none md:px-4 md:shadow-xl lg:px-24" />
      {/* </Card> */}
    </div>
  )
}
export default Dashboard
