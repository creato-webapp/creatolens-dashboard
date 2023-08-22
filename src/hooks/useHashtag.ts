import useSWR from 'swr'
import { GetHashtag } from 'src/services/HashtagHelper'
export const useGetHashtag = (input: string, shouldFetch: boolean = true, fallbackData?: any) => {
  const { data, error, mutate, ...swr } = useSWR(shouldFetch ? input : null, GetHashtag, {
    refreshInterval: 0,
    fallbackData: fallbackData,
  })
  return {
    data,
    isLoading: !error && !data,
    error: error,
    mutate,
    ...swr,
  }
}
