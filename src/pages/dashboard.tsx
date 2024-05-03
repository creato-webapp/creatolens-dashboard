import Hero from '@components/Hero'
import ReportLayout from '@components/Layout/ReportLayout'
import Tab from '@components/Tab'
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { getMeta } from '@services/Meta'
import { useEffect, useState } from 'react'
import { useMeta } from 'src/hooks/useMeta'
import { getSession } from 'next-auth/react'
import { getAccount } from '@services/Account/Account'

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
    accId: session?.user?.id,
    days: 3,
  }
  const res = await getAccount(session?.user?.id, {
    headers: {
      Cookie: context.req.headers.cookie,
    },
  })
  const response = await getMeta(days, {
    headers: {
      Cookie: context.req.headers.cookie,
    },
  })
  const data = {
    ...res,
    ...response,
  }
  return { props: { dashboardData: data } }
}

const Dashboard = ({ dashboardData }) => {
  const [shouldFetch, setShouldFetch] = useState(false)
  const [metaAttributes, setMetaAttributes] = useState({
    accId: '0zfomMvxGqcCPPMZ8wMT',
    days: 3,
  })
  const { data: responseData, isLoading, error } = useMeta(metaAttributes, shouldFetch, dashboardData)

  const onKeyChange = (key: string) => {
    const targetItem = tabItems.find((item) => item.key === key)
    setShouldFetch(true)
    setMetaAttributes((pre) => ({
      ...pre,
      days: Number(targetItem?.days),
    }))
  }

  const tabItems = [
    {
      key: '1',
      title: '3 Days Report',
      children: <ReportLayout data={responseData} />,
      days: 3,
    },
    {
      key: '2',
      title: '7 Days Report',
      children: <ReportLayout data={responseData} />,
      days: 7,
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
      <Tab
        items={tabItems}
        defaultActiveKey="1"
        onKeyChange={onKeyChange}
        scrollable={false}
        className="mt-3 px-2 shadow-none md:px-4 md:shadow-xl lg:px-24"
      />
      {/* </Card> */}
    </div>
  )
}
export default Dashboard
