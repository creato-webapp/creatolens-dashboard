import useSWR from 'swr'

import { getHashtag } from '@services/HashtagHelper'
import { IHashet } from 'src/pages/recommendation'
export const useGetHashtag = (input: string, shouldFetch: boolean = true, fallbackData?: { data: IHashet[] }) => {
  const { data, error, mutate, ...swr } = useSWR(shouldFetch ? input : null, getHashtag, {
    refreshInterval: 0,
    fallbackData: fallbackData,
    revalidateOnFocus: false,
  })
  return {
    data,
    error: error,
    mutate,
    ...swr,
  }
}
