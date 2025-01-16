import { useState } from 'react'
import Breadcrumb from '@components/Breadcrumb'

import Dropdown from '@components/Form/Dropdown/Dropdown'
import HistoryGridView from '@components/Hashtag/History/HistoryGridView'
import { columns } from '@components/Hashtag/History/Table/columns'
import { DataTable } from '@components/Hashtag/History/Table/data-table'
import Paginator from '@components/Hashtag/History/Table/pagination'
import { Input } from '@components/ui/Input'
import { useHistory } from '@hooks/useHistory'
import { DownloadIcon, Grid2X2Icon, List, SearchIcon, XIcon } from 'lucide-react'
import { DeleteConfirmationDialog, DetailsDialog } from '@components/Hashtag/History/HistoryDialog'
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'

const FilterOptions = {
  ALL: {
    label: 'All',
    value: 'all',
  },
  FAVOURITE: {
    label: 'Favourite',
    value: 'is_favourited',
  },
}
const History = () => {
  const {
    historys,
    isLoading,
    globalFilter,
    setGlobalFilter,
    openedRow,
    setOpenedRow,
    columnFilters,
    setColumnFilters,
    updateFavoriteStatus,
    setSorting,
    sorting,
  } = useHistory()

  const table = useReactTable({
    data: historys ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    state: {
      globalFilter: globalFilter,
      columnFilters,
      sorting,
    },
    meta: {
      updateFavoriteStatus: (row: string) => updateFavoriteStatus(row),
    },
  })

  const [open, setOpen] = useState(false)

  const [layout, setLayout] = useState('list')

  const changeLayout = () => {
    setLayout(layout === 'grid' ? 'list' : 'grid')
  }

  const onDropDownChange = (value: string | number) => {
    const isFavourite = value === FilterOptions['FAVOURITE'].value
    const isAll = value === FilterOptions['ALL'].value

    const column = table.getColumn('is_favourited')
    if (column) {
      if (isFavourite) {
        column.setFilterValue(true)
      } else if (isAll) {
        column.setFilterValue(undefined)
      }
    } else {
      console.error('Column "is_favourited" not found in the table columns.')
    }
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
                options={Object.values(FilterOptions).map((option) => ({ label: option.label, value: option.value }))}
                className="!w-full sm:!w-[200px]"
                value={table.getColumn('is_favourited')?.getFilterValue() ? 'Favourite' : 'All'}
                onValueChange={(value) => onDropDownChange(value)}
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
          {layout === 'grid' ? (
            <HistoryGridView data={historys} isLoading={isLoading} />
          ) : (
            table && <DataTable table={table} columns={columns} setOpen={setOpen} setOpenedRow={setOpenedRow} />
          )}
        </div>
      )}
      <div className="mt-12">
        <Paginator
          currentPage={table.getState().pagination.pageIndex + 1}
          totalPages={table.getPageCount()}
          onPageChange={(pageNumber) => table.setPageIndex(pageNumber - 1)}
          showPreviousNext
        />
      </div>

      {table.getFilteredSelectedRowModel().rows?.length > 0 && (
        <div className="fixed bottom-20 z-10 flex w-4/5 rounded-lg border border-neutral-300 bg-white p-6 drop-shadow-2xl md:w-1/2">
          <div className="mx-12 flex w-full flex-row justify-between gap-4">
            <div>Selected {table.getFilteredSelectedRowModel().rows.length}</div>
            <DeleteConfirmationDialog />
            <button className="btn-danger">
              <DownloadIcon />
            </button>
            <div className="flex cursor-pointer items-center" onClick={() => table.resetRowSelection()}>
              <XIcon />
            </div>
          </div>
        </div>
      )}
      {openedRow && (
        <DetailsDialog
          open={open}
          data={openedRow}
          setOpen={setOpen}
          onClose={() => {
            setOpenedRow(null)
            setOpen(false)
          }}
        />
      )}
    </div>
  )
}

export default History
