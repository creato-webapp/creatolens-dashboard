import React, { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'
import useRequest from '@hooks/useRequest'
import XAPI from '@constants/endpoints/xapi'
import METHOD from '@constants/method'
import useAuth from '@hooks/useAuth'
import { CombinedUser } from '@api/auth/[...nextauth]'
import useLocalStorage from '@hooks/useLocalStorage'
import { ColumnFiltersState, Row, SortingState } from '@tanstack/react-table'
import { useDialogues } from '@hooks/useDialogues'
import { Status } from './DialogueContext'
import { HistoryRow } from '@services/HistoryHelper'

interface HistoryContextType {
  historys: HistoryRow[] | undefined
  selectedHistoryRows: HistoryRow[]
  isLoading: boolean
  updateFavoriteStatus: (id: string) => void
  globalFilter: string
  setGlobalFilter: Dispatch<SetStateAction<string>>
  openedRow: Row<HistoryRow> | null
  setOpenedRow: (row: Row<HistoryRow> | null) => void
  columnFilters: ColumnFiltersState
  setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>
  setSorting: Dispatch<SetStateAction<SortingState>>
  sorting: SortingState
}

interface HistoryProviderProps {
  children: ReactNode
}

interface HistoryQueryData {
  user_id: string
}

export const HistoryContext = createContext<HistoryContextType | undefined>(undefined)

const useHistoryQuery = (query: HistoryQueryData, shouldFetch: boolean = true, fallbackData?: []) => {
  const { data, error, mutate, isLoading, ...swr } = useRequest<HistoryRow[]>(
    [
      XAPI.IMAGE_HASHTAG_HISTORY,
      {
        query,
      },
    ],
    METHOD.GET,
    {
      shouldFetch,
      suspense: true,
      refreshInterval: 0,
      fallbackData,
    }
  )

  return {
    data,
    isLoading,
    error: error,
    mutate,
    ...swr,
  }
}

export const HistoryProvider = ({ children }: HistoryProviderProps) => {
  const [selectedHistoryRows, setSelectedHistoryRows] = useState<HistoryRow[] | []>([])
  const [favouritedHistoryRowIds, setFavouritedHistoryRowIds] = useLocalStorage<string[]>('favouritedHistoryRowIds', [])
  const [globalFilter, setGlobalFilter] = useState<string>('')
  const [openedRow, setOpenedRow] = useState<Row<HistoryRow> | null>(null)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const { addDialogue } = useDialogues()

  const updateFavoriteStatus = useCallback(
    (id: string) => {
      try {
        setFavouritedHistoryRowIds(
          (prevIds) =>
            prevIds.includes(id)
              ? prevIds.filter((prevId) => prevId !== id) // Remove the specific ID
              : [...prevIds, id] // Add the specific ID
        )
      } catch (error) {
        console.error('Error updating favorite status:', error)
        addDialogue('Failed to update favorite status', Status.FAILED)
      }
    },
    [addDialogue, setFavouritedHistoryRowIds]
  )

  const { session } = useAuth()

  const user = session?.user as CombinedUser
  const userId = user?.id
  const requestdata: HistoryQueryData = {
    user_id: userId,
  }

  const { data: historys, isLoading, error } = useHistoryQuery(userId ? requestdata : { user_id: '' }, true, [])

  const combinedHistorys = useMemo(() => {
    try {
      if (!historys) return []
      return historys.map((row) => ({
        ...row,
        is_favourited: favouritedHistoryRowIds?.includes(row.id) ?? false,
      }))
    } catch (error) {
      console.error('Error combining history data:', error)
      addDialogue('Error processing history data', Status.FAILED)
      return []
    }
  }, [historys, favouritedHistoryRowIds, addDialogue])

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
    [selectedHistoryRows, addDialogue]
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
      updateFavoriteStatus,
      isLoading,
      openedRow,
      setOpenedRow,
      setSorting,
      sorting,
    }),
    [combinedHistorys, columnFilters, globalFilter, selectedHistoryRows, updateHistoryRow, updateFavoriteStatus, isLoading, openedRow, sorting]
  )

  return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
}
