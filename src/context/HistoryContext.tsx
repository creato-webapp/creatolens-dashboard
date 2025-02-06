import React, { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'
import { ColumnFiltersState, Row, SortingState } from '@tanstack/react-table'
import { useHistoryData } from '@hooks/useHistoryData'
import { Status } from './DialogueContext'
import { useDialogues } from '@hooks/useDialogues'
import { HistoryRow } from '@services/HistoryHelper'
import { useAuth } from '@hooks/index'
import { CombinedUser } from '@api/auth/[...nextauth]'

interface HistoryContextType {
  histories: HistoryRow[] | undefined
  selectedHistoryRows: HistoryRow[]
  isLoading: boolean
  toggleFavoriteStatus: (id: string, is_favorite: boolean) => void
  globalFilter: string
  setGlobalFilter: Dispatch<SetStateAction<string>>
  openedRow: Row<HistoryRow> | null
  setOpenedRow: (row: Row<HistoryRow> | null) => void
  columnFilters: ColumnFiltersState
  setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>
  setSorting: Dispatch<SetStateAction<SortingState>>
  sorting: SortingState
  removeHistory: (post_ids: string[], update_fields: { is_deleted: boolean }) => Promise<boolean>
}

interface HistoryProviderProps {
  children: ReactNode
}

export const HistoryContext = createContext<HistoryContextType | undefined>(undefined)

export const HistoryProvider = ({ children }: HistoryProviderProps) => {
  const [selectedHistoryRows, setSelectedHistoryRows] = useState<HistoryRow[] | []>([])
  const [globalFilter, setGlobalFilter] = useState<string>('')
  const [openedRow, setOpenedRow] = useState<Row<HistoryRow> | null>(null)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])

  const { session } = useAuth()
  const user = session?.user as CombinedUser | undefined
  const user_id = user?.id
  const { addDialogue } = useDialogues()
  const { histories, mutate, isLoading, removeHistory, toggleFavoriteStatus, error } = useHistoryData({
        
    user_id: user_id ? user_id : '',
  })

  useEffect(() => {
    mutate() // Manually trigger the fetch
  }, [mutate])

  const updateHistoryRow = useCallback(
    (row: HistoryRow) => {
      try {
        if (!row?.id) throw new Error('Invalid history row')
        setSelectedHistoryRows((prevRows) => {
          const index = prevRows.findIndex((r) => r.id === row.id)
          if (index === -1) {
            return [...prevRows, row]
          }
          return prevRows.filter((r) => r.id !== row.id)
        })
      } catch (error) {
        console.error('Error updating history row:', error)
        addDialogue('Failed to update history selection', Status.FAILED)
      }
    },
    [addDialogue]
  )

  useEffect(() => {
    if (error) {
      addDialogue('Error', Status.FAILED)
    }
  }, [addDialogue, error])

  const value = useMemo(
    () => ({
      histories,
      columnFilters,
      toggleFavoriteStatus,
      setColumnFilters,
      globalFilter,
      setGlobalFilter,
      selectedHistoryRows,
      updateHistoryRow,
      isLoading,
      removeHistory,
      openedRow,
      setOpenedRow,
      setSorting,
      sorting,
    }),
    [
      histories,
      columnFilters,
      globalFilter,
      toggleFavoriteStatus,
      selectedHistoryRows,
      updateHistoryRow,
      isLoading,
      removeHistory,
      openedRow,
      sorting,
    ]
  )

  return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
}
