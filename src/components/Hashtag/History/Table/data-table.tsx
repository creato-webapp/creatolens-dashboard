'use client'

import { ColumnDef, flexRender, Table as ReactTable, Row } from '@tanstack/react-table'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/ui/Table'
import { HistoryRow } from '@context/HistoryContext'

interface DataTableProps<TData, TValue> {
  table: ReactTable<HistoryRow>
  columns: ColumnDef<TData, TValue>[]
  setOpenedRow: (row: Row<HistoryRow>) => void
  setOpen: (open: boolean) => void
}

export function DataTable<TData, TValue>({ table, columns, setOpenedRow, setOpen }: DataTableProps<TData, TValue>) {
  const handleRowClick = (row: Row<HistoryRow>) => {
    setOpenedRow(row)
    setOpen(true)
  }

  return (
    <div className="rounded-md">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                onClick={(event) => {
                  // prevent row click when checkbox is clicked
                  if (event.target instanceof HTMLButtonElement || event.target instanceof HTMLInputElement || event.target instanceof SVGElement)
                    return
                  handleRowClick(row)
                }}
                className="cursor-pointer hover:bg-neutral-200"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="max-w-80">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="text-muted-foreground flex-1 p-2 text-sm text-neutral-500">
        {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
    </div>
  )
}
