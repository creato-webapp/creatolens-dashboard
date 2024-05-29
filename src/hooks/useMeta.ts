import useSWR from 'swr'
import { getKeyword, getMostRepeatedPost, getPostCount, getMostRepeatedPostImage, getProfile } from '@services/Meta'
import { cancelMiddleware } from '@api/middleware'

export const useKeyword = (input: { accId?: string; days: number; profile_id?: string }) => {
  const { data, error, mutate, ...swr } = useSWR({ url: 'api/dashboard/keyword', args: input }, getKeyword, {
    refreshInterval: 0,
    use: [cancelMiddleware],
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
    use: [cancelMiddleware],
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
    use: [cancelMiddleware],
  })
  return {
    data,
    isLoading: !error && !data && data !== null,
    error: error,
    mutate,
    ...swr,
  }
}

export const useMostRepeatedPostImage = (input: { shortcode?: string; batch_id?: string }) => {
  const { data, error, mutate, ...swr } = useSWR({ url: 'api/dashboard/mostRepeatedPostImage', args: input }, getMostRepeatedPostImage, {
    refreshInterval: 0,
    revalidateOnFocus: false,
    use: [cancelMiddleware],
  })

  return {
    data,
    isLoading: !error && !data,
    error: error,
    mutate,
    ...swr,
  }
}

export const useProfile = (input: { profile_id?: string }) => {
  const { data, error, mutate, ...swr } = useSWR({ url: 'api/dashboard/profileImage', args: input }, getProfile, {
    refreshInterval: 0,
    revalidateOnFocus: false,
    use: [cancelMiddleware],
  })

  return {
    data,
    isLoading: !error && !data,
    error: error,
    mutate,
    ...swr,
  }
}
