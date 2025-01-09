import { useState } from 'react'
import Breadcrumb from '@components/Breadcrumb'
import HistoryGridView from '@components/Hashtag/History/HistoryGridView'
import { columns } from '@components/Hashtag/History/Table/columns'
import { DataTable } from '@components/Hashtag/History/Table/data-table'
import Paginator from '@components/Hashtag/History/Table/pagination'
import { useHistory } from '@hooks/useHistory'
import { DownloadIcon, XIcon } from 'lucide-react'
import { DeleteConfirmationDialog, DetailsDialog } from '@components/Hashtag/History/HistoryDialog'
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import TableFunctionBar from '@components/Hashtag/History/TableFunctionBar'

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

  const [open, setOpen] = useState(false)
  const [layout, setLayout] = useState('list')

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
      globalFilter,
      columnFilters,
      sorting,
    },
    defaultColumn: {
      size: 200,
      minSize: 50,
      maxSize: 500,
    },
    meta: {
      updateFavoriteStatus: (row: string) => updateFavoriteStatus(row),
    },
  })

  const SelectedRowsBar = () => (
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
  )

  return (
    <div className="scroll mb-10 flex w-full flex-col items-center justify-center md:mb-40">
      <div className="flex w-full flex-col md:max-w-screen-2xl">
        <div className="hidden md:flex">
          <Breadcrumb lastItemName="History" />
        </div>
        <div className="flex flex-row items-center gap-7 py-4 md:px-12">
          <TableFunctionBar setLayout={setLayout} layout={layout} table={table} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
        </div>
      </div>

      {historys && (
        <div className="w-full max-w-screen-2xl">
          {layout === 'grid' ? (
            <HistoryGridView data={historys} isLoading={isLoading} />
          ) : (
            <DataTable table={table} columns={columns} setOpen={setOpen} setOpenedRow={setOpenedRow} />
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

      {table.getFilteredSelectedRowModel().rows?.length > 0 && <SelectedRowsBar />}

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
