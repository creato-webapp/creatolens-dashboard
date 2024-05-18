import useSWR from 'swr'
import { getKeyword, getMostRepeatedPost, getPostCount } from '@services/Meta'

export const useKeyword = (input: { accId?: string; days: number; profile_id?: string }) => {
  const { data, error, mutate, ...swr } = useSWR({ url: 'api/dashboard/keyword', args: input }, getKeyword, {
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

export const usePostCount = (input: { accId?: string; days: number; profile_id?: string }) => {
  const { data, error, mutate, ...swr } = useSWR({ url: 'api/dashboard/postCount', args: input }, getPostCount, {
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

export const useMostRepeatedPost = (input: { accId?: string; days: number; profile_id?: string }) => {
  const { data, error, mutate, ...swr } = useSWR({ url: 'api/dashboard/mostRepeatedPost', args: input }, getMostRepeatedPost, {
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
