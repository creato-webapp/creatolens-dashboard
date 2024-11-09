import { useEffect, useRef, useState } from 'react'
import { KeywordData } from '@services/Meta'
import type { MostRepeatedPost } from '@services/Meta'
import ListPlusIcon from './Icon/ListPlusIcon'
import SubtleButton from './Button/Subtle'
import HashIcon from './Icon/HashIcon'
import RepeatedIcon from './Icon/RepeatedIcon'
import ExportIcon from './Icon/ExportIcon'
import Image from 'next/image'
import { DateRange } from 'react-day-picker'
import { ScrollArea } from './ui/ScrollArea'
import Link from 'next/link'
import UserIcon from './Icon/UserIcon'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/Dialog'

interface IReportCard {
  postCount: number
  keyword?: KeywordData[]
  mostRepeatedPost?: MostRepeatedPost | null
  mostRepeatedPostImage?: string
  dateRange: DateRange
  loading: {
    keywordIsLoading: boolean
    postCountIsLoading: boolean
    mostRepeatedPostIsLoading: boolean
  }
}

const Divider = () => <hr className="my-2 border-t border-neutral-300" />

const Skeleton = ({ width, height }: { width?: string; height?: string }) => (
  <div className="animate-pulse bg-gray-300" style={{ width: width || '100%', height: height || '1rem' }} />
)

const PostCount = (props: { count: number; loading: boolean }) => (
  <div className="py-3">
    <div className="flex flex-row items-center gap-2">
      <ListPlusIcon />
      <div className="text-base">Post Count</div>
    </div>
    <div className="ml-7">{props.loading ? <Skeleton height="1rem" /> : <div className="text-sm text-neutral-500">{props.count}</div>}</div>
  </div>
)

const KeywordLink = ({ keyword }: { keyword: KeywordData }) => (
  <a
    href={`https://www.instagram.com/explore/tags/${keyword.term}`}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block text-neutral-500 transition-colors duration-200 hover:text-neutral-700 hover:underline"
  >
    #{keyword.term} ({keyword.count})
  </a>
)

const TopKeywords = ({ keywords, loading }: { keywords: KeywordData[]; loading: boolean }) => (
  <div className="py-3">
    <div className="flex flex-row items-center gap-2">
      <HashIcon className="h-5 w-5" />
      <div className="text-base">Top {keywords.length} Keywords</div>
    </div>
    <div className="ml-7 text-sm text-neutral-500">
      {loading ? (
        <Skeleton height="1rem" />
      ) : keywords ? (
        keywords.map((keyword, index) => (
          <span key={keyword.term}>
            <KeywordLink keyword={keyword} />
            {index < keywords.length - 1 && <span className="text-neutral-400">, </span>}
          </span>
        ))
      ) : (
        <span>No keywords found</span>
      )}
    </div>
  </div>
)

