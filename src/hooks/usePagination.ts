import { useState } from 'react'

type PaginationProps = {
  pageNumber?: number
  pageSize?: number
  orderBy?: string
  isAsc?: boolean
  hasNext?: boolean
  hasPrev?: boolean
}

export interface PaginationMetadata<T> {
  data: T
  total_items: number
  size: number
  page: number
}

export interface PaginationParams {
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


  const updateOrderBy = (newOrderBy: string) => {
    setPageParams((prevParams) => ({
      ...prevParams,
      orderBy: newOrderBy,
    }))
  }

  const updateSort = (isAsc: boolean) => {
    setPageParams((prevParams) => ({
      ...prevParams,
      isAsc: isAsc,
    }))
  }

  const onNextClick = () => {
    setPageParams((prevParams) => ({
      ...prevParams,
      pageNumber: prevParams.pageNumber + 1,
    }))
  }

  const onPageClick = (newPage: number) => {
    setPageParams((prevParams) => ({
      ...prevParams,
      pageNumber: newPage,
    }))
  }

  const onPrevClick = () => {
    setPageParams((prevParams) => ({
      ...prevParams,
      pageNumber: Math.max(prevParams.pageNumber - 1, 1),
    }))
  }

  return {
    pageParams,
    onNextClick,
    onPageClick,
    onPrevClick,
    updateOrderBy,
    updateSort,
  }
}
