import React, { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'
import { ColumnFiltersState, Row, SortingState } from '@tanstack/react-table'
import { useFavoriteStatus, useHistoryData } from '@hooks/useHistoryData'
import { Status } from './DialogueContext'
import { useDialogues } from '@hooks/useDialogues'
import { HistoryRow } from '@services/HistoryHelper'
import { useAuth } from '@hooks/index'
import { CombinedUser } from '@api/auth/[...nextauth]'

interface HistoryContextType {
  historys: HistoryRow[] | undefined
  selectedHistoryRows: HistoryRow[]
  isLoading: boolean
  toggleFavoriteStatus: (id: string) => void
  globalFilter: string
  setGlobalFilter: Dispatch<SetStateAction<string>>
  openedRow: Row<HistoryRow> | null
  setOpenedRow: (row: Row<HistoryRow> | null) => void
  columnFilters: ColumnFiltersState
  setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>
  setSorting: Dispatch<SetStateAction<SortingState>>
  sorting: SortingState
  removeHistory: (id: string, userId: string) => void
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
  const { favouritedIds, toggleFavoriteStatus } = useFavoriteStatus('favouritedHistoryRowIds', [])

  const { session } = useAuth()
  const user = session?.user as CombinedUser | undefined
  const user_id = user?.id
  const { addDialogue } = useDialogues()

  const {
    historys = [],
    mutate,
    isLoading,
    removeHistory,
    error,
  } = useHistoryData({
    user_id: user_id || '', // Replace with dynamic user ID
  })

  const combinedHistorys = useMemo(() => {
    if (historys.length > 0) {
      return historys.map((row) => ({
        ...row,
        is_favourited: favouritedIds.includes(row.id),
      }))
    }
    return []
  }, [historys, favouritedIds])

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
      historys: combinedHistorys,
      columnFilters,
      setColumnFilters,
      globalFilter,
      setGlobalFilter,
      selectedHistoryRows,
      updateHistoryRow,
      toggleFavoriteStatus,
      isLoading,
      removeHistory,
      openedRow,
      setOpenedRow,
      setSorting,
      sorting,
    }),
    [
      combinedHistorys,
      columnFilters,
      globalFilter,
      selectedHistoryRows,
      updateHistoryRow,
      toggleFavoriteStatus,
      removeHistory,
      isLoading,
      openedRow,
      sorting,
    ]
  )

  return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
}
