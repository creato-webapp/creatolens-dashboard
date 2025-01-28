import XAPI from '@constants/endpoints/xapi'
import METHOD from '@constants/method'
import { useCallback } from 'react'
import useRequest from './useRequest'
import { HistoryContext } from '@context/HistoryContext'
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
    async (post_ids: string[], update_fields: { is_deleted: boolean }) => {
      try {
        mutate((prevHistorys: HistoryRow[]) => prevHistorys?.filter((history: HistoryRow) => !post_ids.includes(history.id)), false)

        const body = { post_ids, update_fields }

        const response = await fetch(XAPI.IMAGE_HASHTAG_HISTORY, {
          method: METHOD.PATCH,
          body: JSON.stringify(body),
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return true
      } catch (error) {
        console.error('Error removing history:', error)
        mutate() // Revalidate data after error
        return false
      }
    },
    [mutate]
  )

  const { trigger: toggleFavorite } = useMutation(XAPI.IMAGE_HASHTAG_HISTORY, METHOD.PATCH)

  const toggleFavoriteStatus = async (id: string, is_favorite: boolean) => {
    try {
      mutate((prevHistorys: HistoryRow[]) => {
        return prevHistorys?.map((history) => {
          if (history.id === id) {
            return { ...history, is_favorite: !is_favorite }
          }
          return history
        })
      }, false)

      const response = await toggleFavorite({
        post_ids: [id],
        update_fields: { is_favorite: !is_favorite },
      })

      return response
    } catch (error) {
      console.error('Error toggling favorite status:', error)
      mutate()
      return false
    }
  }

  return { historys, mutate, isLoading, error, removeHistory, toggleFavoriteStatus }
}

import { useContext } from 'react'
import useMutation from './useMutation'

export const useHistory = () => {
  // move to useHook folder
  const context = useContext(HistoryContext)
  if (!context) {
    throw new Error('HistoryContext must be used within an ImageHashtagProvider')
  }
  return context
}
