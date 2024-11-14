import { ReactElement, useCallback, useMemo, useState } from 'react'

import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import Link from 'next/link'
import { getSession } from 'next-auth/react'
import Image from 'next/image'
import { CombinedUser } from '@api/auth/[...nextauth]'
import { IAccount } from '@components/Account/Account'
import PlusIcon from '@components/Icon/PlusIcon'
import ROUTE from '@constants/route'
import { useKeyword, useMostRepeatedPost, useMostRepeatedPostImage, usePostCount, useProfile, useSearchHistory } from '@hooks/useMeta'
import { getFilteredAccounts } from '@services/Account/Account'
import { CountryEnum } from 'enums/CountryCodeEnums'
import Dropdown from '@components/Form/Dropdown/Dropdown'
import SideMenuLayout from '@components/Layout/SideMenuLayout'
import { Layout } from '@components/Layout'
import { getRoles } from '@services/util'
import { DateRange } from 'react-day-picker'
import NavigationPill from '@components/ui/NavigationPill'
import PrimaryButton from '@components/Button/Primary'
import ReportCard from '@components/ReportCard'
import Primary from '@components/Button/Primary'
import { getSearchHistory, KeywordData, MostRepeatedPost, createSearchHistory, formatDateRange } from '@services/Meta'
import { CarouselContent, CarouselItem, Carousel } from '@components/ui/Carousel'
import SearchIcon from '@components/Icon/SearchIcon'
import { formatDateRangeFromString } from '@utils/dayjs'
import { DateRangePicker } from '@components/ui/DateRangePicker'

enum ReportType {
  ThreeDays = 3,
  SevenDays = 7,
  Custom = 0,
}

type Props = {
  botList: IAccount[]
  historys: {
    data: HistoricSearchResult[] | []
  }
  userId: string
}

export interface DashboardData {
  count: number
  fetched_by: string
  last_created_at: string
  last_updated_at: string
  last_uploaded_at: string
  term: string
}

export interface HistoricSearchResult {
  date_range: {
    from: string
    to: string
  }
  username: string
  keyword: KeywordData[]
  account: string
  post_count: number
  mostRepeatedPostData?: MostRepeatedPost
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
  const cookies = context.req.headers.cookie

  const user = session.user as CombinedUser

  const userId = user.id

  const roles = (await getRoles(user.email!)) as string[]
  const isAdmin = roles.includes('admin')

  const botList = isAdmin
    ? await getFilteredAccounts({})
    : await getFilteredAccounts(
        { account: { created_by: user.email! } },
        {
          headers: {
            Cookie: cookies,
          },
        }
      )

  const historys = await getSearchHistory(
    {
      args: {
        userId: user.id,
      },
    },
    { headers: { Cookie: cookies } }
  )

  return { props: { botList, historys, userId } }
}

