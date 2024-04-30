import Hero from '@components/Hero'
import ReportLayout from '@components/Layout/ReportLayout'
import Tab from '@components/Tab'

const Dashboard = () => {
  const tabItems = [
    {
      key: '1',
      title: '3 Days Report',
      children: <ReportLayout />,
    },
    {
      key: '2',
      title: '7 Days Report',
      children: <ReportLayout />,
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
    <div className="mb-4">
      <Hero
        backgroundImage="./GuideHero.svg"
        className="flex h-full flex-col justify-between md:h-52"
        childrenStyle="h-full md:gap-3 flex-col flex md:py-16 justify-center py-2"
      >
        <h1 className="uppercase md:font-extrabold">TREND ANALYSIS</h1>
      </Hero>

      <Tab items={tabItems} defaultActiveKey="1" scrollable={false} className="mt-3 px-2 shadow-none md:px-4 md:shadow-xl lg:px-24" />
    </div>
  )
}
export default Dashboard
