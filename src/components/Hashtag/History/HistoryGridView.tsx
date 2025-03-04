import Image from 'next/image'

import { Card, CardContent } from '@components/ui/Card'
import { useMemo } from 'react'
import { Skeleton } from '@components/ui/Skeleton'
import { arrayOfStringsToSentence, convertGcsUriToHttp } from '@utils/index'
import { HistoryRow } from '@services/HistoryHelper'
import { Row, Table } from '@tanstack/react-table'

export interface HistoryGridViewProps {
  table: Table<HistoryRow>
  data: HistoryRow[]
  isLoading: boolean
  setOpen: (open: boolean) => void
  setOpenedRow: (row: Row<HistoryRow>) => void
}

const FallBackImage = () => {
  return (
    <div className="flex h-full max-h-[400px] w-full items-center justify-center rounded-md bg-neutral-200">
      <Skeleton className="h-64 w-full" />
    </div>
  )
}
const HistoryGridView = (props: HistoryGridViewProps) => {
  const { table, data, setOpen, setOpenedRow } = props

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
      {data.map((row) => (
        <Card
          key={row.id}
          className="mb-4 cursor-pointer"
          onClick={() => {
            onRowClick(row)
          }}
        >
          <CardContent className="p-4">
            <div className="flex flex-col">
              {row.uploaded_image ? (
                <div className="relative h-64 w-full">
                  <Image
                    src={convertGcsUriToHttp(row.uploaded_image)}
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
                  <b className="truncate font-normal text-neutral-800">{arrayOfStringsToSentence(row.labels)}</b>
                </div>
                <div className="mt-2 flex flex-row justify-start overflow-hidden text-left">
                  <div className="truncate font-semibold text-neutral-800">
                    {arrayOfStringsToSentence(row.hashtags.map((hashtag) => hashtag.hashtag))}
                  </div>
                </div>
                <div className="text-sm text-neutral-500">{dateToBefore(row.created_at)}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
export default HistoryGridView
