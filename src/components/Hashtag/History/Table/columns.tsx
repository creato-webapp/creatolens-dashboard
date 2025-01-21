import { Checkbox } from '@components/ui/Checkbox'
import { HistoryRow } from '@services/HistoryHelper'
import { ColumnDef, RowData } from '@tanstack/react-table'
import { convertGcsUriToHttp } from '@utils/index'
import { ArrowUpDown, StarIcon } from 'lucide-react'
import Image from 'next/image'

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    toggleFavoriteStatus: (id: string) => void
  }
}

const FallBackImage = () => {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-neutral-200">
      <span className="text-neutral-500">?</span>
    </div>
  )
}

const FavouriteColumn: Partial<ColumnDef<HistoryRow>> = {
  cell: ({ row, table }) => {
    return (
      <>
        <StarIcon
          className={`${row.original.is_favourited ? 'fill-primary-500 text-primary-500' : 'stroke-1'} cursor-pointer`}
          onClick={() => {
            table.options.meta?.toggleFavoriteStatus(row.original.id)
          }}
        />
      </>
    )
  },
}

export const columns: ColumnDef<HistoryRow>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    enableGlobalFilter: false,
  },
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="rounded-sm"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => {
      const imageUrl = row.original.uploaded_image || ''
      const combinedUrl = convertGcsUriToHttp(imageUrl)

      if (!imageUrl) return <FallBackImage />
      else return <Image src={combinedUrl as string} alt="Image" className="aspect-square object-cover" width={40} height={40} />
    },
  },
  {
    accessorKey: 'labels',
    header: 'Labels',
    enableColumnFilter: true,
    enableResizing: true,
    enableGlobalFilter: true,
    accessorFn: (originalRow) => {
      return originalRow.labels.join(', ')
    },
    cell: ({ row }) => <div className="line-clamp-2 lowercase">{row.original.labels.join(', ')}</div>,
  },
  {
    accessorKey: 'hashtags',
    header: 'Hashtags',
    accessorFn: (originalRow) => {
      const tags = originalRow.hashtags.map((hashtag) => {
        return hashtag.hashtag
      })
      return tags.join(', ')
    },
    // originalRow.hashtags.toString(), // matches is a number
    cell: ({ row }) => {
      return <div className="line-clamp-2 lowercase">{row.original.hashtags.map((hashtag) => hashtag.hashtag).join(', ')}</div>
    },
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => {
      return (
        <div className="flex cursor-pointer items-center gap-2 text-nowrap" onClick={() => column.toggleSorting()}>
          <div className="text-neutral-500">Created At</div>
          <ArrowUpDown size={14} className="text-neutral-500" />
        </div>
      )
    },
    // cell: ({ row }) => new Date(row.getValue('created_at')).toLocaleDateString(), //trim spaces inside the date
    cell: ({ row }) => {
      const date = new Date(row.getValue('created_at'))
      // trim spaces inside the date
      const trimmedDate = date.toLocaleDateString().replace(/\s+/g, ' ')
      return trimmedDate
    },
    enableGlobalFilter: false,
    enableSorting: true,
  },

  {
    id: 'is_favourited',
    accessorKey: 'is_favourited',
    header: '',
    ...FavouriteColumn,
    enableColumnFilter: true,
    enableGlobalFilter: false,
  },
]
