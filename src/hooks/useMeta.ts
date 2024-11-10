import useSWR from 'swr'

import { getKeyword, getMostRepeatedPost, getMostRepeatedPostImage, getPostCount, getProfile } from '@services/Meta'
import { CountryEnum } from 'enums/CountryCodeEnums'
import { DateRange } from 'react-day-picker'

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

export const useMostRepeatedPost = (input: {
  accId?: string
  date_range: DateRange
  profile_id?: string
  session_id?: string
  location?: string
}) => {
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

export const useMostRepeatedPostImage = (input: { shortcode?: string; batch_id?: string }) => {
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

export const useProfile = (input: { profile_id?: string; session_id: string; location: CountryEnum }) => {
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

export const useSearchHistory = () => {
  const { data, error, mutate, ...swr } = useSWR({ url: 'api/dashboard/searchHistory' }, getMostRepeatedPostImage, {
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
