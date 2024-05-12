import Card from '@components/Card'
import CardWithIgPost from '@components/CardWithIgPost'
import Primary from '@components/Button/PrimaryButton'
import { useMemo } from 'react'
import Image from 'next/image'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Dropdown from '@components/Form/Dropdown'
import Link from 'next/link'
import { IAccount } from '@lib/Account/Account'
import Avatar from '@components/Avatar'
import PlusIcon from '@components/Icon/PlusIcon'
import ClockIcon from '@components/Icon/ClockIcon'
import { hoursAgo } from '@services/util'
import { KeywordData, MostRepeatedPost } from '@services/Meta'
import Badges from '@components/Badges'
import dayjs from 'src/utils/dayjs'
// generate fake data for this layout

interface Prop {
  days: number
  isLoading: boolean
  botList: IAccount[]
  onAccountChange: (e: string | number) => void
  selectedAccount: {
    username: string
    id: string
    profile_id?: string
  } | null
  data: {
    keyword?: KeywordData[]
    postCount?: number
    mostRepeatedPost?: MostRepeatedPost
  }
}
const ReportLayout = (props: Prop) => {
  const { data, days, isLoading, botList, onAccountChange, selectedAccount } = props
  // dayFormat = MMM DD YYYY - MMM DD YYYY
  const today = new Date()
  const lastDate = new Date(today)
  lastDate.setDate(today.getDate() - days)
  const dateStr = `${lastDate.toDateString().split(' ').slice(1).join(' ')} - ${today.toDateString().split(' ').slice(1).join(' ')}`
  const keywords = data?.keyword
  const mostRepeatedPost = data?.mostRepeatedPost

  const instaBotList = useMemo(() => {
    if (!botList || botList.length <= 0) return []
    return botList.map((bot: IAccount) => {
      return {
        label: (!bot.profile_id ? '[No Profile Found]\n' : '') + bot.username,
        value: bot.id,
      }
    })
  }, [botList])

  if (!botList || botList.length == 0) {
    return (
      <div className="flex h-64 w-full flex-col items-center justify-center gap-4">
        <h2>No Account Available</h2>
        <Link href="/accounts/create-account">
          <Primary sizes={['s', 'l', 'l']} styleClassName="px-2">
            <div className="flex flex-row items-center gap-2">
              <PlusIcon className="h-6 w-6" />
              <div className="hidden md:flex">Create New Account</div>
            </div>
          </Primary>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-between md:flex-col">
        <div className="my-2 flex flex-row justify-between md:my-7">
          <h1>Account Overview:</h1>
          <div className="hidden md:flex">
            {instaBotList && (
              <Dropdown
                onValueChange={(e) => onAccountChange(e)}
                value={selectedAccount?.id}
                defaultValue={selectedAccount?.id}
                options={instaBotList}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col justify-between gap-7 md:flex-row">
          <div className="flex flex-row items-center gap-2">
            <div className="flex">
              {selectedAccount && (
                <Avatar
                  size={'medium'}
                  src={selectedAccount.profile_id ? `/api/dashboard/userImage?profile_id=${selectedAccount.profile_id!}` : 'insta-bot.svg'}
                  fallbackSrc={'insta-bot.svg'}
                />
              )}
            </div>

            <h1 className="hidden text-text-secondary md:flex">{selectedAccount && '@' + selectedAccount.username}</h1>
            <div className="w-full flex-auto overflow-hidden md:hidden">
              <Dropdown
                dropDownSizes={['full', 'l', 'l']}
                onValueChange={onAccountChange}
                value={selectedAccount?.id}
                defaultValue={selectedAccount?.id}
                options={instaBotList}
                className=""
              />
            </div>
            <Link href={`https://www.instagram.com/${selectedAccount?.username}`} target="_blank" className="flex min-h-6 min-w-6">
              <Image className="cursor-pointer" alt={'account share button'} src={'./external-link.svg'} width={24} height={24} />
            </Link>
          </div>
          <div className="flex flex-col">
            <div className="flex w-fit flex-col gap-3 md:flex-row md:gap-4">
              <Link href="/accounts/create-account">
                <Primary sizes={['m', 'l', 'l']} className="flex w-full">
                  <PlusIcon className="h-6 w-6" /> Add New Account
                </Primary>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="my-2 md:my-7 md:h-[1px] md:bg-[#DDE5EA]" />
      <div className="flex flex-col gap-5 md:gap-12">
        <div className="flex grid-cols-1 flex-col gap-4 md:grid md:grid-cols-2">
          <Card className="h-full w-full !rounded-none">
            {
              <div>
                <h2>Period Show</h2>
                <div className="italic text-text-secondary">{`"This is your ${days} days report according to your traced followers"`}</div>
                <h2 className="font-extrabold text-accent1-500">{dateStr}</h2>
              </div>
            }
          </Card>
          <Card className="h-full w-full !rounded-none">
            {
              <div>
                <h2>Post Count</h2>
                <div className="italic text-text-secondary">&quot;Total post fetched in this period &quot;</div>
                {<h2 className="font-extrabold text-accent1-500">{isLoading ? <Skeleton /> : data?.postCount ? data.postCount : 0}</h2>}
              </div>
            }
          </Card>
        </div>
        <Card className="h-full w-full !rounded-none">
          {
            <div>
              <h2>Top 10 Keywords</h2>
              <div className="font-lato font-medium italic text-text-secondary">&quot;From hashtags, captions, locations&quot;</div>
              <div className="flex w-full flex-row flex-wrap text-xl">
                {keywords ? (
                  keywords.map((item: { term: string; count: number }, index: number) => {
                    return (
                      <div key={item.term} className="flex flex-row font-lato font-bold text-text-secondary">
                        {item.term}
                        <div className="mr-2 text-accent1-500">
                          ({item.count}){keywords.length != index + 1 ? ',' : ''}
                        </div>
                      </div>
                    )
                  })
                ) : isLoading ? (
                  <div className="flex w-full">
                    <Skeleton count={2} containerClassName="flex-1" />
                  </div>
                ) : (
                  <div> No Keyword </div>
                )}
              </div>
            </div>
          }
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row ">
            <Link href={'/recommendation'}>
              <Primary className="flex justify-center">
                <PlusIcon className="h-6 w-6" />
                Search Hashtag by Text
              </Primary>
            </Link>
            <Primary className="flex  justify-center">
              <PlusIcon className="h-6 w-6" />
              Search Hashtag By Image
            </Primary>
          </div>
        </Card>

        <CardWithIgPost
          title="Most repeated post from Explore"
          description="“Most repeated post showing on explore during fetching”"
          number={mostRepeatedPost?.count || 0}
          className="col-span-2 w-full"
          instaPost={mostRepeatedPost?.shortcode && `/api/dashboard/instapostImage?shortcode=${mostRepeatedPost.shortcode}`}
          icon="./Repeat.svg"
          isLoading={isLoading}
        >
          <div className="flex flex-wrap gap-2">
            <div>
              {isLoading ? (
                <Skeleton />
              ) : mostRepeatedPost ? (
                <Badges size="sm" status="text-secondary">
                  <ClockIcon />
                  {dayjs(mostRepeatedPost?.latest_created_at).format('YYYY-MM-DD HH:mm:ss') + ' ' + hoursAgo(mostRepeatedPost.latest_created_at!)}
                </Badges>
              ) : (
                ''
              )}
            </div>
            <div>
              {isLoading ? (
                <Skeleton />
              ) : mostRepeatedPost ? (
                <Badges size="sm" status="text-secondary">
                  <ClockIcon />
                  {dayjs(mostRepeatedPost?.second_latest_created_at).format('YYYY-MM-DD HH:mm:ss') +
                    ' ' +
                    hoursAgo(mostRepeatedPost?.second_latest_created_at!)}
                </Badges>
              ) : (
                ''
              )}
            </div>
          </div>
          <h3 className="font-extrabold">{mostRepeatedPost?.user.username && '@' + mostRepeatedPost?.user.username}</h3>
          <div className="flex-wrap break-all">{isLoading ? <Skeleton /> : mostRepeatedPost ? mostRepeatedPost?.caption : ''}</div>
        </CardWithIgPost>
      </div>
    </div>
  )
}
export default ReportLayout
