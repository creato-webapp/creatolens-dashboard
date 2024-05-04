import Card from '@components/Card'
import CardWithIgPost from '@components/CardWithIgPost'
import Divider from '@components/Divider'
import Primary from '@components/Button/PrimaryButton'
import Outline from '@components/Button/OutlineButton'
import Avatar from '@components/Avatar'
import { useEffect } from 'react'

// generate fake data for this layout
const account = {
  account_name: 'Timothy Lam',
}

const periodDescription = 'This is your @X@ days report according to your traced followers'

const ReportLayout = (props) => {
  const { account_name } = account
  const { data, days } = props

  // dayFormat = MMM DD YYYY - MMM DD YYYY
  const today = new Date()
  const lastDate = new Date(today)
  lastDate.setDate(today.getDate() - days)
  const dateStr = `${lastDate.toDateString()} - ${today.toDateString()}`

  return (
    <div>
      <div className="flex flex-col justify-between md:flex-col">
        <div className="my-7 flex flex-row justify-between">
          <h1>Account Overview:</h1>
          <div>Instabot selection</div>
        </div>
        <div className="flex flex-col justify-between md:flex-row">
          <div className="flex flex-row items-center gap-2">
            <Avatar className="h-14 w-14" src="/avatar.jpg" />
            <h1 className="text-text-secondary">@{account_name}</h1>
          </div>
          <div className="flex flex-col">
            <div className="flex w-fit flex-row gap-4">
              <Primary className="flex w-full">+ Add New Account</Primary>
              <Outline className="flex w-full">Export To PDF</Outline>
            </div>
          </div>
        </div>
      </div>
      <Divider margin="28px" />
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-6 md:flex-row">
          <Card className="w-full rounded-none">
            {
              <div>
                <h2>Period Show</h2>
                <div className="italic text-text-secondary">{`"This is your ${days} days report according to your traced followers"`}</div>
                <h2 className="font-extrabold text-accent1-500">{dateStr}</h2>
              </div>
            }
          </Card>
          <Card className="w-full">
            {
              <div>
                <h2>Post Count</h2>
                <div className="italic text-text-secondary">"Total post fetched in this period"</div>
              </div>
            }
          </Card>
        </div>

        <CardWithIgPost
          title="Tesing"
          description="Testing description"
          repostNumber={20}
          className="col-span-2 w-full"
          instaPost="/landing-mobile-new.png"
        ></CardWithIgPost>
        <Outline className="w-full md:hidden">Export To PDF</Outline>
      </div>
    </div>
  )
}
export default ReportLayout
