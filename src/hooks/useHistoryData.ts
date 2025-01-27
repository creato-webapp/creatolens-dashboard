import XAPI from '@constants/endpoints/xapi'
import METHOD from '@constants/method'
import { useCallback } from 'react'
import useRequest from './useRequest'
import { HistoryContext } from '@context/HistoryContext'
import useLocalStorage from '@hooks/useLocalStorage'
import { HistoryRow } from '@services/HistoryHelper'

export const useHistoryData = (query: { user_id: string }) => {
  const {
    data: historys,
    mutate,
    isLoading,
    error,
  } = useRequest<HistoryRow[]>(
    [
      XAPI.IMAGE_HASHTAG_HISTORY,
      {
        params: query,
      },
    ],
    METHOD.GET,
    {
      suspense: true,
      fallbackData: [],
    }
  )

  const removeHistory = useCallback(
    async (id: string, userId: string) => {
      try {
        mutate((prevHistorys: HistoryRow[]) => prevHistorys?.filter((history: HistoryRow) => history.id !== id), false)
        await fetch(XAPI.IMAGE_HASHTAG_HISTORY, {
          method: METHOD.DELETE,
          body: JSON.stringify({ user_id: userId, id }),
        })
      } catch (error) {
        console.error('Error removing history:', error)
        mutate()
        throw error
      }
    },
    [mutate]
  )

  return { historys, mutate, isLoading, error, removeHistory }
}

export const useFavoriteStatus = (key: string, initialIds: string[]) => {
  const [favouritedIds, setFavouritedIds] = useLocalStorage<string[]>(key, initialIds)

  const toggleFavoriteStatus = useCallback(
    (id: string) => {
      setFavouritedIds((prevIds) => (prevIds.includes(id) ? prevIds.filter((prevId) => prevId !== id) : [...prevIds, id]))
    },
    [setFavouritedIds]
  )

  return { favouritedIds, toggleFavoriteStatus }
}

import { useContext } from 'react'

export const useHistory = () => {
  // move to useHook folder
  const context = useContext(HistoryContext)
  if (!context) {
    throw new Error('HistoryContext must be used within an ImageHashtagProvider')
  }
  return context
}
