import XAPI from '@constants/endpoints/xapi'
import METHOD from '@constants/method'
import { useCallback } from 'react'
import useRequest from './useRequest'
import useLocalStorage from '@hooks/useLocalStorage'
import { HistoryRow } from '@services/HistoryHelper'

export const useHistoryData = (query: { user_id: string }) => {
  const {
    data: histories,
    mutate,
    isLoading,
    error,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useRequest<HistoryRow[]>(
    query.user_id
      ? [
          XAPI.IMAGE_HASHTAG_HISTORY,
          {
            params: query,
          },
        ]
      : null,
    METHOD.GET,
    {
      suspense: true,
      fallbackData: [],
      shouldFetch: !!query.user_id,
    }
  )

  const removeHistory = useCallback(
    async (id: string, userId: string) => {
      try {
        mutate((prevHistories: HistoryRow[]) => prevHistories?.filter((history: HistoryRow) => history.id !== id), false)
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

  return { histories, mutate, isLoading, error, removeHistory }
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