export function ReadMoreButton(props: IReportCard) {
  const { mostRepeatedPost, mostRepeatedPostImage, dateRange } = props

  const from = dateRange.from ? new Date(dateRange.from).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : ''
  const to = dateRange.to ? new Date(dateRange.to).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : ''

  const dateStr = `${from} - ${to}`

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-row items-center">
          <button className="mt-2 text-primary-500 hover:underline focus:outline-none">Read More</button>
        </div>
      </DialogTrigger>
      <DialogContent className="h-2/3 max-w-[80%] p-8">
        <DialogHeader className="flex w-full flex-col">
          <div className="flex w-full items-center justify-center">
            <DialogTitle>Most Repeated Post ({mostRepeatedPost?.count || 0})</DialogTitle>
          </div>
          <DialogDescription className="flex flex-col  text-start">
            <div className="text-start text-subheading text-neutral-800">From instabot explore</div>
            <div className="font-semibold text-primary-500">{dateStr}</div>
          </DialogDescription>
        </DialogHeader>

        <div className="flex max-h-[100%] flex-col gap-4 overflow-hidden md:flex-row">
          <div className="relative flex h-80 w-1/2 min-w-64 items-start justify-start">
            <Image src={mostRepeatedPostImage || '/logo_orange.png'} className="w-auto" layout="fill" objectFit="contain" alt={''} />
          </div>
          <div className="flex h-full w-1/2 flex-col overflow-hidden">
            {mostRepeatedPost?.username && (
              <div className="flex w-full flex-row items-center justify-between pb-2 text-base font-extrabold text-neutral-800">
                <Link
                  href={`https://www.instagram.com/p/${mostRepeatedPost?.shortcode}`}
                  target="_blank"
                  className="flex w-full flex-row items-center justify-between"
                >
                  <div>{mostRepeatedPost?.username && `@` + mostRepeatedPost?.username}</div>
                  <UserIcon size={20} />
                </Link>
              </div>
            )}
            <ScrollArea className="max-h-[calc(100vh-50%)] ">{mostRepeatedPost && <div>{mostRepeatedPost.caption}</div>}</ScrollArea>
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const MostRepeatedPost = ({
  post,
  mostRepeatedPostImage,
  loading,
  dateRange,
}: {
  post: MostRepeatedPost | null
  mostRepeatedPostImage?: string
  loading: boolean
  dateRange: DateRange
}) => {
  const [isOverflowing, setIsOverflowing] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  // Check if content overflows
  useEffect(() => {
    if (contentRef.current) {
      setIsOverflowing(contentRef.current.scrollHeight > contentRef.current.clientHeight)
    }
  }, [post])

  // Toggle Read More

  return (
    <div className="z-0 py-3">
      <div className="flex flex-row items-center gap-2">
        <RepeatedIcon />
        <div className="flex flex-col">
          <div className="text-base">Most Repeated Post</div>
        </div>
      </div>
      <div className="ml-7 py-2 text-neutral-500">
        <div>From instabot explore </div>
      </div>
      <div className="ml-7 h-full text-sm text-neutral-500">
        <div className="relative h-80">
          <Image src={mostRepeatedPostImage || '/logo_orange.png'} className="w-auto" layout="fill" objectFit="contain" alt={''} />
        </div>

        {post?.username && (
          <div className="flex w-full flex-row items-center justify-between pt-3 text-base font-extrabold text-neutral-800">
            <Link
              href={`https://www.instagram.com/p/${post?.shortcode}`}
              target="_blank"
              className="flex w-full flex-row items-center justify-between"
            >
              <div>{post?.username && `@` + post?.username}</div>
              <UserIcon size={20} />
            </Link>
          </div>
        )}
        {loading ? (
          <Skeleton height="1rem" />
        ) : post ? (
          <div className="mt-2">
            <div ref={contentRef} className={`max-h-20 overflow-hidden transition-all duration-300`}>
              {post.caption}
            </div>
            {isOverflowing && (
              <ReadMoreButton
                dateRange={dateRange}
                postCount={0}
                loading={{
                  keywordIsLoading: false,
                  postCountIsLoading: false,
                  mostRepeatedPostIsLoading: false,
                }}
                mostRepeatedPost={post}
                mostRepeatedPostImage={mostRepeatedPostImage}
              />
            )}
          </div>
        ) : (
          <div>No post available</div>
        )}
      </div>
    </div>
  )
}
const exportToPDF = () => {}

const ReportCard = (props: IReportCard) => {
  const { dateRange, postCount, keyword, mostRepeatedPost, loading, mostRepeatedPostImage } = props

  const from = dateRange.from ? new Date(dateRange.from).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : ''
  const to = dateRange.to ? new Date(dateRange.to).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : ''

  const dateStr = `${from} - ${to}`

  return (
    <ScrollArea id="report-card" className="relative h-128 w-full rounded-lg border border-neutral-300 p-4 px-6 md:w-80">
      <div className="sticky top-0 z-10 bg-white text-base font-semibold text-primary-500">{dateStr}</div>
      <div className="h-full  overflow-hidden">
        <Divider />
        {loading.postCountIsLoading ? <Skeleton height="3rem" /> : <PostCount count={postCount || 0} loading={loading.postCountIsLoading} />}
        <Divider />
        {loading.keywordIsLoading ? <Skeleton height="3rem" /> : <TopKeywords keywords={keyword || []} loading={loading.keywordIsLoading} />}
        <Divider />
        {loading.mostRepeatedPostIsLoading ? (
          <Skeleton height="3rem" />
        ) : (
          <MostRepeatedPost
            post={mostRepeatedPost || null}
            loading={loading.mostRepeatedPostIsLoading}
            mostRepeatedPostImage={mostRepeatedPostImage}
            dateRange={dateRange}
          />
        )}
      </div>
      <div className="sticky bottom-0 flex w-full items-center justify-center border-t border-neutral-300 bg-white p-4">
        <SubtleButton onClick={() => exportToPDF()} className="flex items-center justify-center">
          <ExportIcon width={16} height={16} />
          <div className="flex flex-row items-center">Export to PDF</div>
        </SubtleButton>
      </div>
    </ScrollArea>
  )
}

export default ReportCard
