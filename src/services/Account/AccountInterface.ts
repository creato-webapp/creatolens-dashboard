export interface PaginationParams {
  username?: string | null
  pageNumber: number
  pageSize: number
  orderBy: string
  isAsc: boolean
}

export interface PaginationMetadata<T> {
  data: T 
  has_next: boolean
  has_prev: boolean
  page: number
  size: number
  total_items: number
}
