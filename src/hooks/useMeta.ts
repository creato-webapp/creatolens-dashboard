import useSWR from 'swr'

import XAPI from '@constants/endpoints/xapi'
import useRequest from './useRequest'
import METHOD from '@constants/method'
import { getKeyword, getMostRepeatedPost, getMostRepeatedPostImage, getPostCount, getProfile } from '@services/Meta'
import { CountryEnum } from 'enums/CountryCodeEnums'
import { DateRange } from 'react-day-picker'
import { HistoricSearchResult } from 'pages/dashboard'

export const useKeyword = (input: { accId?: string; date_range: DateRange; profile_id?: string }) => {
  const { data, error, isLoading, mutate, ...swr } = useSWR({ url: 'api/dashboard/keyword', args: input }, getKeyword, {
    refreshInterval: 0,
    revalidateOnFocus: false,
  })

  return {
    data,
    isLoading: isLoading,
    error: error,
    mutate,
    ...swr,
  }
}

export const usePostCount = (input: { accId?: string; date_range: DateRange; profile_id?: string }) => {
  const { data, error, mutate, ...swr } = useSWR({ url: 'api/dashboard/postCount', args: input }, getPostCount, {
    refreshInterval: 0,
    revalidateOnFocus: false,
  })

  return {
    data,
    error: error,
    mutate,
    ...swr,
  }
}

export const useMostRepeatedPost = (input: { accId?: string; date_range: DateRange; profile_id?: string; location?: string }) => {
  const { data, error, mutate, ...swr } = useSWR({ url: 'api/dashboard/mostRepeatedPost', args: input }, getMostRepeatedPost, {
    refreshInterval: 0,
    revalidateOnFocus: false,
  })

  return {
    data,
    error: error,
    mutate,
    ...swr,
  }
}

export const useMostRepeatedPostImage = (input: { shortcode?: string; batch_id?: string; is_video?: boolean }) => {
  const { data, error, mutate, ...swr } = useSWR({ url: 'api/dashboard/mostRepeatedPostImage', args: input }, getMostRepeatedPostImage, {
    refreshInterval: 0,
    revalidateOnFocus: false,
  })

  return {
    data,
    error: error,
    mutate,
    ...swr,
  }
}

export const useProfile = (input: { profile_id?: string; location: CountryEnum }) => {
  const { data, error, mutate, ...swr } = useSWR({ url: 'api/dashboard/profileImage', args: input }, getProfile, {
    refreshInterval: 0,
    revalidateOnFocus: false,
  })

  return {
    data,
    error: error,
    mutate,
    ...swr,
  }
}

export const useSearchHistory = (input: { userId: string }, fallbackData: HistoricSearchResult[]) => {
  const { data, error, mutate, isLoading, ...swr } = useRequest<HistoricSearchResult[] | []>(
    [
      XAPI.DASHBOARD_HISTORY,
      {
        params: {
          user_id: input.userId,
        },
      },
    ],
    METHOD.GET,
    {
      refreshInterval: 0,
      fallbackData: fallbackData,
      revalidateOnMount: false, // Do not fetch on mount
      revalidateOnReconnect: false, // Do not re-fetch on reconnect
    }
  )

  return {
    data,
    error,
    mutate,
    isLoading,
    ...swr,
  }
}
