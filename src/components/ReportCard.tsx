import { KeywordData } from '@services/Meta'
import type { MostRepeatedPost } from '@services/Meta' // Changed to type-only import

import ListPlusICon from './Icon/ListPlusIcon'
import SubtleButton from './Button/Subtle'

interface IReportCard {
  postCount: number
  keyword?: KeywordData[]
  mostRepeatedPost?: MostRepeatedPost | null
  mostRepeatedPostImage?: string
  dateRange: string
}

const Divider = () => <hr className="my-2 border-t border-neutral-300" />

const PostCount = (props: { count: number }) => (
  <div className="flex flex-row gap-3 py-3">
    <div>
      <ListPlusICon />
    </div>
    <div className="flex flex-col gap-1">
      <div className="text-base">Post Count</div>
      <div className="text-sm text-neutral-500">{props.count}</div>
    </div>
  </div>
)

// const TopKeywords = (props: { keywords: KeywordData[] }) => {
//   const { keywords } = props
//   return (
//     <div>
//       {keywords.map((keyword) => {
//         return <>{keyword.count}</>
//       })}
//     </div>
//   )
// }

const MostRepeatedPost = (props: { post: MostRepeatedPost | null }) => {
  const { post } = props
  return (
    <div>
      {post && (
        <div>
          <div className="text-base">Most Repeated Post</div>
          <div className="text-sm text-neutral-500">{post.caption}</div>
        </div>
      )}
    </div>
  )
}

const exportToPDF = () => {
  //TODO
}

const ReportCard = (props: IReportCard) => {
  const { dateRange } = props
  return (
    <div id="report-card" className="min-w-80 ">
      <div className="rounded-lg border border-neutral-300 p-4 px-6">
        <div className="text-base font-semibold text-primary-500">{dateRange}</div>
        <Divider />
        <PostCount count={1} />
        <div className="flex w-full items-center justify-center">
          <SubtleButton onClick={() => exportToPDF()}>Export to PDF</SubtleButton>
        </div>
      </div>
    </div>
  )
}

export default ReportCard
