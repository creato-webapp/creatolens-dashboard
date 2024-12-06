import Breadcrumb from '@components/Breadcrumb'
import SubtleButton from '@components/Button/Subtle'
import { Input } from '@components/ui/input'
import { useState } from 'react'
// import router from 'next/router'

const HistoryListView = () => {
  return <div></div>
}

const HistoryGridView = () => {
  return <div></div>
}
const History = () => {
  const [layout, setLayout] = useState('grid')

  const changeLayout = () => {
    setLayout(layout === 'grid' ? 'list' : 'grid')
  }

  return (
    <div className="mb-10 flex w-full items-center justify-center md:mb-40">
      <div className="flex w-full flex-col md:max-w-screen-xl">
        <div className="hidden md:flex">
          <Breadcrumb lastItemName="History" />
        </div>
        <div className="flex flex-row items-center gap-7 py-4">
          <div className="flex w-full flex-row items-center justify-between">
            <h1 className="py-3 text-heading font-bold text-neutral-800 md:px-16">Image-To-Hashtags History</h1>
            <Input placeholder="Search for Hashtag/ Label" className="w-1/2" />
            <SubtleButton onClick={() => changeLayout()}>{layout === 'grid' ? 'Gird View' : 'List View'}</SubtleButton>
          </div>
        </div>
      </div>
      <div></div>

      {layout === 'grid' ? <HistoryGridView /> : <HistoryListView />}
    </div>
  )
}

export default History
