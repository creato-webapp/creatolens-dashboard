import { Checkbox } from '@components/ui/Checkbox'
import { ColumnDef, RowData } from '@tanstack/react-table'
import { ArrowUpDown, StarIcon } from 'lucide-react'
import Image from 'next/image'

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    updateFavoriteStatus: (id: string) => void
  }
}

type HistoryRow = {
  created_at: string
  id: string
  input_object: null
  is_deleted: boolean
  output_object: {
    created_at: string
    data: {
      url: string
    }
    updated_at: string
  }
  status: number
  updated_at: string
  user_id: string
  labels: string[]
  hashtags: string[]
  is_favourited: boolean
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
            table.options.meta?.updateFavoriteStatus(row.original.id)
          }}
        />
      </>
    )
  },
}

export const columns: ColumnDef<HistoryRow>[] = [
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
      const imageUrl = row.original.output_object.data.url || ''
      if (!imageUrl) return <FallBackImage />
      else return <Image src={imageUrl as string} alt="Image" className="aspect-square object-cover" width={40} height={40} />
    },
  },
  {
    accessorKey: 'labels',
    header: 'Labels',
    enableColumnFilter: true,
    enableResizing: true,
    enableGlobalFilter: true,
    accessorFn: (originalRow) => originalRow.labels.toString(), // matches is a number
    cell: ({ row }) => <div className="text-nowrap lowercase">{(row.getValue('labels') as string).replace(/,/g, ', ')}</div>,
  },
  {
    accessorKey: 'hashtags',
    header: 'Hashtags',
    accessorFn: (originalRow) => originalRow.hashtags.toString(), // matches is a number
    cell: ({ row }) => <div className="text-nowrap lowercase">{(row.getValue('hashtags') as string).replace(/,/g, ', ')}</div>,
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
    cell: ({ row }) => new Date(row.getValue('created_at')).toLocaleDateString(),
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
