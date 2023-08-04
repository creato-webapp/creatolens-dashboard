import useSWR, { mutate } from 'swr'
import { Fetcher } from 'services/fetcher'

export interface PaginationParams {
  pageNumber: number
  pageSize: number
  orderBy: string
  isAsc: boolean
}

export interface PaginationMetadata {
  data: any[]
  has_next: boolean
  has_prev: boolean
  page: number
  size: number
  total_items: number
}

export const useGetPagination = (url: string, paginationParams: PaginationParams, fallbackData?: PaginationMetadata) => {
  const { data, error, mutate, ...swr } = useSWR(
    [url, paginationParams],
    (url, paginationParams) => Fetcher('GET', url, undefined, paginationParams, undefined),
    {
      refreshInterval: 0,
      fallbackData: fallbackData,
    }
  )

  return {
    data,
    error,
    mutate,
    ...swr,
  }
}
