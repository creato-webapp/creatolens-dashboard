import Card from '@components/Card'
import Hero from '@components/Hero'
import Tab from '@components/Tab'

const Dashboard = () => {
  const tabItems = [
    {
      key: '1',
      title: '3 Days Report',
      children: <div className="flex flex-wrap gap-4 md:flex md:flex-nowrap md:px-14 md:py-24">Tag1</div>,
    },
    {
      key: '2',
      title: '7 Days Report',
      children: <div className="w-full flex-wrap gap-2 md:flex md:flex-nowrap md:justify-center md:py-12 md:shadow-lg">Tag2</div>,
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
        <h1 className="uppercase md:font-extrabold">TREND ANALYSIS</h1>
      </Hero>

      <Card className="min-h-full w-full rounded-none border-none bg-transparent px-4 pt-3 shadow-none md:px-20 md:pb-28">
        <Tab items={tabItems} defaultActiveKey="1" scrollable={false} className="shadow-none md:px-0 md:shadow-xl" />
      </Card>
    </div>
  )
}
export default Dashboard
