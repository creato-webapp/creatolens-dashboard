import React, { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react'

interface HistoryContextType {
  historys: HistoryRow[]
  selectedHistoryRows: HistoryRow[]
}

interface HistoryProviderProps {
  children: ReactNode
}
export const HistoryContext = createContext<HistoryContextType | undefined>(undefined)

const useHistoryQuery = (user_id: string, shouldFetch: boolean = true, fallbackData?: []) => {
  const { data, error, mutate, ...swr } = useRequest<HistoryRow[]>(
    [
      XAPI.IMAGE_HASHTAG_HISTORY,
      {
        user_id,
      },
    ],
    METHOD.GET,
    {
      shouldFetch,
      refreshInterval: 0,
      fallbackData,
    }
  )

  return {
    data,
    error: error,
    mutate,
    ...swr,
  }
}
import useRequest from '@hooks/useRequest'
import XAPI from '@constants/endpoints/xapi'
import METHOD from '@constants/method'
import { HistoryRow } from '@components/Hashtag/History/HistoryListView'

export const HistoryProvider = ({ children }: HistoryProviderProps) => {
  const [historys, setHistorys] = useState<HistoryRow[] | []>([])
  const [selectedHistoryRows, setSelectedHistoryRows] = useState<HistoryRow[] | []>([])

  const { data } = useHistoryQuery('', true)

  useEffect(() => {
    if (data) {
      setHistorys(data)
    }
  }, [data])

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

  const clearHistoryRow = useCallback(() => {
    setSelectedHistoryRows([])
  }, [])

  const value = useMemo(
    () => ({ historys, selectedHistoryRows, updateHistoryRow, clearHistoryRow }),
    [historys, selectedHistoryRows, updateHistoryRow, clearHistoryRow]
  )

  return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
}
