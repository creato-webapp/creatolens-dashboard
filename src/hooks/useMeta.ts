import useSWR from 'swr'
import { getMeta } from '@services/Meta'
export const useMeta = (input: { accId: string; days: number }, shouldFetch: boolean = true, fallbackData?: { data: any }) => {
  const { data, error, mutate, ...swr } = useSWR(shouldFetch ? input : null, getMeta, {
    refreshInterval: 0,
    fallbackData: fallbackData,
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
