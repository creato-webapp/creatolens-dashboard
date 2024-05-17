import useSWR from 'swr'
import { getKeyword, getMostRepeatedPost, getPostCount } from '@services/Meta'

export const useKeyword = (input: { accountId?: string; days: number; profile_id?: string }, shouldFetch: boolean = true) => {
  const { data, error, mutate, ...swr } = useSWR(shouldFetch ? input : null, getKeyword, {
    refreshInterval: 0,
    revalidateOnFocus: false,
  })

  return {
    data,
    isLoading: !error && !data,
    error: error,
    mutate,
    ...swr,
  }
}

export const usePostCount = (input: { accId?: string; days: number; profile_id?: string }, shouldFetch: boolean = true) => {
  const { data, error, mutate, ...swr } = useSWR(shouldFetch ? input : null, getPostCount, {
    refreshInterval: 0,
    revalidateOnFocus: false,
  })
  return {
    data,
    isLoading: !error && !data,
    error: error,
    mutate,
    ...swr,
  }
}

export const useMostRepeatedPost = (input: { accId?: string; days: number; profile_id?: string }, shouldFetch: boolean = true) => {
  const { data, error, mutate, ...swr } = useSWR(shouldFetch ? input : null, getMostRepeatedPost, {
    refreshInterval: 0,
    revalidateOnFocus: false,
  })

  return {
    data,
    isLoading: !error && !data,
    error: error,
    mutate,
    ...swr,
  }
}
