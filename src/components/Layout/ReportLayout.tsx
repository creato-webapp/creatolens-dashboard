import Card from '@components/Card'
import CardWithIgPost from '@components/CardWithIgPost'
import Primary from '@components/Button/PrimaryButton'
import Outline from '@components/Button/OutlineButton'
import Avatar from '@components/Avatar'
import Image from 'next/image'

// generate fake data for this layout
const props = {
  account_name: 'Timothy Lam',
}

const ReportLayout = () => {
  const { account_name } = props
  return (
    <div>
      <div className="flex flex-col justify-between md:flex-col">
        <div className="my-2 flex flex-col justify-between md:my-7 md:flex-row">
          <h1>Account Overview:</h1>
          <div className="hidden md:block">Instabot selection</div>
        </div>
        <div className="flex flex-col justify-between gap-7 md:flex-row">
          <div className="flex flex-row items-center justify-between gap-2">
            <div className="flex flex-row items-center gap-2">
              <Avatar className="h-14 w-14" src="/avatar.jpg" />
              <h1 className="text-text-secondary">@{account_name}</h1>
            </div>
            <Image height={24} width={24} alt={'external link'} src="./external-link.svg" />
          </div>
          <div className="flex flex-col">
            <div className="flex w-fit flex-row gap-4">
              <Primary className="flex w-full">+ Add New Account</Primary>
              <Outline className="flex w-full">Export To PDF</Outline>
            </div>
          </div>
        </div>
      </div>
      <div className="my-4 bg-dividers md:my-7 md:block md:h-[1px]"></div>

      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-6 md:flex-row">
          <Card className="w-full">
            <div className="flex flex-col gap-4">
              <h2 className="font-extrabold">Period Show</h2>
              <p>
                <span className="font-bold">Start Date:</span> 01/01/2021
              </p>
              <h2 className="font-extrabold text-accent1-500">MM DD YYYY - MM DD YYYY</h2>
            </div>
          </Card>
          <Card className="w-full">
            <div className="flex flex-col gap-4">
              <h2 className="font-extrabold">Period Show</h2>
              <p>
                <span className="font-bold">Start Date:</span> 01/01/2021
              </p>
              <h2 className="font-extrabold text-accent1-500">MM DD YYYY - MM DD YYYY</h2>
            </div>
          </Card>
        </div>
        <Card className="w-full">
          <div className="flex flex-col gap-4">
            <h2 className="font-extrabold">To {} 10 Keywords</h2>
            <p>
              <span className="italic text-text-secondary">“From hashtags, captions, locations”</span>
            </p>
            <p className="text-text-secondary">
              Peak (97), Ocean Park (95), Avenue of Stars (92), Victoria Harbour (90), Disneyland (88), Ngong Ping 360 (85), Stanley Market (82),
              Lantau Island (80), Temple Street Night Market (78), Central (75)
            </p>
            <div className="flex flex-col items-center justify-center gap-3 md:flex-row">
              <Primary className="flex w-full">+ Add New Account</Primary>
              <Primary className="flex w-full">+ Add New Account</Primary>
            </div>
          </div>
        </Card>

        <CardWithIgPost
          title="Tesing"
          description="Testing description"
          repostNumber={20}
          className="col-span-2 w-full"
          instaPost="/landing-mobile-new.png"
        ></CardWithIgPost>

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
