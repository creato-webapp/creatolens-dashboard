import { KeywordData } from '@services/Meta'
import type { MostRepeatedPost } from '@services/Meta' // Changed to type-only import

import ListPlusICon from './Icon/ListPlusIcon'
import SubtleButton from './Button/Subtle'
import HashIcon from './Icon/HashIcon'
import RepeatedIcon from './Icon/RepeatedIcon'
import ExportIcon from './Icon/ExportIcon'

interface IReportCard {
  postCount: number
  keyword?: KeywordData[]
  mostRepeatedPost?: MostRepeatedPost | null
  mostRepeatedPostImage?: string
  dateRange: string
}

const Divider = () => <hr className="my-2 border-t border-neutral-300" />

const PostCount = (props: { count: number }) => (
  <div className="py-3">
    <div className="flex flex-row items-center gap-2">
      <ListPlusICon />
      <div className="text-base">Post Count</div>
    </div>
    <div className="ml-7">
      <div className="text-sm text-neutral-500">{props.count}</div>
    </div>
  </div>
)

const TopKeywords = (props: { keywords: KeywordData[] }) => {
  const { keywords } = props

  const generateKeywordsString = keywords.map((keyword) => `${keyword.term} (${keyword.count})`).join(', ')

  return (
    <div className="py-3">
      <div className="flex flex-row items-center gap-2">
        <HashIcon />
        <div className="text-base">Top {keywords.length} Keywords</div>
      </div>
      <div className="ml-7 text-sm text-neutral-500">{generateKeywordsString}</div>
    </div>
  )
}

const MostRepeatedPost = (props: { post: MostRepeatedPost | null }) => {
  const { post } = props
  return (
    <div className="py-3">
      <div className="flex flex-row items-center gap-2">
        <RepeatedIcon />
        <div className="text-base">Most Repeated Post</div>
      </div>
      {post ? (
        <div>
          <div className="text-sm text-neutral-500">{post.caption}</div>
        </div>
      ) : (
        <div>No</div>
      )}
    </div>
  )
}

const exportToPDF = () => {
  //TODO
}

const ReportCard = (props: IReportCard) => {
  const { dateRange, postCount, keyword } = props
  return (
    <div id="report-card" className="w-full pb-12 md:min-w-80">
      <div className="rounded-lg border border-neutral-300 p-4 px-6">
        <div className="text-base font-semibold text-primary-500">{dateRange}</div>
        <Divider />
        <PostCount count={postCount} /> <Divider />
        <TopKeywords keywords={keyword ? keyword : []} />
        <Divider />
        <MostRepeatedPost
          post={{
            caption: 'Sample Caption',
            shortcode: 'sample-shortcode',
            username: 'sample-username',
            batch_id: 'sample-batch-id',
            count: 10,
          }}
        />
        <Divider />
        <div className="flex w-full items-center justify-center">
          <SubtleButton onClick={() => exportToPDF()} className="flex items-center justify-center">
            <ExportIcon width={16} height={16} />
            <div className="flex flex-row items-center">Export to PDF</div>
          </SubtleButton>
        </div>
      </div>
    </div>
  )
}

export default ReportCard
