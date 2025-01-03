import Breadcrumb from '@components/Breadcrumb'
import Dropdown from '@components/Form/Dropdown/Dropdown'
import HistoryGridView from '@components/Hashtag/History/HistoryGridView'
import HistoryListView from '@components/Hashtag/History/HistoryListView'
import { Input } from '@components/ui/Input'
import { useHistory } from '@hooks/useHistory'
import { Grid2X2Icon, List, SearchIcon } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

const History = () => {
  const searchParams = useSearchParams()
  const { historys, handleSearch, isLoading } = useHistory()

  const [layout, setLayout] = useState('list')

  const changeLayout = () => {
    setLayout(layout === 'grid' ? 'list' : 'grid')
  }

  return (
    <div className="scroll mb-10 flex w-full flex-col items-center justify-center md:mb-40">
      <div className="flex w-full flex-col md:max-w-screen-2xl">
        <div className="hidden md:flex">
          <Breadcrumb lastItemName="History" />
        </div>
        <div className="flex flex-row items-center gap-7 py-4 md:px-12">
          <div className="flex w-full flex-wrap justify-between gap-4 md:flex-row md:items-center">
            <h1 className="py-3 text-heading font-bold text-neutral-800 sm:w-full md:w-fit md:text-nowrap ">Image-To-Hashtags History</h1>
            <div className="w-full sm:w-[300px]">
              <Input
                placeholder="Search for Hashtag/ Label"
                className="relative rounded-full focus:ring-primary-500"
                endIcon={SearchIcon}
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams?.get('query') || ''}
              ></Input>
            </div>
            <div className="flex flex-row flex-nowrap items-center gap-12 md:w-fit md:flex-row">
              <Dropdown
                isFloating
                dropDownSizes={['m', 'm', 'm']}
                options={[
                  { label: 'Latest on top', value: 'All' },
                  { label: 'Earliest on top', value: 'Label' },
                  { label: 'Favourite ', value: 'Hashtag' },
                ]}
                className="!w-full sm:!w-[200px]"
              ></Dropdown>
              <div className="cursor-pointer" onClick={() => changeLayout()}>
                {layout === 'grid' ? <Grid2X2Icon /> : <List />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {historys && (
        <div className="w-full max-w-screen-2xl">
          {layout === 'grid' ? <HistoryGridView data={historys} isLoading={isLoading} /> : <HistoryListView data={historys} isLoading={isLoading} />}
        </div>
      )}
    </div>
  )
}

export default History
