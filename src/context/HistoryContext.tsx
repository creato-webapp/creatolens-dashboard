import React, { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'
import useRequest from '@hooks/useRequest'
import XAPI from '@constants/endpoints/xapi'
import METHOD from '@constants/method'
import useAuth from '@hooks/useAuth'
import { CombinedUser } from '@api/auth/[...nextauth]'
import router from 'next/router'
import { usePathname, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import useLocalStorage from '@hooks/useLocalStorage'
import { ColumnFiltersState, Row, SortingState } from '@tanstack/react-table'

interface HistoryContextType {
  historys: HistoryRow[] | undefined
  selectedHistoryRows: HistoryRow[]
  isLoading: boolean
  handleSearch: (term: string) => void
  updateFavoriteStatus: (id: string) => void
  globalFilter: string
  setGlobalFilter: (term: string) => void
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

export interface HistoryRow {
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

interface HistoryQueryData {
  user_id: string
  page: number
  query_input: string
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
  const [page, setPage] = useState<number>(1)
  const [queryInput, setQueryInput] = useState<string>('')
  const [selectedHistoryRows, setSelectedHistoryRows] = useState<HistoryRow[] | []>([])
  const [favouritedHistoryRowIds, setFavouritedHistoryRowIds] = useLocalStorage<string[]>('favouritedHistoryRowIds', [])
  const [globalFilter, setGlobalFilter] = useState<string>('')
  const [openedRow, setOpenedRow] = useState<Row<HistoryRow> | null>(null)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])

  const updateFavoriteStatus = useCallback(
    (id: string) => {
      setFavouritedHistoryRowIds(
        (prevIds) =>
          prevIds.includes(id)
            ? prevIds.filter((prevId) => prevId !== id) // Remove the specific ID
            : [...prevIds, id] // Add the specific ID
      )
    },
    [setFavouritedHistoryRowIds]
  )

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { session } = useAuth()

  const user = session?.user as CombinedUser
  const userId = user?.id
  const requestdata: HistoryQueryData = {
    user_id: userId,
    query_input: queryInput,
    page: page,
  }

  const { data: historys, mutate, isLoading } = useHistoryQuery(requestdata, false, [])

  const combinedHistorys = useMemo(() => {
    if (!historys) return []

    return historys.map((row) => ({
      ...row,
      is_favourited: favouritedHistoryRowIds.includes(row.id),
    }))
  }, [historys, favouritedHistoryRowIds, selectedHistoryRows])

  useEffect(() => {
    mutate() // Manually trigger the fetch
  }, [mutate, queryInput, page])

  const updateHistoryRow = useCallback(
    (row: HistoryRow) => {
      const index = selectedHistoryRows.findIndex((r) => r.id === row.id)
      if (index === -1) {
        setSelectedHistoryRows((prevRows) => [...prevRows, row])
      } else {
        setSelectedHistoryRows((prevRows) => prevRows.filter((r) => r.id !== row.id))
      }
    },
    [selectedHistoryRows]
  )

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams?.toString() || '')
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    setQueryInput(term) // Update the queryInput state
    setPage(1) // Reset page when searching
    router.replace(`${pathname}?${params.toString()}`)
  }, 300)

  const clearHistoryRow = useCallback(() => {
    setSelectedHistoryRows([])
  }, [])

  const value = useMemo(
    () => ({
      historys: combinedHistorys,
      columnFilters,
      setColumnFilters,
      globalFilter,
      setGlobalFilter,
      selectedHistoryRows,
      updateHistoryRow,
      clearHistoryRow,
      updateFavoriteStatus,
      handleSearch,
      isLoading,
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
      clearHistoryRow,
      updateFavoriteStatus,
      handleSearch,
      isLoading,
      openedRow,
      sorting,
    ]
  )

  return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
}
