import useSWR from 'swr'
import { getMeta } from '@services/Meta'
export const useMeta = (input: { accId: string; days: number; profile_id?: string }, shouldFetch: boolean = true) => {
  const { data, error, mutate, ...swr } = useSWR(shouldFetch ? input : null, getMeta, {
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
