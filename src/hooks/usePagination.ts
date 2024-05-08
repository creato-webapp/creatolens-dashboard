import { useState } from 'react'

type PaginationProps = {
  pageNumber?: number
  pageSize?: number
  orderBy?: string
  isAsc?: boolean
}

interface PaginationParams {
  pageNumber: number
  pageSize: number
  orderBy: string
  isAsc: boolean
}

type Props = PaginationProps

export const usePagination = ({ pageNumber = 1, pageSize = 10, orderBy = 'created_at', isAsc = false }: Props = {}) => {
  const [pageParams, setPageParams] = useState<PaginationParams>({
    pageNumber: pageNumber,
    pageSize: pageSize,
    orderBy: orderBy,
    isAsc: isAsc,
  })

  return {
    pageParams,
    setPageParams,
  }
}
