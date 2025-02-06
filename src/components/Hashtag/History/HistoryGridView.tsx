import Image from 'next/image'

import { Card, CardContent } from '@components/ui/Card'
import { useMemo } from 'react'
import { Skeleton } from '@components/ui/Skeleton'
import { arrayOfStringsToSentence, convertGcsUriToHttp } from '@utils/index'
import { HistoryRow } from '@services/HistoryHelper'
import { Row, RowSelectionState, Table } from '@tanstack/react-table'
import { Checkbox } from '@components/ui/Checkbox'

export interface HistoryGridViewProps {
  table: Table<HistoryRow>
  isLoading: boolean
  setOpen: (open: boolean) => void
  setOpenedRow: (row: Row<HistoryRow>) => void
  rowSelection: RowSelectionState
  setRowSelection: (rowSelection: RowSelectionState) => void
}

const FallBackImage = () => {
  return (
    <div className="flex h-full max-h-[400px] w-full items-center justify-center rounded-md bg-neutral-200">
      <Skeleton className="h-64 w-full" />
    </div>
  )
}
const HistoryGridView = (props: HistoryGridViewProps) => {
  const { table, setOpen, setOpenedRow, rowSelection, setRowSelection } = props

  const dateToBefore = useMemo(() => {
    return (date: string) => {
      const now = new Date()
      const pastDate = new Date(date)
      const diffTime = Math.abs(now.getTime() - pastDate.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays >= 30) {
        const diffMonths = Math.floor(diffDays / 30)
        return `${diffMonths} months before`
      } else {
        return `${diffDays} days before`
      }
    }
  }, [])

  const onRowClick = (row: HistoryRow) => {
    // get table row from row id
    const tableRow = table.getRowModel().rows.find((r: Row<HistoryRow>) => r.original.id === row.id)
    if (tableRow) {
      setOpen(true)
      setOpenedRow(tableRow)
    }
  }
  const onRowSelected = (row: Row<HistoryRow>) => {
    setRowSelection({
      ...rowSelection,
      [row.id]: !rowSelection[row.id],
    })
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      {props.isLoading && (
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex flex-col">
              <FallBackImage />
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex flex-row justify-start text-left">
                  <Skeleton className="h-6 w-full" />
                </div>
                <div className="mt-2 flex flex-row justify-start overflow-hidden text-left">
                  <Skeleton className="h-6 w-full" />
                </div>
                <Skeleton className="h-6 w-24" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      {table.getRowModel().rows.map((row) => (
        <Card
          key={row.id}
          className="relative mb-4 cursor-pointer"
          onClick={() => {
            onRowClick(row.original)
          }}
        >
          <div
            className="absolute right-2 top-2 z-10 "
            onClick={(e) => {
              e.stopPropagation()
              onRowSelected(row)
            }}
          >
            <Checkbox
              className="rounded-sm bg-white"
              checked={rowSelection[row.id]}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
          </div>
          <CardContent className="p-4">
            <div className="flex flex-col">
              {row.original.uploaded_image ? (
                <div className="relative h-64 w-full">
                  <Image
                    src={convertGcsUriToHttp(row.original.uploaded_image)}
                    alt="Output"
                    fill
                    style={{ maxHeight: '400px', objectFit: 'contain' }}
                    className="rounded-md"
                  />
                </div>
              ) : (
                <FallBackImage />
              )}
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex flex-row justify-start text-left">
                  <b className="truncate font-normal text-neutral-800">{arrayOfStringsToSentence(row.original.labels)}</b>
                </div>
                <div className="mt-2 flex flex-row justify-start overflow-hidden text-left">
                  <div className="truncate font-semibold text-neutral-800">
                    {arrayOfStringsToSentence(row.original.hashtags.map((hashtag) => hashtag.hashtag))}
                  </div>
                </div>
                <div className="text-sm text-neutral-500">{dateToBefore(row.original.created_at)}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
export default HistoryGridView