const Dashboard = ({ botList, historys, userId }: Props) => {
  const [formValues, setFormValues] = useState<{
    accId: string | undefined
    date_range: DateRange
    profile_id: string | undefined
    session_id?: string
    location?: CountryEnum
  }>({
    accId: botList.length > 0 ? botList[0].id : undefined,
    date_range: { from: new Date(new Date().setDate(new Date().getDate() - 7)), to: new Date() },
    profile_id: botList.length > 0 ? (botList[0].profile_id as string) : undefined,
  })

  // This state will be used for API calls
  const [metaAttributes, setMetaAttributes] = useState(formValues)

  const selectedAccount = useMemo(() => {
    if (!botList || botList.length === 0) {
      return null
    }
    const bot = botList.find((bot: IAccount) => bot.id === formValues.accId)
    return bot ? bot : null
  }, [botList, formValues.accId])

  const [reportDateRange, setReportDateRange] = useState(3)

  const { data: keywordData, isLoading: keywordIsLoading } = useKeyword(metaAttributes)
  const { data: postCountData, isLoading: postCountIsLoading } = usePostCount(metaAttributes)
  const { data: mostRepeatedPostData, isLoading: mostRepeatedPostIsLoading } = useMostRepeatedPost(metaAttributes)
  const { data: mostRepeatedPostImage, isLoading: mostRepeatedPostImageIsLoading } = useMostRepeatedPostImage({
    shortcode: mostRepeatedPostData?.shortcode,
    batch_id: mostRepeatedPostData?.batch_id,
  })
  const { data: searchHistories, mutate } = useSearchHistory({ userId }, historys)
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

  const onAccountChange = useCallback(
    (e: string | number) => {
      const targetAccount = typeof e === 'string' ? botList?.find((item) => item.id === e) : null
      setFormValues((prev) => ({
        ...prev,
        profile_id: (targetAccount?.profile_id as string) || '',
        accId: typeof e === 'string' ? e : '',
        session_id: targetAccount?.session_cookies?.sessionid,
        location: CountryEnum[targetAccount?.location as CountryEnum],
      }))
    },
    [botList]
  )

  const onSearchClick = async () => {
    mutate()
    setMetaAttributes(formValues)
    const { from, to } = formatDateRange(formValues.date_range)
    await createSearchHistory({
      userId,
      accId: formValues.accId as string,
      from,
      to,
    })
  }

  const instaBotList = useMemo(() => {
    if (!botList || botList.length <= 0) return []
    return botList.map((bot: IAccount) => {
      return {
        label: bot.username,
        value: bot.id,
      }
    })
  }, [botList])

  const MonthGroup = () => {
    const reportType = [
      {
        name: '3 Days Report',
        value: ReportType.ThreeDays,
      },
      {
        name: '7 Days Report',
        value: ReportType.SevenDays,
      },
      {
        name: 'Customized Period',
        value: ReportType.Custom,
      },
    ]

    const onSelect = useCallback((value: string | number) => {
      setReportDateRange(value as number)

      if (value === ReportType.SevenDays) {
        setFormValues((prev) => ({
          ...prev,
          date_range: {
            from: new Date(new Date().setDate(new Date().getDate() - 7)),
            to: new Date(),
          },
        }))
      }

      if (value === ReportType.ThreeDays) {
        setFormValues((prev) => ({
          ...prev,
          date_range: {
            from: new Date(new Date().setDate(new Date().getDate() - 3)),
            to: new Date(),
          },
        }))
      }
    }, [])

    return (
      <div className="flex flex-row flex-wrap gap-2">
        {reportType.map((key) => {
          return <NavigationPill key={key.name} name={key.name} value={key.value} onSelect={onSelect} selected={key.value === reportDateRange} />
        })}
      </div>
    )
  }

  return (
    <div className="flex w-full justify-center overflow-hidden">
      <div className="flex w-full max-w-screen-xl flex-col">
        <div className="flex w-full flex-col">
          <h1 className="text-heading">Instagram Trend Analysis</h1>
          <div className="flex flex-col">
            <div className="mt-4">
              <MonthGroup />
              <div className="mx-4 border-b border-neutral-300 pt-4"></div>
            </div>
            {instaBotList && (
              <div
                className={`mt-4 flex flex-col gap-4 px-4 md:mt-0 md:py-6 ${
                  reportDateRange === ReportType.Custom && 'rounded-bl-lg rounded-br-lg border-b border-l border-r py-4 shadow-lg'
                } h-full `}
              >
                <div className="flex flex-col-reverse gap-4 md:flex-row md:gap-4">
                  {reportDateRange === 0 && (
                    <div className="">
                      <div className="flex h-full w-full flex-col gap-2">
                        <div className="text-neutral-800">Select Date Range</div>
                        <DateRangePicker
                          showCompare={false}
                          onUpdate={(values) =>
                            setFormValues((pre) => ({
                              ...pre,
                              date_range: values.range,
                            }))
                          }
                          align={'start'}
                        />
                        <div className="text-nowrap text-neutral-500">Minimum 3 days must be selected</div>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col gap-2">
                    Instabot Account
                    <div className="relative flex w-full flex-row gap-2">
                      <div className="w-full md:min-w-[200px]">
                        <Dropdown
                          onValueChange={(e) => onAccountChange(e)}
                          value={selectedAccount?.id}
                          defaultValue={selectedAccount?.id}
                          options={instaBotList}
                          name={instaBotList[0]?.label}
                          dropDownSizes={['s', 's', 's']}
                          isFloating
                          className=""
                        />
                      </div>
                      <div className="">
                        <Link
                          href={profile?.data?.url ? profile.data.url.replace(/\s/g, '') : ''}
                          target="_blank"
                          className="relative flex h-full w-full"
                        >
                          <Image
                            className="cursor-pointer"
                            style={{ objectFit: 'contain' }}
                            alt={'account share button'}
                            src={'./external-link.svg'}
                            width={32}
                            height={32}
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <PrimaryButton onClick={onSearchClick} sizes={['s', 's', 's']} className="w-full md:w-80">
                    <SearchIcon />
                    Search
                  </PrimaryButton>
                </div>
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
                <PrimaryButton sizes={['s', 'l', 'l']} className="px-2">
                  <div className="flex flex-row items-center gap-2">
                    <PlusIcon className="h-6 w-6" />
                    <div className="">Add New Account</div>
                  </div>
                </PrimaryButton>
              </Link>
            </div>
          ) : botList ? (
            <Carousel
              opts={{
                align: 'start',
              }}
              className="mt-6 w-full"
            >
              <CarouselContent className="-ml-1 gap-4">
                <CarouselItem className="md:basis-2/3 lg:basis-1/3">
                  <ReportCard
                    postCount={postCountData?.data?.post_count ? postCountData?.data?.post_count : 0}
                    dateRange={metaAttributes.date_range}
                    loading={loadingStates}
                    keyword={keywordData?.data}
                    mostRepeatedPostImage={mostRepeatedPostImage}
                    mostRepeatedPost={mostRepeatedPostData}
                  />
                </CarouselItem>

                {searchHistories?.data &&
                  searchHistories.data.map((history, index) => {
                    const formattedDateRange = formatDateRangeFromString(history.date_range)

                    return (
                      <CarouselItem key={`history.account-${index}`} className="md:basis-2/3 lg:basis-1/3">
                        <ReportCard
                          account={history.username}
                          postCount={history.post_count}
                          dateRange={formattedDateRange}
                          mostRepeatedPost={history.mostRepeatedPostData}
                          keyword={history.keyword}
                          loading={{
                            keywordIsLoading: false,
                            postCountIsLoading: false,
                            mostRepeatedPostIsLoading: false,
                          }}
                        ></ReportCard>
                      </CarouselItem>
                    )
                  })}
              </CarouselContent>
            </Carousel>
          ) : (
            <div className="flex h-64 w-full flex-col items-center justify-center gap-4">
              <h2>No Account Available</h2>
              <Link href="/accounts/create">
                <Primary sizes={['s', 'l', 'l']} className="px-2">
                  <div className="flex flex-row items-center gap-2">
                    <PlusIcon className="h-6 w-6" />
                    <div className="hidden md:flex">Create New Account</div>
                  </div>
                </Primary>
              </Link>
            </div>
          )}
        </div>
        {/* <div className="px-4 text-start text-sm text-neutral-500">
          Please note: This tool may display offensive material that doesn&apos;t represent 2 Tag&apos;s views. You&apos;re solely responsible for use
          of any content generated using this tool, including its compliance with applicable laws and third-party rights.
        </div> */}
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
