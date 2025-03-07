import { SetStateAction, Dispatch, useMemo, useState } from 'react'
import Breadcrumb from '@components/Breadcrumb'
import HistoryGridView from '@components/Hashtag/History/HistoryGridView'
import { columns } from '@components/Hashtag/History/Table/columns'
import { DataTable } from '@components/Hashtag/History/Table/data-table'
import Paginator from '@components/Hashtag/History/Table/pagination'
import { useHistory } from '@hooks/useHistory'
import { DownloadIcon, XIcon } from 'lucide-react'
import { DeleteConfirmationDialog, DetailsDialog } from '@components/Hashtag/History/HistoryDialog'
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowSelectionState,
  useReactTable,
} from '@tanstack/react-table'
import TableFunctionBar from '@components/Hashtag/History/TableFunctionBar'
import { HistoryRow } from '@services/HistoryHelper'
import { Skeleton } from '@components/ui/Skeleton'
import { convertGcsUriToHttp, downloadMultipleImages } from '@utils/index'
import { getLocaleProps } from '@services/locale'
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next'
import { useDialogues } from '@hooks/useDialogues'
import { Status } from '@context/DialogueContext'
import { useTranslation } from 'next-i18next'
import { HistoryProvider } from '@context/HistoryContext'

export async function getStaticProps(context: { locale: GetStaticPropsContext | GetServerSidePropsContext }) {
  return await getLocaleProps(context.locale)
}

const History = () => {
  const { t } = useTranslation('common')
  const { addDialogue } = useDialogues()
  const [open, setOpen] = useState(false)
  const [layout, setLayout] = useState('list')
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  return (
    <HistoryProvider>
      <HistoryContent
        open={open}
        setOpen={setOpen}
        layout={layout}
        setLayout={setLayout}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        addDialogue={addDialogue}
        t={t}
      />
    </HistoryProvider>
  )
}

// Create a new component to use the history context
const HistoryContent = ({
  open,
  setOpen,
  layout,
  setLayout,
  rowSelection,
  setRowSelection,
  addDialogue,
  t,
}: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  layout: string
  setLayout: Dispatch<SetStateAction<string>>
  rowSelection: RowSelectionState
  setRowSelection: Dispatch<SetStateAction<RowSelectionState>>
  addDialogue: (message: string, status: Status) => void
  t: (key: string) => string
}) => {
  const {
    histories,
    isLoading,
    globalFilter,
    setGlobalFilter,
    openedRow,
    setOpenedRow,
    columnFilters,
    setColumnFilters,
    toggleFavoriteStatus,
    setSorting,
    removeHistory,
    sorting,
  } = useHistory()

  const tableData = useMemo(() => (isLoading ? Array(8).fill({}) : histories), [isLoading, histories])
  const tableColumns = useMemo(
    () =>
      isLoading
        ? columns.map((column) => ({
            ...column,
            cell: () => <Skeleton className="h-[40px] rounded-md" />,
          }))
        : columns,
    [isLoading]
  )

  const table = useReactTable<HistoryRow>({
    data: tableData ?? [],
    columns: tableColumns as ColumnDef<HistoryRow>[],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    state: {
      globalFilter,
      columnFilters,
      sorting,
      rowSelection,
    },
    defaultColumn: {
      size: 200,
      minSize: 50,
      maxSize: 500,
    },
    meta: {
      toggleFavoriteStatus: (row: string, is_favorite: boolean) => toggleFavoriteStatus(row, is_favorite),
    },
  })

  const onClickDownloadSelectedImage = async () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows

    const imageUrls = selectedRows.map((row) => {
      const imageUrl = row.original.uploaded_image || ''
      return convertGcsUriToHttp(imageUrl)
    })

    try {
      // Dynamically import JSZip only on client side
      await downloadMultipleImages(imageUrls)
      addDialogue(t('download_success'), Status.SUCCESS)
    } catch (error) {
      console.error('Error downloading images:', error)
      addDialogue(t('download_failed'), Status.FAILED)
    }
  }

  const onClickDelete = async () => {
    try {
      const selectedRows = table.getFilteredSelectedRowModel().rows
      const selectedIds = selectedRows.map((row) => row.original.id)
      table.resetRowSelection()
      const result = await removeHistory(selectedIds, { is_deleted: true })
      if (result) {
        addDialogue(t('delete_success'), Status.SUCCESS)
      } else {
        addDialogue(t('delete_failed'), Status.FAILED)
      }
    } catch (error) {
      console.error('Error deleting history:', error)
      addDialogue(t('delete_failed'), Status.FAILED)
    }
  }

  // Helper function to get file extension from URL

  const SelectedRowsBar = (props: { onClick: () => void; onClickDelete: () => void }) => {
    const { onClick, onClickDelete } = props

    return (
      <div className="fixed bottom-20 z-10 flex w-4/5 rounded-lg border border-neutral-300 bg-white p-6 drop-shadow-2xl md:w-1/2">
        <div className="mx-12 flex w-full flex-row justify-between gap-4">
          <div>Selected {table.getFilteredSelectedRowModel().rows.length}</div>
          <DeleteConfirmationDialog onConfirm={onClickDelete} />
          <button className="btn-danger" onClick={onClick}>
            <DownloadIcon />
          </button>
          <div className="flex cursor-pointer items-center" onClick={() => table.resetRowSelection()}>
            <XIcon />
          </div>
        </div>
      </div>
    )
  }

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

      {histories && (
        <div className="w-full max-w-screen-2xl">
          {layout === 'grid' ? (
            <HistoryGridView
              table={table}
              isLoading={isLoading}
              setOpen={setOpen}
              setOpenedRow={setOpenedRow}
              rowSelection={rowSelection}
              setRowSelection={setRowSelection}
            />
          ) : (
            <DataTable table={table} columns={columns} setOpen={setOpen} setOpenedRow={setOpenedRow} isLoading={isLoading} />
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
        <SelectedRowsBar onClick={onClickDownloadSelectedImage} onClickDelete={onClickDelete} />
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
