import Breadcrumb from '@components/Breadcrumb'
import Dropdown from '@components/Form/Dropdown/Dropdown'
import HistoryListView from '@components/Hashtag/History/HistoryListView'
import { Input } from '@components/ui/Input'
import { useHistory } from '@hooks/useHistory'
import { Grid2X2Icon, List, SearchIcon } from 'lucide-react'
import { useState } from 'react'
// import router from 'next/router'

const HistoryGridView = () => {
  return <div></div>
}
const History = () => {
  const [layout, setLayout] = useState('list')
  const { historys } = useHistory()

  const changeLayout = () => {
    setLayout(layout === 'grid' ? 'list' : 'grid')
  }

  return (
    <div className="scroll mb-10 flex w-full flex-col items-center justify-center md:mb-40">
      <div className="flex w-full flex-col md:max-w-screen-2xl">
        <div className="hidden md:flex">
          <Breadcrumb lastItemName="History" />
        </div>
        <div className="flex flex-row items-center gap-7 px-12 py-4">
          <div className="flex w-full flex-row items-center justify-between gap-4">
            <h1 className="text-nowrap py-3 text-heading font-bold text-neutral-800 ">Image-To-Hashtags History</h1>
            <div className="w-[300px] lg:w-[600px]">
              <Input placeholder="Search for Hashtag/ Label" className="relative rounded-full focus:ring-primary-500" endIcon={SearchIcon}></Input>
            </div>
            <Dropdown
              isFloating
              options={[
                { label: 'Latest on top', value: 'All' },
                { label: 'Earliest on top', value: 'Label' },
                { label: 'Favourite ', value: 'Hashtag' },
              ]}
              className="!w-[200px]"
            ></Dropdown>
            <div className="cursor-pointer" onClick={() => changeLayout()}>
              {layout === 'grid' ? <Grid2X2Icon /> : <List />}
            </div>
          </div>
        </div>
      </div>

      {historys && <div className="w-full max-w-screen-2xl">{layout === 'grid' ? <HistoryGridView /> : <HistoryListView data={historys} />}</div>}
    </div>
  )
}

export default History
