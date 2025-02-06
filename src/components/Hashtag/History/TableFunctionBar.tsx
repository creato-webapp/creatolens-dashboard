import Dropdown from '@components/Form/Dropdown/Dropdown'
import { Input } from '@components/ui/Input'
import { HistoryRow } from '@services/HistoryHelper'
import { Table } from '@tanstack/react-table'
import { Grid2X2Icon, List, SearchIcon } from 'lucide-react'
import { useTranslation } from 'next-i18next'
import { Dispatch, SetStateAction } from 'react'

interface ITableFunctionBar {
  globalFilter: string
  setGlobalFilter: Dispatch<SetStateAction<string>>
  setLayout: Dispatch<SetStateAction<string>>
  layout: string
  table: Table<HistoryRow>
}
const TableFunctionBar = (props: ITableFunctionBar) => {
  const { globalFilter, setGlobalFilter, setLayout, layout, table } = props
  const { t } = useTranslation('history')

  const filterOptions = {
    ALL: {
      label: t('all'),
      value: 'all',
    },
    FAVORITE: {
      label: t('favorite'),
      value: 'is_favorite',
    },
  } as const

  const changeLayout = () => {
    setLayout(layout === 'grid' ? 'list' : 'grid')
  }

  const onDropDownChange = (value: string | number) => {
    const isFavorite = value === filterOptions['FAVORITE'].value
    const isAll = value === filterOptions['ALL'].value

    const column = table.getColumn('is_favorite')
    if (column) {
      if (isFavorite) {
        column.setFilterValue(true)
      } else if (isAll) {
        column.setFilterValue(undefined)
      }
    } else {
      console.error('Column "is_favorite" not found in the table columns.')
    }
  }

  return (
    <div className="flex w-full flex-wrap justify-between gap-4 md:flex-row md:items-center">
      <h1 className="py-3 text-heading font-bold text-neutral-800 sm:w-full md:w-fit md:text-nowrap ">Image-To-Hashtags History</h1>
      <div className="w-full sm:w-[300px]">
        <Input
          placeholder={t('search_for_hashtag_label')}
          className="relative rounded-full focus:ring-primary-500"
          endIcon={SearchIcon}
          value={globalFilter}
          onChange={(event) => {
            setGlobalFilter(event.target.value)
          }}
        ></Input>
      </div>
      <div className="flex w-full flex-row flex-nowrap items-center gap-12 sm:w-fit md:w-fit md:flex-row">
        <Dropdown
          isFloating
          dropDownSizes={['m', 'm', 'm']}
          options={Object.values(filterOptions).map((option) => ({ label: option.label, value: option.value }))}
          className="!w-full sm:!w-[200px]"
          value={table.getColumn('is_favorite')?.getFilterValue() ? 'Favorite' : 'All'}
          onValueChange={(value) => onDropDownChange(value)}
        ></Dropdown>
        <div className="cursor-pointer" onClick={() => changeLayout()}>
          {layout === 'grid' ? <Grid2X2Icon /> : <List />}
        </div>
      </div>
    </div>
  )
}

export default TableFunctionBar
