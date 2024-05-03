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

const ReportLayout = (props) => {
  const { account_name } = account
  const { data } = props

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
          <Card className="w-full" customTitle="Period Show"></Card>
          <Card className="w-full">{data.data.length}</Card>
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
