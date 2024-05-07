import Card from '@components/Card'
import CardWithIgPost from '@components/CardWithIgPost'
import Primary from '@components/Button/PrimaryButton'
import Outline from '@components/Button/OutlineButton'
import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Dropdown from '@components/Form/Dropdown'
import Link from 'next/link'
import { IAccount } from '@lib/Account/Account'
import { Fetcher } from '@services/fetcher'
import Avatar from '@components/Avatar'
import { getMetaImage } from '@services/Image'

// generate fake data for this layout

interface PostData {
  count: number
  owner_username: string
  latest_created_at?: string
  second_latest_created_at?: string
  caption?: string
}

interface MostRepeatedPost extends PostData {
  username: string
}

interface Prop {
  days: number
  isLoading: boolean
  botList: IAccount[]
  onAccountChange: (e: string | number) => void
  selectedAccount: {
    username: string
    id: string
    profile_id: string
  } | null
  data: {
    data: PostData[]
    keyword?: { term: string; count: number }[]
    postCount?: number
    mostRepeatedPost: any
  }
}
const ReportLayout = (props: Prop) => {
  const { data, days, isLoading, botList, onAccountChange, selectedAccount, userProfilePic } = props

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
        label: bot.username,
        value: bot.id,
      }
    })
  }, [botList])

  if (!botList || botList.length == 0) {
    return <div>No Bot Available</div>
  }

  return (
    <div>
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
            {/* <Avatar size={'medium'} src={URL.createObjectURL(userProfilePic)} /> */}
            {/* {selectedAccount && <img src={`/api/dashboard/image?profile_id=${selectedAccount.profile_id}`} />} */}
            {userProfilePic && <img src={userProfilePic} />}
            <h1 className="hidden text-text-secondary md:flex">{selectedAccount && '@' + selectedAccount.username}</h1>
            <div className="md:hidden">
              <Dropdown
                dropDownSizes={['l', 'l', 'l']}
                onValueChange={onAccountChange}
                value={selectedAccount?.id}
                defaultValue={selectedAccount?.id}
                options={instaBotList}
              />
            </div>
            <Link href={`https://www.instagram.com/${selectedAccount?.username}`} target="_blank">
              <Image className="cursor-pointer" alt={'account share button'} src={'./external-link.svg'} width={24} height={24} />
            </Link>
          </div>
          <div className="flex flex-col">
            <div className="flex w-fit flex-col gap-3 md:flex-row md:gap-4">
              <Primary sizes={['m', 'l', 'l']} className="flex w-full">
                + Add New Account
              </Primary>
              {/* <Outline sizes={['m', 'l', 'l']} className="flex w-full">
                Export To PDF
              </Outline> */}
            </div>
          </div>
        </div>
      </div>
      {/* <div className={'my-7 md:flex h-[1px]'}> */}
      <div className="my-2 md:my-7 md:h-[1px] md:bg-[#DDE5EA]" />
      {/* </div> */}
      <div className="flex flex-col gap-7">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
              <div className="italic text-text-secondary">&quot;From hashtags, captions, locations&quot;</div>
              <div className="flex w-full flex-row flex-wrap text-xl">
                {keywords ? (
                  keywords.map((item: { term: string; count: number }, index: number) => {
                    return (
                      <div key={item.term} className="flex flex-row font-bold">
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
          <div className="flex  flex-col items-center justify-center gap-4  md:flex-row">
            <Primary className="flex  justify-center">+ Search Hashtag by Text</Primary>
            <Primary className="flex  justify-center">+ Search Hashtag By Image</Primary>
          </div>
        </Card>

        <CardWithIgPost
          title="Most repeated post from Explore"
          description="“Most repeated post showing on explore during fetching”"
          number={mostRepeatedPost?.count || 0}
          className="col-span-2 w-full"
          instaPost="/landing-mobile-new.png"
          icon="./Repeat.svg"
          isLoading={isLoading}
        >
          <div>
            <div>{isLoading ? <Skeleton /> : mostRepeatedPost ? mostRepeatedPost?.latest_created_at : ''}</div>
            <div>{isLoading ? <Skeleton /> : mostRepeatedPost ? mostRepeatedPost?.second_latest_created_at : ''}</div>
            <div>{isLoading ? <Skeleton /> : mostRepeatedPost ? mostRepeatedPost?.caption : ''}</div>
          </div>
        </CardWithIgPost>
        <Outline className="w-full md:hidden">Export To PDF</Outline>
      </div>
    </div>
  )
}
export default ReportLayout
